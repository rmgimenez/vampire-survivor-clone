import { Weapon } from "./weapon.js";

const DAMAGE_BY_LEVEL = [18, 22, 28, 34, 42, 52, 64, 78];

export class Thunderbolt extends Weapon {
  constructor() {
    super("thunderbolt", "Thunderbolt");
    this.baseCooldown = 2.1;
    this.baseAmount = 1;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0 || game.enemies.length === 0) {
      return;
    }

    const amount = Math.max(1, this.getAmount(game.player));
    const targets = game.findNearestEnemies(
      game.player.x,
      game.player.y,
      amount + 1,
    );
    const damage =
      DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;

    for (const enemy of targets) {
      game.damageEnemy(enemy, damage);
      game.effects.push({
        type: "ring",
        x: enemy.x,
        y: enemy.y,
        radius: 28 + this.level * 4,
        ttl: 0.14,
        maxTtl: 0.14,
        lineWidth: 8,
        color: "#a4f3ff",
      });
    }

    this.cooldownTimer = this.getCooldown(game.player) * 1.1;
  }
}
