import { PLAYER_SPRITE, PLAYER_SPRITE_SCALE } from "../config.js";

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 18;
    this.color = "#4ecdc4";
    this.sprite = PLAYER_SPRITE;
    this.spriteScale = PLAYER_SPRITE_SCALE;
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

    // ✦ Roguelike stats
    this.evasion = 0; // % chance to dodge (0-0.8)
    this.critChance = 0; // % chance double damage (0-0.8)
    this.critMultiplier = 2; // multiplier on crit
    this.lifeSteal = 0; // HP healed per kill
    this.thorns = 0; // flat damage reflected on hit
    this.explosionChance = 0; // % chance enemy explodes on death (0-0.8)
    this.explosionRadius = 0; // radius of explosion
    this.freezeChance = 0; // % chance to freeze on hit (0-0.7)
    this.bountyMultiplier = 0; // bonus XP multiplier (e.g. 0.25 = +25%)
    this.armor = 0; // flat damage reduction
    this.damageTakenMultiplier = 1;
    this.reviveCharges = 0;
    this.reviveHealRatio = 0.4;
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

    // Evasion check — dodge the attack entirely
    if (this.evasion > 0 && Math.random() < this.evasion) {
      this.invulnerableTimer = 0.3;
      return false; // dodged!
    }

    // Armor reduces incoming damage
    const scaledAmount = amount * this.damageTakenMultiplier;
    const reduced = Math.max(0, scaledAmount - this.armor);
    const damage = Math.max(1, Math.round(reduced));
    this.health = Math.max(0, this.health - damage);
    this.totalDamageTaken += damage;
    this.invulnerableTimer = 0.42;

    // Thorns — reflect damage back to the nearest enemy
    if (this.thorns > 0) {
      return { damage, thorns: this.thorns };
    }

    return true;
  }

  heal(amount) {
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
}
