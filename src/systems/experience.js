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
    default:
      break;
  }
}
