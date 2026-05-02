import { Projectile } from '../entities/projectile.js';
import { Weapon } from './weapon.js';

const DAMAGE_BY_LEVEL = [14, 18, 22, 28, 34, 42, 52, 64];

export class Knife extends Weapon {
  constructor() {
    super('knife', 'Knife');
    this.baseCooldown = 0.58;
  }

  update(dt, game) {
    super.update(dt);

    if (this.cooldownTimer > 0) {
      return;
    }

    const amount = this.getAmount(game.player);
    const baseAngle = Math.atan2(game.player.facingY, game.player.facingX);
    const spread = amount > 1 ? 0.14 : 0;
    const speed = 560 + this.level * 28;
    const radius = (4 + this.level * 0.45) * game.player.areaMultiplier;

    for (let index = 0; index < amount; index += 1) {
      const angleOffset = (index - (amount - 1) / 2) * spread;
      const angle = baseAngle + angleOffset;

      game.projectiles.push(
        new Projectile({
          x: game.player.x,
          y: game.player.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius,
          damage: DAMAGE_BY_LEVEL[this.level - 1] * game.player.damageMultiplier,
          lifetime: 1.3,
          color: '#ddd4bf',
          pierce: this.level >= 5 ? 1 : 0,
        }),
      );
    }

    this.cooldownTimer = this.getCooldown(game.player);
  }
}
