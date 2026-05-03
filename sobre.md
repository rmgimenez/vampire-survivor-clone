# Vampire Survivor Clone — Documentação do Projeto

## Visão Geral

Clone do jogo **Vampire Survivors** desenvolvido inteiramente com tecnologias web nativas: **HTML**, **CSS** e **JavaScript puro** (sem frameworks ou bibliotecas externas). O jogo roda diretamente no browser, sem necessidade de instalação ou servidor backend.

O jogo tem a opção dos idiomas **Português** e **Inglês**, com detecção automática baseada no idioma do navegador. O jogador controla um personagem que deve sobreviver a ondas intermináveis de inimigos, coletando experiência e melhorando suas armas para resistir o máximo possível. O objetivo é sobreviver por 30 minutos, enfrentando inimigos cada vez mais fortes e desafiadores.

---

## Stack Tecnológica

| Tecnologia        | Uso                                            |
| ----------------- | ---------------------------------------------- |
| HTML5             | Estrutura da página e elemento `<canvas>`      |
| CSS3              | UI, menus, HUD e animações de interface        |
| JavaScript (ES6+) | Toda a lógica do jogo, renderização e sistemas |
| Canvas 2D API     | Renderização dos elementos do jogo             |

---

## Estrutura de Arquivos

```
vampire-survivor-clone/
├── index.html              # Entrada do jogo
├── style.css               # Estilos globais, menus e HUD
├── sobre.md                # Este documento
└── src/
    ├── main.js             # Inicialização e loop principal do jogo
    ├── game.js             # Estado global e gerenciador do jogo
    ├── input.js            # Captura de teclado e mouse/touch
    ├── renderer.js         # Camada de renderização (canvas)
    ├── entities/
    │   ├── player.js       # Classe do jogador
    │   ├── enemy.js        # Classe base de inimigo
    │   └── projectile.js   # Classe de projéteis/armas
    ├── systems/
    │   ├── collision.js    # Sistema de colisão (AABB)
    │   ├── spawner.js      # Sistema de spawn de inimigos
    │   ├── experience.js   # Sistema de XP e level-up
    │   └── waves.js        # Progressão de ondas e dificuldade
    ├── weapons/
    │   ├── weapon.js       # Classe base de arma
    │   ├── fireball.js     # Projétil de fogo
    │   ├── aura.js         # Dano em área ao redor do jogador
    │   └── whip.js         # Golpe em arco frontal
    └── ui/
        ├── hud.js          # Barras de vida, XP e timer
        ├── levelup.js      # Tela de escolha de upgrade
        └── gameover.js     # Tela de game over / vitória
```

---

## Mecânicas do Jogo

### Jogador

- Movimento em 8 direções via teclado (`WASD` ou setas)
- Atira automaticamente — sem input manual de ataque
- Possui atributos: `vida`, `velocidade`, `dano`, `área`, `cooldown`, `recuperação`, `quantidade`
- Sobe de nível ao acumular XP suficiente

### Inimigos

- Spawnam ao redor da tela em ondas contínuas
- Perseguem o jogador diretamente (pathfinding simples)
- Tipos iniciais:
  - **Bat** — rápido, pouca vida
  - **Zombie** — lento, vida média
  - **Skeleton** — velocidade média, dano alto
- Cada inimigo derrotado solta um **orbe de XP**

### Sistema de Level-Up

- Ao nível suficiente de XP, o jogo pausa e exibe **3 opções de upgrade**
- Upgrades incluem: novas armas, melhorias de armas existentes, upgrades passivos
- O jogador escolhe 1 opção e o jogo retoma

### Armas

Cada arma possui: `dano`, `cooldown`, `quantidade`, `área` e `nível` (1–8).

| Arma       | Comportamento                                          |
| ---------- | ------------------------------------------------------ |
| Magic Wand | Projétil que busca o inimigo mais próximo              |
| Fire Aura  | Dano em área ao redor do jogador, pulsa periodicamente |
| Whip       | Ataque em arco para o lado que o jogador está andando  |
| Knife      | Projéteis rápidos na direção do movimento              |

### Progressão e Dificuldade

- Duração padrão da partida: **30 minutos**
- A cada minuto, os inimigos ficam mais fortes (mais vida, velocidade, quantidade)
- Boss spawn a cada 10 minutos
- Vitória ao sobreviver os 30 minutos

---

## Sistemas Técnicos

### Game Loop

```javascript
// Baseado em requestAnimationFrame com delta time
function gameLoop(timestamp) {
  const dt = (timestamp - lastTime) / 1000; // segundos
  update(dt);
  render();
  requestAnimationFrame(gameLoop);
}
```

### Colisão

- Detecção **AABB** (Axis-Aligned Bounding Box) para projéteis vs inimigos
- Detecção **circular** para dano em área (aura) e coleta de XP
- Sem física — colisão apenas para dano e coleta

### Câmera

- Câmera segue o jogador (scrolling infinito)
- O mapa é gerado proceduralmente por tiles repetidos
- Inimigos spawnam fora da área visível da câmera

### Renderização

- Tudo renderizado via `Canvas 2D API`
- Ordem de renderização: fundo → orbes de XP → inimigos → projéteis → jogador → HUD
- Sprites podem ser retângulos coloridos no MVP (sem assets externos obrigatórios)

---

## Estados do Jogo

```
MENU → JOGANDO → PAUSADO (level-up) → JOGANDO → GAME_OVER | VITÓRIA
```

| Estado      | Descrição                              |
| ----------- | -------------------------------------- |
| `MENU`      | Tela inicial com botão "Jogar"         |
| `PLAYING`   | Loop principal ativo                   |
| `LEVEL_UP`  | Jogo pausado, exibe opções de upgrade  |
| `PAUSED`    | Pausado manualmente (tecla `ESC`)      |
| `GAME_OVER` | Jogador morreu — exibe estatísticas    |
| `WIN`       | Sobreviveu 30 min — exibe estatísticas |

---

## HUD (Interface In-Game)

- **Barra de vida** — topo esquerdo
- **Barra de XP** — base da tela, horizontal
- **Timer** — topo centro (tempo decorrido)
- **Nível atual** — ao lado da barra de XP
- **Armas equipadas** — ícones no canto inferior direito

---

## Instruções para o Agente de IA

Este documento descreve o escopo completo do projeto. Ao gerar o código, siga estas diretrizes:

1. **Nenhuma dependência externa** — somente HTML, CSS e JavaScript puro. Sem npm, sem bundler.
2. **Arquivo único como opção válida** — o jogo pode funcionar com `index.html` contendo todo o código se necessário para simplicidade.
3. **Priorize o MVP funcional** primeiro:
   - Jogador se movendo
   - Inimigos spawning e perseguindo
   - Uma arma automática funcional
   - Sistema de XP e level-up básico
   - Game over ao morrer
4. **Use formas geométricas** (retângulos, círculos) no lugar de sprites se assets não estiverem disponíveis.
5. **Mantenha o código modular** usando classes ES6 e módulos (`type="module"`).
6. **60 FPS alvo** — use `requestAnimationFrame` e delta time em todos os cálculos de movimento.
7. **Compatibilidade** — deve rodar nos browsers modernos (Chrome, Firefox, Edge) sem transpilação.
8. **Responsividade básica** — o canvas deve se ajustar ao tamanho da janela.

---

## MVP — Ordem de Implementação Sugerida

- [ ] `index.html` com canvas e estrutura base
- [ ] `style.css` com reset, fundo escuro e HUD
- [ ] Loop de jogo com `requestAnimationFrame`
- [ ] Classe `Player` com movimento por teclado
- [ ] Câmera seguindo o jogador
- [ ] Classe `Enemy` com pathfinding para o jogador
- [ ] Sistema de `Spawner` (spawn periódico fora da tela)
- [ ] Colisão jogador-inimigo com dano
- [ ] Arma automática básica (projétil que persegue inimigo)
- [ ] Orbes de XP ao matar inimigo
- [ ] Sistema de level-up com pausa e escolha de upgrade
- [ ] HUD completo (vida, XP, timer)
- [ ] Tela de game over e vitória
- [ ] Progressão de dificuldade por tempo
