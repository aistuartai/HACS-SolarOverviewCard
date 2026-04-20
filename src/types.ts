export interface EntityConfig {
  entity: string;
  name?: string;
  icon?: string;
  /** If true, flip the sign of the entity value (positive ↔ negative). */
  invert?: boolean;
}

export interface SolarEntityConfig extends EntityConfig {
  /** Explicit sensor for solar→grid export (always positive watts). */
  export_entity?: string;
}

export interface BatteryConfig extends EntityConfig {
  soc_entity?: string;
  /** Explicit sensor for grid→battery charging (always positive watts). */
  grid_charge_entity?: string;
}

export interface DeviceConfig extends EntityConfig {
  /** Hex color for the chip icon, e.g. "#f59e0b". */
  color?: string;
  /** If true, render this device as a satellite node on the flow diagram. */
  show_on_diagram?: boolean;
}

export interface SolarCardConfig {
  solar: SolarEntityConfig;
  battery: BatteryConfig;
  grid: EntityConfig;
  load: EntityConfig;
  devices?: DeviceConfig[];
  watt_threshold?: number;
  show_sparklines?: boolean;
  theme?: 'auto' | 'light' | 'dark';
  /** Show/hide the SVG power flow diagram. Default: true */
  show_flow?: boolean;
  /** Show/hide the 2×2 stat panels. Default: true */
  show_stats?: boolean;
  /** Show/hide the devices chip row. Default: true */
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
  /** Grid energy flowing into the battery (charging from grid). */
  gridToBattery: number;
}

export interface SparklinePoint {
  time: number;
  value: number;
}
