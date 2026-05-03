export const GAME_STATES = {
  MENU: "MENU",
  PLAYING: "PLAYING",
  PAUSED: "PAUSED",
  LEVEL_UP: "LEVEL_UP",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN",
};

export const GAME_DURATION = 30 * 60;
export const WORLD_TILE_SIZE = 96;
export const SCREEN_SAFE_SPAWN_MARGIN = 220;

function assetSprite(path) {
  return new URL(`../assets/${path}`, import.meta.url).href;
}

export const PLAYER_SPRITE = assetSprite("player/player.svg");
export const PLAYER_SPRITE_SCALE = 2.4;
export const OBSTACLE_SPRITES = {
  boulder: assetSprite("obstacles/boulder.svg"),
  pineTall: assetSprite("trees/pine-tall.svg"),
  pineWide: assetSprite("trees/pine-wide.svg"),
};

function enemySprite(name) {
  return assetSprite(`enemies/${name}.svg`);
}

export const ENEMY_TYPES = {
  bat: {
    type: "bat",
    name: "Bat",
    radius: 12,
    speed: 122,
    health: 22,
    damage: 8,
    color: "#f56d5e",
    xp: 1,
    sprite: enemySprite("bat"),
    spriteScale: 2.9,
  },
  zombie: {
    type: "zombie",
    name: "Zombie",
    radius: 18,
    speed: 72,
    health: 42,
    damage: 12,
    color: "#8ba85c",
    xp: 2,
    sprite: enemySprite("zombie"),
    spriteScale: 2.45,
  },
  skeleton: {
    type: "skeleton",
    name: "Skeleton",
    radius: 15,
    speed: 96,
    health: 34,
    damage: 16,
    color: "#ddd4bf",
    xp: 2,
    sprite: enemySprite("skeleton"),
    spriteScale: 2.6,
  },
  hound: {
    type: "hound",
    name: "Hound",
    radius: 14,
    speed: 146,
    health: 26,
    damage: 11,
    color: "#d97762",
    xp: 2,
    sprite: enemySprite("hound"),
    spriteScale: 2.7,
  },
  wraith: {
    type: "wraith",
    name: "Wraith",
    radius: 16,
    speed: 112,
    health: 40,
    damage: 14,
    color: "#73d8e3",
    xp: 3,
    sprite: enemySprite("wraith"),
    spriteScale: 2.75,
  },
  brute: {
    type: "brute",
    name: "Brute",
    radius: 24,
    speed: 58,
    health: 88,
    damage: 20,
    color: "#8d6254",
    xp: 4,
    sprite: enemySprite("brute"),
    spriteScale: 2.35,
  },
  ghost: {
    type: "ghost",
    name: "Ghost",
    radius: 13,
    speed: 104,
    health: 20,
    damage: 10,
    color: "#b39ddb",
    xp: 2,
    sprite: enemySprite("ghost"),
    spriteScale: 2.8,
    isGhost: true, // phases through obstacles
  },
  demon: {
    type: "demon",
    name: "Demon",
    radius: 17,
    speed: 132,
    health: 30,
    damage: 18,
    color: "#ff7043",
    xp: 3,
    sprite: enemySprite("demon"),
    spriteScale: 2.7,
  },
  boss: {
    type: "boss",
    name: "Reaper",
    radius: 32,
    speed: 78,
    health: 240,
    damage: 28,
    color: "#f8c35c",
    xp: 18,
    sprite: enemySprite("boss"),
    spriteScale: 3.1,
    isBoss: true,
  },
};

export const WEAPON_LABELS = {
  magicWand: "Magic Wand",
  aura: "Fire Aura",
  whip: "Whip",
  knife: "Knife",
  crossbow: "Crossbow",
  fireball: "Fireball",
  iceShard: "Ice Shard",
  meteor: "Meteor",
  vortex: "Vortex",
  shuriken: "Shuriken",
  soulSiphon: "Soul Siphon",
  thunderbolt: "Thunderbolt",
  shadowBlade: "Shadow Blade",
  chaosOrb: "Chaos Orb",
};
