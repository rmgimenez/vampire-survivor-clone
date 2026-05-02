export const GAME_STATES = {
  MENU: 'MENU',
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  LEVEL_UP: 'LEVEL_UP',
  GAME_OVER: 'GAME_OVER',
  WIN: 'WIN',
};

export const GAME_DURATION = 30 * 60;
export const WORLD_TILE_SIZE = 96;
export const SCREEN_SAFE_SPAWN_MARGIN = 220;

export const ENEMY_TYPES = {
  bat: {
    type: 'bat',
    name: 'Bat',
    radius: 12,
    speed: 122,
    health: 22,
    damage: 8,
    color: '#f56d5e',
    xp: 1,
  },
  zombie: {
    type: 'zombie',
    name: 'Zombie',
    radius: 18,
    speed: 72,
    health: 42,
    damage: 12,
    color: '#8ba85c',
    xp: 2,
  },
  skeleton: {
    type: 'skeleton',
    name: 'Skeleton',
    radius: 15,
    speed: 96,
    health: 34,
    damage: 16,
    color: '#ddd4bf',
    xp: 2,
  },
  boss: {
    type: 'boss',
    name: 'Reaper',
    radius: 32,
    speed: 78,
    health: 240,
    damage: 28,
    color: '#f8c35c',
    xp: 18,
    isBoss: true,
  },
};

export const WEAPON_LABELS = {
  magicWand: 'Magic Wand',
  aura: 'Fire Aura',
  whip: 'Whip',
  knife: 'Knife',
};
