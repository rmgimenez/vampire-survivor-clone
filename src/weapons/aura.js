import { Weapon } from './weapon.js';

const DAMAGE_BY_LEVEL = [10, 13, 16, 21, 26, 31, 38, 48];

export class Aura extends Weapon {
  constructor() {
    super('aura', 'Fire Aura');
    this.baseCooldown = 1.75;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const pulseRadius =
      (112 + this.level * 14 + game.player.amountBonus * 10) * game.player.areaMultiplier;
    const damage = DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;

    for (const enemy of game.enemies) {
      const distance = Math.hypot(enemy.x - game.player.x, enemy.y - game.player.y);
      if (distance <= pulseRadius + enemy.radius) {
        game.damageEnemy(enemy, damage);
      }
    }

    game.effects.push({
      type: 'ring',
      x: game.player.x,
      y: game.player.y,
      radius: pulseRadius,
      ttl: 0.3,
      maxTtl: 0.3,
      lineWidth: 10,
      color: '#f1685f',
    });

    this.cooldownTimer = this.getCooldown(game.player) * 0.92;
  }
}
