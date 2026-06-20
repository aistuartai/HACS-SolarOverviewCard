import { FlowData } from './types';

export function formatPower(watts: number, threshold: number): string {
  const abs = Math.abs(watts);
  if (abs >= threshold) return `${(watts / 1000).toFixed(1)} kW`;
  return `${Math.round(watts)} W`;
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
