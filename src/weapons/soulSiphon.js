import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [16, 20, 24, 30, 36, 44, 52, 64];

export class SoulSiphon extends Weapon {
  constructor() {
    super("soulSiphon", "Soul Siphon");
    this.baseCooldown = 1.7;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const radius = (96 + this.level * 14) * game.player.areaMultiplier;
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    let healed = 0;

    for (const enemy of game.enemies) {
      const distance = Math.hypot(
        enemy.x - game.player.x,
        enemy.y - game.player.y,
      );

      if (distance <= radius + enemy.radius) {
        game.damageEnemy(enemy, damage);
        healed += damage * 0.18;
      }
    }

    if (healed > 0) {
      game.player.heal(healed);
      game.effects.push({
        type: "ring",
        x: game.player.x,
        y: game.player.y,
        radius,
        ttl: 0.28,
        maxTtl: 0.28,
        lineWidth: 10,
        color: "#a07cff",
      });
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
