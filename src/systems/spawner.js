import { ENEMY_TYPES, SCREEN_SAFE_SPAWN_MARGIN } from "../config.js";
import { Enemy } from "../entities/enemy.js";
import {
  chooseEnemyType,
  getDifficulty,
  getEliteInterval,
  getEliteScale,
  getBossScale,
  getEnemyCap,
  getGroupSize,
  getSpawnInterval,
  pickEliteType,
} from "./waves.js";

export class Spawner {
  constructor() {
    this.spawnTimer = 0;
    this.eliteTimer = 0;
    this.bossMilestones = new Set();
  }

  reset() {
    this.spawnTimer = 0;
    this.eliteTimer = 0;
    this.bossMilestones.clear();
  }

  update(dt, game) {
    const kills = game.stats.kills;

    if (game.enemies.length < getEnemyCap(game.elapsed, kills)) {
      this.spawnTimer -= dt;

      if (this.spawnTimer <= 0) {
        const count = getGroupSize(game.elapsed, kills);
        for (let index = 0; index < count; index += 1) {
          this.spawnEnemy(
            game,
            chooseEnemyType(game.elapsed, Math.random(), kills),
          );
        }

        this.spawnTimer = getSpawnInterval(game.elapsed, kills);
      }
    }

    // Elite spawns — mini-bosses every ~2 minutes
    this.eliteTimer -= dt;
    if (this.eliteTimer <= 0 && game.elapsed > 120) {
      const eliteType = pickEliteType(game.elapsed);
      const eliteConfig = ENEMY_TYPES[eliteType];
      if (eliteConfig) {
        this.spawnElite(game, eliteType);
      }
      this.eliteTimer = getEliteInterval(game.elapsed);
    }

    // Boss spawns every 8 minutes
    const currentMilestone = Math.floor(game.elapsed / 480);
    if (currentMilestone > 0 && !this.bossMilestones.has(currentMilestone)) {
      this.bossMilestones.add(currentMilestone);
      this.spawnBoss(game);
    }
  }

  spawnEnemy(game, enemyType) {
    const enemyConfig = ENEMY_TYPES[enemyType];
    const position = this.getSpawnPosition(game);
    const difficulty = getDifficulty(game.elapsed, game.stats.kills);
    const scale = 1 + Math.max(0, difficulty - 1) * 0.28;

    game.enemies.push(
      new Enemy({
        id: game.nextEnemyId++,
        x: position.x,
        y: position.y,
        config: enemyConfig,
        scale,
      }),
    );
  }

  /**
   * Spawns an elite (mini-boss) — tougher, bigger, drops better loot.
   */
  spawnElite(game, eliteType) {
    const eliteConfig = { ...ENEMY_TYPES[eliteType] };
    eliteConfig.name = `Elite ${eliteConfig.name}`;
    eliteConfig.isBoss = false;
    eliteConfig.isElite = true;

    const eliteScale = getEliteScale(game.elapsed);
    const position = this.getSpawnPosition(game, 80);

    const elite = new Enemy({
      id: game.nextEnemyId++,
      x: position.x,
      y: position.y,
      config: eliteConfig,
      scale: eliteScale * 1.3,
    });

    // Boosted stats
    elite.maxHealth = Math.round(elite.maxHealth * 2.5);
    elite.health = elite.maxHealth;
    elite.damage = Math.round(elite.damage * 1.6);
    elite.xp = Math.round(elite.xp * 4);
    elite.radius = elite.baseRadius * 1.4;
    elite.color = "#ff6b9d"; // pink glow for elites
    game.enemies.push(elite);
  }

  spawnBoss(game) {
    const position = this.getSpawnPosition(game, 320);
    const bossScale = getBossScale(game.elapsed);

    game.enemies.push(
      new Enemy({
        id: game.nextEnemyId++,
        x: position.x,
        y: position.y,
        config: ENEMY_TYPES.boss,
        scale: bossScale,
      }),
    );
  }

  getSpawnPosition(game, extraMargin = 0) {
    const { width, height } = game.renderer.viewport;
    const margin = SCREEN_SAFE_SPAWN_MARGIN + extraMargin;
    const halfWidth = width / 2 + margin;
    const halfHeight = height / 2 + margin;
    const side = Math.floor(Math.random() * 4);
    const offsetX = (Math.random() * 2 - 1) * halfWidth;
    const offsetY = (Math.random() * 2 - 1) * halfHeight;

    if (side === 0) {
      return { x: game.player.x + offsetX, y: game.player.y - halfHeight };
    }

    if (side === 1) {
      return { x: game.player.x + halfWidth, y: game.player.y + offsetY };
    }

    if (side === 2) {
      return { x: game.player.x + offsetX, y: game.player.y + halfHeight };
    }

    return { x: game.player.x - halfWidth, y: game.player.y + offsetY };
  }
}
