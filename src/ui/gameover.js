import { t } from "../i18n.js";

export class GameOverUI {
  constructor() {
    this.screen = document.getElementById("gameover-screen");
    this.kicker = document.getElementById("gameover-kicker");
    this.title = document.getElementById("gameover-title");
    this.summary = document.getElementById("gameover-summary");
    this.stats = document.getElementById("gameover-stats");
    this.coinsRow = document.getElementById("gameover-coins-row");
  }

  show({ win, elapsed, stats, playerLevel, coinsEarned, totalCoins }) {
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

    if (this.coinsRow) {
      this.coinsRow.innerHTML = `
        <div class="coins-earned-badge">
          <span class="coins-label">${t("gameover.coinsEarned")}</span>
          <span class="coins-value">+${coinsEarned} 🪙</span>
        </div>
        <div class="coins-total-hint">${t("gameover.coinsTotal")} ${totalCoins} 🪙</div>
      `;
    }

    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }
}
