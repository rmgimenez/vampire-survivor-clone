import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [16, 20, 24, 28, 34, 40, 48, 60];
const MAGIC_WAND_SHOT_SOUND = new Audio("./assets/som/tiro-wand.mp3");
MAGIC_WAND_SHOT_SOUND.preload = "auto";
MAGIC_WAND_SHOT_SOUND.volume = 0.25;

export class MagicWand extends Weapon {
  constructor() {
    super("magicWand", "Magic Wand");
    this.baseCooldown = 0.9;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (game.enemies.length === 0 || this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const targets = game.findNearestEnemies(
      game.player.x,
      game.player.y,
      amount,
    );

    for (let index = 0; index < amount; index += 1) {
      const target =
        targets[index] || game.findNearestEnemy(game.player.x, game.player.y);
      const angle = target
        ? Math.atan2(target.y - game.player.y, target.x - game.player.x)
        : Math.random() * Math.PI * 2;
      const speed = 400 + this.level * 22;
      const radius = (6 + this.level * 0.7) * game.player.areaMultiplier;

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          damage:
            DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier,
          lifetime: 2.4,
          color: "#f8c35c",
          pierce: this.level >= 6 ? 1 : 0,
          homing: 7 + this.level,
        }),
      );
    }

    const sound = MAGIC_WAND_SHOT_SOUND.cloneNode();
    sound.volume = 0.25;
    sound.play().catch(() => {});

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
