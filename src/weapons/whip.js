import { isPointInCone } from '../systems/collision.js';
import { Weapon } from './weapon.js';

const DAMAGE_BY_LEVEL = [18, 22, 28, 34, 40, 48, 58, 70];

export class Whip extends Weapon {
  constructor() {
    super('whip', 'Whip');
    this.baseCooldown = 1.3;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = Math.max(1, this.getAmount(game.player));
    const reach = (110 + this.level * 12) * game.player.areaMultiplier;
    const damage = DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier;
    const facingAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const halfAngle = Math.PI / 4;

    for (let swing = 0; swing < Math.min(3, amount); swing += 1) {
      const offset = (swing - (Math.min(3, amount) - 1) / 2) * 0.2;
      const angle = facingAngle + offset;

      for (const enemy of game.enemies) {
        if (isPointInCone(game.player, angle, enemy, reach + enemy.radius, halfAngle)) {
          game.damageEnemy(enemy, damage);
        }
      }

      game.effects.push({
        type: 'arc',
        x: game.player.x,
        y: game.player.y,
        radius: reach,
        ttl: 0.18,
        maxTtl: 0.18,
        lineWidth: 14,
        color: '#f8c35c',
        startAngle: angle - halfAngle,
        endAngle: angle + halfAngle,
      });
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
