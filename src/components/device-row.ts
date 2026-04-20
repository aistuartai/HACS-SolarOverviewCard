import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatPower } from '../utils';

export interface DeviceItem {
  name: string;
  icon: string;
  watts: number;
  entityId: string;
  color?: string;
}

/**
 * Horizontal scrollable row of device power chips.
 * Chips are sorted by wattage descending; chips < 5 W are dimmed.
 */
@customElement('device-row')
export class DeviceRow extends LitElement {
  @property({ type: Array }) devices: DeviceItem[] = [];
  @property({ type: Number }) wattThreshold = 1000;

  static styles = css`
    :host { display: block; }

    .row {
      display: flex;
      flex-direction: row;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 2px;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.15) transparent;
    }

    .row::-webkit-scrollbar {
      height: 3px;
    }
    .row::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18);
      border-radius: 2px;
    }

    .chip {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 99px;
      padding: 4px 10px 4px 7px;
      white-space: nowrap;
      flex-shrink: 0;
      cursor: default;
      transition: opacity 0.2s, background 0.15s;
    }

    .chip:hover {
      background: rgba(255,255,255,0.09);
    }

    .chip.dim {
      opacity: 0.38;
    }

    .chip svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      fill: var(--secondary-text-color, #9ca3af);
    }

    .chip ha-icon {
      --mdc-icon-size: 14px;
      flex-shrink: 0;
    }

    .chip-name {
      font-size: 0.72rem;
      color: var(--secondary-text-color, #9ca3af);
    }

    .chip-value {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--primary-text-color, #e5e7eb);
      font-variant-numeric: tabular-nums;
    }

    .empty {
      font-size: 0.75rem;
      color: var(--secondary-text-color, #9ca3af);
      font-style: italic;
    }
  `;

  /** Default MDI flash (lightning) icon used when no custom icon supplied. */
  private _defaultIconPath =
    'M7,2V13H10V22L17,10H13L17,2H7Z';

  protected render() {
    if (!this.devices || this.devices.length === 0) {
      return html`<div class="row"><span class="empty">No devices configured</span></div>`;
    }

    const sorted = [...this.devices].sort((a, b) => b.watts - a.watts);

    return html`
      <div class="row" role="list" aria-label="Device power consumption">
        ${sorted.map(
          (d) => html`
            <div
              class="chip ${d.watts < 5 ? 'dim' : ''}"
              role="listitem"
              title="${d.name}: ${formatPower(d.watts, this.wattThreshold)}"
              style="${d.color ? `border-color: ${d.color}33;` : ''}"
            >
              ${d.icon?.startsWith('mdi:')
                ? html`<ha-icon icon="${d.icon}" style="${d.color ? `color:${d.color};` : ''}"></ha-icon>`
                : html`<svg viewBox="0 0 24 24" aria-hidden="true"
                    style="${d.color ? `fill:${d.color};` : ''}">
                    <path d="${d.icon || this._defaultIconPath}" />
                  </svg>`
              }
              <span class="chip-name">${d.name}</span>
              <span class="chip-value">${formatPower(d.watts, this.wattThreshold)}</span>
            </div>
          `,
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'device-row': DeviceRow;
  }
}
