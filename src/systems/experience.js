import { WEAPON_LABELS } from "../config.js";
import { t } from "../i18n.js";

const PASSIVE_UPGRADES = [
  {
    id: "health",
    title: "Coracao Blindado",
    description: "+20 de vida maxima e cura imediata de 20.",
  },
  {
    id: "damage",
    title: "Lamina Sanguinea",
    description: "+15% de dano em todas as armas.",
  },
  {
    id: "speed",
    title: "Passo Rapido",
    description: "+12% de velocidade de movimento.",
  },
  {
    id: "cooldown",
    title: "Ritual Frio",
    description: "-10% de cooldown em todas as armas.",
  },
  {
    id: "area",
    title: "Circulo Amplo",
    description: "+12% de area e alcance ofensivo.",
  },
  {
    id: "recovery",
    title: "Regeneracao Sombria",
    description: "+0.5 de recuperacao por segundo.",
  },
  {
    id: "amount",
    title: "Maos Extras",
    description: "+1 projetil ou aplicacao extra por ataque.",
  },
  {
    id: "magnet",
    title: "Nucleo de XP",
    description: "+30% de alcance para coletar orbes.",
  },
  // ✦ NOVOS PASSIVES ROGUELIKE ✦
  {
    id: "evasion",
    title: "Passos Etéreos",
    description: "+7% chance de esquivar de ataques inimigos.",
  },
  {
    id: "critChance",
    title: "Olho do Caçador",
    description: "+8% chance de acerto crítico (dano dobrado).",
  },
  {
    id: "lifeSteal",
    title: "Sede de Sangue",
    description: "Cura +3 de vida por inimigo abatido.",
  },
  {
    id: "thorns",
    title: "Armadura de Espinhos",
    description: "Reflete +4 de dano ao inimigo ao ser atingido.",
  },
  {
    id: "explosionChance",
    title: "Morte Explosiva",
    description: "+10% chance de inimigos explodirem ao morrer.",
  },
  {
    id: "freezeChance",
    title: "Toque Congelante",
    description: "+8% chance de congelar inimigos ao acertar.",
  },
  {
    id: "bounty",
    title: "Saqueador de Almas",
    description: "+30% de XP extra de cada abate.",
  },
  {
    id: "armor",
    title: "Couraça Sombria",
    description: "Reduz em -2 o dano recebido de cada golpe.",
  },
];

const PASSIVE_CATEGORY = {
  health: "defense",
  damage: "offense",
  speed: "utility",
  cooldown: "defense",
  area: "offense",
  recovery: "defense",
  amount: "offense",
  magnet: "utility",
  evasion: "defense",
  critChance: "offense",
  lifeSteal: "offense",
  thorns: "defense",
  explosionChance: "offense",
  freezeChance: "offense",
  bounty: "utility",
  armor: "defense",
};

const RARITY_TIERS = [
  {
    id: "common",
    labelKey: "levelup.rarity.common",
    className: "common",
    weight: 50,
    bonusLevels: 0,
    multiplier: 1,
  },
  {
    id: "uncommon",
    labelKey: "levelup.rarity.uncommon",
    className: "uncommon",
    weight: 28,
    bonusLevels: 1,
    multiplier: 1.15,
  },
  {
    id: "rare",
    labelKey: "levelup.rarity.rare",
    className: "rare",
    weight: 14,
    bonusLevels: 2,
    multiplier: 1.35,
  },
  {
    id: "epic",
    labelKey: "levelup.rarity.epic",
    className: "epic",
    weight: 8,
    bonusLevels: 3,
    multiplier: 1.6,
  },
];

function pickRarity(level) {
  const progress = Math.min(1, level / 40);
  const weights = RARITY_TIERS.map((tier) => {
    let weight = tier.weight;

    if (tier.id === "rare") {
      weight += progress * 8;
    }
    if (tier.id === "epic") {
      weight += progress * 4;
    }
    if (tier.id === "common") {
      weight -= progress * 10;
    }

    return {
      ...tier,
      weight: Math.max(4, weight),
    };
  });

  const total = weights.reduce((sum, tier) => sum + tier.weight, 0);
  let target = Math.random() * total;

  for (const tier of weights) {
    if (target <= tier.weight) {
      return tier;
    }
    target -= tier.weight;
  }

  return weights[0];
}

export function getXpForLevel(level) {
  return Math.floor(10 + (level - 1) * 8 + Math.pow(level - 1, 1.32) * 4);
}

export function gainExperience(game, amount) {
  const player = game.player;
  player.experience += amount;

  while (player.experience >= player.nextLevelXp) {
    player.experience -= player.nextLevelXp;
    player.level += 1;
    player.nextLevelXp = getXpForLevel(player.level);
    game.pendingLevelUps += 1;
    game.stats.levelUps += 1;
  }
}

function shuffle(items) {
  const clone = [...items];

  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }

  return clone;
}

export function buildLevelUpChoices(game, count = 3) {
  const pool = [];

  for (const passive of PASSIVE_UPGRADES) {
    const category = PASSIVE_CATEGORY[passive.id] ?? "utility";
    const rarity = pickRarity(game.player?.level ?? 1);

    pool.push({
      ...passive,
      kind: "passive",
      category,
      typeLabel: t(`levelup.type.passive.${category}`),
      rarity: rarity.id,
      rarityLabel: t(rarity.labelKey),
      rarityClass: `rarity-${rarity.className}`,
      rarityBonus: rarity.bonusLevels,
      rarityMultiplier: rarity.multiplier,
      title: t(`passive.${passive.id}.title`),
      description: t(`passive.${passive.id}.desc`),
    });
  }

  for (const weaponType of Object.keys(WEAPON_LABELS)) {
    const weapon = game.getWeapon(weaponType);
    const weaponTypeLabel = t("levelup.type.weapon");
    const rarity = pickRarity(game.player?.level ?? 1);

    if (!weapon) {
      const name = t(`weapon.${weaponType}.name`);
      pool.push({
        id: `unlock-${weaponType}`,
        kind: "unlock-weapon",
        weaponType,
        typeLabel: weaponTypeLabel,
        rarity: rarity.id,
        rarityLabel: t(rarity.labelKey),
        rarityClass: `rarity-${rarity.className}`,
        rarityBonus: rarity.bonusLevels,
        rarityMultiplier: rarity.multiplier,
        title: name,
        description: t("weapon.unlock.desc", { name }),
      });
      continue;
    }

    if (weapon.level < weapon.maxLevel) {
      const name = t(`weapon.${weaponType}.name`);
      pool.push({
        id: `upgrade-${weaponType}`,
        kind: "upgrade-weapon",
        weaponType,
        typeLabel: weaponTypeLabel,
        rarity: rarity.id,
        rarityLabel: t(rarity.labelKey),
        rarityClass: `rarity-${rarity.className}`,
        rarityBonus: rarity.bonusLevels,
        rarityMultiplier: rarity.multiplier,
        title: `${name} +1`,
        description: t("weapon.upgrade.desc", {
          name,
          level: weapon.level + 1,
        }),
      });
    }
  }

  return shuffle(pool).slice(0, count);
}

export function applyUpgrade(game, choice) {
  const player = game.player;

  if (choice.kind === "unlock-weapon") {
    if (!game.getWeapon(choice.weaponType)) {
      const weapon = game.createWeapon(choice.weaponType);
      weapon.level = Math.min(
        weapon.maxLevel,
        1 + Math.max(0, choice.rarityBonus ?? 0),
      );
      game.weapons.push(weapon);
      applySynergies(game);
    }
    return;
  }

  if (choice.kind === "upgrade-weapon") {
    const weapon = game.getWeapon(choice.weaponType);
    if (!weapon) {
      return;
    }

    weapon.levelUp();
    for (
      let extra = 0;
      extra < Math.max(0, choice.rarityBonus ?? 0);
      extra += 1
    ) {
      weapon.levelUp();
    }
    return;
  }

  const rarityMultiplier = choice.rarityMultiplier ?? 1;

  switch (choice.id) {
    case "health":
      player.maxHealth += Math.round(20 * rarityMultiplier);
      player.heal(Math.round(20 * rarityMultiplier));
      break;
    case "damage":
      player.damageMultiplier *= 1 + 0.15 * rarityMultiplier;
      break;
    case "speed":
      player.moveSpeed *= 1 + 0.12 * rarityMultiplier;
      break;
    case "cooldown":
      player.cooldownMultiplier *= Math.max(0.4, 1 - 0.1 * rarityMultiplier);
      break;
    case "area":
      player.areaMultiplier *= 1 + 0.12 * rarityMultiplier;
      break;
    case "recovery":
      player.recovery += 0.5 * rarityMultiplier;
      break;
    case "amount":
      player.amountBonus += 1 + Math.max(0, choice.rarityBonus ?? 0);
      break;
    case "magnet":
      player.pickupRange *= 1 + 0.3 * rarityMultiplier;
      break;
    // ✦ NOVOS PASSIVES ✦
    case "evasion":
      player.evasion = Math.min(0.8, player.evasion + 0.07 * rarityMultiplier);
      break;
    case "critChance":
      player.critChance = Math.min(
        0.8,
        player.critChance + 0.08 * rarityMultiplier,
      );
      break;
    case "lifeSteal":
      player.lifeSteal += 3 * rarityMultiplier;
      break;
    case "thorns":
      player.thorns += Math.round(4 * rarityMultiplier);
      break;
    case "explosionChance":
      player.explosionChance = Math.min(
        0.8,
        player.explosionChance + 0.1 * rarityMultiplier,
      );
      player.explosionRadius += 15 * rarityMultiplier;
      break;
    case "freezeChance":
      player.freezeChance = Math.min(
        0.7,
        player.freezeChance + 0.08 * rarityMultiplier,
      );
      break;
    case "bounty":
      player.bountyMultiplier = Math.min(
        3,
        player.bountyMultiplier + 0.3 * rarityMultiplier,
      );
      break;
    case "armor":
      player.armor = Math.min(
        20,
        player.armor + Math.round(2 * rarityMultiplier),
      );
      break;
    default:
      break;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYNERGY SYSTEM — weapon combos grant bonus effects
// ═══════════════════════════════════════════════════════════════════════════════

const SYNERGIES = [
  {
    id: "frostfire",
    weapons: ["iceShard", "fireball"],
    nameKey: "synergy.frostfire.name",
    descKey: "synergy.frostfire.desc",
    effect: (player) => {
      player.freezeChance = Math.min(0.7, (player.freezeChance ?? 0) + 0.1);
      player.damageMultiplier *= 1.15;
    },
  },
  {
    id: "shadowDance",
    weapons: ["shadowBlade", "shuriken"],
    nameKey: "synergy.shadowDance.name",
    descKey: "synergy.shadowDance.desc",
    effect: (player) => {
      player.evasion = Math.min(0.8, (player.evasion ?? 0) + 0.08);
      player.critChance = Math.min(0.8, (player.critChance ?? 0) + 0.08);
    },
  },
  {
    id: "arcaneStorm",
    weapons: ["magicWand", "thunderbolt", "meteor"],
    nameKey: "synergy.arcaneStorm.name",
    descKey: "synergy.arcaneStorm.desc",
    effect: (player) => {
      player.areaMultiplier *= 1.2;
      player.cooldownMultiplier *= 0.85;
    },
  },
  {
    id: "bloodMoon",
    weapons: ["soulSiphon", "chaosOrb"],
    nameKey: "synergy.bloodMoon.name",
    descKey: "synergy.bloodMoon.desc",
    effect: (player) => {
      player.lifeSteal = (player.lifeSteal ?? 0) + 5;
      player.damageMultiplier *= 1.12;
    },
  },
  {
    id: "whirlwind",
    weapons: ["whip", "vortex", "aura"],
    nameKey: "synergy.whirlwind.name",
    descKey: "synergy.whirlwind.desc",
    effect: (player) => {
      player.areaMultiplier *= 1.15;
      player.thorns = (player.thorns ?? 0) + 3;
    },
  },
];

/**
 * Returns a list of active synergy descriptions for the current weapon loadout.
 */
export function getActiveSynergies(game) {
  const weaponTypes = new Set(game.weapons.map((w) => w.type));
  const active = [];

  for (const synergy of SYNERGIES) {
    const hasAll = synergy.weapons.every((type) => weaponTypes.has(type));
    if (hasAll && !game._appliedSynergies?.has(synergy.id)) {
      active.push(synergy);
    }
  }

  return active;
}

/**
 * Applies any newly-unlocked synergies to the player.
 */
export function applySynergies(game) {
  if (!game._appliedSynergies) {
    game._appliedSynergies = new Set();
  }

  const active = getActiveSynergies(game);

  for (const synergy of active) {
    synergy.effect(game.player);
    game._appliedSynergies.add(synergy.id);
  }

  return active;
}
