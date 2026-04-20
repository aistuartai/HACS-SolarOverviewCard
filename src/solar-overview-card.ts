import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { cardStyles } from './styles';
import { FlowData, SolarCardConfig, PanelConfig, HomeAssistant, SparklinePoint } from './types';
import { formatPower, parseFloat_safe, calculateFlows, getStateLabel } from './utils';

import './components/flow-diagram';
import type { DiagramDevice } from './components/flow-diagram';
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

const DEFAULT_PANELS: PanelConfig[] = [
  { key: 'solar',   enabled: true },
  { key: 'battery', enabled: true },
  { key: 'grid',    enabled: true },
  { key: 'load',    enabled: true },
];

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
    gridToHome: 0, batteryToHome: 0, gridToBattery: 0, batteryToGrid: 0,
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
    if (!config.load?.entity)    throw new Error('solar-overview-card: "load.entity" required');
    const g = config.grid;
    if (!g?.entity && !g?.import_entity && !g?.export_entity)
      throw new Error('solar-overview-card: at least one grid entity required');

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
      const g = this._config.grid;

      const rawSolar   = this._readEntity(this._config.solar.entity);
      const rawBattery = this._readEntity(this._config.battery.entity);
      const rawLoad    = this._readEntity(this._config.load.entity);
      const rawGrid    = g.entity ? this._readEntity(g.entity) : 0;

      this._solar   = this._config.solar.invert   ? -rawSolar   : rawSolar;
      this._battery = this._config.battery.invert ? -rawBattery : rawBattery;
      this._grid    = g.invert ? -rawGrid : rawGrid;
      this._load    = this._config.load.invert ? -rawLoad : rawLoad;

      if (this._config.battery.soc_entity) {
        this._soc = this._readEntity(this._config.battery.soc_entity);
      }

      // Resolve all grid flow entities
      const gridImport     = g.import_entity       ? this._readEntity(g.import_entity)       : undefined;
      const gridExport     = g.export_entity        ? this._readEntity(g.export_entity)        :
                             this._config.solar.export_entity ? this._readEntity(this._config.solar.export_entity) : undefined;
      const gridToBattery  = g.to_battery_entity    ? this._readEntity(g.to_battery_entity)    :
                             this._config.battery.grid_charge_entity ? this._readEntity(this._config.battery.grid_charge_entity) : undefined;
      const batteryToGrid  = g.from_battery_entity  ? this._readEntity(g.from_battery_entity)  : undefined;
      const gridBatteryCombined = g.battery_entity  ? this._readEntity(g.battery_entity)        : undefined;

      this._flows = calculateFlows({
        solar: this._solar,
        battery: this._battery,
        load: this._load,
        gridCombined: this._grid,
        gridImport,
        gridExport,
        gridToBattery,
        batteryToGrid,
        gridBatteryCombined,
      });

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
      this._config.grid.entity ?? this._config.grid.import_entity,
      this._config.load.entity,
    ].filter((e): e is string => !!e);

    const end = new Date();
    const hours = this._config.sparkline_hours ?? 2;
    const start = new Date(end.getTime() - hours * 60 * 60 * 1000);
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

  private _diagramDevices(): DiagramDevice[] {
    if (!this._config?.devices || !this._hass?.states) return [];
    return this._config.devices
      .filter((d) => d.show_on_diagram)
      .map((d) => ({
        name: d.name ?? d.entity,
        watts: this._readEntity(d.entity),
        color: d.color ?? '#6366f1',
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
    const grid    = this._panelProps('grid',    this._grid,    'Grid',    MDI_GRID,    '#8b5cf6', this._config.grid.entity ?? this._config.grid.import_entity ?? '');
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
                .diagramDevices="${this._diagramDevices()}"
                .solarName="${this._config.solar.name ?? 'Solar'}"
                .gridName="${this._config.grid.name ?? 'Grid'}"
                .homeName="${this._config.load.name ?? 'Home'}"
                .batteryName="${this._config.battery.name ?? 'Battery'}"
              ></flow-diagram>
            </div>
          ` : ''}

          ${showStats ? html`
            <div class="stat-grid">
              ${(this._config.panels ?? DEFAULT_PANELS)
                .filter(p => p.enabled !== false)
                .map(({ key }) => {
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

type EditorPage = 'main' | 'setup' | 'solar' | 'battery' | 'grid' | 'house' | 'panels' | 'outlets';
type EFOpts = { invertPath?: string; invertValue?: boolean; namePath?: string; nameValue?: string; hint?: string };

@customElement('solar-overview-card-editor')
export class SolarOverviewCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: SolarCardConfig;
  @state() private _page: EditorPage = 'main';

  @state() private _newDevice = { entity: '', name: '', icon: 'mdi:power-socket', color: '#6366f1', show_on_diagram: false };
  @state() private _editingIndex: number | null = null;
  @state() private _editingDevice = { entity: '', name: '', icon: '', color: '#6366f1', show_on_diagram: false };

  static styles = css`
    :host { display: block; padding: 16px; }

    /* ── Navigation cards ── */
    .nav-list { display: flex; flex-direction: column; gap: 8px; }
    .nav-item {
      display: flex; align-items: center; gap: 14px;
      padding: 13px 14px; border-radius: 10px; cursor: pointer;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
      transition: background 0.12s;
    }
    .nav-item:hover { background: rgba(255,255,255,0.09); }
    .nav-icon {
      width: 38px; height: 38px; border-radius: 9px; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    }
    .nav-text { flex: 1; min-width: 0; }
    .nav-title { font-size: 0.88rem; font-weight: 600; color: var(--primary-text-color); }
    .nav-sub {
      font-size: 0.73rem; color: var(--secondary-text-color, #9ca3af);
      margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .nav-arrow { color: var(--secondary-text-color, #9ca3af); font-size: 1.1rem; padding-right: 2px; }

    /* ── Page layout ── */
    .page-header {
      display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
    }
    .back-btn {
      background: none; border: none; cursor: pointer; padding: 4px 8px;
      color: var(--primary-color, #3b82f6); font-size: 1.3rem; border-radius: 6px;
      display: flex; align-items: center; line-height: 1;
    }
    .back-btn:hover { background: rgba(59,130,246,0.1); }
    .page-title { font-size: 1rem; font-weight: 700; color: var(--primary-text-color); }
    .page-icon  { font-size: 1.15rem; }

    /* ── Form fields ── */
    .form-col { display: flex; flex-direction: column; gap: 12px; }
    .field-wrap { display: flex; flex-direction: column; gap: 6px; }
    .field-row { display: flex; align-items: flex-end; gap: 6px; }
    .field-row ha-selector { flex: 1; min-width: 0; }
    .clear-btn {
      background: none; border: none; cursor: pointer;
      color: var(--secondary-text-color, #9ca3af);
      padding: 8px 7px; border-radius: 6px; font-size: 0.95rem;
      line-height: 1; flex-shrink: 0; margin-bottom: 2px;
    }
    .clear-btn:hover { color: #ef4444; background: rgba(239,68,68,0.1); }
    .section-label {
      font-size: 0.73rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.07em; color: var(--secondary-text-color, #9ca3af);
      margin: 6px 0 0;
    }
    .divider { height: 1px; background: var(--divider-color, rgba(255,255,255,0.08)); margin: 10px 0; }
    .hint { font-size: 0.75rem; color: var(--secondary-text-color, #9ca3af); margin: 4px 0 0; }

    /* ── Boolean toggle row ── */
    .bool-row {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 6px 10px; border-radius: 8px;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }
    .bool-label { font-size: 0.875rem; color: var(--primary-text-color); flex: 1; }

    /* ── Live flow stats (house page) ── */
    .flow-stats { display: flex; flex-direction: column; gap: 4px; }
    .flow-stat {
      display: flex; justify-content: space-between; align-items: center;
      padding: 7px 10px; border-radius: 7px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
    }
    .flow-stat-label { font-size: 0.82rem; color: var(--secondary-text-color, #9ca3af); }
    .flow-stat-value { font-size: 0.87rem; font-weight: 700; color: var(--primary-text-color); }

    /* ── Stat panel order/toggle ── */
    .panel-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: 8px;
      background: var(--card-background-color, rgba(255,255,255,0.04));
      border: 1px solid var(--divider-color, rgba(255,255,255,0.08));
    }
    .panel-move { display: flex; flex-direction: column; gap: 2px; }
    .move-btn {
      background: none; border: none; cursor: pointer; padding: 2px 6px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 0.75rem; line-height: 1;
    }
    .move-btn:hover:not([disabled]) { background: rgba(255,255,255,0.1); color: var(--primary-text-color); }
    .move-btn[disabled] { opacity: 0.2; cursor: not-allowed; }
    .panel-label { flex: 1; font-size: 0.875rem; color: var(--primary-text-color); }

    /* ── Device list ── */
    .device-list { display: flex; flex-direction: column; gap: 6px; }
    .device-item {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px; padding: 8px 10px;
      border: 1px solid rgba(255,255,255,0.08);
    }
    .device-item-color { width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0; }
    .device-item-name  { flex: 1; font-size: 0.85rem; }
    .device-item-entity { font-size: 0.72rem; color: var(--secondary-text-color, #9ca3af); }
    .device-actions { display: flex; gap: 4px; }
    .device-btn {
      background: none; border: none; cursor: pointer; padding: 4px 7px;
      color: var(--secondary-text-color, #9ca3af); border-radius: 4px;
      font-size: 0.78rem; font-weight: 600; line-height: 1;
    }
    .device-btn:hover { background: rgba(255,255,255,0.08); }
    .device-btn.danger:hover { color: #ef4444; }
    .device-edit-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.04); border-radius: 8px;
      padding: 10px; margin-top: 4px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .diagram-badge {
      font-size: 0.65rem; font-weight: 600; padding: 1px 5px;
      border-radius: 99px; background: rgba(99,102,241,0.2); color: #818cf8;
      margin-left: 4px;
    }
    .add-device-form {
      display: flex; flex-direction: column; gap: 8px;
      background: rgba(255,255,255,0.03); border-radius: 8px; padding: 12px;
      border: 1px dashed rgba(255,255,255,0.12); margin-top: 8px;
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

  private _setValue(path: string, value: unknown): void {
    if (!this._config) return;
    const parts = path.split('.');
    const updated: SolarCardConfig = JSON.parse(JSON.stringify(this._config));
    const updatedAny = updated as unknown as Record<string, unknown>;
    if (parts.length === 2) {
      const [section, field] = parts;
      const current = { ...((updatedAny[section] as Record<string, unknown>) ?? {}) };
      if (value === '' || value === undefined || value === null) {
        delete current[field];
      } else {
        current[field] = value;
      }
      updatedAny[section] = current;
    } else {
      if (value === '' || value === undefined || value === null) {
        delete updatedAny[parts[0]];
      } else {
        updatedAny[parts[0]] = value;
      }
    }
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: updated } }));
  }

  private _computeCurrentFlows(): FlowData | null {
    if (!this.hass || !this._config) return null;
    try {
      const c = this._config;
      const g = c.grid;
      const read = (id: string | undefined) =>
        id ? parseFloat_safe(this.hass!.states[id]?.state) : 0;
      const solar   = read(c.solar.entity)   * (c.solar.invert   ? -1 : 1);
      const battery = read(c.battery.entity) * (c.battery.invert ? -1 : 1);
      const load    = read(c.load.entity)    * (c.load.invert    ? -1 : 1);
      const gridRaw = g.entity ? read(g.entity) * (g.invert ? -1 : 1) : 0;
      const gridImport    = g.import_entity       ? read(g.import_entity)       : undefined;
      const gridExport    = g.export_entity       ? read(g.export_entity)       :
                            c.solar.export_entity ? read(c.solar.export_entity) : undefined;
      const gridToBattery = g.to_battery_entity   ? read(g.to_battery_entity)   : undefined;
      const batteryToGrid = g.from_battery_entity ? read(g.from_battery_entity) : undefined;
      const gridBatteryCombined = g.battery_entity ? read(g.battery_entity)     : undefined;
      return calculateFlows({
        solar, battery, load, gridCombined: gridRaw,
        gridImport, gridExport, gridToBattery, batteryToGrid, gridBatteryCombined,
      });
    } catch { return null; }
  }

  // ── Shared field helpers ─────────────────────────────────────────────────────

  private _pageHeader(emoji: string, title: string) {
    return html`
      <div class="page-header">
        <button class="back-btn" @click="${() => { this._page = 'main'; this._editingIndex = null; }}">‹</button>
        <span class="page-icon">${emoji}</span>
        <span class="page-title">${title}</span>
      </div>
    `;
  }

  private _boolField(label: string, path: string, value: boolean) {
    return html`
      <div class="bool-row">
        <span class="bool-label">${label}</span>
        <ha-selector
          .selector=${{ boolean: {} }}
          .value="${value}"
          @value-changed="${(e: CustomEvent) => this._setValue(path, e.detail.value)}"
        ></ha-selector>
      </div>
    `;
  }

  private _entityField(label: string, path: string, value: string | undefined, opts?: EFOpts) {
    return html`
      <div class="field-wrap">
        <div class="field-row">
          <ha-selector
            .hass="${this.hass}"
            .label="${label}"
            .selector=${{ entity: {} }}
            .value="${value ?? ''}"
            @value-changed="${(e: CustomEvent) => this._setValue(path, e.detail.value ?? '')}"
          ></ha-selector>
          ${value ? html`
            <button class="clear-btn" title="Clear" @click="${() => this._setValue(path, '')}">✕</button>
          ` : ''}
        </div>
        ${opts?.namePath !== undefined ? html`
          <div class="field-row" style="margin-top:4px;">
            <ha-selector
              .label="Display name"
              .selector=${{ text: {} }}
              .value="${opts.nameValue ?? ''}"
              @value-changed="${(e: CustomEvent) => this._setValue(opts!.namePath!, e.detail.value ?? '')}"
            ></ha-selector>
            ${opts.nameValue ? html`
              <button class="clear-btn" title="Clear" @click="${() => this._setValue(opts!.namePath!, '')}">✕</button>
            ` : ''}
          </div>
        ` : ''}
        ${opts?.hint ? html`<p class="hint" style="margin:3px 0 0;">${opts.hint}</p>` : ''}
        ${opts?.invertPath !== undefined
          ? this._boolField('Invert sign (flip +/−)', opts.invertPath, opts.invertValue ?? false)
          : ''}
      </div>
    `;
  }

  private _textField(label: string, path: string, value: string | undefined) {
    return html`
      <div class="field-row">
        <ha-selector
          .label="${label}"
          .selector=${{ text: {} }}
          .value="${value ?? ''}"
          @value-changed="${(e: CustomEvent) => this._setValue(path, e.detail.value ?? '')}"
        ></ha-selector>
        ${value ? html`
          <button class="clear-btn" title="Clear" @click="${() => this._setValue(path, '')}">✕</button>
        ` : ''}
      </div>
    `;
  }

  // ── Page renderers ───────────────────────────────────────────────────────────

  private _renderMain() {
    if (!this._config) return html``;
    const c = this._config;
    const deviceCount = c.devices?.length ?? 0;

    const navItem = (page: EditorPage, emoji: string, title: string, sub: string, bg: string) => html`
      <div class="nav-item" @click="${() => { this._page = page; }}">
        <div class="nav-icon" style="background:${bg}">${emoji}</div>
        <div class="nav-text">
          <div class="nav-title">${title}</div>
          <div class="nav-sub">${sub}</div>
        </div>
        <span class="nav-arrow">›</span>
      </div>
    `;

    const activePanels = (c.panels ?? DEFAULT_PANELS).filter(p => p.enabled !== false).length;
    return html`
      <div class="nav-list">
        ${navItem('setup',   '⚙️', 'Setup',   'Visibility & sparklines',                                    'rgba(107,114,128,0.18)')}
        ${navItem('solar',   '☀️', 'Solar',   c.solar?.entity   ?? 'Not configured',                        'rgba(245,158,11,0.18)')}
        ${navItem('battery', '🔋', 'Battery', c.battery?.entity ?? 'Not configured',                        'rgba(16,185,129,0.18)')}
        ${navItem('grid',    '⚡', 'Grid',    c.grid?.entity ?? c.grid?.import_entity ?? 'Not configured',   'rgba(139,92,246,0.18)')}
        ${navItem('house',   '🏠', 'House',   c.load?.entity    ?? 'Not configured',                        'rgba(59,130,246,0.18)')}
        ${navItem('panels',  '📊', 'Panels',  `${activePanels} of 4 shown`,                                 'rgba(6,182,212,0.18)')}
        ${navItem('outlets', '🔌', 'Outlets', deviceCount > 0 ? `${deviceCount} device${deviceCount !== 1 ? 's' : ''}` : 'No devices added', 'rgba(99,102,241,0.18)')}
      </div>
    `;
  }

  private _renderSetupPage() {
    if (!this._config) return html``;
    const c = this._config;
    return html`
      ${this._pageHeader('⚙️', 'Setup')}
      <div class="form-col">
        <div class="section-label" style="margin-top:0;">Sections</div>
        ${this._boolField('Show flow diagram',  'show_flow',       c.show_flow       !== false)}
        ${this._boolField('Show stat panels',   'show_stats',      c.show_stats      !== false)}
        ${this._boolField('Show devices row',   'show_devices',    c.show_devices    !== false)}
        ${this._boolField('Show sparklines',    'show_sparklines', c.show_sparklines !== false)}
        <div class="section-label">Sparkline history</div>
        <ha-selector
          .label="Duration (hours, default 2)"
          .selector=${{ number: { min: 1, max: 48, step: 1, mode: 'box' } }}
          .value="${c.sparkline_hours ?? 2}"
          @value-changed="${(e: CustomEvent) => this._setValue('sparkline_hours', e.detail.value)}"
        ></ha-selector>
      </div>
    `;
  }

  private _renderSolarPage() {
    if (!this._config) return html``;
    const s = this._config.solar;
    return html`
      ${this._pageHeader('☀️', 'Solar Config')}
      <div class="form-col">
        ${this._entityField('Solar generation  (W ≥ 0)', 'solar.entity', s?.entity, {
          invertPath: 'solar.invert', invertValue: s?.invert,
          namePath: 'solar.name', nameValue: s?.name,
        })}
        ${this._entityField('Solar → Grid export  (W ≥ 0)', 'solar.export_entity', s?.export_entity, {
          hint: 'overrides grid.export_entity for Solar → Grid flow',
        })}
      </div>
    `;
  }

  private _renderBatteryPage() {
    if (!this._config) return html``;
    const b = this._config.battery;
    return html`
      ${this._pageHeader('🔋', 'Battery Config')}
      <div class="form-col">
        ${this._entityField('Battery power  (+ = charging,  − = discharging)', 'battery.entity', b?.entity, {
          invertPath: 'battery.invert', invertValue: b?.invert,
          namePath: 'battery.name', nameValue: b?.name,
        })}
        ${this._entityField('State of charge  (0–100 %)', 'battery.soc_entity', b?.soc_entity)}
      </div>
    `;
  }

  private _renderGridPage() {
    if (!this._config) return html``;
    const g = this._config.grid;
    return html`
      ${this._pageHeader('⚡', 'Grid Config')}
      <div class="form-col">
        <div class="section-label" style="margin-top:0;">Combined sensor (fallback)</div>
        ${this._entityField('Grid power  (+ = importing,  − = exporting)', 'grid.entity', g?.entity, {
          invertPath: 'grid.invert', invertValue: g?.invert,
          namePath: 'grid.name', nameValue: g?.name,
        })}
        <div class="section-label">Individual flow sensors</div>
        ${this._entityField('Grid → Home  import  (W ≥ 0)', 'grid.import_entity', g?.import_entity, {
          hint: 'overrides combined for Grid → Home',
        })}
        ${this._entityField('Solar/Battery → Grid  export  (W ≥ 0)', 'grid.export_entity', g?.export_entity, {
          hint: 'overrides combined for Solar → Grid',
        })}
        <div class="section-label">Battery ↔ Grid sensors</div>
        ${this._entityField('Grid ↔ Battery combined  (+ = charges,  − = discharges to grid)', 'grid.battery_entity', g?.battery_entity)}
        ${this._entityField('Grid → Battery only  (W ≥ 0)', 'grid.to_battery_entity', g?.to_battery_entity, {
          hint: 'overrides battery_entity positive side',
        })}
        ${this._entityField('Battery → Grid only  (W ≥ 0)', 'grid.from_battery_entity', g?.from_battery_entity, {
          hint: 'overrides battery_entity negative side',
        })}
      </div>
    `;
  }

  private _renderHousePage() {
    if (!this._config) return html``;
    const l = this._config.load;
    const flows = this._computeCurrentFlows();
    const thr = this._config.watt_threshold ?? 1000;
    const fmt = (w: number) => formatPower(w, thr);
    return html`
      ${this._pageHeader('🏠', 'House Config')}
      <div class="form-col">
        ${this._entityField('Home consumption  (W ≥ 0)', 'load.entity', l?.entity, {
          invertPath: 'load.invert', invertValue: l?.invert,
          namePath: 'load.name', nameValue: l?.name,
        })}
        ${flows ? html`
          <div class="section-label">Current flows into house</div>
          <div class="flow-stats">
            <div class="flow-stat">
              <span class="flow-stat-label">⚡ Grid → House</span>
              <span class="flow-stat-value">${fmt(flows.gridToHome)}</span>
            </div>
            <div class="flow-stat">
              <span class="flow-stat-label">☀️ Solar → House</span>
              <span class="flow-stat-value">${fmt(flows.solarToHome)}</span>
            </div>
            <div class="flow-stat">
              <span class="flow-stat-label">🔋 Battery → House</span>
              <span class="flow-stat-value">${fmt(flows.batteryToHome)}</span>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

  private _renderPanelsPage() {
    if (!this._config) return html``;
    const panels = this._config.panels ?? DEFAULT_PANELS;
    const meta: Record<string, { icon: string; label: string }> = {
      solar:   { icon: '☀️', label: 'Solar' },
      battery: { icon: '🔋', label: 'Battery' },
      grid:    { icon: '⚡', label: 'Grid' },
      load:    { icon: '🏠', label: 'House' },
    };
    return html`
      ${this._pageHeader('📊', 'Stat Panels')}
      <div class="form-col">
        ${panels.map((p, i) => {
          const m = meta[p.key];
          return html`
            <div class="panel-item">
              <div class="panel-move">
                <button class="move-btn" ?disabled="${i === 0}"
                  @click="${() => this._movePanel(i, -1)}">▲</button>
                <button class="move-btn" ?disabled="${i === panels.length - 1}"
                  @click="${() => this._movePanel(i, 1)}">▼</button>
              </div>
              <span style="font-size:1.1rem;">${m.icon}</span>
              <span class="panel-label">${m.label}</span>
              <ha-selector
                .selector=${{ boolean: {} }}
                .value="${p.enabled}"
                @value-changed="${(e: CustomEvent) => this._togglePanel(i, e.detail.value)}"
              ></ha-selector>
            </div>
          `;
        })}
        <p class="hint">Toggle panels on/off and reorder with ▲▼ arrows.</p>
      </div>
    `;
  }

  // ── Panels helpers ───────────────────────────────────────────────────────────

  private _setPanels(panels: PanelConfig[]): void {
    if (!this._config) return;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, panels } },
    }));
  }

  private _togglePanel(index: number, value: boolean): void {
    const panels = [...(this._config?.panels ?? DEFAULT_PANELS)];
    panels[index] = { ...panels[index], enabled: value };
    this._setPanels(panels);
  }

  private _movePanel(index: number, dir: -1 | 1): void {
    const panels = [...(this._config?.panels ?? DEFAULT_PANELS)];
    const newIdx = index + dir;
    if (newIdx < 0 || newIdx >= panels.length) return;
    [panels[index], panels[newIdx]] = [panels[newIdx], panels[index]];
    this._setPanels(panels);
  }

  // ── Device form helpers ──────────────────────────────────────────────────────

  private _startEdit(index: number): void {
    const d = this._config!.devices![index];
    this._editingDevice = {
      entity: d.entity, name: d.name ?? '', icon: d.icon ?? '',
      color: d.color ?? '#6366f1', show_on_diagram: d.show_on_diagram ?? false,
    };
    this._editingIndex = index;
  }

  private _saveEdit(): void {
    if (this._editingIndex === null || !this._config) return;
    const devices = [...(this._config.devices ?? [])];
    devices[this._editingIndex] = { ...this._editingDevice };
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: { ...this._config, devices } },
    }));
    this._editingIndex = null;
  }

  private _cancelEdit(): void { this._editingIndex = null; }

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
    this._newDevice = { entity: '', name: '', icon: 'mdi:power-socket', color: '#6366f1', show_on_diagram: false };
  }

  private _deviceForm(
    vals: typeof this._newDevice,
    onChange: (patch: Partial<typeof this._newDevice>) => void,
    submitLabel: string,
    onSubmit: () => void,
    onCancel?: () => void,
  ) {
    return html`
      <ha-selector .hass="${this.hass}" .label="Entity"
        .selector=${{ entity: {} }} .value="${vals.entity}"
        @value-changed="${(e: CustomEvent) => onChange({ entity: e.detail.value ?? '' })}"
      ></ha-selector>

      <div class="add-device-row">
        <ha-selector .label="Name" .selector=${{ text: {} }} .value="${vals.name}"
          @value-changed="${(e: CustomEvent) => onChange({ name: e.detail.value ?? '' })}"
        ></ha-selector>
        <ha-selector .label="Icon" .selector=${{ icon: {} }} .value="${vals.icon}"
          @value-changed="${(e: CustomEvent) => onChange({ icon: e.detail.value ?? '' })}"
        ></ha-selector>
      </div>

      <div class="color-row">
        <label>Colour</label>
        <input type="color" .value="${vals.color}"
          @input="${(e: Event) => onChange({ color: (e.target as HTMLInputElement).value })}"
        />
      </div>

      <div class="bool-row">
        <span class="bool-label">Show on flow diagram</span>
        <ha-selector
          .selector=${{ boolean: {} }} .value="${vals.show_on_diagram}"
          @value-changed="${(e: CustomEvent) => onChange({ show_on_diagram: e.detail.value })}"
        ></ha-selector>
      </div>

      <div style="display:flex;gap:8px;justify-content:flex-end;">
        ${onCancel ? html`<button class="add-btn" style="background:rgba(255,255,255,0.1);color:var(--primary-text-color);" @click="${onCancel}">Cancel</button>` : ''}
        <button class="add-btn" ?disabled="${!vals.entity}" @click="${onSubmit}">${submitLabel}</button>
      </div>
    `;
  }

  private _renderOutletsPage() {
    const devices = this._config?.devices ?? [];
    return html`
      ${this._pageHeader('🔌', 'Outlets / Devices')}

      ${devices.length > 0 ? html`
        <div class="device-list">
          ${devices.map((d, i) => html`
            <div>
              <div class="device-item">
                <div class="device-item-color" style="background:${d.color ?? '#6366f1'}"></div>
                <div style="flex:1;min-width:0;">
                  <div class="device-item-name">
                    ${d.name ?? d.entity}
                    ${d.show_on_diagram ? html`<span class="diagram-badge">diagram</span>` : ''}
                  </div>
                  <div class="device-item-entity">${d.entity}</div>
                </div>
                <div class="device-actions">
                  <button class="device-btn"
                    @click="${() => this._editingIndex === i ? this._cancelEdit() : this._startEdit(i)}">
                    ${this._editingIndex === i ? 'Cancel' : 'Edit'}
                  </button>
                  <button class="device-btn danger" @click="${() => this._deleteDevice(i)}">✕</button>
                </div>
              </div>
              ${this._editingIndex === i ? html`
                <div class="device-edit-form">
                  ${this._deviceForm(
                    this._editingDevice,
                    (patch) => { this._editingDevice = { ...this._editingDevice, ...patch }; this.requestUpdate(); },
                    'Save',
                    () => this._saveEdit(),
                    () => this._cancelEdit(),
                  )}
                </div>
              ` : ''}
            </div>
          `)}
        </div>
      ` : html`<p class="hint">No devices added yet.</p>`}

      <div class="add-device-form">
        <div class="section-label" style="margin-top:0;">Add device</div>
        ${this._deviceForm(
          this._newDevice,
          (patch) => { this._newDevice = { ...this._newDevice, ...patch }; this.requestUpdate(); },
          'Add Device',
          () => this._addDevice(),
        )}
      </div>
    `;
  }

  protected render() {
    if (!this._config) return html``;
    switch (this._page) {
      case 'setup':   return this._renderSetupPage();
      case 'solar':   return this._renderSolarPage();
      case 'battery': return this._renderBatteryPage();
      case 'grid':    return this._renderGridPage();
      case 'house':   return this._renderHousePage();
      case 'panels':  return this._renderPanelsPage();
      case 'outlets': return this._renderOutletsPage();
      default:        return this._renderMain();
    }
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
