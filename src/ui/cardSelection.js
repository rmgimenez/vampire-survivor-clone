import {
  CARD_KINDS,
  CARD_RARITIES,
  MAX_SELECTED_CARDS,
  getAllCards,
  getCardKindMeta,
  getCardRarityMeta,
} from "../cards.js";
import { t } from "../i18n.js";

const RARITY_ORDER = Object.keys(CARD_RARITIES);
const KIND_ORDER = Object.keys(CARD_KINDS);

function sortCards(unlockedIds) {
  const unlocked = new Set(unlockedIds);

  return [...getAllCards()].sort((left, right) => {
    const unlockedDelta =
      Number(unlocked.has(right.id)) - Number(unlocked.has(left.id));
    if (unlockedDelta !== 0) {
      return unlockedDelta;
    }

    const rarityDelta =
      RARITY_ORDER.indexOf(right.rarity) - RARITY_ORDER.indexOf(left.rarity);
    if (rarityDelta !== 0) {
      return rarityDelta;
    }

    const kindDelta =
      KIND_ORDER.indexOf(left.kind ?? "blessing") -
      KIND_ORDER.indexOf(right.kind ?? "blessing");
    if (kindDelta !== 0) {
      return kindDelta;
    }

    return left.id.localeCompare(right.id);
  });
}

export class CardSelectionUI {
  constructor({ onConfirm, onBack }) {
    this.screen = document.getElementById("card-select-screen");
    this.grid = document.getElementById("card-select-grid");
    this.collectionEl = document.getElementById("card-select-collection");
    this.statusEl = document.getElementById("card-select-status");
    this.hintEl = document.getElementById("card-select-hint");
    this.startButton = document.getElementById("card-select-start");
    this.backButton = document.getElementById("card-select-back");
    this.profile = null;
    this.selectedIds = [];
    this.onConfirm = onConfirm;
    this.onBack = onBack;

    this.startButton?.addEventListener("click", () => {
      this.onConfirm?.([...this.selectedIds]);
    });

    this.backButton?.addEventListener("click", () => {
      this.onBack?.();
    });

    window.addEventListener("languagechange", () => {
      if (
        this.profile &&
        this.screen &&
        !this.screen.classList.contains("hidden")
      ) {
        this.render();
      }
    });
  }

  show(profile) {
    this.profile = profile;
    const unlockedIds = profile?.cards?.unlocked ?? [];
    this.selectedIds = [...(profile?.cards?.selected ?? [])].filter((cardId) =>
      unlockedIds.includes(cardId),
    );
    this.render();
    this.screen?.classList.remove("hidden");
    this.screen?.classList.add("visible");
  }

  hide() {
    this.screen?.classList.add("hidden");
    this.screen?.classList.remove("visible");
  }

  toggle(cardId) {
    const unlocked = new Set(this.profile?.cards?.unlocked ?? []);
    if (!unlocked.has(cardId)) {
      return;
    }

    if (this.selectedIds.includes(cardId)) {
      this.selectedIds = this.selectedIds.filter((id) => id !== cardId);
      this.render();
      return;
    }

    if (this.selectedIds.length >= MAX_SELECTED_CARDS) {
      return;
    }

    this.selectedIds = [...this.selectedIds, cardId];
    this.render();
  }

  render() {
    if (!this.profile || !this.grid) {
      return;
    }

    const unlockedIds = this.profile.cards?.unlocked ?? [];
    const unlocked = new Set(unlockedIds);
    const cards = sortCards(unlockedIds);

    if (this.collectionEl) {
      this.collectionEl.textContent = t("cards.collection", {
        count: unlocked.size,
        total: cards.length,
      });
    }

    if (this.statusEl) {
      this.statusEl.textContent = t("cards.selection", {
        count: this.selectedIds.length,
        max: MAX_SELECTED_CARDS,
      });
    }

    if (this.hintEl) {
      this.hintEl.textContent =
        unlocked.size > 0 ? t("cards.chooseHint") : t("cards.empty");
    }

    if (this.startButton) {
      this.startButton.textContent = t(
        unlocked.size > 0 ? "cards.startBtn" : "cards.startWithout",
      );
    }

    this.grid.innerHTML = "";

    for (const card of cards) {
      const rarity = getCardRarityMeta(card.rarity);
      const kind = getCardKindMeta(card.kind);
      const isUnlocked = unlocked.has(card.id);
      const isSelected = this.selectedIds.includes(card.id);
      const button = document.createElement("button");
      button.type = "button";
      button.className = [
        "run-card",
        kind.className,
        rarity.className,
        isUnlocked ? "is-unlocked" : "is-locked",
        isSelected ? "is-selected" : "",
      ]
        .filter(Boolean)
        .join(" ");
      button.disabled = !isUnlocked;
      button.innerHTML = `
        <div class="run-card-head">
          <span class="run-card-icon">${card.icon}</span>
          <div class="run-card-meta">
            <strong class="run-card-title">${t(card.titleKey)}</strong>
            <div class="run-card-badges">
              <span class="run-card-kind ${kind.className}">${t(kind.labelKey)}</span>
              <span class="run-card-rarity ${rarity.className}">${t(rarity.labelKey)}</span>
            </div>
          </div>
        </div>
        <p class="run-card-desc">${t(card.descKey)}</p>
        <div class="run-card-foot">
          <span class="run-card-state ${isUnlocked ? "is-on" : "is-off"}">${t(
            isUnlocked ? "cards.unlocked" : "cards.locked",
          )}</span>
          ${isSelected ? '<span class="run-card-picked">✓</span>' : ""}
        </div>
      `;

      if (isUnlocked) {
        button.addEventListener("click", () => this.toggle(card.id));
      }

      this.grid.append(button);
    }
  }
}
