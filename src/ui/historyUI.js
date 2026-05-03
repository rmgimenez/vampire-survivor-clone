import { t } from "../i18n.js";

export class HistoryUI {
  constructor(onClose) {
    this.screen = document.getElementById("history-screen");
    this.titleEl = document.getElementById("history-profile-name");
    this.listEl = document.getElementById("history-list");
    this.statsEl = document.getElementById("history-summary");
    this.closeBtn = document.getElementById("history-close-btn");
    this.onClose = onClose;

    this.closeBtn.addEventListener("click", () => this.onClose());
  }

  show(profile) {
    this._render(profile);
    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }

  _render(profile) {
    const { runs } = profile;
    this.titleEl.textContent = profile.name;

    // Summary stats
    const totalRuns = runs.length;
    const wins = runs.filter((r) => r.win).length;
    const totalKills = runs.reduce((s, r) => s + r.kills, 0);
    const bestKills = totalRuns > 0 ? Math.max(...runs.map((r) => r.kills)) : 0;
    const totalCoins = profile.totalCoins;

    this.statsEl.innerHTML = `
      <div class="stat-card"><strong>${totalRuns}</strong><span>${t("history.stat.runs")}</span></div>
      <div class="stat-card"><strong>${wins}</strong><span>${t("history.stat.wins")}</span></div>
      <div class="stat-card"><strong>${totalKills}</strong><span>${t("history.stat.totalKills")}</span></div>
      <div class="stat-card"><strong>${bestKills}</strong><span>${t("history.stat.bestRun")}</span></div>
      <div class="stat-card"><strong>${totalCoins} 🪙</strong><span>${t("history.stat.totalCoins")}</span></div>
    `;

    this.listEl.innerHTML = "";

    if (runs.length === 0) {
      this.listEl.innerHTML = `<p class="muted-hint">${t("history.empty")}</p>`;
      return;
    }

    // Header
    const header = document.createElement("div");
    header.className = "history-row history-header";
    header.innerHTML = `
      <span></span>
      <span>${t("history.col.date")}</span>
      <span>${t("history.col.time")}</span>
      <span>${t("history.col.level")}</span>
      <span>${t("history.col.kills")}</span>
      <span>${t("history.col.damage")}</span>
      <span>${t("history.col.gold")}</span>
    `;
    this.listEl.append(header);

    for (const run of runs) {
      const mins = Math.floor(run.elapsed / 60);
      const secs = String(Math.floor(run.elapsed % 60)).padStart(2, "0");
      const row = document.createElement("div");
      row.className = `history-row ${run.win ? "run-win" : "run-loss"}`;
      row.innerHTML = `
        <span class="run-badge">${run.win ? "🏆" : "💀"}</span>
        <span>${run.date ?? "—"}</span>
        <span>${mins}m ${secs}s</span>
        <span>${t("history.level")} ${run.level}</span>
        <span>${run.kills}</span>
        <span>${(run.damageDone ?? 0).toLocaleString()}</span>
        <span>+${run.coinsEarned} 🪙</span>
      `;
      this.listEl.append(row);
    }
  }
}
