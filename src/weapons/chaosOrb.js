import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [14, 18, 22, 26, 32, 40, 50, 60];

export class ChaosOrb extends Weapon {
  constructor() {
    super("chaosOrb", "Chaos Orb");
    this.baseCooldown = 1.45;
    this.baseAmount = 2;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const speed = 420 + this.level * 18;
    const radius = (5 + this.level * 0.3) * game.player.areaMultiplier;
    const startAngle = Math.random() * Math.PI * 2;

    for (let index = 0; index < amount; index += 1) {
      const angle = startAngle + index * ((Math.PI * 2) / amount);

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          damage,
          lifetime: 2.4,
          color: "#d47cff",
          homing: 3 + this.level,
          pierce: this.level >= 5 ? 1 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player) * 0.95;
  }
}
