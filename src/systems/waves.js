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
  const minute = elapsed / 60;

  if (minute < 2) {
    return randomValue < 0.72 ? "bat" : "zombie";
  }

  if (minute < 5) {
    if (randomValue < 0.45) {
      return "bat";
    }

    if (randomValue < 0.85) {
      return "zombie";
    }

    return "skeleton";
  }

  if (minute < 10) {
    if (randomValue < 0.3) {
      return "bat";
    }

    if (randomValue < 0.7) {
      return "zombie";
    }

    return "skeleton";
  }

  if (randomValue < 0.2) {
    return "bat";
  }

  if (randomValue < 0.55) {
    return "zombie";
  }

  return "skeleton";
}

export function getGroupSize(elapsed, kills = 0) {
  return 1 + Math.floor(elapsed / 90) + Math.floor(kills / 24);
}
