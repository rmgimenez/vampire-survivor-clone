export class Enemy {
  constructor({ id, x, y, config, scale = 1 }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = config.type;
    this.name = config.name;
    this.radius = config.radius * (config.isBoss ? 1 : Math.min(scale, 1.65));
    this.baseRadius = config.radius;
    this.speed = config.speed * Math.min(1.9, 0.9 + scale * 0.22);
    this.maxHealth = Math.round(config.health * scale);
    this.health = this.maxHealth;
    this.damage = Math.round(config.damage * Math.min(2.4, 0.9 + scale * 0.18));
    this.color = config.color;
    this.sprite = config.sprite ?? null;
    this.spriteScale = config.spriteScale ?? 2.6;
    this.xp = Math.round(config.xp * Math.max(1, scale * 0.7));
    this.isBoss = Boolean(config.isBoss);
    this.contactCooldown = 0;
    this.hitFlashTimer = 0;
    this.markedForRemoval = false;
  }

  update(dt, player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.hypot(dx, dy) || 1;

    this.x += (dx / distance) * this.speed * dt;
    this.y += (dy / distance) * this.speed * dt;
    this.contactCooldown = Math.max(0, this.contactCooldown - dt);
    this.hitFlashTimer = Math.max(0, this.hitFlashTimer - dt);
  }

  takeDamage(amount) {
    this.health -= amount;
    this.hitFlashTimer = 0.14;
    return this.health <= 0;
  }

  getBounds() {
    return {
      left: this.x - this.radius,
      right: this.x + this.radius,
      top: this.y - this.radius,
      bottom: this.y + this.radius,
    };
  }
}
