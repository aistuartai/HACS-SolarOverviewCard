import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SparklinePoint } from '../types';

/**
 * A compact stat panel displaying an icon, name, power value, state badge
 * and an optional canvas sparkline.
 */
@customElement('stat-panel')
export class StatPanel extends LitElement {
  @property({ type: String }) entityId = '';
  @property({ type: String }) name = '';
  @property({ type: String }) icon = '';
  @property({ type: Number }) value = 0;
  @property({ type: String }) unit = 'W';
  @property({ type: String }) stateLabel = '';
  @property({ type: String }) stateColor = '#3b82f6';
  @property({ type: String }) panelClass = '';
  @property({ type: String }) badgeClass = '';
  @property({ type: Boolean }) showSparkline = true;
  @property({ type: Array }) sparklineHistory: SparklinePoint[] = [];

  /** Formatted display value (set by parent to avoid duplicating logic) */
  @property({ type: String }) displayValue = '';

  @state() private _canvasReady = false;

  static styles = css`
    :host { display: block; }

    .panel {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 10px;
      padding: 12px 14px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 7px;
    }

    .icon-wrap {
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .icon-wrap svg {
      width: 20px;
      height: 20px;
    }

    .name {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--secondary-text-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .value-row {
      display: flex;
      align-items: baseline;
      gap: 3px;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 700;
      line-height: 1.1;
      color: var(--primary-text-color, #e5e7eb);
      font-variant-numeric: tabular-nums;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 99px;
      width: fit-content;
      margin-top: 2px;
    }

    canvas {
      width: 100%;
      height: 48px;
      margin-top: 6px;
      border-radius: 4px;
      display: block;
    }
  `;

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (this.showSparkline && changed.has('sparklineHistory')) {
      this._drawSparkline();
    }
    if (changed.has('showSparkline') && this.showSparkline) {
      this._canvasReady = true;
      this.requestUpdate();
      this.updateComplete.then(() => this._drawSparkline());
    }
  }

  private _drawSparkline(): void {
    const canvas = this.shadowRoot?.querySelector('canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const history = this.sparklineHistory;
    if (!history || history.length < 2) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || 200;
    const h = rect.height || 48;

    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Limit to last 60 points
    const pts = history.slice(-60);
    const vals = pts.map((p) => p.value);
    const minVal = Math.min(...vals);
    const maxVal = Math.max(...vals);
    const range = maxVal - minVal || 1;

    const toX = (i: number) => (i / (pts.length - 1)) * w;
    const toY = (v: number) => h - 4 - ((v - minVal) / range) * (h - 8);

    // Fill gradient
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, this.stateColor + '55');
    grad.addColorStop(1, this.stateColor + '00');
    ctx.beginPath();
    ctx.moveTo(toX(0), h);
    pts.forEach((p, i) => ctx.lineTo(toX(i), toY(p.value)));
    ctx.lineTo(toX(pts.length - 1), h);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line
    ctx.beginPath();
    ctx.strokeStyle = this.stateColor;
    ctx.lineWidth = 1.5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    pts.forEach((p, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(p.value));
      else ctx.lineTo(toX(i), toY(p.value));
    });
    ctx.stroke();
  }

  protected render() {
    const display = this.displayValue || `${Math.round(Math.abs(this.value))} W`;

    return html`
      <div class="panel ${this.panelClass}">
        <div class="header">
          <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="${this.stateColor}">
              <path d="${this.icon}" />
            </svg>
          </div>
          <span class="name">${this.name}</span>
        </div>

        <div class="value-row">
          <span class="value">${display}</span>
        </div>

        <span
          class="badge ${this.badgeClass}"
          style="background:${this.stateColor}22; color:${this.stateColor};"
        >${this.stateLabel}</span>

        ${this.showSparkline
          ? html`<canvas aria-hidden="true"></canvas>`
          : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stat-panel': StatPanel;
  }
}
