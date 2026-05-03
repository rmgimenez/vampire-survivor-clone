export class ChestPickup {
  constructor(x, y, kind, value) {
    this.x = x;
    this.baseY = y;
    this.y = y;
    this.radius = 16;
    this.kind = kind; // 'xp' | 'health' | 'upgrade'
    this.value = value;
    this.type = "chest";
    this.markedForRemoval = false;
    this.bobTimer = 0;
  }

  update(dt, player) {
    this.bobTimer += dt * 4;
    this.y = this.baseY + Math.sin(this.bobTimer) * 4;
  }
}
