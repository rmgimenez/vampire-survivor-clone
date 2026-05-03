const LANG_KEY = "cds_lang";

const translations = {
  pt: {
    // Idioma
    "lang.toggle": "🌐 English",

    // HUD
    "hud.health": "Vida",
    "hud.kills": "Abates",
    "hud.night": "Noite",
    "hud.weapons": "Armas",
    "hud.level": "Nvl",

    // Tela de perfil
    "profile.subtitle":
      "Escolha um perfil para continuar ou crie um novo aventureiro.",
    "profile.empty": "Nenhum perfil ainda. Crie um abaixo.",
    "profile.namePlaceholder": "Nome do aventureiro…",
    "profile.createBtn": "Criar perfil",
    "profile.play": "Jogar",
    "profile.deleteTitle": "Apagar perfil",
    "profile.deleteConfirm":
      "Apagar este perfil permanentemente? Esta ação não pode ser desfeita.",
    "profile.win": "vitória",
    "profile.wins": "vitórias",
    "profile.best": "melhor",
    "profile.kills": "abates",

    // Menu principal
    "menu.subtitle":
      "Sobreviva por 30 minutos, evolua armas e atravesse a maré de criaturas.",
    "menu.playBtn": "⚔️ Jogar",
    "menu.shopBtn": "🛒 Loja Permanente",
    "menu.historyBtn": "📜 Histórico",
    "menu.changeProfile": "Trocar perfil",
    "menu.hint": "Movimento: WASD ou setas. Pausa: ESC.",

    // Level Up
    "levelup.eyebrow": "Level Up",
    "levelup.title": "Escolha um aprimoramento",
    "levelup.type.weapon": "Arma",
    "levelup.type.passive.offense": "Ofensivo",
    "levelup.type.passive.defense": "Defensivo",
    "levelup.type.passive.utility": "Utilitário",
    "levelup.rarity.common": "Comum",
    "levelup.rarity.uncommon": "Incomum",
    "levelup.rarity.rare": "Raro",
    "levelup.rarity.epic": "Épico",

    // Pausa
    "pause.eyebrow": "Pausado",
    "pause.title": "A escuridão aguarda",
    "pause.hint": "Pressione ESC para continuar.",
    "pause.giveUp": "Desistir da run",

    // Fim de jogo
    "gameover.win.kicker": "Vitória",
    "gameover.lose.kicker": "Fim de jogo",
    "gameover.win.title": "A alvorada chegou.",
    "gameover.lose.title": "Você caiu na noite.",
    "gameover.win.summary":
      "Você resistiu aos 30 minutos e derrotou a horda final.",
    "gameover.lose.summary":
      "Reorganize o arsenal, escolha melhores upgrades e tente outra vez.",
    "gameover.stat.time": "Tempo",
    "gameover.stat.level": "Nível",
    "gameover.stat.kills": "Abates",
    "gameover.stat.damage": "Dano causado",
    "gameover.coinsEarned": "Ouro ganho nesta run",
    "gameover.coinsTotal": "Total no perfil:",
    "gameover.playAgain": "▶ Jogar novamente",
    "gameover.menu": "🏠 Menu",

    // Loja
    "shop.eyebrow": "Loja Permanente",
    "shop.title": "Upgrades Eternos",
    "shop.balanceLabel": "Saldo",
    "shop.closeBtn": "✕ Fechar",
    "shop.desc":
      "Upgrades comprados aqui são permanentes e se aplicam a todas as runs deste perfil.",
    "shop.maxed": "MÁXIMO",

    // Histórico
    "history.eyebrow": "Histórico de Runs",
    "history.closeBtn": "✕ Fechar",
    "history.stat.runs": "Runs",
    "history.stat.wins": "Vitórias",
    "history.stat.totalKills": "Abates totais",
    "history.stat.bestRun": "Melhor run (abates)",
    "history.stat.totalCoins": "Ouro total ganho",
    "history.empty": "Nenhuma run concluída ainda.",
    "history.col.date": "Data",
    "history.col.time": "Tempo",
    "history.col.level": "Nível",
    "history.col.kills": "Abates",
    "history.col.damage": "Dano",
    "history.col.gold": "Ouro",
    "history.level": "Nvl",

    // Upgrades passivos (level-up)
    "passive.health.title": "Coração Blindado",
    "passive.health.desc": "+20 de vida máxima e cura imediata de 20.",
    "passive.damage.title": "Lâmina Sanguínea",
    "passive.damage.desc": "+15% de dano em todas as armas.",
    "passive.speed.title": "Passo Rápido",
    "passive.speed.desc": "+12% de velocidade de movimento.",
    "passive.cooldown.title": "Ritual Frio",
    "passive.cooldown.desc": "-10% de cooldown em todas as armas.",
    "passive.area.title": "Círculo Amplo",
    "passive.area.desc": "+12% de área e alcance ofensivo.",
    "passive.recovery.title": "Regeneração Sombria",
    "passive.recovery.desc": "+0.5 de recuperação por segundo.",
    "passive.amount.title": "Mãos Extras",
    "passive.amount.desc": "+1 projétil ou aplicação extra por ataque.",
    "passive.magnet.title": "Núcleo de XP",
    "passive.magnet.desc": "+30% de alcance para coletar orbes.",

    // Nomes de armas
    "weapon.magicWand.name": "Magic Wand",
    "weapon.aura.name": "Fire Aura",
    "weapon.whip.name": "Whip",
    "weapon.knife.name": "Knife",
    "weapon.crossbow.name": "Crossbow",
    "weapon.fireball.name": "Fireball",
    "weapon.iceShard.name": "Ice Shard",
    "weapon.meteor.name": "Meteor",
    "weapon.vortex.name": "Vortex",
    "weapon.shuriken.name": "Shuriken",
    "weapon.soulSiphon.name": "Soul Siphon",
    "weapon.thunderbolt.name": "Thunderbolt",
    "weapon.shadowBlade.name": "Shadow Blade",
    "weapon.chaosOrb.name": "Chaos Orb",
    "weapon.unlock.desc": "Equipa {name} no arsenal.",
    "weapon.upgrade.desc": "Eleva {name} para o nível {level}.",

    // Upgrades permanentes (loja)
    "meta.startHealth.title": "Vitalidade Herdada",
    "meta.startHealth.desc": "+20 de vida máxima por nível.",
    "meta.startDamage.title": "Fúria Ancestral",
    "meta.startDamage.desc": "+10% de dano em todas as armas por nível.",
    "meta.startSpeed.title": "Passo Eterno",
    "meta.startSpeed.desc": "+8% de velocidade de movimento por nível.",
    "meta.startCooldown.title": "Ritual Eterno",
    "meta.startCooldown.desc": "-8% de cooldown de armas por nível.",
    "meta.recovery.title": "Cura Sombria",
    "meta.recovery.desc": "+0.3 de regeneração de vida/s por nível.",
    "meta.coinBonus.title": "Toque de Midas",
    "meta.coinBonus.desc": "+25% de ouro ganho por nível.",
  },

  en: {
    // Language
    "lang.toggle": "🌐 Português",

    // HUD
    "hud.health": "Health",
    "hud.kills": "Kills",
    "hud.night": "Night",
    "hud.weapons": "Weapons",
    "hud.level": "Lvl",

    // Profile screen
    "profile.subtitle":
      "Choose a profile to continue or create a new adventurer.",
    "profile.empty": "No profiles yet. Create one below.",
    "profile.namePlaceholder": "Adventurer name…",
    "profile.createBtn": "Create profile",
    "profile.play": "Play",
    "profile.deleteTitle": "Delete profile",
    "profile.deleteConfirm":
      "Permanently delete this profile? This action cannot be undone.",
    "profile.win": "win",
    "profile.wins": "wins",
    "profile.best": "best",
    "profile.kills": "kills",

    // Main menu
    "menu.subtitle":
      "Survive for 30 minutes, evolve your weapons and outlast the horde.",
    "menu.playBtn": "⚔️ Play",
    "menu.shopBtn": "🛒 Permanent Shop",
    "menu.historyBtn": "📜 History",
    "menu.changeProfile": "Switch profile",
    "menu.hint": "Movement: WASD or arrows. Pause: ESC.",

    // Level Up
    "levelup.eyebrow": "Level Up",
    "levelup.title": "Choose an upgrade",
    "levelup.type.weapon": "Weapon",
    "levelup.type.passive.offense": "Offensive",
    "levelup.type.passive.defense": "Defensive",
    "levelup.type.passive.utility": "Utility",
    "levelup.rarity.common": "Common",
    "levelup.rarity.uncommon": "Uncommon",
    "levelup.rarity.rare": "Rare",
    "levelup.rarity.epic": "Epic",

    // Pause
    "pause.eyebrow": "Paused",
    "pause.title": "Darkness awaits",
    "pause.hint": "Press ESC to continue.",
    "pause.giveUp": "Give up the run",

    // Game Over
    "gameover.win.kicker": "Victory",
    "gameover.lose.kicker": "Game Over",
    "gameover.win.title": "The dawn has come.",
    "gameover.lose.title": "You fell in the night.",
    "gameover.win.summary":
      "You survived 30 minutes and defeated the final horde.",
    "gameover.lose.summary":
      "Reorganize your arsenal, choose better upgrades and try again.",
    "gameover.stat.time": "Time",
    "gameover.stat.level": "Level",
    "gameover.stat.kills": "Kills",
    "gameover.stat.damage": "Damage dealt",
    "gameover.coinsEarned": "Gold earned this run",
    "gameover.coinsTotal": "Profile total:",
    "gameover.playAgain": "▶ Play again",
    "gameover.menu": "🏠 Menu",

    // Shop
    "shop.eyebrow": "Permanent Shop",
    "shop.title": "Eternal Upgrades",
    "shop.balanceLabel": "Balance",
    "shop.closeBtn": "✕ Close",
    "shop.desc":
      "Upgrades purchased here are permanent and apply to all runs on this profile.",
    "shop.maxed": "MAXED",

    // History
    "history.eyebrow": "Run History",
    "history.closeBtn": "✕ Close",
    "history.stat.runs": "Runs",
    "history.stat.wins": "Wins",
    "history.stat.totalKills": "Total kills",
    "history.stat.bestRun": "Best run (kills)",
    "history.stat.totalCoins": "Total gold earned",
    "history.empty": "No completed runs yet.",
    "history.col.date": "Date",
    "history.col.time": "Time",
    "history.col.level": "Level",
    "history.col.kills": "Kills",
    "history.col.damage": "Damage",
    "history.col.gold": "Gold",
    "history.level": "Lvl",

    // Passive upgrades (level-up)
    "passive.health.title": "Armored Heart",
    "passive.health.desc": "+20 max health and immediate heal of 20.",
    "passive.damage.title": "Blood Blade",
    "passive.damage.desc": "+15% damage to all weapons.",
    "passive.speed.title": "Swift Step",
    "passive.speed.desc": "+12% movement speed.",
    "passive.cooldown.title": "Cold Ritual",
    "passive.cooldown.desc": "-10% weapon cooldown.",
    "passive.area.title": "Wide Circle",
    "passive.area.desc": "+12% area and offensive range.",
    "passive.recovery.title": "Dark Regeneration",
    "passive.recovery.desc": "+0.5 recovery per second.",
    "passive.amount.title": "Extra Hands",
    "passive.amount.desc": "+1 extra projectile or application per attack.",
    "passive.magnet.title": "XP Core",
    "passive.magnet.desc": "+30% range to collect orbs.",

    // Weapon names
    "weapon.magicWand.name": "Magic Wand",
    "weapon.aura.name": "Fire Aura",
    "weapon.whip.name": "Whip",
    "weapon.knife.name": "Knife",
    "weapon.crossbow.name": "Crossbow",
    "weapon.fireball.name": "Fireball",
    "weapon.iceShard.name": "Ice Shard",
    "weapon.meteor.name": "Meteor",
    "weapon.vortex.name": "Vortex",
    "weapon.shuriken.name": "Shuriken",
    "weapon.soulSiphon.name": "Soul Siphon",
    "weapon.thunderbolt.name": "Thunderbolt",
    "weapon.shadowBlade.name": "Shadow Blade",
    "weapon.chaosOrb.name": "Chaos Orb",
    "weapon.unlock.desc": "Equips {name} to your arsenal.",
    "weapon.upgrade.desc": "Upgrades {name} to level {level}.",

    // Permanent upgrades (shop)
    "meta.startHealth.title": "Inherited Vitality",
    "meta.startHealth.desc": "+20 max health per level.",
    "meta.startDamage.title": "Ancestral Fury",
    "meta.startDamage.desc": "+10% damage to all weapons per level.",
    "meta.startSpeed.title": "Eternal Step",
    "meta.startSpeed.desc": "+8% movement speed per level.",
    "meta.startCooldown.title": "Eternal Ritual",
    "meta.startCooldown.desc": "-8% weapon cooldown per level.",
    "meta.recovery.title": "Dark Healing",
    "meta.recovery.desc": "+0.3 health regeneration/s per level.",
    "meta.coinBonus.title": "Touch of Midas",
    "meta.coinBonus.desc": "+25% gold earned per level.",
  },
};

export function getLanguage() {
  return localStorage.getItem(LANG_KEY) || "pt";
}

export function setLanguage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  applyStaticTranslations();
  window.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

export function toggleLanguage() {
  setLanguage(getLanguage() === "pt" ? "en" : "pt");
}

/**
 * Returns the translated string for the given key.
 * Variables in the string use {varName} syntax.
 */
export function t(key, vars = {}) {
  const lang = getLanguage();
  const str = translations[lang]?.[key] ?? translations["pt"][key] ?? key;
  return str.replace(/\{(\w+)\}/g, (_, k) =>
    k in vars ? String(vars[k]) : `{${k}}`,
  );
}

/**
 * Updates all DOM elements with data-i18n / data-i18n-placeholder attributes.
 * Call this once on startup and whenever the language changes.
 */
export function applyStaticTranslations() {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n);
  }
  for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  }
  document.documentElement.lang = getLanguage() === "pt" ? "pt-BR" : "en";
}
