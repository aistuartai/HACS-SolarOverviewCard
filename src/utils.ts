import { FlowData } from './types';

export function formatPower(watts: number, threshold: number): string {
  const abs = Math.abs(watts);
  if (abs >= threshold) {
    return `${(watts / 1000).toFixed(1)} kW`;
  }
  return `${Math.round(watts)} W`;
}

export function parseFloat_safe(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  const n = typeof val === 'number' ? val : parseFloat(val);
  return isNaN(n) ? 0 : n;
}

/**
 * Derive power flows from sensor readings.
 *
 * Sign conventions (default):
 *   solar   — always positive
 *   battery — positive = charging, negative = discharging
 *   grid    — positive = importing, negative = exporting
 *   load    — always positive
 *
 * @param solarExportWatts   Explicit solar→grid export sensor (positive). When
 *   provided, overrides deriving export from grid sign.
 * @param gridToBatteryWatts Explicit grid→battery sensor (positive).
 */
export function calculateFlows(
  solar: number,
  battery: number,
  grid: number,
  load: number,
  solarExportWatts?: number,
  gridToBatteryWatts?: number,
): FlowData {
  const solarToHome = solar > 0 ? Math.min(solar, load) : 0;

  const solarToBattery =
    battery > 0 && solar > 0 ? Math.min(battery, solar) : 0;

  const solarToGrid =
    solarExportWatts !== undefined
      ? Math.max(0, solarExportWatts)
      : grid < 0 ? Math.abs(grid) : 0;

  const gridToHome = grid > 0 ? grid : 0;

  const batteryToHome = battery < 0 ? Math.abs(battery) : 0;

  const gridToBattery =
    gridToBatteryWatts !== undefined
      ? Math.max(0, gridToBatteryWatts)
      : 0;

  return {
    solarToHome,
    solarToBattery,
    solarToGrid,
    gridToHome,
    batteryToHome,
    gridToBattery,
  };
}

export function getStateLabel(entity: string, value: number): string {
  const lower = entity.toLowerCase();

  if (lower.includes('solar') || lower.includes('pv')) {
    return value > 0 ? 'Generating' : 'Idle';
  }
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
  if (lower.includes('load') || lower.includes('home') || lower.includes('consumption')) {
    return value > 0 ? 'Consuming' : 'Idle';
  }
  return value > 0 ? 'Active' : 'Idle';
}

export function clampOpacity(watts: number, max: number): number {
  if (max <= 0) return 1;
  const ratio = Math.abs(watts) / max;
  return Math.min(1, Math.max(0.2, ratio));
}
