import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { cardStyles } from './styles';
import { FlowData, SolarCardConfig, HomeAssistant, SparklinePoint } from './types';
import { formatPower, parseFloat_safe, calculateFlows, getStateLabel } from './utils';

import './components/flow-diagram';
import './components/stat-panel';
import './components/device-row';

const MDI_SOLAR =
  'M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z';
const MDI_BATTERY =
  'M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
const MDI_GRID =
  'M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z';
const MDI_HOME =
  'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z';

interface HassHistoryEntry {
  last_updated: string;
  state: string;
}

@customElement('solar-overview-card')
export class SolarOverviewCard extends LitElement {

  private _hass?: HomeAssistant;

  public get hass(): HomeAssistant {
    return this._hass!;
  }

  @state() private _config?: SolarCardConfig;
  @state() private _solar = 0;
  @state() private _battery = 0;
  @state() private _grid = 0;
  @state() private _load = 0;
  @state() private _soc = 0;
  @state() private _solarExport = 0;
  @state() private _gridToBattery = 0;
  @state() private _flows: FlowData = {
    solarToHome: 0, solarToBattery: 0, solarToGrid: 0,
    gridToHome: 0, batteryToHome: 0, gridToBattery: 0,
  };
  @state() private _sparklines: Record<string, SparklinePoint[]> = {};
  @state() private _error: string | null = null;

  private _lastSparklineFetch = 0;
  private _sparklineDebounceMs = 5 * 60 * 1000;

  static getStubConfig(): SolarCardConfig {
    return {
      solar:   { entity: 'sensor.solar_power' },
      battery: { entity: 'sensor.battery_power', soc_entity: 'sensor.battery_soc' },
      grid:    { entity: 'sensor.grid_power' },
      load:    { entity: 'sensor.load_power' },
    };
  }

  static getConfigElement(): HTMLElement {
    return document.createElement('solar-overview-card-editor');
  }

  public setConfig(config: SolarCardConfig): void {
    if (!config.solar?.entity)   throw new Error('solar-overview-card: "solar.entity" required');
    if (!config.battery?.entity) throw new Error('solar-overview-card: "battery.entity" required');
    if (!config.grid?.entity)    throw new Error('solar-overview-card: "grid.entity" required');
    if (!config.load?.entity)    throw new Error('solar-overview-card: "load.entity" required');

    this._config = {
      watt_threshold: 1000,
      show_sparklines: true,
      theme: 'auto',
      show_flow: true,
      show_stats: true,
      show_devices: true,
      ...config,
    };
    this._error = null;
  }

  public getCardSize(): number { return 4; }

  public set hass(hass: HomeAssistant) {
    this._hass = hass;
    if (!this._config) return;

    try {
      const rawSolar   = this._readEntity(this._config.solar.entity);
      const rawBattery = this._readEntity(this._config.battery.entity);
      const rawGrid    = this._readEntity(this._config.grid.entity);
      const rawLoad    = this._readEntity(this._config.load.entity);

      // Apply invert flags
      this._solar   = this._config.solar.invert   ? -rawSolar   : rawSolar;
      this._battery = this._config.battery.invert ? -rawBattery : rawBattery;
      this._grid    = this._config.grid.invert    ? -rawGrid    : rawGrid;
      this._load    = this._config.load.invert    ? -rawLoad    : rawLoad;

      if (this._config.battery.soc_entity) {
        this._soc = this._readEntity(this._config.battery.soc_entity);
      }

      // Optional explicit export / grid-charge entities
      this._solarExport = this._config.solar.export_entity
        ? this._readEntity(this._config.solar.export_entity)
        : 0;

      this._gridToBattery = this._config.battery.grid_charge_entity
        ? this._readEntity(this._config.battery.grid_charge_entity)
        : 0;

      this._flows = calculateFlows(
        this._solar,
        this._battery,
        this._grid,
        this._load,
        this._config.solar.export_entity ? this._solarExport : undefined,
        this._config.battery.grid_charge_entity ? this._gridToBattery : undefined,
      );

      const now = Date.now();
      if (
        this._config.show_sparklines !== false &&
        now - this._lastSparklineFetch > this._sparklineDebounceMs
      ) {
        this._lastSparklineFetch = now;
        this._fetchSparklines();
      }
    } catch (e) {
      this._error = (e as Error).message;
    }
  }

  private _readEntity(entityId: string): number {
    if (!this._hass?.states) return 0;
    const ent = this._hass.states[entityId];
    if (!ent) return 0;
    return parseFloat_safe(ent.state);
  }

  private async _fetchSparklines(): Promise<void> {
    if (!this._config || !this._hass?.callApi) return;

    const entities = [
      this._config.solar.entity,
      this._config.battery.entity,
      this._config.grid.entity,
      this._config.load.entity,
    ];

    const end = new Date();
    const start = new Date(end.getTime() - 2 * 60 * 60 * 1000);
    const startIso = start.toISOString();
    const results: Record<string, SparklinePoint[]> = {};

    await Promise.allSettled(
      entities.map(async (entityId) => {
        try {
          const path = `history/period/${startIso}?filter_entity_id=${entityId}&minimal_response=true&no_attributes=true`;
          const raw = await this._hass!.callApi('GET', path) as HassHistoryEntry[][];
          if (!Array.isArray(raw) || raw.length === 0) return;
          results[entityId] = raw[0]
            .map((e): SparklinePoint | null => {
              const v = parseFloat_safe(e.state);
              if (isNaN(v)) return null;
              return { time: new Date(e.last_updated).getTime(), value: v };
            })
            .filter((p): p is SparklinePoint => p !== null);
        } catch { /* ignore per-entity failures */ }
      }),
    );

    this._sparklines = { ...this._sparklines, ...results };
  }

  private _threshold(): number { return this._config?.watt_threshold ?? 1000; }

  private _deviceItems() {
    if (!this._config?.devices || !this._hass?.states) return [];
    return this._config.devices.map((d) => ({
      entityId: d.entity,
      name: d.name ?? d.entity,
      icon: d.icon ?? 'M7,2V13H10V22L17,10H13L17,2H7Z',
      watts: this._readEntity(d.entity),
      color: d.color,
    }));
  }

  private _panelProps(
    key: 'solar' | 'battery' | 'grid' | 'load',
    watts: number,
    defaultName: string,
    icon: string,
    color: string,
    entityId: string,
  ) {
    const thr = this._threshold();
    const cfg = this._config![key];
    return {
      entityId,
      name: cfg?.name ?? defaultName,
      icon,
      value: watts,
      displayValue: formatPower(watts, thr),
      stateLabel: getStateLabel(entityId, watts),
      stateColor: color,
      showSparkline: this._config?.show_sparklines !== false,
      sparklineHistory: this._sparklines[entityId] ?? [],
      panelClass: `panel--${key}`,
      badgeClass: `badge--${key}`,
    };
  }

  static styles = [
    cardStyles,
    css`:host { display: block; } ha-card { overflow: hidden; }`,
  ];

  protected render() {
    if (!this._config) return html`<ha-card><div class="error-card">solar-overview-card: no config.</div></ha-card>`;
    if (this._error)   return html`<ha-card><div class="error-card">Error: ${this._error}</div></ha-card>`;

    const thr = this._threshold();
    const showFlow    = this._config.show_flow    !== false;
    const showStats   = this._config.show_stats   !== false;
    const showDevices = this._config.show_devices !== false;

    const solar   = this._panelProps('solar',   this._solar,   'Solar',   MDI_SOLAR,   '#f59e0b', this._config.solar.entity);
    const battery = this._panelProps('battery', this._battery, 'Battery', MDI_BATTERY, '#10b981', this._config.battery.entity);
    const grid    = this._panelProps('grid',    this._grid,    'Grid',    MDI_GRID,    '#8b5cf6', this._config.grid.entity);
    // Home shows total power delivered: battery discharge + grid import
    const homeDelivered = this._flows.batteryToHome + this._flows.gridToHome;
    const load    = this._panelProps('load', homeDelivered, 'Home', MDI_HOME, '#3b82f6', this._config.load.entity);

    const devices = this._deviceItems();

    return html`
      <ha-card>
        <div class="card" theme="${this._config.theme ?? 'auto'}">

          ${showFlow ? html`
            <div class="flow-diagram">
              <flow-diagram
                .solar="${this._solar}"
                .battery="${this._battery}"
                .grid="${this._grid}"
                .load="${homeDelivered}"
                .socPercent="${this._soc}"
                .wattThreshold="${thr}"
                .flows="${this._flows}"
              ></flow-diagram>
            </div>
          ` : ''}

          ${showStats ? html`
            <div class="stat-grid">
              ${(['solar', 'battery', 'grid', 'load'] as const).map((key) => {
                const p = { solar, battery, grid, load }[key];
                return html`
                  <stat-panel
                    .entityId="${p.entityId}"
                    .name="${p.name}"
                    .icon="${p.icon}"
                    .value="${p.value}"
                    .displayValue="${p.displayValue}"
                    .stateLabel="${p.stateLabel}"
                    .stateColor="${p.stateColor}"
                    .showSparkline="${p.showSparkline}"
                    .sparklineHistory="${p.sparklineHistory}"
                    .panelClass="${p.panelClass}"
                    .badgeClass="${p.badgeClass}"
                  ></stat-panel>
                `;
              })}
            </div>
          ` : ''}

          ${showDevices && this._config.devices && this._config.devices.length > 0 ? html`
            <div class="devices-section">
              <div class="devices-label">Devices</div>
              <device-row
                .devices="${devices}"
                .wattThreshold="${thr}"
              ></device-row>
            </div>
          ` : ''}

        </div>
      </ha-card>
    `;
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
  }
}

// ─── Visual config editor ────────────────────────────────────────────────────

@customElement('solar-overview-card-editor')
export class SolarOverviewCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: SolarCardConfig;

  @state() private _newDevice: { entity: string; name: string; icon: string; color: string } = {
    entity: '', name: '', icon: 'mdi:power-socket', color: '#6366f1',
  };

  static styles = css`
    :host { display: block; padding: 16px; }
    .row { display: flex; flex-direction: column; gap: 12px; }
    .section-title {
      font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.06em; color: var(--secondary-text-color, #9ca3af);
      margin: 8px 0 4px;
    }
    .hint { font-size: 0.75rem; color: var(--secondary-text-color, #9ca3af); margin-top: 4px; }
    .device-list { display: flex; flex-direction: column; gap: 6px; }
    .device-item {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .device-item-color { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .device-item-name { flex: 1; font-size: 0.85rem; }
    .device-item-entity { font-size: 0.72rem; color: var(--secondary-text-color, #9ca3af); }
    .device-delete {
      background: none; border: none; cursor: pointer; padding: 4px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 1rem; line-height: 1;
    }
    .device-delete:hover { color: #ef4444; }
    .add-device-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px;
      border: 1px dashed rgba(255,255,255,0.12);
    }
    .add-device-row { display: flex; gap: 8px; align-items: center; }
    .add-device-row ha-selector { flex: 1; }
    .color-row { display: flex; align-items: center; gap: 10px; }
    .color-row label { font-size: 0.8rem; color: var(--secondary-text-color, #9ca3af); }
    .color-row input[type=color] {
      width: 36px; height: 28px; border: none; border-radius: 4px;
      background: none; cursor: pointer; padding: 0;
    }
    .add-btn {
      background: var(--primary-color, #3b82f6); color: white; border: none;
      border-radius: 6px; padding: 8px 16px; cursor: pointer; font-size: 0.85rem;
      font-weight: 600; align-self: flex-end;
    }
    .add-btn:disabled { opacity: 0.4; cursor: not-allowed; }
  `;

  public setConfig(config: SolarCardConfig): void {
    this._config = config;
  }

  private _setValue(configValue: string, value: string): void {
    if (!this._config) return;
    const parts = configValue.split('.');
    const updated: SolarCardConfig = JSON.parse(JSON.stringify(this._config));
    const updatedAny = updated as unknown as Record<string, unknown>;
    if (parts.length === 2) {
      const [section, field] = parts;
      const current = ((updatedAny[section] as Record<string, unknown>) ?? {});
      current[field] = value;
      updatedAny[section] = current;
    } else {
      updatedAny[parts[0]] = value;
    }
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: updated } }));
  }

  private _entityPicker(label: string, configValue: string, currentValue: string) {
    return html`
      <ha-selector
        .hass="${this.hass}"
        .label="${label}"
        .selector=${{ entity: {} }}
        .value="${currentValue || ''}"
        @value-changed="${(e: CustomEvent) => this._setValue(configValue, e.detail.value ?? '')}"
      ></ha-selector>
    `;
  }

  private _deleteDevice(index: number): void {
    if (!this._config) return;
    const devices = [...(this._config.devices ?? [])];
    devices.splice(index, 1);
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, devices } },
    }));
  }

  private _addDevice(): void {
    if (!this._config || !this._newDevice.entity) return;
    const devices = [...(this._config.devices ?? []), { ...this._newDevice }];
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, devices } },
    }));
    this._newDevice = { entity: '', name: '', icon: 'mdi:power-socket', color: '#6366f1' };
  }

  private _renderDeviceEditor() {
    const devices = this._config?.devices ?? [];
    return html`
      <div class="section-title">Devices</div>

      ${devices.length > 0 ? html`
        <div class="device-list">
          ${devices.map((d, i) => html`
            <div class="device-item">
              <div class="device-item-color" style="background:${d.color ?? '#6366f1'}"></div>
              <div style="flex:1;min-width:0;">
                <div class="device-item-name">${d.name ?? d.entity}</div>
                <div class="device-item-entity">${d.entity}</div>
              </div>
              <button class="device-delete" @click="${() => this._deleteDevice(i)}" title="Remove">✕</button>
            </div>
          `)}
        </div>
      ` : ''}

      <div class="add-device-form">
        <ha-selector
          .hass="${this.hass}"
          .label="Entity"
          .selector=${{ entity: {} }}
          .value="${this._newDevice.entity}"
          @value-changed="${(e: CustomEvent) => { this._newDevice = { ...this._newDevice, entity: e.detail.value ?? '' }; this.requestUpdate(); }}"
        ></ha-selector>

        <div class="add-device-row">
          <ha-selector
            .label="Name"
            .selector=${{ text: {} }}
            .value="${this._newDevice.name}"
            @value-changed="${(e: CustomEvent) => { this._newDevice = { ...this._newDevice, name: e.detail.value ?? '' }; this.requestUpdate(); }}"
          ></ha-selector>

          <ha-selector
            .label="Icon"
            .selector=${{ icon: {} }}
            .value="${this._newDevice.icon}"
            @value-changed="${(e: CustomEvent) => { this._newDevice = { ...this._newDevice, icon: e.detail.value ?? '' }; this.requestUpdate(); }}"
          ></ha-selector>
        </div>

        <div class="color-row">
          <label>Colour</label>
          <input type="color" .value="${this._newDevice.color}"
            @input="${(e: Event) => { this._newDevice = { ...this._newDevice, color: (e.target as HTMLInputElement).value }; this.requestUpdate(); }}"
          />
        </div>

        <button class="add-btn" ?disabled="${!this._newDevice.entity}"
          @click="${this._addDevice}">
          Add Device
        </button>
      </div>
    `;
  }

  private _toggle(label: string, configValue: string, checked: boolean) {
    return html`
      <ha-selector
        .label="${label}"
        .selector=${{ boolean: {} }}
        .value="${checked}"
        @value-changed="${(e: CustomEvent) => this._setValue(configValue, e.detail.value)}"
      ></ha-selector>
    `;
  }

  protected render() {
    if (!this._config) return html``;
    const c = this._config;
    return html`
      <div class="row">
        <div class="section-title">Power flow entities</div>
        ${this._entityPicker('Solar → Home / Battery / Grid  (generation, W ≥ 0)',    'solar.entity',   c.solar?.entity ?? '')}
        ${this._entityPicker('Battery ← charge / → Home  (+ charging, − discharging)', 'battery.entity', c.battery?.entity ?? '')}
        ${this._entityPicker('Battery SOC  (0–100 %)',                                  'battery.soc_entity', c.battery?.soc_entity ?? '')}
        ${this._entityPicker('Grid → Home  /  Solar → Grid  (+ import, − export)',     'grid.entity',    c.grid?.entity ?? '')}
        ${this._entityPicker('Home load  (used for Solar → Home calc, W ≥ 0)',         'load.entity',    c.load?.entity ?? '')}

        <div class="section-title">Optional — explicit flow sensors</div>
        ${this._entityPicker('Solar → Grid  export sensor  (W ≥ 0, overrides grid sign)', 'solar.export_entity',        c.solar?.export_entity ?? '')}
        ${this._entityPicker('Grid → Battery  charge sensor  (W ≥ 0)',                    'battery.grid_charge_entity', c.battery?.grid_charge_entity ?? '')}

        ${this._renderDeviceEditor()}

        <div class="section-title">Sign conventions</div>
        ${this._toggle('Invert battery (positive = discharging)', 'battery.invert', c.battery?.invert ?? false)}
        ${this._toggle('Invert grid (positive = exporting)',      'grid.invert',    c.grid?.invert ?? false)}

        <div class="section-title">Visibility</div>
        ${this._toggle('Show flow diagram',   'show_flow',       c.show_flow    !== false)}
        ${this._toggle('Show stat panels',    'show_stats',      c.show_stats   !== false)}
        ${this._toggle('Show devices row',    'show_devices',    c.show_devices !== false)}
        ${this._toggle('Show sparklines',     'show_sparklines', c.show_sparklines !== false)}

        <p class="hint">Sign convention (default): battery positive = charging, grid positive = importing.</p>
      </div>
    `;
  }
}

// ─── Registration ────────────────────────────────────────────────────────────

declare global {
  interface Window {
    customCards?: Array<{ type: string; name: string; description: string; preview?: boolean }>;
  }
  interface HTMLElementTagNameMap {
    'solar-overview-card': SolarOverviewCard;
    'solar-overview-card-editor': SolarOverviewCardEditor;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'solar-overview-card',
  name: 'Solar Overview Card',
  description: 'Animated solar energy overview with power flow diagram',
  preview: true,
});
