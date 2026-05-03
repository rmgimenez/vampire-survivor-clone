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
      <div class="stat-card"><strong>${totalRuns}</strong><span>Runs</span></div>
      <div class="stat-card"><strong>${wins}</strong><span>Vitórias</span></div>
      <div class="stat-card"><strong>${totalKills}</strong><span>Abates totais</span></div>
      <div class="stat-card"><strong>${bestKills}</strong><span>Melhor run (abates)</span></div>
      <div class="stat-card"><strong>${totalCoins} 🪙</strong><span>Ouro total ganho</span></div>
    `;

    this.listEl.innerHTML = "";

    if (runs.length === 0) {
      this.listEl.innerHTML =
        '<p class="muted-hint">Nenhuma run concluída ainda.</p>';
      return;
    }

    // Header
    const header = document.createElement("div");
    header.className = "history-row history-header";
    header.innerHTML = `
      <span></span>
      <span>Data</span>
      <span>Tempo</span>
      <span>Nível</span>
      <span>Abates</span>
      <span>Dano</span>
      <span>Ouro</span>
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
        <span>Nvl ${run.level}</span>
        <span>${run.kills}</span>
        <span>${(run.damageDone ?? 0).toLocaleString("pt-BR")}</span>
        <span>+${run.coinsEarned} 🪙</span>
      `;
      this.listEl.append(row);
    }
  }
}
