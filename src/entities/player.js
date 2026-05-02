export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.color = '#4ecdc4';
    this.maxHealth = 100;
    this.health = 100;
    this.level = 1;
    this.experience = 0;
    this.nextLevelXp = 10;
    this.moveSpeed = 250;
    this.damageMultiplier = 1;
    this.cooldownMultiplier = 1;
    this.areaMultiplier = 1;
    this.recovery = 0;
    this.amountBonus = 0;
    this.pickupRange = 130;
    this.facingX = 1;
    this.facingY = 0;
    this.invulnerableTimer = 0;
    this.totalDamageTaken = 0;
  }

  update(dt, input) {
    const move = input.getMoveVector();
    const magnitude = Math.hypot(move.x, move.y) || 1;
    const velocityX = move.x / magnitude;
    const velocityY = move.y / magnitude;

    this.x += velocityX * this.moveSpeed * dt;
    this.y += velocityY * this.moveSpeed * dt;

    if (move.x !== 0 || move.y !== 0) {
      this.facingX = velocityX;
      this.facingY = velocityY;
    }

    this.invulnerableTimer = Math.max(0, this.invulnerableTimer - dt);

    if (this.recovery > 0) {
      this.heal(this.recovery * dt);
    }
  }

  takeDamage(amount) {
    if (this.invulnerableTimer > 0) {
      return false;
    }

    const damage = Math.max(1, amount);
    this.health = Math.max(0, this.health - damage);
    this.totalDamageTaken += damage;
    this.invulnerableTimer = 0.55;
    return true;
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
}
