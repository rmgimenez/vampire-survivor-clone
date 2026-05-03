export class XpOrb {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.radius = 7;
    this.kind = 'xp';
    this.value = value;
    this.markedForRemoval = false;
  }

  update(dt, player) {
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.hypot(dx, dy) || 1;

    if (distance <= player.pickupRange) {
      const speed = 130 + (player.pickupRange - distance) * 4;
      this.x += (dx / distance) * speed * dt;
      this.y += (dy / distance) * speed * dt;
    }
  }
}
