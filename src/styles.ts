import { css } from 'lit';

export const cardStyles = css`
  /* ─── Colour tokens ───────────────────────────────────────────── */
  :host {
    --color-solar:   #f59e0b;
    --color-battery: #10b981;
    --color-grid:    #8b5cf6;
    --color-home:    #3b82f6;

    --color-solar-bg:   rgba(245, 158, 11,  0.12);
    --color-battery-bg: rgba(16,  185, 129, 0.12);
    --color-grid-bg:    rgba(139, 92,  246, 0.12);
    --color-home-bg:    rgba(59,  130, 246, 0.12);

    /* Fallbacks when HA CSS vars are absent (unit-tests / preview) */
    --card-background-color: #1c1c1e;
    --primary-text-color: #e5e7eb;
    --secondary-text-color: #9ca3af;
    --primary-color: #3b82f6;
    --ha-card-border-radius: 12px;
    --ha-card-box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  }

  /* ─── Light theme overrides ───────────────────────────────────── */
  :host([theme='light']),
  :host([data-theme='light']) {
    --card-background-color: #ffffff;
    --primary-text-color: #111827;
    --secondary-text-color: #6b7280;
    --ha-card-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }

  @media (prefers-color-scheme: light) {
    :host([theme='auto']) {
      --card-background-color: #ffffff;
      --primary-text-color: #111827;
      --secondary-text-color: #6b7280;
      --ha-card-box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }
  }

  /* ─── Card shell ──────────────────────────────────────────────── */
  .card {
    background: var(--card-background-color);
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow);
    padding: 16px;
    color: var(--primary-text-color);
    font-family: var(--paper-font-body1_-_font-family, 'Roboto', sans-serif);
    overflow: hidden;
    box-sizing: border-box;
  }

  /* ─── Card header ─────────────────────────────────────────────── */
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  .card-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--primary-text-color);
    margin: 0;
  }

  .card-subtitle {
    font-size: 0.75rem;
    color: var(--secondary-text-color);
  }

  /* ─── Flow diagram container ──────────────────────────────────── */
  .flow-diagram {
    width: 100%;
    margin: 0 auto 16px;
    display: block;
    overflow: visible;
  }

  .flow-diagram svg {
    width: 100%;
    height: auto;
    display: block;
  }

  /* ─── 2×2 stat grid ───────────────────────────────────────────── */
  .stat-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }

  @media (max-width: 400px) {
    .stat-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ─── Individual stat panel ───────────────────────────────────── */
  .stat-panel {
    background: color-mix(in srgb, var(--card-background-color) 85%, transparent);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 12px 14px 10px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: relative;
    overflow: hidden;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .stat-panel:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  }

  .stat-panel-header {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stat-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .stat-name {
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .stat-value {
    font-size: 1.45rem;
    font-weight: 700;
    line-height: 1.1;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  .stat-unit {
    font-size: 0.85rem;
    font-weight: 400;
    color: var(--secondary-text-color);
  }

  .stat-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 99px;
    width: fit-content;
  }

  .stat-sparkline {
    width: 100%;
    height: 48px;
    margin-top: 4px;
    border-radius: 4px;
    display: block;
  }

  /* Color accents per source */
  .panel--solar   { border-top: 2px solid var(--color-solar);   }
  .panel--battery { border-top: 2px solid var(--color-battery); }
  .panel--grid    { border-top: 2px solid var(--color-grid);    }
  .panel--home    { border-top: 2px solid var(--color-home);    }

  .badge--solar   { background: var(--color-solar-bg);   color: var(--color-solar);   }
  .badge--battery { background: var(--color-battery-bg); color: var(--color-battery); }
  .badge--grid    { background: var(--color-grid-bg);    color: var(--color-grid);    }
  .badge--home    { background: var(--color-home-bg);    color: var(--color-home);    }

  /* ─── Devices row ─────────────────────────────────────────────── */
  .devices-section {
    margin-top: 4px;
  }

  .devices-label {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }

  .devices-row {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.15) transparent;
  }

  .devices-row::-webkit-scrollbar {
    height: 3px;
  }

  .devices-row::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
  }

  /* ─── Device chip ─────────────────────────────────────────────── */
  .device-chip {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 99px;
    padding: 4px 10px 4px 7px;
    white-space: nowrap;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }

  .device-chip.dim {
    opacity: 0.4;
  }

  .device-chip svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    color: var(--secondary-text-color);
  }

  .chip-name {
    font-size: 0.72rem;
    color: var(--secondary-text-color);
  }

  .chip-value {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--primary-text-color);
    font-variant-numeric: tabular-nums;
  }

  /* ─── SVG flow animation ──────────────────────────────────────── */
  @keyframes flow-anim {
    to {
      stroke-dashoffset: -20;
    }
  }

  @keyframes flow-anim-reverse {
    to {
      stroke-dashoffset: 20;
    }
  }

  .flow-line-active {
    animation: flow-anim 0.8s linear infinite;
  }

  .flow-line-active-reverse {
    animation: flow-anim-reverse 0.8s linear infinite;
  }

  .flow-line-inactive {
    opacity: 0.12;
  }

  /* ─── No-config / error state ─────────────────────────────────── */
  .error-card {
    padding: 16px;
    color: #ef4444;
    font-size: 0.875rem;
    border-left: 3px solid #ef4444;
  }
`;
