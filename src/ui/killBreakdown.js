import { ENEMY_TYPES } from "../config.js";
import { t } from "../i18n.js";

export function getKillBreakdownEntries(killsByType = {}) {
  return Object.keys(ENEMY_TYPES)
    .map((type) => ({
      type,
      count: killsByType?.[type] ?? 0,
      label: t(`enemy.${type}`),
      sprite: ENEMY_TYPES[type].sprite,
    }))
    .filter((entry) => entry.count > 0);
}

export function buildKillBreakdownGrid(killsByType, emptyMessage) {
  const entries = getKillBreakdownEntries(killsByType);

  if (!entries.length) {
    return `<p class="muted-hint">${emptyMessage}</p>`;
  }

  return `
    <div class="enemy-breakdown-grid">
      ${entries
        .map(
          (entry) => `
            <article class="enemy-breakdown-item">
              <img class="enemy-breakdown-icon" src="${entry.sprite}" alt="" />
              <div class="enemy-breakdown-copy">
                <span class="enemy-breakdown-count">${entry.count}</span>
                <span class="enemy-breakdown-name">${entry.label}</span>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

export function buildKillBreakdownPills(killsByType, emptyMessage) {
  const entries = getKillBreakdownEntries(killsByType);

  if (!entries.length) {
    return `<span class="history-breakdown-empty">${emptyMessage}</span>`;
  }

  return entries
    .map(
      (entry) => `
        <span class="history-breakdown-pill">
          <img class="history-breakdown-icon" src="${entry.sprite}" alt="" />
          <strong>${entry.count}</strong>
          <span>${entry.label}</span>
        </span>
      `,
    )
    .join("");
}
