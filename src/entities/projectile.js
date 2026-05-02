export class Projectile {
  constructor({ x, y, vx, vy, radius, damage, lifetime, color, pierce = 0, homing = 0 }) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.damage = damage;
    this.lifetime = lifetime;
    this.color = color;
    this.homing = homing;
    this.remainingHits = pierce + 1;
    this.destroyed = false;
    this.hitEnemyIds = new Set();
  }

  update(dt, game) {
    if (this.homing > 0) {
      const target = game.findNearestEnemy(this.x, this.y);

      if (target) {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.hypot(dx, dy) || 1;
        const speed = Math.hypot(this.vx, this.vy) || 1;
        const desiredVx = (dx / distance) * speed;
        const desiredVy = (dy / distance) * speed;
        const steer = Math.min(1, this.homing * dt);

        this.vx += (desiredVx - this.vx) * steer;
        this.vy += (desiredVy - this.vy) * steer;
      }
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.lifetime -= dt;

    if (this.lifetime <= 0) {
      this.destroyed = true;
    }
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
