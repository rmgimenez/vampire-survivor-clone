export class GameOverUI {
  constructor() {
    this.screen = document.getElementById('gameover-screen');
    this.kicker = document.getElementById('gameover-kicker');
    this.title = document.getElementById('gameover-title');
    this.summary = document.getElementById('gameover-summary');
    this.stats = document.getElementById('gameover-stats');
  }

  show({ win, elapsed, stats, playerLevel }) {
    this.kicker.textContent = win ? 'Vitoria' : 'Fim de jogo';
    this.title.textContent = win ? 'A alvorada chegou.' : 'Voce caiu na noite.';
    this.summary.textContent = win
      ? 'Voce resistiu aos 30 minutos e derrotou a horda final.'
      : 'Reorganize o arsenal, escolha melhores upgrades e tente outra vez.';

    this.stats.innerHTML = '';
    const statEntries = [
      [
        'Tempo',
        `${Math.floor(elapsed / 60)}m ${String(Math.floor(elapsed % 60)).padStart(2, '0')}s`,
      ],
      ['Nivel', String(playerLevel)],
      ['Abates', String(stats.kills)],
      ['Dano causado', String(Math.round(stats.damageDone))],
    ];

    for (const [label, value] of statEntries) {
      const item = document.createElement('div');
      item.className = 'stat-card';
      item.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
      this.stats.append(item);
    }

    this.screen.classList.remove('hidden');
    this.screen.classList.add('visible');
  }

  hide() {
    this.screen.classList.add('hidden');
    this.screen.classList.remove('visible');
  }
}
