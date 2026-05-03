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

    // Cartas
    "cards.eyebrow": "Cartas",
    "cards.title": "Escolha até 3 cartas",
    "cards.subtitle":
      "Você desbloqueia cartas ao concluir runs. Equipe até 3 antes de sair para a próxima noite.",
    "cards.backBtn": "Voltar",
    "cards.startBtn": "Iniciar run",
    "cards.startWithout": "Iniciar sem cartas",
    "cards.collection": "Coleção: {count}/{total}",
    "cards.selection": "Selecionadas: {count}/{max}",
    "cards.chooseHint":
      "Clique em uma carta desbloqueada para equipar ou remover.",
    "cards.empty":
      "Ainda não há cartas desbloqueadas. Termine runs para começar a montar seu grimório.",
    "cards.locked": "Bloqueada",
    "cards.unlocked": "Desbloqueada",
    "cards.rewardsTitle": "Novas cartas",
    "cards.rewardsCopy":
      "Essas cartas agora podem ser escolhidas antes da próxima run.",
    "cards.type.blessing": "Bênção",
    "cards.type.curse": "Maldição",
    "cards.rarity.common": "Comum",
    "cards.rarity.uncommon": "Incomum",
    "cards.rarity.rare": "Rara",
    "cards.rarity.epic": "Épica",
    "cards.rarity.legendary": "Lendária",
    "cards.ironWill.title": "Vontade de Ferro",
    "cards.ironWill.desc": "+24 de vida máxima e cura imediata equivalente.",
    "cards.swiftBoots.title": "Botas do Vendaval",
    "cards.swiftBoots.desc": "+12% de velocidade de movimento.",
    "cards.emberStone.title": "Pedra de Brasa",
    "cards.emberStone.desc":
      "+10% de dano. Com Fireball: Fireball ganha +1 nível e +8% de explosão.",
    "cards.magnetShard.title": "Fragmento Magnético",
    "cards.magnetShard.desc": "+28% de alcance para coletar orbes.",
    "cards.clockworkHeart.title": "Coração Mecânico",
    "cards.clockworkHeart.desc": "-8% de cooldown global.",
    "cards.hunterSigil.title": "Sigilo do Caçador",
    "cards.hunterSigil.desc": "+9% de chance de crítico.",
    "cards.platedHide.title": "Pele Revestida",
    "cards.platedHide.desc": "+2 de armadura.",
    "cards.volleyRune.title": "Runa de Rajada",
    "cards.volleyRune.desc":
      "+1 projétil. Com Crossbow + Shuriken: ambas ganham +1 nível e +6% de crítico.",
    "cards.soulLantern.title": "Lanterna de Almas",
    "cards.soulLantern.desc":
      "+35% de XP por abate e +0.25 de regeneração. Com Soul Siphon: +3 roubo de vida e +1 nível.",
    "cards.frostRelic.title": "Relíquia do Inverno",
    "cards.frostRelic.desc":
      "+12% de congelamento e +8% de área. Com Ice Shard: Ice Shard ganha +1 nível.",
    "cards.thornEmblem.title": "Emblema de Espinhos",
    "cards.thornEmblem.desc": "+6 espinhos e +10 de vida máxima.",
    "cards.bloodChalice.title": "Cálice Rubro",
    "cards.bloodChalice.desc": "+4 roubo de vida por abate e +12% de dano.",
    "cards.phoenixFeather.title": "Pena da Fênix",
    "cards.phoenixFeather.desc": "Revive 1 vez com 45% da vida máxima.",
    "cards.glassCannon.title": "Canhão de Vidro",
    "cards.glassCannon.desc":
      "+28% de dano e +8% de crítico, mas -26 de vida máxima. Com Crossbow: +1 nível e crítico mais forte.",
    "cards.greedBrand.title": "Marca da Ganância",
    "cards.greedBrand.desc":
      "+55% de XP e +20% de coleta, mas -12% de velocidade.",
    "cards.doomClock.title": "Relógio da Ruína",
    "cards.doomClock.desc":
      "-18% de cooldown e +1 projétil, mas você sofre +25% de dano.",
    "cards.astralCrown.title": "Coroa Astral",
    "cards.astralCrown.desc":
      "+1 projétil, +8% de crítico e -10% de cooldown. Com Magic Wand + Thunderbolt: ambas ganham +1 nível e +10% de dano.",
    "cards.worldRoot.title": "Raiz do Mundo",
    "cards.worldRoot.desc":
      "+18% de área, +0.45 de regeneração e +2 de armadura. Com Aura + Vortex: ambas ganham +1 nível e +4 espinhos.",

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
    "gameover.stat.kills": "Abates totais",
    "gameover.stat.damage": "Dano causado",
    "gameover.typesTitle": "Abates por tipo",
    "gameover.typesEmpty": "Nenhum inimigo abatido nesta run.",
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
    "history.col.kills": "Abates totais",
    "history.col.damage": "Dano",
    "history.col.gold": "Ouro",
    "history.level": "Nvl",
    "history.runTypes": "Por tipo",
    "history.runTypesEmpty": "Sem detalhamento por tipo",

    // Inimigos
    "enemy.bat": "Morcego",
    "enemy.zombie": "Zumbi",
    "enemy.skeleton": "Esqueleto",
    "enemy.hound": "Cão infernal",
    "enemy.wraith": "Espectro",
    "enemy.brute": "Brutamontes",
    "enemy.ghost": "Espectro Etéreo",
    "enemy.demon": "Demônio",
    "enemy.boss": "Ceifador",

    // Sinergias
    "synergy.frostfire.name": "Fogo Glacial ❄️🔥",
    "synergy.frostfire.desc": "Ice Shard + Fireball: +10% freeze, +15% dano.",
    "synergy.shadowDance.name": "Dança Sombria 🌑",
    "synergy.shadowDance.desc":
      "Shadow Blade + Shuriken: +8% esquiva, +8% crítico.",
    "synergy.arcaneStorm.name": "Tempestade Arcana ⚡",
    "synergy.arcaneStorm.desc":
      "Magic Wand + Thunderbolt + Meteor: +20% área, -15% cooldown.",
    "synergy.bloodMoon.name": "Lua de Sangue 🌕",
    "synergy.bloodMoon.desc":
      "Soul Siphon + Chaos Orb: +5 roubo de vida, +12% dano.",
    "synergy.whirlwind.name": "Redemoinho 🌪️",
    "synergy.whirlwind.desc": "Whip + Vortex + Aura: +15% área, +3 espinhos.",

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
    "passive.evasion.title": "Passos Etéreos",
    "passive.evasion.desc": "+7% chance de esquivar de ataques inimigos.",
    "passive.critChance.title": "Olho do Caçador",
    "passive.critChance.desc": "+8% chance de acerto crítico (dano dobrado).",
    "passive.lifeSteal.title": "Sede de Sangue",
    "passive.lifeSteal.desc": "Cura +3 de vida por inimigo abatido.",
    "passive.thorns.title": "Armadura de Espinhos",
    "passive.thorns.desc": "Reflete +4 de dano ao inimigo ao ser atingido.",
    "passive.explosionChance.title": "Morte Explosiva",
    "passive.explosionChance.desc":
      "+10% chance de inimigos explodirem ao morrer.",
    "passive.freezeChance.title": "Toque Congelante",
    "passive.freezeChance.desc": "+8% chance de congelar inimigos ao acertar.",
    "passive.bounty.title": "Saqueador de Almas",
    "passive.bounty.desc": "+30% de XP extra de cada abate.",
    "passive.armor.title": "Couraça Sombria",
    "passive.armor.desc": "Reduz em -2 o dano recebido de cada golpe.",

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

    // Cards
    "cards.eyebrow": "Cards",
    "cards.title": "Choose up to 3 cards",
    "cards.subtitle":
      "You unlock cards by finishing runs. Equip up to 3 before heading into the next night.",
    "cards.backBtn": "Back",
    "cards.startBtn": "Start run",
    "cards.startWithout": "Start without cards",
    "cards.collection": "Collection: {count}/{total}",
    "cards.selection": "Selected: {count}/{max}",
    "cards.chooseHint": "Click an unlocked card to equip or remove it.",
    "cards.empty":
      "No cards unlocked yet. Finish runs to start building your grimoire.",
    "cards.locked": "Locked",
    "cards.unlocked": "Unlocked",
    "cards.rewardsTitle": "New cards",
    "cards.rewardsCopy": "These cards can now be chosen before your next run.",
    "cards.type.blessing": "Blessing",
    "cards.type.curse": "Curse",
    "cards.rarity.common": "Common",
    "cards.rarity.uncommon": "Uncommon",
    "cards.rarity.rare": "Rare",
    "cards.rarity.epic": "Epic",
    "cards.rarity.legendary": "Legendary",
    "cards.ironWill.title": "Iron Will",
    "cards.ironWill.desc": "+24 max health and matching instant heal.",
    "cards.swiftBoots.title": "Gale Boots",
    "cards.swiftBoots.desc": "+12% movement speed.",
    "cards.emberStone.title": "Ember Stone",
    "cards.emberStone.desc":
      "+10% damage. With Fireball: Fireball gains +1 level and +8% explosion chance.",
    "cards.magnetShard.title": "Magnet Shard",
    "cards.magnetShard.desc": "+28% pickup range for orbs.",
    "cards.clockworkHeart.title": "Clockwork Heart",
    "cards.clockworkHeart.desc": "-8% global cooldown.",
    "cards.hunterSigil.title": "Hunter Sigil",
    "cards.hunterSigil.desc": "+9% critical chance.",
    "cards.platedHide.title": "Plated Hide",
    "cards.platedHide.desc": "+2 armor.",
    "cards.volleyRune.title": "Volley Rune",
    "cards.volleyRune.desc":
      "+1 projectile. With Crossbow + Shuriken: both gain +1 level and +6% crit.",
    "cards.soulLantern.title": "Soul Lantern",
    "cards.soulLantern.desc":
      "+35% XP per kill and +0.25 regeneration. With Soul Siphon: +3 lifesteal and +1 level.",
    "cards.frostRelic.title": "Frost Relic",
    "cards.frostRelic.desc":
      "+12% freeze chance and +8% area. With Ice Shard: Ice Shard gains +1 level.",
    "cards.thornEmblem.title": "Thorn Emblem",
    "cards.thornEmblem.desc": "+6 thorns and +10 max health.",
    "cards.bloodChalice.title": "Blood Chalice",
    "cards.bloodChalice.desc": "+4 lifesteal on kill and +12% damage.",
    "cards.phoenixFeather.title": "Phoenix Feather",
    "cards.phoenixFeather.desc": "Revive once with 45% max health.",
    "cards.glassCannon.title": "Glass Cannon",
    "cards.glassCannon.desc":
      "+28% damage and +8% crit, but -26 max health. With Crossbow: +1 level and stronger crits.",
    "cards.greedBrand.title": "Greed Brand",
    "cards.greedBrand.desc":
      "+55% XP and +20% pickup range, but -12% movement speed.",
    "cards.doomClock.title": "Doom Clock",
    "cards.doomClock.desc":
      "-18% cooldown and +1 projectile, but you take +25% damage.",
    "cards.astralCrown.title": "Astral Crown",
    "cards.astralCrown.desc":
      "+1 projectile, +8% crit and -10% cooldown. With Magic Wand + Thunderbolt: both gain +1 level and +10% damage.",
    "cards.worldRoot.title": "World Root",
    "cards.worldRoot.desc":
      "+18% area, +0.45 regeneration and +2 armor. With Aura + Vortex: both gain +1 level and +4 thorns.",

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
    "gameover.stat.kills": "Total kills",
    "gameover.stat.damage": "Damage dealt",
    "gameover.typesTitle": "Kills by type",
    "gameover.typesEmpty": "No enemies defeated in this run.",
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
    "history.col.kills": "Total kills",
    "history.col.damage": "Damage",
    "history.col.gold": "Gold",
    "history.level": "Lvl",
    "history.runTypes": "By type",
    "history.runTypesEmpty": "No per-type breakdown",

    // Enemies
    "enemy.bat": "Bat",
    "enemy.zombie": "Zombie",
    "enemy.skeleton": "Skeleton",
    "enemy.hound": "Hell Hound",
    "enemy.wraith": "Wraith",
    "enemy.brute": "Brute",
    "enemy.ghost": "Ethereal Ghost",
    "enemy.demon": "Demon",
    "enemy.boss": "Reaper",

    // Synergies
    "synergy.frostfire.name": "Frostfire ❄️🔥",
    "synergy.frostfire.desc": "Ice Shard + Fireball: +10% freeze, +15% damage.",
    "synergy.shadowDance.name": "Shadow Dance 🌑",
    "synergy.shadowDance.desc":
      "Shadow Blade + Shuriken: +8% evasion, +8% crit.",
    "synergy.arcaneStorm.name": "Arcane Storm ⚡",
    "synergy.arcaneStorm.desc":
      "Magic Wand + Thunderbolt + Meteor: +20% area, -15% cooldown.",
    "synergy.bloodMoon.name": "Blood Moon 🌕",
    "synergy.bloodMoon.desc":
      "Soul Siphon + Chaos Orb: +5 lifesteal, +12% damage.",
    "synergy.whirlwind.name": "Whirlwind 🌪️",
    "synergy.whirlwind.desc": "Whip + Vortex + Aura: +15% area, +3 thorns.",

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
    "passive.evasion.title": "Ethereal Steps",
    "passive.evasion.desc": "+7% chance to dodge enemy attacks.",
    "passive.critChance.title": "Hunter's Eye",
    "passive.critChance.desc": "+8% critical hit chance (double damage).",
    "passive.lifeSteal.title": "Blood Thirst",
    "passive.lifeSteal.desc": "Heal +3 HP per enemy killed.",
    "passive.thorns.title": "Thorn Armor",
    "passive.thorns.desc": "Reflects +4 damage to enemies on hit.",
    "passive.explosionChance.title": "Explosive Death",
    "passive.explosionChance.desc": "+10% chance enemies explode on death.",
    "passive.freezeChance.title": "Freezing Touch",
    "passive.freezeChance.desc": "+8% chance to freeze enemies on hit.",
    "passive.bounty.title": "Soul Reaper",
    "passive.bounty.desc": "+30% extra XP from each kill.",
    "passive.armor.title": "Dark Carapace",
    "passive.armor.desc": "Reduces incoming damage by -2 per hit.",

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
