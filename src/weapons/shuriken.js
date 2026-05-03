import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [16, 20, 24, 28, 34, 42, 52, 64];

export class Shuriken extends Weapon {
  constructor() {
    super("shuriken", "Shuriken");
    this.baseCooldown = 1.1;
    this.baseAmount = 3;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const baseAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const speed = 540 + this.level * 22;
    const radius = (5 + this.level * 0.35) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const spread = 0.22;

    for (let index = 0; index < amount; index += 1) {
      const angle = baseAngle + (index - (amount - 1) / 2) * spread;

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          damage,
          lifetime: 1.9,
          color: "#b2ffae",
          pierce: this.level >= 7 ? 1 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
