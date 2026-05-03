export class LevelUpUI {
  constructor() {
    this.screen = document.getElementById("levelup-screen");
    this.container = document.getElementById("levelup-options");
    this.footerEl = document.getElementById("levelup-footer");
    this.maxRerolls = 5;
  }

  show(choices, onSelect, onReroll, rerollsLeft) {
    this.container.innerHTML = "";

    for (const choice of choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `option-card ${choice.rarityClass ?? ""}`;
      button.innerHTML = `
        <div class="option-card-meta">
          <span class="option-type">${choice.typeLabel ?? ""}</span>
          <span class="option-rarity ${choice.rarityClass ?? ""}">${choice.rarityLabel ?? ""}</span>
        </div>
        <strong>${choice.title}</strong>
        <p>${choice.description}</p>
      `;
      button.addEventListener("click", () => onSelect(choice));
      this.container.append(button);
    }

    // Reroll button
    this._renderReroll(onReroll, rerollsLeft);

    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  _renderReroll(onReroll, rerollsLeft) {
    if (!this.footerEl) return;
    this.footerEl.innerHTML = "";

    if (rerollsLeft > 0 && onReroll) {
      const rerollBtn = document.createElement("button");
      rerollBtn.type = "button";
      rerollBtn.className = "reroll-button";
      rerollBtn.innerHTML = `🔄 Reroll (${rerollsLeft}x)`;
      rerollBtn.addEventListener("click", onReroll);
      this.footerEl.append(rerollBtn);
    }
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }
}
