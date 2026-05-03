export function getDifficulty(elapsed, kills = 0) {
  const minute = elapsed / 60;
  const phasePressure = Math.floor(elapsed / 180) * 0.24;
  const killPressure = Math.min(0.65, kills / 40);
  return 1 + minute * 0.44 + phasePressure + killPressure;
}

export function getSpawnInterval(elapsed, kills = 0) {
  return Math.max(0.16, 1.22 - elapsed / 170 - Math.min(0.34, kills * 0.007));
}

export function getEnemyCap(elapsed, kills = 0) {
  return Math.min(170, 24 + Math.floor(elapsed / 4) + Math.floor(kills / 6));
}

export function chooseEnemyType(elapsed, randomValue, kills = 0) {
  const pressure = elapsed / 55 + kills / 75;

  // Early game: bats, zombies
  if (pressure < 1.45) {
    return randomValue < 0.72 ? "bat" : "zombie";
  }

  // Stage 2: skeletons and hounds join
  if (pressure < 3.2) {
    if (randomValue < 0.28) return "bat";
    if (randomValue < 0.54) return "zombie";
    if (randomValue < 0.79) return "skeleton";
    return "hound";
  }

  // Stage 3: wraiths join, ghosts appear
  if (pressure < 5.6) {
    if (randomValue < 0.08) return "bat";
    if (randomValue < 0.24) return "zombie";
    if (randomValue < 0.46) return "skeleton";
    if (randomValue < 0.67) return "hound";
    if (randomValue < 0.88) return "wraith";
    return "ghost";
  }

  // Stage 4: brutes and demons
  if (pressure < 8.5) {
    if (randomValue < 0.08) return "zombie";
    if (randomValue < 0.23) return "skeleton";
    if (randomValue < 0.41) return "hound";
    if (randomValue < 0.61) return "wraith";
    if (randomValue < 0.8) return "ghost";
    if (randomValue < 0.93) return "brute";
    return "demon";
  }

  // Late game: all types, demons join
  if (randomValue < 0.08) return "skeleton";
  if (randomValue < 0.22) return "hound";
  if (randomValue < 0.4) return "wraith";
  if (randomValue < 0.6) return "ghost";
  if (randomValue < 0.8) return "brute";
  return "demon";
}

export function getGroupSize(elapsed, kills = 0) {
  const base = 1 + Math.floor(elapsed / 85) + Math.floor(kills / 28);
  // Occasional larger groups
  const bonus = Math.random() < Math.min(0.45, elapsed / 260) ? 2 : 0;
  return base + bonus;
}

/**
 * Returns the time (in seconds) until the next elite wave spawn.
 * Elites are tougher mini-bosses that spawn periodically.
 */
export function getEliteInterval(elapsed) {
  const base = 95;
  const reduction = Math.min(45, Math.floor(elapsed / 180) * 8);
  return Math.max(40, base - reduction);
}

/**
 * Returns a multiplier for elite enemy stats based on elapsed time.
 */
export function getEliteScale(elapsed) {
  return 1.7 + Math.min(2, elapsed / 360);
}

/**
 * Returns the scaling factor for boss stats.
 */
export function getBossScale(elapsed) {
  return 1.15 + elapsed / 300;
}

/**
 * Picks which elite type to spawn based on time.
 */
export function pickEliteType(elapsed) {
  if (elapsed < 240) return "hound";
  if (elapsed < 480) return "brute";
  if (elapsed < 840) return "wraith";
  return Math.random() < 0.55 ? "demon" : "ghost";
}

/**
 * Get wave difficulty descriptor for HUD display.
 */
export function getWaveName(elapsed) {
  const minutes = Math.floor(elapsed / 60);
  const wave = Math.min(10, 1 + Math.floor(minutes / 3));

  const names = [
    "Crepúsculo",
    "Escuridão Nascente",
    "Noite Profunda",
    "Horas Bruxas",
    "Véu Sombrio",
    "Abismo",
    "Caos",
    "Carnificina",
    "Apocalipse",
    "Fim dos Tempos",
  ];

  return names[wave - 1] ?? "Inferno";
}
