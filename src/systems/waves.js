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

  if (pressure < 2) {
    return randomValue < 0.72 ? "bat" : "zombie";
  }

  if (pressure < 4.5) {
    if (randomValue < 0.34) {
      return "bat";
    }

    if (randomValue < 0.63) {
      return "zombie";
    }

    if (randomValue < 0.86) {
      return "skeleton";
    }

    return "hound";
  }

  if (pressure < 8) {
    if (randomValue < 0.18) {
      return "bat";
    }

    if (randomValue < 0.42) {
      return "zombie";
    }

    if (randomValue < 0.63) {
      return "skeleton";
    }

    if (randomValue < 0.84) {
      return "hound";
    }

    return "wraith";
  }

  if (pressure < 13) {
    if (randomValue < 0.14) {
      return "zombie";
    }

    if (randomValue < 0.36) {
      return "skeleton";
    }

    if (randomValue < 0.58) {
      return "hound";
    }

    if (randomValue < 0.82) {
      return "wraith";
    }

    return "brute";
  }

  if (randomValue < 0.12) {
    return "skeleton";
  }

  if (randomValue < 0.32) {
    return "hound";
  }

  if (randomValue < 0.57) {
    return "wraith";
  }

  if (randomValue < 0.82) {
    return "brute";
  }

  return "zombie";
}

export function getGroupSize(elapsed, kills = 0) {
  return 1 + Math.floor(elapsed / 90) + Math.floor(kills / 24);
}
