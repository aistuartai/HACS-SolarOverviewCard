export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  /** @deprecated Use positive_means instead. */
  invert?: boolean;
}

export interface OptionalEntityConfig {
  entity?: string;
  name?: string;
  icon?: string;
  /** @deprecated Use positive_means instead. */
  invert?: boolean;
  color?: string;
  /** Secondary entity shown as a second line on the Home diagram node. */
  secondary_entity?: string;
}

export interface SolarEntityConfig extends EntityConfig {
  color?: string;
  /** Explicit Solar → Grid export sensor (W ≥ 0). Overrides deriving from grid sign. */
  export_entity?: string;
  /** Secondary entity shown as a second line on the Solar diagram node. */
  secondary_entity?: string;
}

export interface BatteryConfig extends EntityConfig {
  /**
   * Declares what a positive sensor value means.
   * 'charging' (default): positive = battery charging, negative = discharging.
   * 'discharging': positive = battery discharging, negative = charging.
   * Replaces the invert flag with an explicit semantic declaration.
   */
  positive_means?: 'charging' | 'discharging';
  soc_entity?: string;
  /** Optional text-state entity (e.g. "Charging" / "Discharging" / "Idle") used for the state label. */
  status_entity?: string;
  color?: string;
  /** Secondary entity shown as a second line on the Battery diagram node. */
  secondary_entity?: string;
  /** @deprecated Use grid.to_battery_entity instead. */
  grid_charge_entity?: string;
}

/**
 * Grid config supports a combined fallback entity plus up to four specific
 * flow sensors. Any specific sensor takes priority over the combined entity
 * for its respective flow.
 *
 * Priority for each flow:
 *   Grid → Home      : import_entity  >  entity (when positive, after subtracting gridToBattery)
 *   Any  → Grid      : export_entity  >  solar.export_entity  >  entity (when negative, solar > 0)
 *   Grid → Battery   : to_battery_entity  >  battery_entity (when positive)
 *                      or auto-derived from battery charging exceeding solar output
 *   Battery → Grid   : from_battery_entity  >  battery_entity (when negative)
 */
export interface GridConfig {
  /** Combined fallback: positive = importing, negative = exporting. */
  entity?: string;
  name?: string;
  icon?: string;
  /**
   * Declares what a positive sensor value means.
   * 'importing' (default): positive = grid import, negative = export.
   * 'exporting': positive = grid export, negative = import.
   * Replaces the invert flag with an explicit semantic declaration.
   */
  positive_means?: 'importing' | 'exporting';
  /** @deprecated Use positive_means instead. */
  invert?: boolean;
  color?: string;
  /** Secondary entity shown as a second line on the Grid diagram node. */
  secondary_entity?: string;
  /** Grid → Home import sensor (W ≥ 0). */
  import_entity?: string;
  /** Solar / Battery → Grid export sensor (W ≥ 0). */
  export_entity?: string;
  /** Grid ↔ Battery combined sensor: positive = grid charging battery, negative = battery discharging to grid. */
  battery_entity?: string;
  /** Grid → Battery only sensor (W ≥ 0). Overrides battery_entity positive side. */
  to_battery_entity?: string;
  /** Battery → Grid only sensor (W ≥ 0). Overrides battery_entity negative side. */
  from_battery_entity?: string;
}

export interface DeviceConfig extends EntityConfig {
  color?: string;
  show_on_diagram?: boolean;
}

export interface PanelConfig {
  key?: 'solar' | 'battery' | 'grid' | 'load';  // built-in panel
  entity?: string;   // custom panel entity
  name?: string;
  color?: string;
  enabled: boolean;
}

export interface SolarCardConfig {
  solar: SolarEntityConfig;
  battery: BatteryConfig;
  grid: GridConfig;
  load: OptionalEntityConfig;
  devices?: DeviceConfig[];
  panels?: PanelConfig[];
  watt_threshold?: number;
  show_sparklines?: boolean;
  sparkline_hours?: number;
  theme?: 'auto' | 'light' | 'dark';
  show_flow?: boolean;
  show_stats?: boolean;
  show_devices?: boolean;
  flow_background?: string;
  diagram_text_color?: string;
  node_style?: 'circle' | 'card';
  node_icon_size?: number;
  show_flow_lines?: boolean;
  node_positions?: {
    solar?:   { x: number; y: number };
    grid?:    { x: number; y: number };
    home?:    { x: number; y: number };
    battery?: { x: number; y: number };
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callApi: (method: string, path: string) => Promise<unknown>;
}

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface FlowData {
  solarToHome: number;
  solarToBattery: number;
  solarToGrid: number;
  gridToHome: number;
  batteryToHome: number;
  gridToBattery: number;
  batteryToGrid: number;
}

export interface SparklinePoint {
  time: number;
  value: number;
}
