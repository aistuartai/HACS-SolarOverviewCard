/**
 * Configuration for a single Home Assistant entity reference.
 */
export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
}

/**
 * Battery entity config — includes an optional state-of-charge entity.
 */
export interface BatteryConfig extends EntityConfig {
  soc_entity?: string;
}

/**
 * Device entity config (no additions beyond EntityConfig for now).
 */
export interface DeviceConfig extends EntityConfig {}

/**
 * Top-level card configuration as set by the user in Lovelace YAML.
 */
export interface SolarCardConfig {
  solar: EntityConfig;
  battery: BatteryConfig;
  grid: EntityConfig;
  load: EntityConfig;
  devices?: DeviceConfig[];
  /** Threshold in watts above which values display as kW. Default: 1000 */
  watt_threshold?: number;
  /** Whether to render sparkline history graphs. Default: true */
  show_sparklines?: boolean;
  theme?: 'auto' | 'light' | 'dark';
}

/**
 * Minimal Home Assistant interface used by the card.
 */
export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callApi: (method: string, path: string) => Promise<unknown>;
}

/**
 * A single Home Assistant entity state object.
 */
export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

/**
 * Calculated power-flow values between the four nodes (watts).
 * Positive values indicate active flow.
 */
export interface FlowData {
  /** Solar energy flowing directly to home loads */
  solarToHome: number;
  /** Solar energy flowing into the battery (charging) */
  solarToBattery: number;
  /** Solar energy being exported to the grid */
  solarToGrid: number;
  /** Grid energy being imported for home loads */
  gridToHome: number;
  /** Battery energy discharging to home loads */
  batteryToHome: number;
}

/**
 * A single data-point for sparkline history charts.
 */
export interface SparklinePoint {
  /** Unix timestamp (ms) */
  time: number;
  /** Power value in watts */
  value: number;
}
