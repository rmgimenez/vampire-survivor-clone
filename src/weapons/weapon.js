export class Weapon {
  constructor(type, name) {
    this.type = type;
    this.name = name;
    this.level = 1;
    this.maxLevel = 8;
    this.cooldownTimer = 0;
    this.baseCooldown = 1;
    this.baseAmount = 1;
  }

  update(dt) {
    this.cooldownTimer -= dt;
  }

  levelUp() {
    this.level = Math.min(this.maxLevel, this.level + 1);
  }

  getCooldown(player) {
    return Math.max(0.18, this.baseCooldown * player.cooldownMultiplier);
  }

  getAmount(player) {
    return this.baseAmount + player.amountBonus;
  }
}
