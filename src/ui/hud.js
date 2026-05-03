import { GAME_DURATION } from "../config.js";
import { t } from "../i18n.js";

function formatTime(seconds) {
  const clamped = Math.max(0, Math.floor(seconds));
  const minutes = String(Math.floor(clamped / 60)).padStart(2, "0");
  const remainingSeconds = String(clamped % 60).padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

export class HUD {
  constructor() {
    this.healthText = document.getElementById("health-text");
    this.healthFill = document.getElementById("health-fill");
    this.timerText = document.getElementById("timer-text");
    this.levelText = document.getElementById("level-text");
    this.xpText = document.getElementById("xp-text");
    this.xpFill = document.getElementById("xp-fill");
    this.weaponList = document.getElementById("weapon-list");
  }

  update(game) {
    if (!game.player) {
      return;
    }

    const player = game.player;
    const healthRatio = Math.max(0, player.health / player.maxHealth) * 100;
    const xpRatio = Math.max(0, player.experience / player.nextLevelXp) * 100;

    this.healthText.textContent = `${Math.ceil(player.health)} / ${player.maxHealth}`;
    this.healthFill.style.width = `${healthRatio}%`;
    this.timerText.textContent = formatTime(
      Math.min(game.elapsed, GAME_DURATION),
    );
    this.levelText.textContent = `${t("hud.level")} ${player.level}`;
    this.xpText.textContent = `${Math.floor(player.experience)} / ${player.nextLevelXp} XP`;
    this.xpFill.style.width = `${xpRatio}%`;

    this.weaponList.innerHTML = "";
    for (const weapon of game.weapons) {
      const chip = document.createElement("div");
      chip.className = "weapon-chip";
      chip.textContent = `${weapon.name} L${weapon.level}`;
      this.weaponList.append(chip);
    }
  }
}
