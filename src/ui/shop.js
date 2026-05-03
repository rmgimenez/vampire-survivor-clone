import { META_UPGRADES, purchaseUpgrade } from "../profile.js";

export class ShopUI {
  constructor(onClose) {
    this.screen = document.getElementById("shop-screen");
    this.gridEl = document.getElementById("shop-grid");
    this.coinsEl = document.getElementById("shop-coins");
    this.closeBtn = document.getElementById("shop-close-btn");
    this.onClose = onClose;
    this._profile = null;

    this.closeBtn.addEventListener("click", () => this.onClose());
  }

  show(profile) {
    this._profile = profile;
    this._render();
    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }

  _render() {
    const profile = this._profile;
    this.coinsEl.textContent = `${profile.coins} 🪙`;
    this.gridEl.innerHTML = "";

    for (const upg of META_UPGRADES) {
      const level = profile.metaUpgrades[upg.id] ?? 0;
      const maxed = level >= upg.maxLevel;
      const cost = maxed ? null : upg.costs[level];
      const canAfford = !maxed && profile.coins >= cost;

      const card = document.createElement("div");
      card.className = "shop-card";
      card.innerHTML = `
        <div class="shop-icon">${upg.icon}</div>
        <strong class="shop-title">${upg.title}</strong>
        <p class="shop-desc">${upg.description}</p>
        <div class="shop-level-dots">
          ${Array.from(
            { length: upg.maxLevel },
            (_, i) => `<span class="dot${i < level ? " filled" : ""}"></span>`,
          ).join("")}
        </div>
        <button
          class="buy-btn ${canAfford ? "primary-button" : maxed ? "maxed-button" : "disabled-button"} small-button"
          ${maxed || !canAfford ? "disabled" : ""}
          data-id="${upg.id}">
          ${maxed ? "MÁXIMO" : `${cost} 🪙`}
        </button>
      `;
      this.gridEl.append(card);
    }

    this.gridEl.querySelectorAll(".buy-btn:not([disabled])").forEach((btn) => {
      btn.addEventListener("click", () => {
        const updated = purchaseUpgrade(profile.id, btn.dataset.id);
        if (updated) {
          this._profile = updated;
          this._render();
        }
      });
    });
  }
}
