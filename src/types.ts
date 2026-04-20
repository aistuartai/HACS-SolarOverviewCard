export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  invert?: boolean;
}

export interface SolarEntityConfig extends EntityConfig {
  /** Explicit Solar → Grid export sensor (W ≥ 0). Overrides deriving from grid sign. */
  export_entity?: string;
}

export interface BatteryConfig extends EntityConfig {
  soc_entity?: string;
  /** @deprecated Use grid.to_battery_entity instead. */
  grid_charge_entity?: string;
}

/**
 * Grid config supports a combined fallback entity plus up to four specific
 * flow sensors. Any specific sensor takes priority over the combined entity
 * for its respective flow.
 *
 * Priority for each flow:
 *   Grid → Home      : import_entity  >  entity (when positive)
 *   Any  → Grid      : export_entity  >  solar.export_entity  >  entity (when negative, solar > 0)
 *   Grid → Battery   : to_battery_entity  >  battery_entity (when positive)
 *   Battery → Grid   : from_battery_entity  >  battery_entity (when negative)
 */
export interface GridConfig {
  /** Combined fallback: positive = importing, negative = exporting. */
  entity?: string;
  name?: string;
  icon?: string;
  invert?: boolean;
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
  key: 'solar' | 'battery' | 'grid' | 'load';
  enabled: boolean;
}

export interface SolarCardConfig {
  solar: SolarEntityConfig;
  battery: BatteryConfig;
  grid: GridConfig;
  load: EntityConfig;
  devices?: DeviceConfig[];
  panels?: PanelConfig[];
  watt_threshold?: number;
  show_sparklines?: boolean;
  sparkline_hours?: number;
  theme?: 'auto' | 'light' | 'dark';
  show_flow?: boolean;
  show_stats?: boolean;
  show_devices?: boolean;
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
