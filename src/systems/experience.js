import { WEAPON_LABELS } from '../config.js';

const PASSIVE_UPGRADES = [
  {
    id: 'health',
    title: 'Coracao Blindado',
    description: '+20 de vida maxima e cura imediata de 20.',
  },
  {
    id: 'damage',
    title: 'Lamina Sanguinea',
    description: '+15% de dano em todas as armas.',
  },
  {
    id: 'speed',
    title: 'Passo Rapido',
    description: '+12% de velocidade de movimento.',
  },
  {
    id: 'cooldown',
    title: 'Ritual Frio',
    description: '-10% de cooldown em todas as armas.',
  },
  {
    id: 'area',
    title: 'Circulo Amplo',
    description: '+12% de area e alcance ofensivo.',
  },
  {
    id: 'recovery',
    title: 'Regeneracao Sombria',
    description: '+0.5 de recuperacao por segundo.',
  },
  {
    id: 'amount',
    title: 'Maos Extras',
    description: '+1 projetil ou aplicacao extra por ataque.',
  },
  {
    id: 'magnet',
    title: 'Nucleo de XP',
    description: '+30% de alcance para coletar orbes.',
  },
];

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
    pool.push({ ...passive, kind: 'passive' });
  }

  for (const weaponType of Object.keys(WEAPON_LABELS)) {
    const weapon = game.getWeapon(weaponType);

    if (!weapon) {
      pool.push({
        id: `unlock-${weaponType}`,
        kind: 'unlock-weapon',
        weaponType,
        title: WEAPON_LABELS[weaponType],
        description: `Equipa ${WEAPON_LABELS[weaponType]} no arsenal.`,
      });
      continue;
    }

    if (weapon.level < weapon.maxLevel) {
      pool.push({
        id: `upgrade-${weaponType}`,
        kind: 'upgrade-weapon',
        weaponType,
        title: `${WEAPON_LABELS[weaponType]} +1`,
        description: `Eleva ${WEAPON_LABELS[weaponType]} para o nivel ${weapon.level + 1}.`,
      });
    }
  }

  return shuffle(pool).slice(0, count);
}

export function applyUpgrade(game, choice) {
  const player = game.player;

  if (choice.kind === 'unlock-weapon') {
    game.unlockWeapon(choice.weaponType);
    return;
  }

  if (choice.kind === 'upgrade-weapon') {
    game.levelUpWeapon(choice.weaponType);
    return;
  }

  switch (choice.id) {
    case 'health':
      player.maxHealth += 20;
      player.heal(20);
      break;
    case 'damage':
      player.damageMultiplier *= 1.15;
      break;
    case 'speed':
      player.moveSpeed *= 1.12;
      break;
    case 'cooldown':
      player.cooldownMultiplier *= 0.9;
      break;
    case 'area':
      player.areaMultiplier *= 1.12;
      break;
    case 'recovery':
      player.recovery += 0.5;
      break;
    case 'amount':
      player.amountBonus += 1;
      break;
    case 'magnet':
      player.pickupRange *= 1.3;
      break;
    default:
      break;
  }
}
