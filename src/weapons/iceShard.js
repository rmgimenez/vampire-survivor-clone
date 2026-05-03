import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [14, 18, 22, 26, 32, 38, 46, 56];

export class IceShard extends Weapon {
  constructor() {
    super("iceShard", "Ice Shard");
    this.baseCooldown = 1.0;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const baseAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const speed = 620 + this.level * 22;
    const radius = (5 + this.level * 0.25) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const spread = 0.16;

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
          lifetime: 1.7,
          color: "#8fe0ff",
          pierce: this.level >= 5 ? 1 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
