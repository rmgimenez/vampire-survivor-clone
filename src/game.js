import { GAME_DURATION, GAME_STATES } from "./config.js";
import { applyCardWeaponSynergies, applySelectedCards } from "./cards.js";
import { Player } from "./entities/player.js";
import { XpOrb } from "./entities/xpOrb.js";
import { ChestPickup } from "./entities/chestPickup.js";
import { Obstacle } from "./entities/obstacle.js";
import { calculateCoins, saveRun } from "./profile.js";
import { Renderer } from "./renderer.js";
import { aabbOverlap, circlesOverlap } from "./systems/collision.js";
import {
  applySynergies,
  applyUpgrade,
  buildLevelUpChoices,
  gainExperience,
  getXpForLevel,
} from "./systems/experience.js";
import { Spawner } from "./systems/spawner.js";
import { Aura } from "./weapons/aura.js";
import { ChaosOrb } from "./weapons/chaosOrb.js";
import { Crossbow } from "./weapons/crossbow.js";
import { Fireball } from "./weapons/fireball.js";
import { IceShard } from "./weapons/iceShard.js";
import { Knife } from "./weapons/knife.js";
import { MagicWand } from "./weapons/magicWand.js";
import { Meteor } from "./weapons/meteor.js";
import { ShadowBlade } from "./weapons/shadowBlade.js";
import { Shuriken } from "./weapons/shuriken.js";
import { SoulSiphon } from "./weapons/soulSiphon.js";
import { Thunderbolt } from "./weapons/thunderbolt.js";
import { Vortex } from "./weapons/vortex.js";
import { Whip } from "./weapons/whip.js";

function createRunStats() {
  return {
    kills: 0,
    killsByType: {},
    damageDone: 0,
    levelUps: 0,
    coinsEarned: 0,
    rerollsUsed: 0,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function circleRectOverlap(circle, rect) {
  const closestX = clamp(circle.x, rect.left, rect.right);
  const closestY = clamp(circle.y, rect.top, rect.bottom);
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  const distanceSquared = dx * dx + dy * dy;
  const radiusSquared = circle.radius * circle.radius;
  return {
    overlap: distanceSquared < radiusSquared,
    dx,
    dy,
    distanceSquared,
  };
}

function pushCircleOutOfRect(circle, rect) {
  const overlapInfo = circleRectOverlap(circle, rect);
  if (!overlapInfo.overlap) {
    return null;
  }

  const dist = Math.sqrt(Math.max(0.0001, overlapInfo.distanceSquared));
  const pushDistance = circle.radius - dist;
  const directionX = dist > 0 ? overlapInfo.dx / dist : 1;
  const directionY = dist > 0 ? overlapInfo.dy / dist : 0;

  return {
    x: directionX * pushDistance,
    y: directionY * pushDistance,
  };
}

export class Game {
  constructor({ canvas, context, input, hud, levelUpUI, gameOverUI }) {
    this.renderer = new Renderer(canvas, context);
    this.input = input;
    this.hud = hud;
    this.levelUpUI = levelUpUI;
    this.gameOverUI = gameOverUI;
    this.menuScreen = document.getElementById("menu-screen");
    this.pauseScreen = document.getElementById("pause-screen");
    this.spawner = new Spawner();

    this.state = GAME_STATES.MENU;
    this.nextEnemyId = 1;

    /** @type {import('./profile.js').Profile|null} */
    this.profile = null;

    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.effects = [];
    this.obstacles = [];
    this.weapons = [];
    this.elapsed = 0;
    this.pendingLevelUps = 0;
    this.stats = createRunStats();
    this.selectedCardIds = [];
    this.latestUnlockedCardIds = [];
    this.activeCards = [];
  }

  startNewRun(selectedCardIds = this.profile?.cards?.selected ?? []) {
    this.player = new Player(0, 0);
    this.player.nextLevelXp = getXpForLevel(this.player.level);

    // Apply permanent meta-upgrades from the active profile
    if (this.profile) {
      const meta = this.profile.metaUpgrades;
      const healthBonus = (meta.startHealth ?? 0) * 20;
      this.player.maxHealth += healthBonus;
      this.player.health = this.player.maxHealth;
      this.player.damageMultiplier *= 1 + (meta.startDamage ?? 0) * 0.1;
      this.player.moveSpeed *= 1 + (meta.startSpeed ?? 0) * 0.08;
      this.player.cooldownMultiplier *= Math.max(
        0.2,
        1 - (meta.startCooldown ?? 0) * 0.08,
      );
      this.player.recovery += (meta.recovery ?? 0) * 0.3;
    }

    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.effects = [];
    this.obstacles = this.generateObstacles();
    this.weapons = [new MagicWand()];
    this.elapsed = 0;
    this.pendingLevelUps = 0;
    this.stats = createRunStats();
    this.nextEnemyId = 1;
    this.state = GAME_STATES.PLAYING;
    this.spawner.reset();
    this._appliedSynergies = new Set();
    this._appliedCardWeaponSynergies = new Set();
    this.selectedCardIds = [...selectedCardIds];
    this.latestUnlockedCardIds = [];
    this.activeCards = applySelectedCards(this, this.selectedCardIds);
    applySynergies(this);
    applyCardWeaponSynergies(this);
    this.hideOverlay(this.menuScreen);
    this.hideOverlay(this.pauseScreen);
    this.levelUpUI.hide();
    this.gameOverUI.hide();
    this.hud.update(this);
  }

  update(dt) {
    if (this.input.consumePressed("Escape")) {
      if (this.state === GAME_STATES.PLAYING) {
        this.state = GAME_STATES.PAUSED;
        this.showOverlay(this.pauseScreen);
      } else if (this.state === GAME_STATES.PAUSED) {
        this.state = GAME_STATES.PLAYING;
        this.hideOverlay(this.pauseScreen);
      }
    }

    if (this.state !== GAME_STATES.PLAYING) {
      this.updateEffects(dt);
      this.hud.update(this);
      this.input.clearPressed();
      return;
    }

    this.elapsed += dt;

    if (this.elapsed >= GAME_DURATION) {
      this.finishRun(true);
      return;
    }

    this.player.update(dt, this.input);
    this.spawner.update(dt, this);

    for (const weapon of this.weapons) {
      weapon.update(dt, this);
    }

    for (const projectile of this.projectiles) {
      projectile.update(dt, this);
    }

    for (const enemy of this.enemies) {
      enemy.update(dt, this.player);
    }

    for (const pickup of this.pickups) {
      pickup.update(dt, this.player);
    }

    this.resolveObstacleCollisions();
    this.resolveCollisions();
    this.updateEffects(dt);
    this.cleanupEntities();

    if (this.player.health <= 0) {
      if (this.player.reviveCharges > 0) {
        this.player.reviveCharges -= 1;
        this.player.health = Math.max(
          1,
          Math.round(this.player.maxHealth * this.player.reviveHealRatio),
        );
        this.player.invulnerableTimer = Math.max(
          this.player.invulnerableTimer,
          1.4,
        );
      } else {
        this.finishRun(false);
        return;
      }
    }

    if (this.pendingLevelUps > 0) {
      this.presentLevelUp();
      return;
    }

    this.hud.update(this);
    this.input.clearPressed();
  }

  render() {
    const camera = this.player
      ? { x: this.player.x, y: this.player.y }
      : { x: 0, y: 0 };

    this.renderer.clear();
    this.renderer.drawBackground(camera, this.elapsed);

    for (const obstacle of this.obstacles) {
      this.renderer.drawObstacle(obstacle, camera);
    }

    for (const pickup of this.pickups) {
      this.renderer.drawPickup(pickup, camera);
    }

    for (const effect of this.effects) {
      this.renderer.drawEffect(effect, camera);
    }

    for (const enemy of this.enemies) {
      this.renderer.drawEntity(enemy, camera);
      this.renderer.drawEnemyHealth(enemy, camera);
    }

    for (const projectile of this.projectiles) {
      this.renderer.drawProjectile(projectile, camera);
    }

    if (this.player) {
      this.renderer.drawPlayer(this.player, camera);
    }
  }

  resolveCollisions() {
    for (const projectile of this.projectiles) {
      if (projectile.destroyed) {
        continue;
      }

      for (const obstacle of this.obstacles) {
        if (
          obstacle.getBounds &&
          aabbOverlap(projectile.getBounds(), obstacle.getBounds())
        ) {
          projectile.destroyed = true;
          break;
        }
      }

      if (projectile.destroyed) {
        continue;
      }

      for (const enemy of this.enemies) {
        if (enemy.markedForRemoval || projectile.hitEnemyIds.has(enemy.id)) {
          continue;
        }

        if (aabbOverlap(projectile.getBounds(), enemy.getBounds())) {
          projectile.hitEnemyIds.add(enemy.id);
          this.damageEnemy(enemy, projectile.damage);
          projectile.remainingHits -= 1;

          if (projectile.remainingHits <= 0) {
            projectile.destroyed = true;
            break;
          }
        }
      }
    }

    for (const enemy of this.enemies) {
      if (
        !enemy.markedForRemoval &&
        circlesOverlap(this.player, enemy) &&
        enemy.contactCooldown <= 0
      ) {
        const result = this.player.takeDamage(enemy.damage);

        if (result) {
          enemy.contactCooldown = 0.7;

          // Thorns — reflect damage back
          const thornsDmg = result.thorns ?? 0;
          if (thornsDmg > 0) {
            this.damageEnemy(enemy, thornsDmg);
          }

          // Life Steal — heal on taking damage (extra life steal effect)
          if (this.player.lifeSteal > 0) {
            this.player.heal(this.player.lifeSteal);
          }
        }
      }
    }

    for (const pickup of this.pickups) {
      if (!pickup.markedForRemoval && circlesOverlap(this.player, pickup, 8)) {
        pickup.markedForRemoval = true;

        if (pickup.kind === "xp") {
          gainExperience(this, pickup.value);
        } else if (pickup.kind === "health") {
          this.player.heal(pickup.value);
        } else if (pickup.kind === "upgrade") {
          this.pendingLevelUps += 1;
        }
      }
    }
  }

  updateEffects(dt) {
    for (const effect of this.effects) {
      effect.ttl -= dt;
    }

    this.effects = this.effects.filter((effect) => effect.ttl > 0);
  }

  cleanupEntities() {
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.destroyed,
    );
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForRemoval);
    this.pickups = this.pickups.filter((pickup) => !pickup.markedForRemoval);
  }

  resolveObstacleCollisions() {
    const pushEntities = [this.player, ...this.enemies];

    for (const entity of pushEntities) {
      if (!entity || !entity.radius) {
        continue;
      }

      // Ghosts phase through obstacles
      if (entity.isGhost) {
        continue;
      }

      for (const obstacle of this.obstacles) {
        const rect = obstacle.getBounds();
        const push = pushCircleOutOfRect(entity, rect);
        if (!push) {
          continue;
        }

        entity.x += push.x;
        entity.y += push.y;
      }
    }
  }

  generateObstacles() {
    const obstacles = [];
    const baseColors = ["#4a5d6c", "#556d82", "#3f5060"];

    for (let index = 0; index < 10; index += 1) {
      const angle = (index / 10) * Math.PI * 2;
      const distance = 240 + Math.random() * 360;
      const width = 72 + Math.random() * 80;
      const height = 42 + Math.random() * 64;
      const x = Math.cos(angle) * distance + (Math.random() * 120 - 60);
      const y = Math.sin(angle) * distance + (Math.random() * 120 - 60);
      const color = baseColors[index % baseColors.length];

      obstacles.push(new Obstacle({ x, y, width, height, color }));
    }

    obstacles.push(
      new Obstacle({
        x: -120,
        y: -150,
        width: 180,
        height: 90,
        color: "#556d82",
      }),
    );
    obstacles.push(
      new Obstacle({
        x: 130,
        y: 110,
        width: 160,
        height: 72,
        color: "#3f5060",
      }),
    );

    return obstacles;
  }

  damageEnemy(enemy, amount) {
    if (enemy.markedForRemoval) {
      return;
    }

    const player = this.player;
    let finalDamage = amount;

    // Critical Strike — double damage proc
    let isCrit = false;
    if (player.critChance > 0 && Math.random() < player.critChance) {
      finalDamage = Math.round(amount * player.critMultiplier);
      isCrit = true;
    }

    this.stats.damageDone += finalDamage;

    // Freeze — apply slow to enemy
    if (player.freezeChance > 0 && Math.random() < player.freezeChance) {
      enemy.frozenTimer = 1.5; // frozen for 1.5s
    }

    const defeated = enemy.takeDamage(finalDamage);

    if (isCrit) {
      this.addEffect(enemy.x, enemy.y, "crit", 0.3);
    }

    if (defeated) {
      enemy.markedForRemoval = true;
      this.stats.kills += 1;
      this.stats.killsByType[enemy.type] =
        (this.stats.killsByType[enemy.type] ?? 0) + 1;

      // Life Steal — heal on kill
      if (player.lifeSteal > 0) {
        player.heal(player.lifeSteal);
      }

      // Bounty — extra XP
      const xpAmount = Math.round(enemy.xp * (1 + player.bountyMultiplier));
      this.pickups.push(new XpOrb(enemy.x, enemy.y, xpAmount));

      // Explosion — chain damage nearby enemies
      if (
        player.explosionChance > 0 &&
        Math.random() < player.explosionChance
      ) {
        const explosionRadius = 80 + player.explosionRadius;
        const explosionDamage = Math.round(10 + player.thorns * 2);
        this.addEffect(enemy.x, enemy.y, "explosion", 0.35);

        for (const other of this.enemies) {
          if (other === enemy || other.markedForRemoval) continue;
          const dx = other.x - enemy.x;
          const dy = other.y - enemy.y;
          if (dx * dx + dy * dy < explosionRadius * explosionRadius) {
            this.damageEnemy(other, explosionDamage);
          }
        }
      }

      if (Math.random() < this.getChestDropChance(enemy)) {
        this.pickups.push(this.createChestPickup(enemy));
      }
    }
  }

  addEffect(x, y, kind, ttl) {
    this.effects.push({ x, y, kind, ttl });
  }

  getChestDropChance(enemy) {
    return enemy.isBoss ? 0.35 : 0.01;
  }

  createChestPickup(enemy) {
    const kinds = ["xp", "health", "upgrade"];
    const kind = kinds[Math.floor(Math.random() * kinds.length)];
    const baseValue = Math.max(5, Math.round(enemy.xp * 3));

    if (kind === "xp") {
      return new ChestPickup(enemy.x, enemy.y, "xp", baseValue + 3);
    }

    if (kind === "health") {
      return new ChestPickup(
        enemy.x,
        enemy.y,
        "health",
        Math.round(12 + enemy.xp * 2.5),
      );
    }

    return new ChestPickup(enemy.x, enemy.y, "upgrade", 1);
  }

  presentLevelUp() {
    this.state = GAME_STATES.LEVEL_UP;
    const maxRerolls = 5;
    const used = this.stats.rerollsUsed ?? 0;
    const rerollsLeft = maxRerolls - used;

    const showChoices = () => {
      const choices = buildLevelUpChoices(this);
      this.levelUpUI.show(
        choices,
        (choice) => {
          applyUpgrade(this, choice);
          this.pendingLevelUps -= 1;

          if (this.pendingLevelUps > 0) {
            this.presentLevelUp();
            return;
          }
          this.levelUpUI.hide();
          this.state = GAME_STATES.PLAYING;
        },
        () => {
          // Reroll handler
          this.stats.rerollsUsed = (this.stats.rerollsUsed ?? 0) + 1;
          showChoices();
        },
        maxRerolls - (this.stats.rerollsUsed ?? 0),
      );
    };

    showChoices();
  }

  finishRun(win) {
    this.state = win ? GAME_STATES.WIN : GAME_STATES.GAME_OVER;

    // Calculate and persist coins
    let coinsEarned = 0;
    let unlockedCardIds = [];
    if (this.profile) {
      const coinBonusLevel = this.profile.metaUpgrades.coinBonus ?? 0;
      coinsEarned = calculateCoins(
        this.stats.kills,
        this.elapsed,
        win,
        coinBonusLevel,
      );
      const saveResult = saveRun(this.profile.id, {
        win,
        elapsed: this.elapsed,
        kills: this.stats.kills,
        killsByType: { ...this.stats.killsByType },
        level: this.player.level,
        damageDone: Math.round(this.stats.damageDone),
        levelUps: this.stats.levelUps,
        coinsEarned,
      });
      if (saveResult?.profile) {
        this.profile = saveResult.profile;
        unlockedCardIds = saveResult.unlockedCardIds ?? [];
      }
    }
    this.stats.coinsEarned = coinsEarned;
    this.latestUnlockedCardIds = unlockedCardIds;

    this.levelUpUI.hide();
    this.hideOverlay(this.pauseScreen);
    this.gameOverUI.show({
      win,
      elapsed: this.elapsed,
      stats: this.stats,
      playerLevel: this.player.level,
      coinsEarned,
      totalCoins: this.profile?.coins ?? 0,
      unlockedCardIds,
    });
  }

  getWeapon(type) {
    return this.weapons.find((weapon) => weapon.type === type) || null;
  }

  unlockWeapon(type) {
    if (this.getWeapon(type)) {
      return;
    }

    this.weapons.push(this.createWeapon(type));
    applySynergies(this);
    applyCardWeaponSynergies(this);
  }

  levelUpWeapon(type) {
    const weapon = this.getWeapon(type);
    if (weapon) {
      weapon.levelUp();
      applySynergies(this);
      applyCardWeaponSynergies(this);
    }
  }

  createWeapon(type) {
    switch (type) {
      case "aura":
        return new Aura();
      case "chaosOrb":
        return new ChaosOrb();
      case "crossbow":
        return new Crossbow();
      case "fireball":
        return new Fireball();
      case "iceShard":
        return new IceShard();
      case "knife":
        return new Knife();
      case "meteor":
        return new Meteor();
      case "shadowBlade":
        return new ShadowBlade();
      case "shuriken":
        return new Shuriken();
      case "soulSiphon":
        return new SoulSiphon();
      case "thunderbolt":
        return new Thunderbolt();
      case "vortex":
        return new Vortex();
      case "whip":
        return new Whip();
      case "magicWand":
      default:
        return new MagicWand();
    }
  }

  findNearestEnemy(x, y) {
    let nearestEnemy = null;
    let nearestDistance = Infinity;

    for (const enemy of this.enemies) {
      if (enemy.markedForRemoval) {
        continue;
      }

      const dx = enemy.x - x;
      const dy = enemy.y - y;
      const distance = dx * dx + dy * dy;

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEnemy = enemy;
      }
    }

    return nearestEnemy;
  }

  findNearestEnemies(x, y, count) {
    return [...this.enemies]
      .filter((enemy) => !enemy.markedForRemoval)
      .sort((left, right) => {
        const leftDistance = (left.x - x) ** 2 + (left.y - y) ** 2;
        const rightDistance = (right.x - x) ** 2 + (right.y - y) ** 2;
        return leftDistance - rightDistance;
      })
      .slice(0, count);
  }

  resize() {
    this.renderer.resize();
  }

  showMenu() {
    this.state = GAME_STATES.MENU;
    this.showOverlay(this.menuScreen);
    this.hideOverlay(this.pauseScreen);
    this.levelUpUI.hide();
    this.gameOverUI.hide();
  }

  showOverlay(element) {
    element.classList.remove("hidden");
    element.classList.add("visible");
  }

  hideOverlay(element) {
    element.classList.add("hidden");
    element.classList.remove("visible");
  }
}
