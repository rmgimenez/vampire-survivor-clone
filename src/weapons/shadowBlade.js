import { isPointInCone } from "../systems/collision.js";
import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [22, 26, 32, 38, 46, 56, 68, 82];

export class ShadowBlade extends Weapon {
  constructor() {
    super("shadowBlade", "Shadow Blade");
    this.baseCooldown = 1.25;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const reach = (116 + this.level * 16) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const facingAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const halfAngle = Math.PI / 3;

    for (const enemy of game.enemies) {
      if (
        isPointInCone(
          game.player,
          facingAngle,
          enemy,
          reach + enemy.radius,
          halfAngle,
        )
      ) {
        game.damageEnemy(enemy, damage);
      }
    }

    game.effects.push({
      type: "arc",
      x: game.player.x,
      y: game.player.y,
      radius: reach,
      ttl: 0.16,
      maxTtl: 0.16,
      lineWidth: 16,
      color: "#6d5fd4",
      startAngle: facingAngle - halfAngle,
      endAngle: facingAngle + halfAngle,
    });

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
