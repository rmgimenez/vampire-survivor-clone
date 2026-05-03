import { Projectile } from "../entities/projectile.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [30, 36, 44, 52, 62, 74, 88, 104];

export class Meteor extends Weapon {
  constructor() {
    super("meteor", "Meteor");
    this.baseCooldown = 2.35;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const startAngle = Math.random() * Math.PI * 2;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const speed = 380 + this.level * 24;
    const radius = (9 + this.level * 0.45) * game.player.areaMultiplier;

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
          lifetime: 2.5,
          color: "#ffa55a",
          pierce: this.level >= 6 ? 1 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player) * 1.12;
  }
}
