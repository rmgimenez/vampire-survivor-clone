export function getDifficulty(elapsed, kills = 0) {
  const minute = elapsed / 60;
  const killPressure = Math.min(0.45, kills / 50);
  return 1 + minute * 0.32 + killPressure;
}

export function getSpawnInterval(elapsed, kills = 0) {
  return Math.max(0.18, 1.25 - elapsed / 160 - Math.min(0.38, kills * 0.009));
}

export function getEnemyCap(elapsed, kills = 0) {
  return Math.min(120, 18 + Math.floor(elapsed / 5) + Math.floor(kills / 8));
}

export function chooseEnemyType(elapsed, randomValue, kills = 0) {
  const pressure = elapsed / 60 + kills / 90;

  // Early game: bats, zombies
  if (pressure < 2) {
    return randomValue < 0.72 ? "bat" : "zombie";
  }

  // Stage 2: skeletons and hounds join
  if (pressure < 4.5) {
    if (randomValue < 0.34) return "bat";
    if (randomValue < 0.63) return "zombie";
    if (randomValue < 0.86) return "skeleton";
    return "hound";
  }

  // Stage 3: wraiths join, ghosts appear
  if (pressure < 8) {
    if (randomValue < 0.15) return "bat";
    if (randomValue < 0.35) return "zombie";
    if (randomValue < 0.55) return "skeleton";
    if (randomValue < 0.74) return "hound";
    if (randomValue < 0.92) return "wraith";
    return "ghost";
  }

  // Stage 4: brutes and demons
  if (pressure < 13) {
    if (randomValue < 0.12) return "zombie";
    if (randomValue < 0.3) return "skeleton";
    if (randomValue < 0.48) return "hound";
    if (randomValue < 0.68) return "wraith";
    if (randomValue < 0.84) return "brute";
    return "ghost";
  }

  // Late game: all types, demons join
  if (randomValue < 0.1) return "skeleton";
  if (randomValue < 0.24) return "hound";
  if (randomValue < 0.42) return "wraith";
  if (randomValue < 0.6) return "brute";
  if (randomValue < 0.78) return "ghost";
  if (randomValue < 0.94) return "demon";
  return "zombie";
}

export function getGroupSize(elapsed, kills = 0) {
  const base = 1 + Math.floor(elapsed / 90) + Math.floor(kills / 24);
  // Occasional larger groups
  const bonus = Math.random() < Math.min(0.35, elapsed / 300) ? 2 : 0;
  return base + bonus;
}

/**
 * Returns the time (in seconds) until the next elite wave spawn.
 * Elites are tougher mini-bosses that spawn periodically.
 */
export function getEliteInterval(elapsed) {
  const base = 120; // every 2 minutes
  const reduction = Math.min(50, Math.floor(elapsed / 180) * 10);
  return Math.max(45, base - reduction);
}

/**
 * Returns a multiplier for elite enemy stats based on elapsed time.
 */
export function getEliteScale(elapsed) {
  return 1.4 + Math.min(1.5, elapsed / 450);
}

/**
 * Returns the scaling factor for boss stats.
 */
export function getBossScale(elapsed) {
  return 1 + elapsed / 400;
}

/**
 * Picks which elite type to spawn based on time.
 */
export function pickEliteType(elapsed) {
  if (elapsed < 300) return "brute";
  if (elapsed < 600) return "wraith";
  return Math.random() < 0.5 ? "demon" : "ghost";
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
