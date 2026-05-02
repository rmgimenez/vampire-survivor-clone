import { GAME_DURATION, GAME_STATES } from './config.js';
import { Player } from './entities/player.js';
import { XpOrb } from './entities/xpOrb.js';
import { Renderer } from './renderer.js';
import { aabbOverlap, circlesOverlap } from './systems/collision.js';
import {
  applyUpgrade,
  buildLevelUpChoices,
  gainExperience,
  getXpForLevel,
} from './systems/experience.js';
import { Spawner } from './systems/spawner.js';
import { Aura } from './weapons/aura.js';
import { Knife } from './weapons/knife.js';
import { MagicWand } from './weapons/magicWand.js';
import { Whip } from './weapons/whip.js';

export class Game {
  constructor({ canvas, context, input, hud, levelUpUI, gameOverUI }) {
    this.renderer = new Renderer(canvas, context);
    this.input = input;
    this.hud = hud;
    this.levelUpUI = levelUpUI;
    this.gameOverUI = gameOverUI;
    this.menuScreen = document.getElementById('menu-screen');
    this.pauseScreen = document.getElementById('pause-screen');
    this.spawner = new Spawner();

    this.state = GAME_STATES.MENU;
    this.nextEnemyId = 1;

    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.effects = [];
    this.weapons = [];
    this.elapsed = 0;
    this.pendingLevelUps = 0;
    this.stats = {
      kills: 0,
      damageDone: 0,
      levelUps: 0,
    };
  }

  startNewRun() {
    this.player = new Player(0, 0);
    this.player.nextLevelXp = getXpForLevel(this.player.level);
    this.enemies = [];
    this.projectiles = [];
    this.pickups = [];
    this.effects = [];
    this.weapons = [new MagicWand()];
    this.elapsed = 0;
    this.pendingLevelUps = 0;
    this.stats = { kills: 0, damageDone: 0, levelUps: 0 };
    this.nextEnemyId = 1;
    this.state = GAME_STATES.PLAYING;
    this.spawner.reset();
    this.hideOverlay(this.menuScreen);
    this.hideOverlay(this.pauseScreen);
    this.levelUpUI.hide();
    this.gameOverUI.hide();
    this.hud.update(this);
  }

  update(dt) {
    if (this.input.consumePressed('Escape')) {
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

    this.resolveCollisions();
    this.updateEffects(dt);
    this.cleanupEntities();

    if (this.player.health <= 0) {
      this.finishRun(false);
      return;
    }

    if (this.pendingLevelUps > 0) {
      this.presentLevelUp();
      return;
    }

    this.hud.update(this);
    this.input.clearPressed();
  }

  render() {
    const camera = this.player ? { x: this.player.x, y: this.player.y } : { x: 0, y: 0 };

    this.renderer.clear();
    this.renderer.drawBackground(camera, this.elapsed);

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
        const hitLanded = this.player.takeDamage(enemy.damage);
        if (hitLanded) {
          enemy.contactCooldown = 0.7;
        }
      }
    }

    for (const pickup of this.pickups) {
      if (!pickup.markedForRemoval && circlesOverlap(this.player, pickup, 8)) {
        pickup.markedForRemoval = true;
        gainExperience(this, pickup.value);
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
    this.projectiles = this.projectiles.filter((projectile) => !projectile.destroyed);
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForRemoval);
    this.pickups = this.pickups.filter((pickup) => !pickup.markedForRemoval);
  }

  damageEnemy(enemy, amount) {
    if (enemy.markedForRemoval) {
      return;
    }

    this.stats.damageDone += amount;
    const defeated = enemy.takeDamage(amount);

    if (defeated) {
      enemy.markedForRemoval = true;
      this.stats.kills += 1;
      this.pickups.push(new XpOrb(enemy.x, enemy.y, enemy.xp));
    }
  }

  presentLevelUp() {
    this.state = GAME_STATES.LEVEL_UP;
    const choices = buildLevelUpChoices(this);

    this.levelUpUI.show(choices, (choice) => {
      applyUpgrade(this, choice);
      this.pendingLevelUps -= 1;

      if (this.pendingLevelUps > 0) {
        this.presentLevelUp();
        return;
      }

      this.levelUpUI.hide();
      this.state = GAME_STATES.PLAYING;
    });
  }

  finishRun(win) {
    this.state = win ? GAME_STATES.WIN : GAME_STATES.GAME_OVER;
    this.levelUpUI.hide();
    this.hideOverlay(this.pauseScreen);
    this.gameOverUI.show({
      win,
      elapsed: this.elapsed,
      stats: this.stats,
      playerLevel: this.player.level,
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
  }

  levelUpWeapon(type) {
    const weapon = this.getWeapon(type);
    if (weapon) {
      weapon.levelUp();
    }
  }

  createWeapon(type) {
    switch (type) {
      case 'aura':
        return new Aura();
      case 'knife':
        return new Knife();
      case 'whip':
        return new Whip();
      case 'magicWand':
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
    element.classList.remove('hidden');
    element.classList.add('visible');
  }

  hideOverlay(element) {
    element.classList.add('hidden');
    element.classList.remove('visible');
  }
}
