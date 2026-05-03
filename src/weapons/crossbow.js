import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [20, 24, 28, 32, 38, 46, 56, 68];

export class Crossbow extends Weapon {
  constructor() {
    super("crossbow", "Crossbow");
    this.baseCooldown = 0.72;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const baseAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const speed = 720 + this.level * 22;
    const radius = (5 + this.level * 0.35) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;

    for (let index = 0; index < amount; index += 1) {
      const angle = baseAngle + (index - (amount - 1) / 2) * 0.08;

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          damage,
          lifetime: 1.6,
          color: "#8fd9ff",
          pierce: this.level >= 4 ? 2 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
