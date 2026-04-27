import { LitElement, html, svg, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
  'M7,2V13H10V22L17,10H13L17,2H7Z';

// ─── Layout constants (defaults) ────────────────────────────────────────────

const VB_BASE   = 300;
const CX = VB_BASE / 2;
const CY = VB_BASE / 2;
const ARM = 100;

const SOLAR_X   = CX;       const SOLAR_Y   = CY - ARM;
const GRID_X    = CX - ARM; const GRID_Y    = CY;
const HOME_X    = CX + ARM; const HOME_Y    = CY;
const BATTERY_X = CX;       const BATTERY_Y = CY + ARM;

const NODE_R = 32;
const ICON_S = 18;

const DEVICE_ARM  = 82;
const DEVICE_R    = 17;
const DEVICE_ICON = 9;
const DEVICE_GAP  = 52;

// Card-style node dims
const CARD_W      = 82;
const CARD_H      = 46;
const CARD_H_HALF = CARD_H / 2;  // used like NODE_R for text offsets
const CARD_R      = 10;          // border-radius

export type NodeKey = 'solar' | 'grid' | 'home' | 'battery';

export interface NodePositions {
  solar?:   { x: number; y: number };
  grid?:    { x: number; y: number };
  home?:    { x: number; y: number };
  battery?: { x: number; y: number };
}

export interface DiagramDevice {
  name: string;
  watts: number;
  color: string;
}

interface Pos { x: number; y: number; }
interface AllPos { solar: Pos; grid: Pos; home: Pos; battery: Pos; }

function defaultPos(): AllPos {
  return {
    solar:   { x: SOLAR_X,   y: SOLAR_Y   },
    grid:    { x: GRID_X,    y: GRID_Y    },
    home:    { x: HOME_X,    y: HOME_Y    },
    battery: { x: BATTERY_X, y: BATTERY_Y },
  };
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
  @property({ type: Array })  diagramDevices: DiagramDevice[] = [];
  @property({ type: String }) backgroundImage = '';
  @property({ type: Boolean }) editMode = false;
  @property({ type: Object }) nodePositions?: NodePositions;
  @property({ type: String }) textColor = '#ffffff';
  @property({ type: String }) nodeStyle: 'circle' | 'card' = 'circle';
  @property({ type: Boolean }) showFlowLines = true;

  // ── Drag state ──────────────────────────────────────────────────────────────
  @state() private _pos: AllPos = defaultPos();
  @state() private _dragging: NodeKey | null = null;
  private _dragStartClient = { x: 0, y: 0 };
  private _dragStartPos: Pos = { x: 0, y: 0 };

  static styles = css`
    :host { display: block; }
    @keyframes flow-anim     { to { stroke-dashoffset: -20; } }
    @keyframes flow-anim-rev { to { stroke-dashoffset:  20; } }
    .flow-active     { animation: flow-anim     0.8s linear infinite; }
    .flow-active-rev { animation: flow-anim-rev 0.8s linear infinite; }
    .draggable { cursor: grab; }
    .draggable:active { cursor: grabbing; }
  `;

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('nodePositions')) {
      const np = this.nodePositions ?? {};
      this._pos = {
        solar:   { ...defaultPos().solar,   ...(np.solar   ?? {}) },
        grid:    { ...defaultPos().grid,    ...(np.grid    ?? {}) },
        home:    { ...defaultPos().home,    ...(np.home    ?? {}) },
        battery: { ...defaultPos().battery, ...(np.battery ?? {}) },
      };
    }
  }

  // ── Drag handlers ────────────────────────────────────────────────────────────

  private _onNodePointerDown(e: PointerEvent, key: NodeKey): void {
    if (!this.editMode) return;
    e.preventDefault();
    e.stopPropagation();
    this._dragging = key;
    this._dragStartClient = { x: e.clientX, y: e.clientY };
    this._dragStartPos = { ...this._pos[key] };
    (e.currentTarget as SVGElement).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent): void {
    if (!this._dragging) return;
    const svg = this.shadowRoot!.querySelector('svg') as SVGSVGElement;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const dx = (e.clientX - this._dragStartClient.x) / ctm.a;
    const dy = (e.clientY - this._dragStartClient.y) / ctm.d;
    this._pos = {
      ...this._pos,
      [this._dragging]: {
        x: Math.round(this._dragStartPos.x + dx),
        y: Math.round(this._dragStartPos.y + dy),
      },
    };
  }

  private _onPointerUp(): void {
    if (!this._dragging) return;
    this._dragging = null;
    this.dispatchEvent(new CustomEvent('nodes-moved', {
      detail: { positions: { ...this._pos } },
      bubbles: true,
      composed: true,
    }));
  }

  // ── Helpers ──────────────────────────────────────────────────────────────────

  private get _nodeMargin(): number {
    return this.nodeStyle === 'card' ? CARD_H_HALF + 6 : NODE_R + 4;
  }

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
  ) {
    const active = watts > 1;
    const { x1, y1, x2, y2 } = this._trim(ax, ay, bx, by, this._nodeMargin);
    const sw = this._lineWidth(watts);
    const dashClass = active ? (reverse ? 'flow-active-rev' : 'flow-active') : '';
    return svg`
      <line
        x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
        stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"
        stroke-dasharray="${active ? '8 6' : '4 6'}"
        stroke-dashoffset="0"
        opacity="${active ? clampOpacity(watts, 5000) : 0.13}"
        class="${dashClass}"
      />
    `;
  }

  private _deviceLine(hx: number, hy: number, dx: number, dy: number, watts: number, color: string) {
    const active = watts > 5;
    const { x1, y1, x2, y2 } = this._trim(hx, hy, dx, dy, NODE_R + 3);
    const ddx = x2 - x1, ddy = y2 - y1;
    const dlen = Math.sqrt(ddx * ddx + ddy * ddy);
    const fx2 = dlen > 0 ? x2 - (ddx / dlen) * (DEVICE_R + 3) : x2;
    const fy2 = dlen > 0 ? y2 - (ddy / dlen) * (DEVICE_R + 3) : y2;
    return svg`
      <line
        x1="${x1}" y1="${y1}" x2="${fx2}" y2="${fy2}"
        stroke="${color}" stroke-width="${active ? 2 : 1.5}" stroke-linecap="round"
        stroke-dasharray="${active ? '6 5' : '3 5'}" stroke-dashoffset="0"
        opacity="${active ? 0.85 : 0.2}"
        class="${active ? 'flow-active' : ''}"
      />
    `;
  }

  private _node(
    cx: number, cy: number, iconPath: string, label: string,
    watts: number, fill: string, bgFill: string,
    secondary: string, nodeKey: NodeKey,
  ) {
    const tc = this.textColor;
    const dragging = this.editMode && this._dragging === nodeKey;
    const isCard = this.nodeStyle === 'card';
    const R = isCard ? CARD_H_HALF : NODE_R;

    // Edit-mode drag handle (dashed outline)
    const editRing = this.editMode ? svg`
      ${isCard
        ? svg`<rect x="${cx - CARD_W / 2 - 6}" y="${cy - R - 6}"
            width="${CARD_W + 12}" height="${CARD_H + 12}" rx="${CARD_R + 4}"
            fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"
            stroke-dasharray="4 3" opacity="${dragging ? 1 : 0.6}" />`
        : svg`<circle cx="${cx}" cy="${cy}" r="${NODE_R + 6}"
            fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"
            stroke-dasharray="4 3" opacity="${dragging ? 1 : 0.6}" />`
      }
    ` : '';

    // Shape (circle or card)
    const shape = isCard
      ? svg`<rect x="${cx - CARD_W / 2}" y="${cy - R}"
          width="${CARD_W}" height="${CARD_H}" rx="${CARD_R}"
          fill="${bgFill}" stroke="${fill}" stroke-width="${dragging ? 3 : 2}" />`
      : svg`<circle cx="${cx}" cy="${cy}" r="${NODE_R}"
          fill="${bgFill}" stroke="${fill}" stroke-width="${dragging ? 3 : 2}" />`;

    // Icon — centered in shape
    const iconScale = ICON_S * 2 / 24;
    const icon = svg`
      <g transform="translate(${cx - ICON_S}, ${cy - ICON_S}) scale(${iconScale})">
        <path d="${iconPath}" fill="${fill}" />
      </g>
    `;

    return svg`
      <g
        class="${this.editMode ? 'draggable' : ''} node"
        @pointerdown="${(e: PointerEvent) => this._onNodePointerDown(e, nodeKey)}"
        @pointermove="${(e: PointerEvent) => this._onPointerMove(e)}"
        @pointerup="${() => this._onPointerUp()}"
      >
        ${editRing}
        ${shape}
        ${icon}
        <text x="${cx}" y="${cy + R + 14}" text-anchor="middle"
          font-size="10" font-family="Roboto, sans-serif"
          fill="${tc}" opacity="0.65">${label}</text>
        <text x="${cx}" y="${cy + R + 26}" text-anchor="middle"
          font-size="11" font-weight="700" font-family="Roboto, sans-serif"
          fill="${tc}">${formatPower(watts, this.wattThreshold)}</text>
        ${secondary ? svg`
          <text x="${cx}" y="${cy + R + 38}" text-anchor="middle"
            font-size="9" font-family="Roboto, sans-serif"
            fill="${tc}" opacity="0.65">${secondary}</text>
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
    const tc = this.textColor;
    return svg`
      <g class="device-node" opacity="${active ? 1 : 0.45}">
        <circle cx="${cx}" cy="${cy}" r="${DEVICE_R}"
          fill="${bg}" stroke="${color}" stroke-width="${active ? 2 : 1}" />
        <g transform="translate(${cx - DEVICE_ICON}, ${cy - DEVICE_ICON}) scale(${DEVICE_ICON * 2 / 24})">
          <path d="${ICON_DEVICE}" fill="${color}" />
        </g>
        <text x="${cx}" y="${cy + DEVICE_R + 11}" text-anchor="middle"
          font-size="8.5" font-family="Roboto, sans-serif"
          fill="${tc}" opacity="0.65">${label}</text>
        <text x="${cx}" y="${cy + DEVICE_R + 21}" text-anchor="middle"
          font-size="9" font-weight="700" font-family="Roboto, sans-serif"
          fill="${tc}">${formatPower(d.watts, this.wattThreshold)}</text>
      </g>
    `;
  }

  private _socRing(bx: number, by: number) {
    const color = this._batteryColor();
    const R = this.nodeStyle === 'card' ? CARD_H_HALF : NODE_R;
    const socTextY = by + R + (this.batterySecondary ? 50 : 38);

    // Card style: no ring arc, just SOC% text
    if (this.nodeStyle === 'card') {
      return svg`
        <text x="${bx}" y="${socTextY}"
          text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
          fill="${color}" font-weight="600">${this.socPercent.toFixed(0)}%</text>
      `;
    }

    const r = NODE_R + 5;
    const circ = 2 * Math.PI * r;
    const filled = (this.socPercent / 100) * circ;
    return svg`
      <circle
        cx="${bx}" cy="${by}" r="${r}"
        fill="none" stroke="${color}" stroke-width="3"
        stroke-dasharray="${filled} ${circ - filled}"
        stroke-dashoffset="0"
        transform="rotate(-90 ${bx} ${by})"
        opacity="0.85" stroke-linecap="round"
      />
      <text x="${bx}" y="${socTextY}"
        text-anchor="middle" font-size="9" font-family="Roboto, sans-serif"
        fill="${color}" font-weight="600">${this.socPercent.toFixed(0)}%</text>
    `;
  }

  protected render() {
    const f = this.flows;
    const p = this._pos;
    const battColor = this._batteryColor();
    const battBg = battColor.replace('rgb(', 'rgba(').replace(')', ', 0.15)');

    // ── Device satellite layout (relative to home node) ──────────────────
    const devs = this.diagramDevices ?? [];
    const N = devs.length;
    const hasDevices = N > 0;
    const deviceX = p.home.x + DEVICE_ARM;
    const totalSpan = (N - 1) * DEVICE_GAP;
    const devStartY = p.home.y - totalSpan / 2;
    const devicePositions = devs.map((d, i) => ({
      d, x: deviceX, y: devStartY + i * DEVICE_GAP,
    }));

    // ── Dynamic viewBox from node positions ──────────────────────────────
    const pad = NODE_R + 60;
    const allX = [p.solar.x, p.grid.x, p.home.x, p.battery.x, ...devicePositions.map(d => d.x)];
    const allY = [p.solar.y, p.grid.y, p.home.y, p.battery.y, ...devicePositions.map(d => d.y)];
    const vbMinX = Math.min(...allX) - pad;
    const vbMinY = Math.min(...allY) - pad;
    const vbMaxX = Math.max(...allX) + pad + (hasDevices ? DEVICE_R + 30 : 0);
    const vbMaxY = Math.max(...allY) + pad;
    const vbW = vbMaxX - vbMinX;
    const vbH = vbMaxY - vbMinY;
    const vbStr = `${vbMinX} ${vbMinY} ${vbW} ${vbH}`;

    return html`
      <svg
        viewBox="${vbStr}"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Solar power flow diagram"
        role="img"
        style="width:100%;height:auto;display:block;${this.editMode ? 'touch-action:none;' : ''}"
        @pointermove="${(e: PointerEvent) => this._onPointerMove(e)}"
        @pointerup="${() => this._onPointerUp()}"
      >
        <!-- Background image -->
        ${this.backgroundImage ? svg`
          <image
            href="${this.backgroundImage}"
            x="${vbMinX}" y="${vbMinY}"
            width="${vbW}" height="${vbH}"
            preserveAspectRatio="xMidYMid slice"
          />
        ` : ''}

        <!-- Edit mode hint -->
        ${this.editMode ? svg`
          <text x="${vbMinX + vbW / 2}" y="${vbMinY + 18}"
            text-anchor="middle" font-size="10" font-family="Roboto, sans-serif"
            fill="rgba(255,255,255,0.5)">drag nodes to reposition</text>
        ` : ''}

        <!-- Flow lines -->
        ${this.showFlowLines ? svg`
          ${this._flowLine(p.solar.x,   p.solar.y,   p.home.x,    p.home.y,    f.solarToHome,    '#f59e0b')}
          ${this._flowLine(p.solar.x,   p.solar.y,   p.battery.x, p.battery.y, f.solarToBattery, '#f59e0b')}
          ${this._flowLine(p.solar.x,   p.solar.y,   p.grid.x,    p.grid.y,    f.solarToGrid,    '#f59e0b')}
          ${this._flowLine(p.grid.x,    p.grid.y,    p.home.x,    p.home.y,    f.gridToHome,     '#8b5cf6')}
          ${this._flowLine(p.battery.x, p.battery.y, p.home.x,    p.home.y,    f.batteryToHome,  battColor)}
          ${f.batteryToGrid > f.gridToBattery
            ? this._flowLine(p.battery.x, p.battery.y, p.grid.x, p.grid.y, f.batteryToGrid, '#10b981')
            : this._flowLine(p.grid.x,    p.grid.y, p.battery.x, p.battery.y, f.gridToBattery, '#8b5cf6')}
          ${devicePositions.map(({ d, x, y }) =>
            this._deviceLine(p.home.x, p.home.y, x, y, d.watts, d.color || '#6366f1')
          )}
        ` : ''}

        <!-- SOC ring / text -->
        ${this._socRing(p.battery.x, p.battery.y)}

        <!-- Main nodes -->
        ${this._node(p.solar.x,   p.solar.y,   ICON_SOLAR,   this.solarName,   this.solar,   '#f59e0b', 'rgba(245,158,11,0.15)',  this.solarSecondary,   'solar')}
        ${this._node(p.grid.x,    p.grid.y,    ICON_GRID,    this.gridName,    this.grid,    '#8b5cf6', 'rgba(139,92,246,0.15)',  this.gridSecondary,    'grid')}
        ${this._node(p.home.x,    p.home.y,    ICON_HOME,    this.homeName,    this.load,    '#3b82f6', 'rgba(59,130,246,0.15)',  this.homeSecondary,    'home')}
        ${this._node(p.battery.x, p.battery.y, ICON_BATTERY, this.batteryName, this.battery, battColor, battBg,                  this.batterySecondary, 'battery')}

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
