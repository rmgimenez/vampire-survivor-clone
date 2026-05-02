export function getDifficulty(elapsed) {
  const minute = elapsed / 60;
  return 1 + minute * 0.22;
}

export function getSpawnInterval(elapsed) {
  return Math.max(0.2, 1.1 - elapsed / 220);
}

export function getEnemyCap(elapsed) {
  return Math.min(220, 18 + Math.floor(elapsed / 6));
}

export function chooseEnemyType(elapsed, randomValue) {
  const minute = elapsed / 60;

  if (minute < 2) {
    return randomValue < 0.72 ? 'bat' : 'zombie';
  }

  if (minute < 8) {
    if (randomValue < 0.45) {
      return 'bat';
    }

    if (randomValue < 0.8) {
      return 'zombie';
    }

    return 'skeleton';
  }

  if (randomValue < 0.25) {
    return 'bat';
  }

  if (randomValue < 0.58) {
    return 'zombie';
  }

  return 'skeleton';
}

export function getGroupSize(elapsed) {
  return 1 + Math.floor(elapsed / 120);
}
