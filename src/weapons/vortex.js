import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [18, 22, 26, 32, 38, 46, 56, 68];

export class Vortex extends Weapon {
  constructor() {
    super("vortex", "Vortex");
    this.baseCooldown = 1.85;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const radius = (96 + this.level * 16) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    let hitCount = 0;

    for (const enemy of game.enemies) {
      const dx = game.player.x - enemy.x;
      const dy = game.player.y - enemy.y;
      const distance = Math.hypot(dx, dy);

      if (distance <= radius + enemy.radius) {
        game.damageEnemy(enemy, damage);
        hitCount += 1;
      }

      if (distance > 0 && distance <= radius * 1.5) {
        const pull = (radius - distance) * 0.02;
        enemy.x += (dx / distance) * pull;
        enemy.y += (dy / distance) * pull;
      }
    }

    if (hitCount > 0) {
      game.effects.push({
        type: "ring",
        x: game.player.x,
        y: game.player.y,
        radius,
        ttl: 0.28,
        maxTtl: 0.28,
        lineWidth: 10,
        color: "#8b7dff",
      });
    }

    this.cooldownTimer = this.getCooldown(game.player) * 1.05;
  }
}
