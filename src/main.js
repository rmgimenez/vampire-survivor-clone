import { Game } from './game.js';
import { InputController } from './input.js';
import { GameOverUI } from './ui/gameover.js';
import { HUD } from './ui/hud.js';
import { LevelUpUI } from './ui/levelup.js';

const canvas = document.getElementById('game-canvas');

if (!canvas) {
  throw new Error('Canvas principal nao encontrado.');
}

const context = canvas.getContext('2d');

if (!context) {
  throw new Error('Canvas 2D nao suportado neste navegador.');
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

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

startButton?.addEventListener('click', () => {
  game.startNewRun();
});

restartButton?.addEventListener('click', () => {
  game.startNewRun();
});

window.addEventListener('resize', () => {
  game.resize();
});

game.resize();
game.showMenu();

let previousTimestamp = performance.now();

function gameLoop(timestamp) {
  const dt = Math.min(0.033, (timestamp - previousTimestamp) / 1000);
  previousTimestamp = timestamp;

  game.update(dt);
  game.render();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
