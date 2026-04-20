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

const VB = 300;
const CX = VB / 2;
const CY = VB / 2;
const ARM = 100;

const SOLAR_X   = CX;       const SOLAR_Y   = CY - ARM;
const GRID_X    = CX - ARM; const GRID_Y    = CY;
const HOME_X    = CX + ARM; const HOME_Y    = CY;
const BATTERY_X = CX;       const BATTERY_Y = CY + ARM;

const NODE_R = 32;
const ICON_S = 18;

@customElement('flow-diagram')
export class FlowDiagram extends LitElement {
  @property({ type: Number }) solar = 0;
  @property({ type: Number }) battery = 0;
  @property({ type: Number }) grid = 0;
  @property({ type: Number }) load = 0;
  @property({ type: Number }) socPercent = 0;
  @property({ type: Number }) wattThreshold = 1000;
  @property({ type: Object }) flows: FlowData = {
    solarToHome: 0, solarToBattery: 0, solarToGrid: 0,
    gridToHome: 0, batteryToHome: 0, gridToBattery: 0,
  };

  static styles = css`
    :host { display: block; }
    @keyframes flow-anim     { to { stroke-dashoffset: -20; } }
    @keyframes flow-anim-rev { to { stroke-dashoffset:  20; } }
    .flow-active     { animation: flow-anim     0.8s linear infinite; }
    .flow-active-rev { animation: flow-anim-rev 0.8s linear infinite; }
  `;

  /** Smooth RGB interpolation: green (100%) → amber (50%) → red (0%) */
  private _batteryColor(): string {
    const soc = Math.max(0, Math.min(100, this.socPercent));
    let r: number, g: number, b: number;
    if (soc >= 50) {
      const t = (soc - 50) / 50;           // 1 at 100%, 0 at 50%
      r = Math.round(16  + t * (245 - 16));
      g = Math.round(185 + t * (158 - 185));
      b = Math.round(129 + t * (11  - 129));
    } else {
      const t = soc / 50;                   // 1 at 50%, 0 at 0%
      r = Math.round(239 + t * (245 - 239));
      g = Math.round(68  + t * (158 - 68));
      b = Math.round(68  + t * (11  - 68));
    }
    return `rgb(${r},${g},${b})`;
  }

  private _lineWidth(watts: number): number {
    const abs = Math.abs(watts);
    return abs <= 0 ? 2 : Math.min(8, Math.max(2, (abs / 1000) * 4 + 2));
  }

  private _trim(ax: number, ay: number, bx: number, by: number, margin = NODE_R + 4) {
    const dx = bx - ax, dy = by - ay;
    const len = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    return { x1: ax + ux * margin, y1: ay + uy * margin, x2: bx - ux * margin, y2: by - uy * margin };
  }

  /**
   * Draw a flow line from A→B.
   * `reverse=true` only when the line is drawn B→A in the SVG but power
   * flows A→B (so we flip the animation direction).
   */
  private _flowLine(
    ax: number, ay: number, bx: number, by: number,
    watts: number, stroke: string, reverse = false,
  ) {
    const active = watts > 1;
    const { x1, y1, x2, y2 } = this._trim(ax, ay, bx, by);
    const sw = this._lineWidth(watts);
    const op = active ? clampOpacity(watts, 5000) : 1;
    const dashClass = active ? (reverse ? 'flow-active-rev' : 'flow-active') : '';

    return svg`
      <line
        x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="${stroke}"
        stroke-width="${sw}"
        stroke-linecap="round"
        stroke-dasharray="${active ? '8 6' : '4 6'}"
        stroke-dashoffset="0"
        opacity="${active ? op : 0.13}"
        class="${dashClass}"
      />
    `;
  }

  private _node(
    cx: number, cy: number, iconPath: string, label: string,
    watts: number, fill: string, bgFill: string,
  ) {
    const valStr = formatPower(watts, this.wattThreshold);
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
          fill="var(--primary-text-color, #e5e7eb)">${valStr}</text>
      </g>
    `;
  }

  private _socRing() {
    const r = NODE_R + 5;
    const circumference = 2 * Math.PI * r;
    const filled = (this.socPercent / 100) * circumference;
    const empty = circumference - filled;
    const color = this._batteryColor();

    return svg`
      <circle
        cx="${BATTERY_X}" cy="${BATTERY_Y}" r="${r}"
        fill="none"
        stroke="${color}"
        stroke-width="3"
        stroke-dasharray="${filled} ${empty}"
        stroke-dashoffset="0"
        transform="rotate(-90 ${BATTERY_X} ${BATTERY_Y})"
        opacity="0.85"
        stroke-linecap="round"
      />
      <text
        x="${BATTERY_X}" y="${BATTERY_Y + NODE_R + 38}"
        text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
        fill="${color}" font-weight="600"
      >${this.socPercent.toFixed(0)}%</text>
    `;
  }

  protected render() {
    const f = this.flows;
    const battColor = this._batteryColor();
    const battBg = `${battColor.replace('rgb(', 'rgba(').replace(')', ', 0.15)')}`;

    return html`
      <svg
        viewBox="0 0 ${VB} ${VB + 20}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:auto;display:block;"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <!-- Solar → Home -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, HOME_X, HOME_Y,    f.solarToHome,    '#f59e0b')}
        <!-- Solar → Battery -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, BATTERY_X, BATTERY_Y, f.solarToBattery, '#f59e0b')}
        <!-- Solar → Grid (export) — no reverse, animation goes solar→grid -->
        ${this._flowLine(SOLAR_X, SOLAR_Y, GRID_X, GRID_Y,    f.solarToGrid,    '#f59e0b')}
        <!-- Grid → Home (import) -->
        ${this._flowLine(GRID_X, GRID_Y, HOME_X, HOME_Y,      f.gridToHome,     '#8b5cf6')}
        <!-- Battery → Home (discharge) -->
        ${this._flowLine(BATTERY_X, BATTERY_Y, HOME_X, HOME_Y, f.batteryToHome, battColor)}
        <!-- Grid → Battery (grid charging) -->
        ${this._flowLine(GRID_X, GRID_Y, BATTERY_X, BATTERY_Y, f.gridToBattery, '#8b5cf6')}

        ${this._socRing()}

        ${this._node(SOLAR_X,   SOLAR_Y,   ICON_SOLAR,   'Solar',   this.solar,   '#f59e0b', 'rgba(245,158,11,0.15)')}
        ${this._node(GRID_X,    GRID_Y,    ICON_GRID,    'Grid',    this.grid,    '#8b5cf6', 'rgba(139,92,246,0.15)')}
        ${this._node(HOME_X,    HOME_Y,    ICON_HOME,    'Home',    this.load,    '#3b82f6', 'rgba(59,130,246,0.15)')}
        ${this._node(BATTERY_X, BATTERY_Y, ICON_BATTERY, 'Battery', this.battery, battColor, battBg)}
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
