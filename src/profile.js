import {
  normalizeSelectedCardIds,
  normalizeUnlockedCardIds,
  rollCardUnlocks,
} from "./cards.js";

const STORAGE_KEY = "cds_data";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function blankMeta() {
  return {
    startHealth: 0,
    startDamage: 0,
    startSpeed: 0,
    startCooldown: 0,
    recovery: 0,
    coinBonus: 0,
  };
}

function blankCards() {
  return {
    unlocked: [],
    selected: [],
  };
}

function normalizeProfile(profile) {
  const cards = blankCards();
  cards.unlocked = normalizeUnlockedCardIds(profile?.cards?.unlocked ?? []);
  cards.selected = normalizeSelectedCardIds(
    profile?.cards?.selected ?? [],
    cards.unlocked,
  );

  return {
    id: profile.id,
    name: String(profile.name ?? "")
      .trim()
      .slice(0, 24),
    coins: profile.coins ?? 0,
    totalCoins: profile.totalCoins ?? 0,
    metaUpgrades: {
      ...blankMeta(),
      ...(profile.metaUpgrades ?? {}),
    },
    cards,
    runs: Array.isArray(profile.runs)
      ? profile.runs.map((run) => ({
          ...run,
          killsByType: { ...(run.killsByType ?? {}) },
        }))
      : [],
  };
}

function normalizeData(data) {
  const profiles = Array.isArray(data?.profiles)
    ? data.profiles.map(normalizeProfile)
    : [];
  const activeId = profiles.some((profile) => profile.id === data?.activeId)
    ? data.activeId
    : (profiles[0]?.id ?? null);

  return {
    profiles,
    activeId,
  };
}

function load() {
  try {
    return normalizeData(
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        profiles: [],
        activeId: null,
      },
    );
  } catch {
    return { profiles: [], activeId: null };
  }
}

function persist(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeData(data)));
  } catch {
    // storage quota exceeded — ignore
  }
}

export function getProfiles() {
  return load().profiles;
}

export function getActiveProfile() {
  const data = load();
  return data.profiles.find((p) => p.id === data.activeId) ?? null;
}

export function createProfile(name) {
  const data = load();
  const profile = {
    id: generateId(),
    name: name.trim().slice(0, 24),
    coins: 0,
    totalCoins: 0,
    metaUpgrades: blankMeta(),
    cards: blankCards(),
    runs: [],
  };
  data.profiles.push(profile);
  data.activeId = profile.id;
  persist(data);
  return profile;
}

export function setActiveProfile(id) {
  const data = load();
  if (data.profiles.some((p) => p.id === id)) {
    data.activeId = id;
    persist(data);
  }
}

export function deleteProfile(id) {
  const data = load();
  data.profiles = data.profiles.filter((p) => p.id !== id);
  if (data.activeId === id) {
    data.activeId = data.profiles[0]?.id ?? null;
  }
  persist(data);
}

/**
 * Saves a completed run and credits coins to the profile.
 * Returns the updated profile and any unlocked cards, or null if profile not found.
 */
export function saveRun(profileId, run) {
  const data = load();
  const profile = data.profiles.find((p) => p.id === profileId);
  if (!profile) return null;
  profile.runs.unshift({
    ...run,
    killsByType: { ...(run.killsByType ?? {}) },
    date: new Date().toLocaleDateString("pt-BR"),
  });
  if (profile.runs.length > 50) profile.runs.length = 50;
  profile.coins += run.coinsEarned;
  profile.totalCoins += run.coinsEarned;
  const unlockedCardIds = rollCardUnlocks(profile.cards.unlocked, run);
  if (unlockedCardIds.length > 0) {
    profile.cards.unlocked = normalizeUnlockedCardIds([
      ...profile.cards.unlocked,
      ...unlockedCardIds,
    ]);
  }
  profile.cards.selected = normalizeSelectedCardIds(
    profile.cards.selected,
    profile.cards.unlocked,
  );
  persist(data);
  return {
    profile: data.profiles.find((p) => p.id === profileId) ?? null,
    unlockedCardIds,
  };
}

export function updateSelectedCards(profileId, selectedCardIds) {
  const data = load();
  const profile = data.profiles.find((p) => p.id === profileId);
  if (!profile) return null;

  profile.cards.selected = normalizeSelectedCardIds(
    selectedCardIds,
    profile.cards.unlocked,
  );

  persist(data);
  return data.profiles.find((p) => p.id === profileId) ?? null;
}

/**
 * Purchases one level of a meta upgrade.
 * Returns the updated profile on success, or null on failure.
 */
export function purchaseUpgrade(profileId, upgradeId) {
  const data = load();
  const profile = data.profiles.find((p) => p.id === profileId);
  if (!profile) return null;
  const def = META_UPGRADES.find((u) => u.id === upgradeId);
  if (!def) return null;
  const level = profile.metaUpgrades[upgradeId] ?? 0;
  if (level >= def.maxLevel) return null;
  const cost = def.costs[level];
  if (profile.coins < cost) return null;
  profile.coins -= cost;
  profile.metaUpgrades[upgradeId] = level + 1;
  persist(data);
  return data.profiles.find((p) => p.id === profileId);
}

/** Calculates coins earned for a run. */
export function calculateCoins(kills, elapsed, win, coinBonusLevel) {
  const base =
    Math.floor(kills / 5) + Math.floor(elapsed / 60) * 2 + (win ? 10 : 0);
  const mult = 1 + 0.25 * (coinBonusLevel ?? 0);
  return Math.floor(base * mult);
}

export const META_UPGRADES = [
  {
    id: "startHealth",
    title: "Vitalidade Herdada",
    description: "+20 de vida máxima por nível.",
    icon: "❤️",
    maxLevel: 5,
    costs: [10, 20, 40, 80, 160],
  },
  {
    id: "startDamage",
    title: "Fúria Ancestral",
    description: "+10% de dano em todas as armas por nível.",
    icon: "⚔️",
    maxLevel: 5,
    costs: [15, 30, 60, 120, 240],
  },
  {
    id: "startSpeed",
    title: "Passo Eterno",
    description: "+8% de velocidade de movimento por nível.",
    icon: "💨",
    maxLevel: 5,
    costs: [10, 20, 40, 80, 160],
  },
  {
    id: "startCooldown",
    title: "Ritual Eterno",
    description: "-8% de cooldown de armas por nível.",
    icon: "🔮",
    maxLevel: 5,
    costs: [12, 25, 50, 100, 200],
  },
  {
    id: "recovery",
    title: "Cura Sombria",
    description: "+0.3 de regeneração de vida/s por nível.",
    icon: "🩸",
    maxLevel: 5,
    costs: [15, 30, 60, 120, 240],
  },
  {
    id: "coinBonus",
    title: "Toque de Midas",
    description: "+25% de ouro ganho por nível.",
    icon: "🪙",
    maxLevel: 5,
    costs: [8, 15, 30, 60, 120],
  },
];
