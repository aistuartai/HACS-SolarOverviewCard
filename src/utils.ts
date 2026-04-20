import { FlowData } from './types';

/**
 * Format a power value in watts, switching to kW when the absolute value
 * meets or exceeds the supplied threshold.
 *
 * @param watts     Raw value in watts (can be negative).
 * @param threshold Watts threshold above which kW formatting is used.
 */
export function formatPower(watts: number, threshold: number): string {
  const abs = Math.abs(watts);
  if (abs >= threshold) {
    return `${(watts / 1000).toFixed(1)} kW`;
  }
  return `${Math.round(watts)} W`;
}

/**
 * Safely parse a numeric value that may arrive as a string from HA.
 * Returns 0 on NaN / null / undefined.
 */
export function parseFloat_safe(val: string | number | null | undefined): number {
  if (val === null || val === undefined) return 0;
  const n = typeof val === 'number' ? val : parseFloat(val);
  return isNaN(n) ? 0 : n;
}

/**
 * Derive the five directional power flows from the four raw sensor readings.
 *
 * Sign conventions (as typically reported by inverters / smart meters):
 *   solar   — always positive (generation)
 *   battery — positive = charging, negative = discharging
 *   grid    — positive = importing, negative = exporting
 *   load    — always positive (consumption)
 *
 * @returns FlowData with each flow in watts (all values ≥ 0).
 */
export function calculateFlows(
  solar: number,
  battery: number,
  grid: number,
  load: number,
): FlowData {
  const solarToHome =
    solar > 0 ? Math.min(solar, load) : 0;

  const solarToBattery =
    battery > 0 && solar > 0 ? Math.min(battery, solar) : 0;

  const solarToGrid =
    grid < 0 ? Math.abs(grid) : 0;

  const gridToHome =
    grid > 0 ? grid : 0;

  const batteryToHome =
    battery < 0 ? Math.abs(battery) : 0;

  return {
    solarToHome,
    solarToBattery,
    solarToGrid,
    gridToHome,
    batteryToHome,
  };
}

/**
 * Human-readable state label derived from entity type and the sign of the
 * current power value.
 */
export function getStateLabel(entity: string, value: number): string {
  const lower = entity.toLowerCase();

  if (lower.includes('solar') || lower.includes('pv')) {
    if (value > 0) return 'Generating';
    return 'Idle';
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
    if (value > 0) return 'Consuming';
    return 'Idle';
  }

  return value > 0 ? 'Active' : 'Idle';
}

/**
 * Convert an absolute power value to an opacity between 0.2 (zero / low)
 * and 1.0 (at or above max).
 *
 * @param watts Current power (absolute value used).
 * @param max   Power level that maps to full opacity.
 */
export function clampOpacity(watts: number, max: number): number {
  if (max <= 0) return 1;
  const ratio = Math.abs(watts) / max;
  return Math.min(1, Math.max(0.2, ratio));
}
