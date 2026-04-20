/**
 * solar-overview-card — Home Assistant Lovelace card
 * Animated solar energy overview with power flow diagram.
 *
 * @license MIT
 */

import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { cardStyles } from './styles';
import { FlowData, SolarCardConfig, HomeAssistant, SparklinePoint } from './types';
import { formatPower, parseFloat_safe, calculateFlows, getStateLabel } from './utils';

// Register sub-components (side-effect imports)
import './components/flow-diagram';
import './components/stat-panel';
import './components/device-row';

// ─── MDI icon paths used in the stat grid ───────────────────────────────────

const MDI_SOLAR =
  'M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z';

const MDI_BATTERY =
  'M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';

const MDI_GRID =
  'M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z';

const MDI_HOME =
  'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z';

// ─── Sparkline history interface (HA history API response shape) ─────────────

interface HassHistoryEntry {
  last_updated: string;
  state: string;
}

// ─── Main card ───────────────────────────────────────────────────────────────

@customElement('solar-overview-card')
export class SolarOverviewCard extends LitElement {

  // ── Public HA interface ──────────────────────────────────────────────────

  // NOTE: We use a manual getter/setter instead of @property so we can react
  // to each hass update and recalculate flows without triggering a full render
  // cycle for every HA state change that doesn't affect our entities.
  private _hass?: HomeAssistant;

  public get hass(): HomeAssistant {
    return this._hass!;
  }

  // ── Internal reactive state ──────────────────────────────────────────────

  @state() private _config?: SolarCardConfig;
  @state() private _solar = 0;
  @state() private _battery = 0;
  @state() private _grid = 0;
  @state() private _load = 0;
  @state() private _soc = 0;
  @state() private _flows: FlowData = {
    solarToHome: 0,
    solarToBattery: 0,
    solarToGrid: 0,
    gridToHome: 0,
    batteryToHome: 0,
  };

  @state() private _sparklines: Record<string, SparklinePoint[]> = {};
  @state() private _error: string | null = null;

  private _lastSparklineFetch = 0;
  private _sparklineDebounceMs = 5 * 60 * 1000; // 5 minutes

  // ── Static card helpers ──────────────────────────────────────────────────

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

  // ── Config lifecycle ─────────────────────────────────────────────────────

  public setConfig(config: SolarCardConfig): void {
    if (!config.solar?.entity)   throw new Error('solar-overview-card: "solar.entity" is required');
    if (!config.battery?.entity) throw new Error('solar-overview-card: "battery.entity" is required');
    if (!config.grid?.entity)    throw new Error('solar-overview-card: "grid.entity" is required');
    if (!config.load?.entity)    throw new Error('solar-overview-card: "load.entity" is required');

    this._config = {
      watt_threshold: 1000,
      show_sparklines: true,
      theme: 'auto',
      ...config,
    };
    this._error = null;
  }

  public getCardSize(): number {
    return 4;
  }

  // ── HA state updates ─────────────────────────────────────────────────────

  public set hass(hass: HomeAssistant) {
    this._hass = hass;

    if (!this._config) return;

    try {
      this._solar   = this._readEntity(this._config.solar.entity);
      this._battery = this._readEntity(this._config.battery.entity);
      this._grid    = this._readEntity(this._config.grid.entity);
      this._load    = this._readEntity(this._config.load.entity);

      if (this._config.battery.soc_entity) {
        this._soc = this._readEntity(this._config.battery.soc_entity);
      }

      this._flows = calculateFlows(
        this._solar,
        this._battery,
        this._grid,
        this._load,
      );

      // Debounced sparkline fetch
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

  // ── Sparkline fetching ───────────────────────────────────────────────────

  private async _fetchSparklines(): Promise<void> {
    if (!this._config || !this._hass?.callApi) return;

    const entities = [
      this._config.solar.entity,
      this._config.battery.entity,
      this._config.grid.entity,
      this._config.load.entity,
    ];

    const end = new Date();
    const start = new Date(end.getTime() - 2 * 60 * 60 * 1000); // last 2 h
    const startIso = start.toISOString();

    const results: Record<string, SparklinePoint[]> = {};

    await Promise.allSettled(
      entities.map(async (entityId) => {
        try {
          const path =
            `history/period/${startIso}?filter_entity_id=${entityId}&minimal_response=true&no_attributes=true`;

          const raw = await this._hass!.callApi('GET', path) as HassHistoryEntry[][];

          if (!Array.isArray(raw) || raw.length === 0) return;

          const series = raw[0];
          results[entityId] = series
            .map((entry): SparklinePoint | null => {
              const v = parseFloat_safe(entry.state);
              if (isNaN(v)) return null;
              return {
                time: new Date(entry.last_updated).getTime(),
                value: v,
              };
            })
            .filter((p): p is SparklinePoint => p !== null);
        } catch {
          // Silently ignore per-entity failures
        }
      }),
    );

    this._sparklines = { ...this._sparklines, ...results };
  }

  // ── Rendering helpers ────────────────────────────────────────────────────

  private _threshold(): number {
    return this._config?.watt_threshold ?? 1000;
  }

  private _deviceItems() {
    if (!this._config?.devices || !this._hass?.states) return [];
    return this._config.devices.map((d) => ({
      entityId: d.entity,
      name: d.name ?? d.entity,
      icon: d.icon ?? 'M7,2V13H10V22L17,10H13L17,2H7Z',
      watts: this._readEntity(d.entity),
    }));
  }

  private _statPanelProps(
    key: 'solar' | 'battery' | 'grid' | 'load',
    watts: number,
    label: string,
    icon: string,
    color: string,
    entityId: string,
  ) {
    const thr = this._threshold();
    return {
      entityId,
      name: this._config?.[key === 'load' ? 'load' : key]?.name ?? label,
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

  // ── Styles ───────────────────────────────────────────────────────────────

  static styles = [
    cardStyles,
    css`
      :host {
        display: block;
      }
      ha-card {
        overflow: hidden;
      }
    `,
  ];

  // ── Template ─────────────────────────────────────────────────────────────

  protected render() {
    if (!this._config) {
      return html`
        <ha-card>
          <div class="error-card">
            solar-overview-card: No configuration found.
          </div>
        </ha-card>
      `;
    }

    if (this._error) {
      return html`
        <ha-card>
          <div class="error-card">solar-overview-card error: ${this._error}</div>
        </ha-card>
      `;
    }

    const thr = this._threshold();
    const devices = this._deviceItems();
    const solar   = this._statPanelProps('solar',   this._solar,   'Solar',   MDI_SOLAR,   '#f59e0b', this._config.solar.entity);
    const battery = this._statPanelProps('battery', this._battery, 'Battery', MDI_BATTERY, '#10b981', this._config.battery.entity);
    const grid    = this._statPanelProps('grid',    this._grid,    'Grid',    MDI_GRID,    '#8b5cf6', this._config.grid.entity);
    const load    = this._statPanelProps('load',    this._load,    'Home',    MDI_HOME,    '#3b82f6', this._config.load.entity);

    return html`
      <ha-card>
        <div class="card" theme="${this._config.theme ?? 'auto'}">

          <!-- Flow diagram -->
          <div class="flow-diagram">
            <flow-diagram
              .solar="${this._solar}"
              .battery="${this._battery}"
              .grid="${this._grid}"
              .load="${this._load}"
              .socPercent="${this._soc}"
              .wattThreshold="${thr}"
              .flows="${this._flows}"
            ></flow-diagram>
          </div>

          <!-- 2×2 stat grid -->
          <div class="stat-grid">
            <stat-panel
              .entityId="${solar.entityId}"
              .name="${solar.name}"
              .icon="${solar.icon}"
              .value="${solar.value}"
              .displayValue="${solar.displayValue}"
              .stateLabel="${solar.stateLabel}"
              .stateColor="${solar.stateColor}"
              .showSparkline="${solar.showSparkline}"
              .sparklineHistory="${solar.sparklineHistory}"
              .panelClass="${solar.panelClass}"
              .badgeClass="${solar.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${battery.entityId}"
              .name="${battery.name}"
              .icon="${battery.icon}"
              .value="${battery.value}"
              .displayValue="${battery.displayValue}"
              .stateLabel="${battery.stateLabel}"
              .stateColor="${battery.stateColor}"
              .showSparkline="${battery.showSparkline}"
              .sparklineHistory="${battery.sparklineHistory}"
              .panelClass="${battery.panelClass}"
              .badgeClass="${battery.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${grid.entityId}"
              .name="${grid.name}"
              .icon="${grid.icon}"
              .value="${grid.value}"
              .displayValue="${grid.displayValue}"
              .stateLabel="${grid.stateLabel}"
              .stateColor="${grid.stateColor}"
              .showSparkline="${grid.showSparkline}"
              .sparklineHistory="${grid.sparklineHistory}"
              .panelClass="${grid.panelClass}"
              .badgeClass="${grid.badgeClass}"
            ></stat-panel>

            <stat-panel
              .entityId="${load.entityId}"
              .name="${load.name}"
              .icon="${load.icon}"
              .value="${load.value}"
              .displayValue="${load.displayValue}"
              .stateLabel="${load.stateLabel}"
              .stateColor="${load.stateColor}"
              .showSparkline="${load.showSparkline}"
              .sparklineHistory="${load.sparklineHistory}"
              .panelClass="${load.panelClass}"
              .badgeClass="${load.badgeClass}"
            ></stat-panel>
          </div>

          <!-- Devices row -->
          ${this._config.devices && this._config.devices.length > 0
            ? html`
                <div class="devices-section">
                  <div class="devices-label">Devices</div>
                  <device-row
                    .devices="${devices}"
                    .wattThreshold="${thr}"
                  ></device-row>
                </div>
              `
            : ''}
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


  static styles = css`
    :host { display: block; padding: 16px; }
    .row {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .section-title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--secondary-text-color, #9ca3af);
      margin: 8px 0 4px;
    }
    .hint {
      font-size: 0.75rem;
      color: var(--secondary-text-color, #9ca3af);
      margin-top: 4px;
    }
  `;

  public setConfig(config: SolarCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const target = ev.target as HTMLElement & { configValue?: string; value?: string };
    if (!target.configValue) return;

    const parts = target.configValue.split('.');
    const updated: SolarCardConfig = JSON.parse(JSON.stringify(this._config));

    // Supports two-level paths like "solar.entity"
    const updatedAny = updated as unknown as Record<string, unknown>;
    if (parts.length === 2) {
      const [section, field] = parts;
      const current = ((updatedAny[section] as Record<string, unknown>) ?? {});
      current[field] = target.value ?? '';
      updatedAny[section] = current;
    } else {
      updatedAny[parts[0]] = target.value ?? '';
    }

    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config: updated } }),
    );
  }

  private _entityPicker(
    label: string,
    configValue: string,
    currentValue: string,
  ) {
    return html`
      <ha-entity-picker
        .hass="${this.hass}"
        .label="${label}"
        .value="${currentValue}"
        .configValue="${configValue}"
        allow-custom-entity
        @value-changed="${this._valueChanged}"
      ></ha-entity-picker>
    `;
  }

  protected render() {
    if (!this._config) return html``;

    return html`
      <div class="row">
        <div class="section-title">Required entities</div>

        ${this._entityPicker(
          'Solar power entity',
          'solar.entity',
          this._config.solar?.entity ?? '',
        )}

        ${this._entityPicker(
          'Battery power entity',
          'battery.entity',
          this._config.battery?.entity ?? '',
        )}

        ${this._entityPicker(
          'Battery state of charge entity',
          'battery.soc_entity',
          this._config.battery?.soc_entity ?? '',
        )}

        ${this._entityPicker(
          'Grid power entity',
          'grid.entity',
          this._config.grid?.entity ?? '',
        )}

        ${this._entityPicker(
          'Home load / consumption entity',
          'load.entity',
          this._config.load?.entity ?? '',
        )}

        <div class="section-title">Display options</div>

        <ha-select
          label="Theme"
          .value="${this._config.theme ?? 'auto'}"
          .configValue="theme"
          @selected="${this._valueChanged}"
          @closed="${(e: Event) => e.stopPropagation()}"
        >
          <mwc-list-item value="auto">Auto (follows HA theme)</mwc-list-item>
          <mwc-list-item value="light">Light</mwc-list-item>
          <mwc-list-item value="dark">Dark</mwc-list-item>
        </ha-select>

        <ha-formfield label="Show sparkline history charts">
          <ha-switch
            .checked="${this._config.show_sparklines !== false}"
            .configValue="show_sparklines"
            @change="${(e: Event) => {
              const sw = e.target as HTMLElement & { checked?: boolean; configValue?: string };
              if (!this._config) return;
              const updated = { ...this._config, show_sparklines: sw.checked };
              this.dispatchEvent(
                new CustomEvent('config-changed', { detail: { config: updated } }),
              );
            }}"
          ></ha-switch>
        </ha-formfield>

        <p class="hint">
          Sign convention: solar ≥ 0, battery positive = charging / negative = discharging,
          grid positive = importing / negative = exporting, load ≥ 0.
        </p>
      </div>
    `;
  }
}

// ─── Card registration ───────────────────────────────────────────────────────

declare global {
  interface Window {
    customCards?: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
    }>;
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
