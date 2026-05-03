import { t } from "../i18n.js";
import { getCardById, getCardRarityMeta } from "../cards.js";
import { buildKillBreakdownGrid } from "./killBreakdown.js";

export class GameOverUI {
  constructor() {
    this.screen = document.getElementById("gameover-screen");
    this.kicker = document.getElementById("gameover-kicker");
    this.title = document.getElementById("gameover-title");
    this.summary = document.getElementById("gameover-summary");
    this.stats = document.getElementById("gameover-stats");
    this.coinsRow = document.getElementById("gameover-coins-row");
    this.killBreakdown = document.getElementById("gameover-kills-breakdown");
    this.cardRewards = document.getElementById("gameover-card-rewards");

    if (!this.killBreakdown && this.stats) {
      this.killBreakdown = document.createElement("section");
      this.killBreakdown.id = "gameover-kills-breakdown";
      this.killBreakdown.className = "enemy-breakdown-panel";
      this.stats.insertAdjacentElement("afterend", this.killBreakdown);
    }

    if (!this.cardRewards && this.killBreakdown) {
      this.cardRewards = document.createElement("section");
      this.cardRewards.id = "gameover-card-rewards";
      this.cardRewards.className = "enemy-breakdown-panel";
      this.killBreakdown.insertAdjacentElement("afterend", this.cardRewards);
    }
  }

  show({
    win,
    elapsed,
    stats,
    playerLevel,
    coinsEarned,
    totalCoins,
    unlockedCardIds = [],
  }) {
    this.kicker.textContent = win
      ? t("gameover.win.kicker")
      : t("gameover.lose.kicker");
    this.title.textContent = win
      ? t("gameover.win.title")
      : t("gameover.lose.title");
    this.summary.textContent = win
      ? t("gameover.win.summary")
      : t("gameover.lose.summary");

    this.stats.innerHTML = "";
    const statEntries = [
      [
        t("gameover.stat.time"),
        `${Math.floor(elapsed / 60)}m ${String(Math.floor(elapsed % 60)).padStart(2, "0")}s`,
      ],
      [t("gameover.stat.level"), String(playerLevel)],
      [t("gameover.stat.kills"), String(stats.kills)],
      [t("gameover.stat.damage"), String(Math.round(stats.damageDone))],
    ];

    for (const [label, value] of statEntries) {
      const item = document.createElement("div");
      item.className = "stat-card";
      item.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
      this.stats.append(item);
    }

    if (this.killBreakdown) {
      this.killBreakdown.innerHTML = `
        <p class="enemy-breakdown-title">${t("gameover.typesTitle")}</p>
        ${buildKillBreakdownGrid(stats.killsByType, t("gameover.typesEmpty"))}
      `;
    }

    if (this.coinsRow) {
      this.coinsRow.innerHTML = `
        <div class="coins-earned-badge">
          <span class="coins-label">${t("gameover.coinsEarned")}</span>
          <span class="coins-value">+${coinsEarned} 🪙</span>
        </div>
        <div class="coins-total-hint">${t("gameover.coinsTotal")} ${totalCoins} 🪙</div>
      `;
    }

    if (this.cardRewards) {
      if (unlockedCardIds.length > 0) {
        const unlockedCards = unlockedCardIds
          .map((cardId) => getCardById(cardId))
          .filter(Boolean);

        this.cardRewards.innerHTML = `
          <p class="enemy-breakdown-title">${t("cards.rewardsTitle")}</p>
          <p class="coins-total-hint">${t("cards.rewardsCopy")}</p>
          <div class="unlocked-card-list">
            ${unlockedCards
              .map((card) => {
                const rarity = getCardRarityMeta(card.rarity);
                return `
                  <div class="unlocked-card-chip ${rarity.className}">
                    <span class="unlocked-card-icon">${card.icon}</span>
                    <div class="unlocked-card-copy">
                      <strong>${t(card.titleKey)}</strong>
                      <span>${t(rarity.labelKey)}</span>
                    </div>
                  </div>
                `;
              })
              .join("")}
          </div>
        `;
      } else {
        this.cardRewards.innerHTML = "";
      }
    }

    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }
}
