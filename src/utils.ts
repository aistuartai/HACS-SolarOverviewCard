import { FlowData, SolarCardConfig } from './types';

export function formatPower(watts: number, threshold: number): string {
  const abs = Math.abs(watts);
  if (abs >= threshold) return `${(watts / 1000).toFixed(1)} kW`;
  return `${Math.round(watts)} W`;
}

/**
 * Converts a sensor reading to watts using its unit_of_measurement.
 * Sensors reporting kW/MW are scaled; anything else (W, %, unitless) passes through.
 */
export function toWatts(val: string | number | null | undefined, unit?: string): number {
  const n = parseFloat_safe(val);
  if (unit === 'kW') return n * 1000;
  if (unit === 'MW') return n * 1_000_000;
  return n;
}

export function parseFloat_safe(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  const n = typeof val === 'number' ? val : parseFloat(val as string);
  return isNaN(n) ? 0 : n;
}

export interface FlowParams {
  solar: number;
  battery: number;
  load: number;
  /** Raw combined grid sensor value (+ = import, − = export). Used as fallback. */
  gridCombined: number;
  /** Grid → Home. Undefined = derive from gridCombined. */
  gridImport?: number;
  /** Any → Grid export. Undefined = derive from gridCombined when solar > 0. */
  gridExport?: number;
  /** Grid → Battery only. */
  gridToBattery?: number;
  /** Battery → Grid only. */
  batteryToGrid?: number;
  /** Grid ↔ Battery combined (+ charge, − discharge to grid). */
  gridBatteryCombined?: number;
}

export function calculateFlows(p: FlowParams): FlowData {
  const { solar, battery, load, gridCombined } = p;

  // ── Solar → Grid (export) ─────────────────────────────────────────────────
  // Only when solar is generating
  const solarToGrid = solar > 0
    ? (p.gridExport !== undefined
        ? Math.max(0, p.gridExport)
        : gridCombined < 0 ? Math.abs(gridCombined) : 0)
    : 0;

  // ── Solar → Battery ───────────────────────────────────────────────────────
  const solarToBattery = battery > 0 && solar > 0 ? Math.min(battery, solar) : 0;

  // ── Grid → Battery ────────────────────────────────────────────────────────
  // Explicit entity takes priority, then combined battery sensor, then auto-derive:
  // any battery charging that solar can't cover must come from the grid.
  const gridToBattery =
    p.gridToBattery !== undefined
      ? Math.max(0, p.gridToBattery)
      : p.gridBatteryCombined !== undefined && p.gridBatteryCombined > 0
        ? p.gridBatteryCombined
        : battery > 0
          ? Math.max(0, battery - solarToBattery)
          : 0;

  // ── Grid → Home ──────────────────────────────────────────────────────────
  // When import_entity is given explicitly, trust it as-is.
  // When deriving from combined grid sensor, subtract grid→battery charging.
  const gridToHome =
    p.gridImport !== undefined
      ? Math.max(0, p.gridImport)
      : gridCombined > 0 ? Math.max(0, gridCombined - gridToBattery) : 0;

  // ── Solar → Home ──────────────────────────────────────────────────────────
  // When load sensor is present use min(solar, load).
  // When absent, derive from energy balance: whatever solar doesn't export or charge.
  const solarToHome = solar > 0
    ? (load > 0
        ? Math.min(solar, load)
        : Math.max(0, solar - solarToGrid - solarToBattery))
    : 0;

  // ── Battery → Home ────────────────────────────────────────────────────────
  const batteryToHome = battery < 0 ? Math.abs(battery) : 0;

  // ── Battery → Grid ────────────────────────────────────────────────────────
  const batteryToGrid =
    p.batteryToGrid !== undefined
      ? Math.max(0, p.batteryToGrid)
      : p.gridBatteryCombined !== undefined && p.gridBatteryCombined < 0
        ? Math.abs(p.gridBatteryCombined)
        : 0;

  return { solarToHome, solarToBattery, solarToGrid, gridToHome, batteryToHome, gridToBattery, batteryToGrid };
}

/**
 * Returns a human-readable state label for a panel.
 * @param role - Semantic role: 'solar' | 'battery' | 'grid' | 'load', or a raw entity ID for custom panels.
 * @param value - Normalised power value (positive = charging/importing/generating).
 */
export function getStateLabel(role: string, value: number): string {
  switch (role) {
    case 'solar':
      return value > 0 ? 'Generating' : 'Idle';
    case 'battery':
      if (value > 0) return 'Charging';
      if (value < 0) return 'Discharging';
      return 'Idle';
    case 'grid':
      if (value > 0) return 'Importing';
      if (value < 0) return 'Exporting';
      return 'Idle';
    case 'load':
      return value > 0 ? 'Consuming' : 'Idle';
    default:
      // Custom panels: fall back to generic active/idle
      return value > 0 ? 'Active' : 'Idle';
  }
}

export function clampOpacity(watts: number, max: number): number {
  if (max <= 0) return 1;
  return Math.min(1, Math.max(0.2, Math.abs(watts) / max));
}

/** Reads an entity and returns its value already normalised to watts. */
export type EntityReader = (entityId: string | undefined) => number;

export interface NormalisedInputs {
  /** Solar generation, ≥ 0 when generating. */
  solar: number;
  /** Battery power, positive = charging. */
  battery: number;
  /** Combined grid power, positive = importing. */
  grid: number;
  /** Home consumption. */
  load: number;
  /** Ready-to-use argument for calculateFlows(). */
  flowParams: FlowParams;
}

/**
 * Applies the sign conventions (positive_means / legacy invert) and resolves
 * every optional grid flow entity.
 *
 * Single source of truth for this logic — the card and the editor preview both
 * call it, so they can never drift apart.
 */
export function normaliseInputs(c: SolarCardConfig, read: EntityReader): NormalisedInputs {
  const g = c.grid;

  // positive_means takes precedence over the legacy invert flag.
  const batteryInvert = c.battery.positive_means === 'discharging' || c.battery.invert === true;
  const gridInvert    = g.positive_means === 'exporting' || g.invert === true;

  const solar   = read(c.solar.entity)   * (c.solar.invert ? -1 : 1);
  const battery = read(c.battery.entity) * (batteryInvert  ? -1 : 1);
  const load    = read(c.load?.entity)   * (c.load?.invert ? -1 : 1);
  const grid    = g.entity ? read(g.entity) * (gridInvert ? -1 : 1) : 0;

  const gridExport = g.export_entity
    ? read(g.export_entity)
    : c.solar.export_entity ? read(c.solar.export_entity) : undefined;

  const gridToBattery = g.to_battery_entity
    ? read(g.to_battery_entity)
    : c.battery.grid_charge_entity ? read(c.battery.grid_charge_entity) : undefined;

  return {
    solar, battery, grid, load,
    flowParams: {
      solar, battery, load,
      gridCombined: grid,
      gridImport: g.import_entity ? read(g.import_entity) : undefined,
      gridExport,
      gridToBattery,
      batteryToGrid: g.from_battery_entity ? read(g.from_battery_entity) : undefined,
      gridBatteryCombined: g.battery_entity ? read(g.battery_entity) : undefined,
    },
  };
}
