export const MAX_SELECTED_CARDS = 3;

export const CARD_KINDS = {
  blessing: {
    id: "blessing",
    labelKey: "cards.type.blessing",
    className: "card-kind-blessing",
  },
  curse: {
    id: "curse",
    labelKey: "cards.type.curse",
    className: "card-kind-curse",
  },
};

export const CARD_RARITIES = {
  common: {
    id: "common",
    labelKey: "cards.rarity.common",
    className: "rarity-common",
    weight: 58,
  },
  uncommon: {
    id: "uncommon",
    labelKey: "cards.rarity.uncommon",
    className: "rarity-uncommon",
    weight: 28,
  },
  rare: {
    id: "rare",
    labelKey: "cards.rarity.rare",
    className: "rarity-rare",
    weight: 10,
  },
  epic: {
    id: "epic",
    labelKey: "cards.rarity.epic",
    className: "rarity-epic",
    weight: 4,
  },
  legendary: {
    id: "legendary",
    labelKey: "cards.rarity.legendary",
    className: "rarity-legendary",
    weight: 0.5,
  },
};

const CARD_DEFINITIONS = [
  {
    id: "ironWill",
    icon: "🛡️",
    kind: "blessing",
    rarity: "common",
    titleKey: "cards.ironWill.title",
    descKey: "cards.ironWill.desc",
    apply(player) {
      const bonus = 24;
      player.maxHealth += bonus;
      player.health = Math.min(player.maxHealth, player.health + bonus);
    },
  },
  {
    id: "swiftBoots",
    icon: "👢",
    kind: "blessing",
    rarity: "common",
    titleKey: "cards.swiftBoots.title",
    descKey: "cards.swiftBoots.desc",
    apply(player) {
      player.moveSpeed *= 1.12;
    },
  },
  {
    id: "emberStone",
    icon: "🔥",
    kind: "blessing",
    rarity: "common",
    titleKey: "cards.emberStone.title",
    descKey: "cards.emberStone.desc",
    apply(player) {
      player.damageMultiplier *= 1.1;
    },
  },
  {
    id: "magnetShard",
    icon: "🧲",
    kind: "blessing",
    rarity: "common",
    titleKey: "cards.magnetShard.title",
    descKey: "cards.magnetShard.desc",
    apply(player) {
      player.pickupRange *= 1.28;
    },
  },
  {
    id: "clockworkHeart",
    icon: "⏳",
    kind: "blessing",
    rarity: "uncommon",
    titleKey: "cards.clockworkHeart.title",
    descKey: "cards.clockworkHeart.desc",
    apply(player) {
      player.cooldownMultiplier *= 0.92;
    },
  },
  {
    id: "hunterSigil",
    icon: "🎯",
    kind: "blessing",
    rarity: "uncommon",
    titleKey: "cards.hunterSigil.title",
    descKey: "cards.hunterSigil.desc",
    apply(player) {
      player.critChance = Math.min(0.8, player.critChance + 0.09);
    },
  },
  {
    id: "platedHide",
    icon: "🪖",
    kind: "blessing",
    rarity: "uncommon",
    titleKey: "cards.platedHide.title",
    descKey: "cards.platedHide.desc",
    apply(player) {
      player.armor = Math.min(20, player.armor + 2);
    },
  },
  {
    id: "volleyRune",
    icon: "🗡️",
    kind: "blessing",
    rarity: "uncommon",
    titleKey: "cards.volleyRune.title",
    descKey: "cards.volleyRune.desc",
    apply(player) {
      player.amountBonus += 1;
    },
  },
  {
    id: "soulLantern",
    icon: "🕯️",
    kind: "blessing",
    rarity: "rare",
    titleKey: "cards.soulLantern.title",
    descKey: "cards.soulLantern.desc",
    apply(player) {
      player.bountyMultiplier = Math.min(3, player.bountyMultiplier + 0.35);
      player.recovery += 0.25;
    },
  },
  {
    id: "frostRelic",
    icon: "❄️",
    kind: "blessing",
    rarity: "rare",
    titleKey: "cards.frostRelic.title",
    descKey: "cards.frostRelic.desc",
    apply(player) {
      player.freezeChance = Math.min(0.7, player.freezeChance + 0.12);
      player.areaMultiplier *= 1.08;
    },
  },
  {
    id: "thornEmblem",
    icon: "🌵",
    kind: "blessing",
    rarity: "rare",
    titleKey: "cards.thornEmblem.title",
    descKey: "cards.thornEmblem.desc",
    apply(player) {
      player.thorns += 6;
      player.maxHealth += 10;
      player.health = Math.min(player.maxHealth, player.health + 10);
    },
  },
  {
    id: "bloodChalice",
    icon: "🩸",
    kind: "blessing",
    rarity: "epic",
    titleKey: "cards.bloodChalice.title",
    descKey: "cards.bloodChalice.desc",
    apply(player) {
      player.lifeSteal += 4;
      player.damageMultiplier *= 1.12;
    },
  },
  {
    id: "phoenixFeather",
    icon: "🪶",
    kind: "blessing",
    rarity: "epic",
    titleKey: "cards.phoenixFeather.title",
    descKey: "cards.phoenixFeather.desc",
    apply(player) {
      player.reviveCharges += 1;
      player.reviveHealRatio = Math.max(player.reviveHealRatio, 0.45);
    },
  },
  {
    id: "glassCannon",
    icon: "💥",
    kind: "curse",
    rarity: "rare",
    titleKey: "cards.glassCannon.title",
    descKey: "cards.glassCannon.desc",
    apply(player) {
      player.damageMultiplier *= 1.28;
      player.critChance = Math.min(0.8, player.critChance + 0.08);
      player.maxHealth = Math.max(50, player.maxHealth - 26);
      player.health = Math.min(player.health, player.maxHealth);
    },
  },
  {
    id: "greedBrand",
    icon: "🪙",
    kind: "curse",
    rarity: "uncommon",
    titleKey: "cards.greedBrand.title",
    descKey: "cards.greedBrand.desc",
    apply(player) {
      player.bountyMultiplier = Math.min(3, player.bountyMultiplier + 0.55);
      player.pickupRange *= 1.2;
      player.moveSpeed *= 0.88;
    },
  },
  {
    id: "doomClock",
    icon: "🕰️",
    kind: "curse",
    rarity: "epic",
    titleKey: "cards.doomClock.title",
    descKey: "cards.doomClock.desc",
    apply(player) {
      player.cooldownMultiplier *= 0.82;
      player.amountBonus += 1;
      player.damageTakenMultiplier *= 1.25;
    },
  },
  {
    id: "astralCrown",
    icon: "👑",
    kind: "blessing",
    rarity: "legendary",
    titleKey: "cards.astralCrown.title",
    descKey: "cards.astralCrown.desc",
    apply(player) {
      player.amountBonus += 1;
      player.cooldownMultiplier *= 0.9;
      player.critChance = Math.min(0.8, player.critChance + 0.08);
    },
  },
  {
    id: "worldRoot",
    icon: "🌌",
    kind: "blessing",
    rarity: "legendary",
    titleKey: "cards.worldRoot.title",
    descKey: "cards.worldRoot.desc",
    apply(player) {
      player.areaMultiplier *= 1.18;
      player.recovery += 0.45;
      player.armor = Math.min(20, player.armor + 2);
    },
  },
];

const CARD_WEAPON_SYNERGIES = [
  {
    id: "emberStone-fireball",
    cardId: "emberStone",
    weapons: ["fireball"],
    effect(player, game) {
      const fireball = game.getWeapon("fireball");
      fireball?.levelUp();
      player.explosionChance = Math.min(0.8, player.explosionChance + 0.08);
    },
  },
  {
    id: "frostRelic-iceShard",
    cardId: "frostRelic",
    weapons: ["iceShard"],
    effect(player, game) {
      const iceShard = game.getWeapon("iceShard");
      iceShard?.levelUp();
      player.freezeChance = Math.min(0.7, player.freezeChance + 0.12);
    },
  },
  {
    id: "soulLantern-soulSiphon",
    cardId: "soulLantern",
    weapons: ["soulSiphon"],
    effect(player, game) {
      const siphon = game.getWeapon("soulSiphon");
      siphon?.levelUp();
      player.lifeSteal += 3;
      player.recovery += 0.35;
    },
  },
  {
    id: "volleyRune-crossbowShuriken",
    cardId: "volleyRune",
    weapons: ["crossbow", "shuriken"],
    effect(player, game) {
      game.getWeapon("crossbow")?.levelUp();
      game.getWeapon("shuriken")?.levelUp();
      player.critChance = Math.min(0.8, player.critChance + 0.06);
    },
  },
  {
    id: "astralCrown-arcana",
    cardId: "astralCrown",
    weapons: ["magicWand", "thunderbolt"],
    effect(player, game) {
      game.getWeapon("magicWand")?.levelUp();
      game.getWeapon("thunderbolt")?.levelUp();
      player.damageMultiplier *= 1.1;
    },
  },
  {
    id: "worldRoot-tempest",
    cardId: "worldRoot",
    weapons: ["aura", "vortex"],
    effect(player, game) {
      game.getWeapon("aura")?.levelUp();
      game.getWeapon("vortex")?.levelUp();
      player.thorns += 4;
    },
  },
  {
    id: "glassCannon-crossbow",
    cardId: "glassCannon",
    weapons: ["crossbow"],
    effect(player, game) {
      game.getWeapon("crossbow")?.levelUp();
      player.critMultiplier = Math.max(player.critMultiplier, 2.35);
    },
  },
];

const CARD_BY_ID = new Map(CARD_DEFINITIONS.map((card) => [card.id, card]));

function uniqueValidIds(ids) {
  return [
    ...new Set(
      (Array.isArray(ids) ? ids : []).filter((id) => CARD_BY_ID.has(id)),
    ),
  ];
}

function buildRarityWeights(run) {
  const progress = Math.min(
    2.4,
    run.elapsed / 700 + run.kills / 260 + run.level / 20 + (run.win ? 0.35 : 0),
  );

  return {
    common: Math.max(24, 62 - progress * 18),
    uncommon: 25 + progress * 7,
    rare: 9 + progress * 4,
    epic: 3 + progress * 1.5,
    legendary: progress < 1.7 ? 0 : 0.18 + (progress - 1.7) * 0.55,
  };
}

function getUnlockCount(run, availableCount) {
  if (availableCount <= 0) {
    return 0;
  }

  let unlockCount = 1;
  const standoutRun =
    run.win || run.level >= 18 || run.kills >= 180 || run.elapsed >= 15 * 60;

  if (standoutRun && availableCount > 1) {
    unlockCount += 1;
  }

  return Math.min(2, unlockCount, availableCount);
}

function pickWeightedCard(cards, weights) {
  const total = cards.reduce(
    (sum, card) =>
      sum + (weights[card.rarity] ?? CARD_RARITIES[card.rarity].weight),
    0,
  );

  let target = Math.random() * total;
  for (const card of cards) {
    const weight = weights[card.rarity] ?? CARD_RARITIES[card.rarity].weight;
    if (target <= weight) {
      return card;
    }
    target -= weight;
  }

  return cards[0] ?? null;
}

export function getAllCards() {
  return CARD_DEFINITIONS;
}

export function getCardById(cardId) {
  return CARD_BY_ID.get(cardId) ?? null;
}

export function getCardRarityMeta(rarityId) {
  return CARD_RARITIES[rarityId] ?? CARD_RARITIES.common;
}

export function getCardKindMeta(kindId) {
  return CARD_KINDS[kindId] ?? CARD_KINDS.blessing;
}

export function normalizeUnlockedCardIds(cardIds) {
  return uniqueValidIds(cardIds);
}

export function normalizeSelectedCardIds(cardIds, unlockedCardIds) {
  const unlocked = new Set(normalizeUnlockedCardIds(unlockedCardIds));
  return uniqueValidIds(cardIds)
    .filter((cardId) => unlocked.has(cardId))
    .slice(0, MAX_SELECTED_CARDS);
}

export function applySelectedCards(game, selectedCardIds) {
  const appliedCards = [];

  for (const cardId of uniqueValidIds(selectedCardIds)) {
    const card = getCardById(cardId);
    if (!card) {
      continue;
    }

    card.apply(game.player, game);
    appliedCards.push(card);
  }

  return appliedCards;
}

export function getActiveCardWeaponSynergies(game) {
  const selectedCards = new Set(uniqueValidIds(game.selectedCardIds));
  const weaponTypes = new Set(game.weapons.map((weapon) => weapon.type));

  return CARD_WEAPON_SYNERGIES.filter((synergy) => {
    const hasCard = selectedCards.has(synergy.cardId);
    const hasWeapons = synergy.weapons.every((weaponType) =>
      weaponTypes.has(weaponType),
    );
    return (
      hasCard &&
      hasWeapons &&
      !game._appliedCardWeaponSynergies?.has(synergy.id)
    );
  });
}

export function applyCardWeaponSynergies(game) {
  if (!game._appliedCardWeaponSynergies) {
    game._appliedCardWeaponSynergies = new Set();
  }

  const active = getActiveCardWeaponSynergies(game);
  for (const synergy of active) {
    synergy.effect(game.player, game);
    game._appliedCardWeaponSynergies.add(synergy.id);
  }

  return active;
}

export function rollCardUnlocks(unlockedCardIds, run) {
  const unlocked = new Set(normalizeUnlockedCardIds(unlockedCardIds));
  const rewards = [];
  const unlockCount = getUnlockCount(
    run,
    CARD_DEFINITIONS.length - unlocked.size,
  );
  const weights = buildRarityWeights(run);

  while (rewards.length < unlockCount) {
    const available = CARD_DEFINITIONS.filter(
      (card) => !unlocked.has(card.id) && !rewards.includes(card.id),
    );

    if (available.length === 0) {
      break;
    }

    const selected = pickWeightedCard(available, weights);
    if (!selected) {
      break;
    }

    rewards.push(selected.id);
  }

  return rewards;
}
