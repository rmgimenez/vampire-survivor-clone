import { Game } from "./game.js";
import { InputController } from "./input.js";
import { getActiveProfile } from "./profile.js";
import { GameOverUI } from "./ui/gameover.js";
import { HistoryUI } from "./ui/historyUI.js";
import { HUD } from "./ui/hud.js";
import { LevelUpUI } from "./ui/levelup.js";
import { ProfileSelectUI } from "./ui/profileSelect.js";
import { ShopUI } from "./ui/shop.js";

const canvas = document.getElementById("game-canvas");

if (!canvas) {
  throw new Error("Canvas principal nao encontrado.");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("Canvas 2D nao suportado neste navegador.");
}

const input = new InputController();
const hud = new HUD();
const levelUpUI = new LevelUpUI();
const gameOverUI = new GameOverUI();

const game = new Game({
  canvas,
  context,
  input,
  hud,
  levelUpUI,
  gameOverUI,
});

// ── Profile selection ────────────────────────────────────────────────────────
const profileSelectUI = new ProfileSelectUI(() => {
  profileSelectUI.hide();
  game.profile = getActiveProfile();
  refreshMenuProfile();
  game.showMenu();
});

// ── Shop ─────────────────────────────────────────────────────────────────────
const shopUI = new ShopUI(() => {
  shopUI.hide();
  game.profile = getActiveProfile();
  refreshMenuProfile();
});

// ── History ──────────────────────────────────────────────────────────────────
const historyUI = new HistoryUI(() => {
  historyUI.hide();
});

// ── Menu helpers ─────────────────────────────────────────────────────────────
function refreshMenuProfile() {
  const profile = getActiveProfile();
  if (!profile) return;
  const nameEl = document.getElementById("menu-profile-name");
  const coinsEl = document.getElementById("menu-profile-coins");
  if (nameEl) nameEl.textContent = profile.name;
  if (coinsEl) coinsEl.textContent = `${profile.coins} 🪙`;
}

// ── Button bindings ───────────────────────────────────────────────────────────
document.getElementById("start-button")?.addEventListener("click", () => {
  game.startNewRun();
});

document.getElementById("restart-button")?.addEventListener("click", () => {
  game.profile = getActiveProfile();
  game.startNewRun();
});

document.getElementById("menu-button")?.addEventListener("click", () => {
  game.profile = getActiveProfile();
  refreshMenuProfile();
  game.showMenu();
});

document.getElementById("shop-button")?.addEventListener("click", () => {
  const profile = getActiveProfile();
  if (profile) shopUI.show(profile);
});

document.getElementById("history-button")?.addEventListener("click", () => {
  const profile = getActiveProfile();
  if (profile) historyUI.show(profile);
});

document.getElementById("change-profile-btn")?.addEventListener("click", () => {
  game.hideOverlay(game.menuScreen);
  profileSelectUI.show();
});

// ── Resize ────────────────────────────────────────────────────────────────────
window.addEventListener("resize", () => {
  game.resize();
});

game.resize();

// ── Initial state: always start at profile selection ─────────────────────────
game.state = "MENU"; // keep game loop in idle state

const existing = getActiveProfile();
if (existing) {
  // Returning player — skip straight to menu
  game.profile = existing;
  refreshMenuProfile();
  game.showMenu();
} else {
  // First launch — show profile screen
  profileSelectUI.show();
}

// ── Game loop ─────────────────────────────────────────────────────────────────
let previousTimestamp = performance.now();

function gameLoop(timestamp) {
  const dt = Math.min(0.033, (timestamp - previousTimestamp) / 1000);
  previousTimestamp = timestamp;

  game.update(dt);
  game.render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
