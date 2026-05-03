import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [24, 29, 34, 40, 46, 54, 64, 78];

export class Fireball extends Weapon {
  constructor() {
    super("fireball", "Fireball");
    this.baseCooldown = 1.05;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0 || game.enemies.length === 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const target = game.findNearestEnemy(game.player.x, game.player.y);
    const angle = target
      ? Math.atan2(target.y - game.player.y, target.x - game.player.x)
      : Math.random() * Math.PI * 2;
    const speed = 420 + this.level * 18;
    const radius = (7 + this.level * 0.5) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;

    for (let index = 0; index < amount; index += 1) {
      const spread = amount > 1 ? 0.18 : 0;
      const offset = (index - (amount - 1) / 2) * spread;

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle + offset) * speed,
          vy: Math.sin(angle + offset) * speed,
          radius,
          damage,
          lifetime: 2.2,
          color: "#ff9b58",
          pierce: this.level >= 5 ? 1 : 0,
          homing: this.level >= 2 ? 3 + this.level : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player) * 0.95;
  }
}
