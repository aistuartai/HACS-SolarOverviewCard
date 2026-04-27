import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlowData } from '../types';
import { formatPower, clampOpacity } from '../utils';

const ICON_SOLAR =
  'M4,2H20A2,2 0 0,1 22,4V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V4A2,2 0 0,1 4,2M4,4V20H20V4H4M5,5H11V11H5V5M13,5H19V11H13V5M5,13H11V19H5V13M13,13H19V19H13V13Z';
const ICON_BATTERY =
  'M16,20H8V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z';
const ICON_GRID =
  'M11.5,3.5L10.5,6H13.5L12.5,3.5H11.5M10,7L8.5,10H15.5L14,7H10M8,11L5,17H8L9,14H15L16,17H19L16,11H8M8,18L11,21H13L16,18H8Z';
const ICON_HOME =
  'M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z';
const ICON_DEVICE =
  'M7,2V13H10V22L17,10H13L17,2H7Z'; // lightning bolt

// ─── Layout constants ────────────────────────────────────────────────────────

const VB_BASE   = 300;
const CX = VB_BASE / 2;
const CY = VB_BASE / 2;
const ARM = 100;

const SOLAR_X   = CX;           const SOLAR_Y   = CY - ARM;
const GRID_X    = CX - ARM;     const GRID_Y    = CY;
const HOME_X    = CX + ARM;     const HOME_Y    = CY;
const BATTERY_X = CX;           const BATTERY_Y = CY + ARM;

const NODE_R = 32;
const ICON_S = 18;

// Device satellite layout
const DEVICE_ARM  = 82;   // horizontal offset from HOME_X
const DEVICE_R    = 17;
const DEVICE_ICON = 9;
const DEVICE_GAP  = 52;   // vertical gap between device nodes

export interface DiagramDevice {
  name: string;
  watts: number;
  color: string;
}

@customElement('flow-diagram')
export class FlowDiagram extends LitElement {
  @property({ type: Number }) solar = 0;
  @property({ type: Number }) battery = 0;
  @property({ type: Number }) grid = 0;
  @property({ type: Number }) load = 0;
  @property({ type: Number }) socPercent = 0;
  @property({ type: Number }) wattThreshold = 1000;
  @property({ type: String }) solarName = 'Solar';
  @property({ type: String }) gridName = 'Grid';
  @property({ type: String }) homeName = 'Home';
  @property({ type: String }) batteryName = 'Battery';
  @property({ type: String }) solarSecondary = '';
  @property({ type: String }) gridSecondary = '';
  @property({ type: String }) homeSecondary = '';
  @property({ type: String }) batterySecondary = '';
  @property({ type: Object }) flows: FlowData = {
    solarToHome: 0, solarToBattery: 0, solarToGrid: 0,
    gridToHome: 0, batteryToHome: 0, gridToBattery: 0, batteryToGrid: 0,
  };
  @property({ type: Array }) diagramDevices: DiagramDevice[] = [];
  @property({ type: String }) backgroundImage = '';

  static styles = css`
    :host { display: block; }
    @keyframes flow-anim     { to { stroke-dashoffset: -20; } }
    @keyframes flow-anim-rev { to { stroke-dashoffset:  20; } }
    .flow-active     { animation: flow-anim     0.8s linear infinite; }
    .flow-active-rev { animation: flow-anim-rev 0.8s linear infinite; }
  `;

  /** Smooth green→amber→red interpolation based on SOC% */
  private _batteryColor(): string {
    const soc = Math.max(0, Math.min(100, this.socPercent));
    let r: number, g: number, b: number;
    if (soc >= 50) {
      const t = (soc - 50) / 50;
      r = Math.round(16  + t * (245 - 16));
      g = Math.round(185 + t * (158 - 185));
      b = Math.round(129 + t * (11  - 129));
    } else {
      const t = soc / 50;
      r = Math.round(239 + t * (245 - 239));
      g = Math.round(68  + t * (158 - 68));
      b = Math.round(68  + t * (11  - 68));
    }
    return `rgb(${r},${g},${b})`;
  }

  private _lineWidth(watts: number): number {
    return watts <= 0 ? 2 : Math.min(8, Math.max(2, (watts / 1000) * 4 + 2));
  }

  private _trim(ax: number, ay: number, bx: number, by: number, margin = NODE_R + 4) {
    const dx = bx - ax, dy = by - ay;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len === 0) return { x1: ax, y1: ay, x2: bx, y2: by };
    return {
      x1: ax + (dx / len) * margin,
      y1: ay + (dy / len) * margin,
      x2: bx - (dx / len) * margin,
      y2: by - (dy / len) * margin,
    };
  }

  private _flowLine(
    ax: number, ay: number, bx: number, by: number,
    watts: number, stroke: string, reverse = false,
    marginA = NODE_R + 4, marginB = NODE_R + 4,
  ) {
    const active = watts > 1;
    const { x1, y1, x2, y2 } = this._trim(ax, ay, bx, by,
      // Asymmetric trim: use marginA from source, marginB from dest
      // Trick: trim full then adjust — easier to just use uniform trim here
      Math.min(marginA, marginB),
    );
    const sw = this._lineWidth(watts);
    const dashClass = active ? (reverse ? 'flow-active-rev' : 'flow-active') : '';

    return svg`
      <line
        x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="${stroke}"
        stroke-width="${sw}"
        stroke-linecap="round"
        stroke-dasharray="${active ? '8 6' : '4 6'}"
        stroke-dashoffset="0"
        opacity="${active ? clampOpacity(watts, 5000) : 0.13}"
        class="${dashClass}"
      />
    `;
  }

  /** Thin line from Home edge to device edge */
  private _deviceLine(dx: number, dy: number, watts: number, color: string) {
    const active = watts > 5;
    const { x1, y1, x2, y2 } = this._trim(HOME_X, HOME_Y, dx, dy, NODE_R + 3);
    // Re-trim dest side for device radius
    const ddx = x2 - x1, ddy = y2 - y1;
    const dlen = Math.sqrt(ddx * ddx + ddy * ddy);
    const fx2 = dlen > 0 ? x2 - (ddx / dlen) * (DEVICE_R + 3) : x2;
    const fy2 = dlen > 0 ? y2 - (ddy / dlen) * (DEVICE_R + 3) : y2;

    return svg`
      <line
        x1="${x1}" y1="${y1}" x2="${fx2}" y2="${fy2}"
        stroke="${color}"
        stroke-width="${active ? 2 : 1.5}"
        stroke-linecap="round"
        stroke-dasharray="${active ? '6 5' : '3 5'}"
        stroke-dashoffset="0"
        opacity="${active ? 0.85 : 0.2}"
        class="${active ? 'flow-active' : ''}"
      />
    `;
  }

  private _node(
    cx: number, cy: number, iconPath: string, label: string,
    watts: number, fill: string, bgFill: string,
    secondary = '',
  ) {
    return svg`
      <g class="node">
        <circle cx="${cx}" cy="${cy}" r="${NODE_R}"
          fill="${bgFill}" stroke="${fill}" stroke-width="2" />
        <g transform="translate(${cx - ICON_S}, ${cy - ICON_S}) scale(${ICON_S * 2 / 24})">
          <path d="${iconPath}" fill="${fill}" />
        </g>
        <text x="${cx}" y="${cy + NODE_R + 14}" text-anchor="middle"
          font-size="10" font-family="Roboto, sans-serif"
          fill="var(--secondary-text-color, #9ca3af)">${label}</text>
        <text x="${cx}" y="${cy + NODE_R + 26}" text-anchor="middle"
          font-size="11" font-weight="700" font-family="Roboto, sans-serif"
          fill="var(--primary-text-color, #e5e7eb)">${formatPower(watts, this.wattThreshold)}</text>
        ${secondary ? svg`
          <text x="${cx}" y="${cy + NODE_R + 38}" text-anchor="middle"
            font-size="9" font-family="Roboto, sans-serif"
            fill="var(--secondary-text-color, #9ca3af)">${secondary}</text>
        ` : ''}
      </g>
    `;
  }

  private _deviceNode(cx: number, cy: number, d: DiagramDevice) {
    const color = d.color || '#6366f1';
    const bg = color.startsWith('rgb')
      ? color.replace('rgb(', 'rgba(').replace(')', ', 0.15)')
      : `${color}26`;
    const label = d.name.length > 10 ? d.name.slice(0, 9) + '…' : d.name;
    const active = d.watts > 5;

    return svg`
      <g class="device-node" opacity="${active ? 1 : 0.45}">
        <circle cx="${cx}" cy="${cy}" r="${DEVICE_R}"
          fill="${bg}" stroke="${color}" stroke-width="${active ? 2 : 1}" />
        <g transform="translate(${cx - DEVICE_ICON}, ${cy - DEVICE_ICON}) scale(${DEVICE_ICON * 2 / 24})">
          <path d="${ICON_DEVICE}" fill="${color}" />
        </g>
        <text x="${cx}" y="${cy + DEVICE_R + 11}" text-anchor="middle"
          font-size="8.5" font-family="Roboto, sans-serif"
          fill="var(--secondary-text-color, #9ca3af)">${label}</text>
        <text x="${cx}" y="${cy + DEVICE_R + 21}" text-anchor="middle"
          font-size="9" font-weight="700" font-family="Roboto, sans-serif"
          fill="var(--primary-text-color, #e5e7eb)">${formatPower(d.watts, this.wattThreshold)}</text>
      </g>
    `;
  }

  private _socRing() {
    const r = NODE_R + 5;
    const circ = 2 * Math.PI * r;
    const filled = (this.socPercent / 100) * circ;
    const color = this._batteryColor();
    // Shift SOC% text down when secondary entity occupies the +38 slot
    const socTextY = BATTERY_Y + NODE_R + (this.batterySecondary ? 50 : 38);
    return svg`
      <circle
        cx="${BATTERY_X}" cy="${BATTERY_Y}" r="${r}"
        fill="none" stroke="${color}" stroke-width="3"
        stroke-dasharray="${filled} ${circ - filled}"
        stroke-dashoffset="0"
        transform="rotate(-90 ${BATTERY_X} ${BATTERY_Y})"
        opacity="0.85" stroke-linecap="round"
      />
      <text x="${BATTERY_X}" y="${socTextY}"
        text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
        fill="${color}" font-weight="600">${this.socPercent.toFixed(0)}%</text>
    `;
  }

  protected render() {
    const f = this.flows;
    const battColor = this._batteryColor();
    const battBg = battColor.replace('rgb(', 'rgba(').replace(')', ', 0.15)');

    // ── Device satellite layout ──────────────────────────────────────────
    const devs = this.diagramDevices ?? [];
    const N = devs.length;
    const hasDevices = N > 0;
    const DEVICE_X = HOME_X + DEVICE_ARM;
    const totalSpan = (N - 1) * DEVICE_GAP;
    const devStartY = HOME_Y - totalSpan / 2;
    const devicePositions = devs.map((d, i) => ({
      d, x: DEVICE_X, y: devStartY + i * DEVICE_GAP,
    }));

    // ── Dynamic viewBox ──────────────────────────────────────────────────
    const vbW = hasDevices ? VB_BASE + DEVICE_ARM + DEVICE_R * 2 + 44 : VB_BASE;
    const minY = hasDevices ? Math.min(0, devStartY - DEVICE_R - 20) : 0;
    const maxY = hasDevices
      ? Math.max(VB_BASE + 20, devStartY + totalSpan + DEVICE_R + 35)
      : VB_BASE + 20;
    const vbH = maxY - minY;
    const vbStr = `${0} ${minY} ${vbW} ${vbH}`;

    return html`
      <svg
        viewBox="${vbStr}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:auto;display:block;"
      >
        <!-- Background image -->
        ${this.backgroundImage ? svg`
          <image
            href="${this.backgroundImage}"
            x="0" y="${minY}"
            width="${vbW}" height="${vbH}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- Flow lines drawn under nodes -->

        <!-- Solar → Home -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, HOME_X, HOME_Y, f.solarToHome, '#f59e0b')}
        <!-- Solar → Battery -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, BATTERY_X, BATTERY_Y, f.solarToBattery, '#f59e0b')}
        <!-- Solar → Grid (export) -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, GRID_X, GRID_Y, f.solarToGrid, '#f59e0b')}
        <!-- Grid → Home (import) -->
        ${this._flowLine(GRID_X, GRID_Y, HOME_X, HOME_Y, f.gridToHome, '#8b5cf6')}
        <!-- Battery → Home (discharge) -->
        ${this._flowLine(BATTERY_X, BATTERY_Y, HOME_X, HOME_Y, f.batteryToHome, battColor)}
        <!-- Grid ↔ Battery: grid charging OR battery discharging to grid -->
        ${f.batteryToGrid > f.gridToBattery
          ? this._flowLine(BATTERY_X, BATTERY_Y, GRID_X, GRID_Y, f.batteryToGrid, '#10b981')
          : this._flowLine(GRID_X, GRID_Y, BATTERY_X, BATTERY_Y, f.gridToBattery, '#8b5cf6')}

        <!-- Device lines (Home → Device) -->
        ${devicePositions.map(({ d, x, y }) =>
          this._deviceLine(x, y, d.watts, d.color || '#6366f1')
        )}

        ${this._socRing()}

        <!-- Main nodes -->
        ${this._node(SOLAR_X,   SOLAR_Y,   ICON_SOLAR,   this.solarName,   this.solar,   '#f59e0b', 'rgba(245,158,11,0.15)',  this.solarSecondary)}
        ${this._node(GRID_X,    GRID_Y,    ICON_GRID,    this.gridName,    this.grid,    '#8b5cf6', 'rgba(139,92,246,0.15)',  this.gridSecondary)}
        ${this._node(HOME_X,    HOME_Y,    ICON_HOME,    this.homeName,    this.load,    '#3b82f6', 'rgba(59,130,246,0.15)',  this.homeSecondary)}
        ${this._node(BATTERY_X, BATTERY_Y, ICON_BATTERY, this.batteryName, this.battery, battColor, battBg,                  this.batterySecondary)}

        <!-- Device satellite nodes -->
        ${devicePositions.map(({ d, x, y }) => this._deviceNode(x, y, d))}
      </svg>
    `;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
  }
}

declare global {
  interface HTMLElementTagNameMap { 'flow-diagram': FlowDiagram; }
}
