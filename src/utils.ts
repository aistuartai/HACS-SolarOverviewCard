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

  // ── Grid → Home ──────────────────────────────────────────────────────────
  const gridToHome =
    p.gridImport !== undefined
      ? Math.max(0, p.gridImport)
      : gridCombined > 0 ? gridCombined : 0;

  // ── Solar → Grid (export) ─────────────────────────────────────────────────
  // Only when solar is generating
  const solarToGrid = solar > 0
    ? (p.gridExport !== undefined
        ? Math.max(0, p.gridExport)
        : gridCombined < 0 ? Math.abs(gridCombined) : 0)
    : 0;

  // ── Solar → Home ──────────────────────────────────────────────────────────
  const solarToHome = solar > 0 ? Math.min(solar, load) : 0;

  // ── Solar → Battery ───────────────────────────────────────────────────────
  const solarToBattery = battery > 0 && solar > 0 ? Math.min(battery, solar) : 0;

  // ── Battery → Home ────────────────────────────────────────────────────────
  const batteryToHome = battery < 0 ? Math.abs(battery) : 0;

  // ── Grid → Battery ────────────────────────────────────────────────────────
  const gridToBattery =
    p.gridToBattery !== undefined
      ? Math.max(0, p.gridToBattery)
      : p.gridBatteryCombined !== undefined && p.gridBatteryCombined > 0
        ? p.gridBatteryCombined
        : 0;

  // ── Battery → Grid ────────────────────────────────────────────────────────
  const batteryToGrid =
    p.batteryToGrid !== undefined
      ? Math.max(0, p.batteryToGrid)
      : p.gridBatteryCombined !== undefined && p.gridBatteryCombined < 0
        ? Math.abs(p.gridBatteryCombined)
        : 0;

  return { solarToHome, solarToBattery, solarToGrid, gridToHome, batteryToHome, gridToBattery, batteryToGrid };
}

export function getStateLabel(entity: string, value: number): string {
  const lower = entity.toLowerCase();
  if (lower.includes('solar') || lower.includes('pv'))
    return value > 0 ? 'Generating' : 'Idle';
  if (lower.includes('battery') || lower.includes('batt')) {
    if (value > 0) return 'Charging';
    if (value < 0) return 'Discharging';
    return 'Idle';
  }
  if (lower.includes('grid')) {
    if (value > 0) return 'Importing';
    if (value < 0) return 'Exporting';
    return 'Idle';
  }
  if (lower.includes('load') || lower.includes('home') || lower.includes('consumption'))
    return value > 0 ? 'Consuming' : 'Idle';
  return value > 0 ? 'Active' : 'Idle';
}

export function clampOpacity(watts: number, max: number): number {
  if (max <= 0) return 1;
  return Math.min(1, Math.max(0.2, Math.abs(watts) / max));
}
