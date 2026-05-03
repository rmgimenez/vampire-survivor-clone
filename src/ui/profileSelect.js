import {
  createProfile,
  deleteProfile,
  getProfiles,
  setActiveProfile,
} from "../profile.js";

function esc(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export class ProfileSelectUI {
  constructor(onProfileSelected) {
    this.screen = document.getElementById("profile-screen");
    this.listEl = document.getElementById("profile-list");
    this.nameInput = document.getElementById("profile-name-input");
    this.createBtn = document.getElementById("profile-create-btn");
    this.onProfileSelected = onProfileSelected;

    this.createBtn.addEventListener("click", () => this._onCreate());
    this.nameInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this._onCreate();
    });
  }

  show() {
    this._render();
    this.screen.classList.remove("hidden");
    this.screen.classList.add("visible");
  }

  hide() {
    this.screen.classList.add("hidden");
    this.screen.classList.remove("visible");
  }

  _render() {
    const profiles = getProfiles();
    this.listEl.innerHTML = "";

    if (profiles.length === 0) {
      this.listEl.innerHTML =
        '<p class="muted-hint">Nenhum perfil ainda. Crie um abaixo.</p>';
      return;
    }

    for (const profile of profiles) {
      const runs = profile.runs.length;
      const wins = profile.runs.filter((r) => r.win).length;
      const bestKills =
        runs > 0 ? Math.max(...profile.runs.map((r) => r.kills)) : 0;

      const card = document.createElement("div");
      card.className = "profile-card";
      card.innerHTML = `
        <div class="profile-avatar">${esc(profile.name[0].toUpperCase())}</div>
        <div class="profile-info">
          <strong class="profile-name">${esc(profile.name)}</strong>
          <span class="profile-meta">
            ${runs} run${runs !== 1 ? "s" : ""}
            &nbsp;·&nbsp; ${wins} vitória${wins !== 1 ? "s" : ""}
            &nbsp;·&nbsp; ${profile.coins} 🪙
            &nbsp;·&nbsp; melhor: ${bestKills} abates
          </span>
        </div>
        <div class="profile-actions">
          <button class="select-btn primary-button small-button" data-id="${esc(profile.id)}">Jogar</button>
          <button class="delete-btn danger-button small-button" data-id="${esc(profile.id)}" title="Apagar perfil">✕</button>
        </div>
      `;
      this.listEl.append(card);
    }

    this.listEl.querySelectorAll(".select-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        setActiveProfile(btn.dataset.id);
        this.onProfileSelected();
      });
    });

    this.listEl.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (
          confirm(
            "Apagar este perfil permanentemente? Esta ação não pode ser desfeita.",
          )
        ) {
          deleteProfile(btn.dataset.id);
          this._render();
        }
      });
    });
  }

  _onCreate() {
    const name = this.nameInput.value.trim();
    if (!name) {
      this.nameInput.focus();
      return;
    }
    createProfile(name);
    this.nameInput.value = "";
    this.onProfileSelected();
  }
}
