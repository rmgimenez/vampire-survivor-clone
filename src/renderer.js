import { WORLD_TILE_SIZE } from "./config.js";

export class Renderer {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.resize();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get viewport() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
    };
  }

  worldToScreen(x, y, camera) {
    return {
      x: x - camera.x + this.canvas.width / 2,
      y: y - camera.y + this.canvas.height / 2,
    };
  }

  drawBackground(camera, elapsed) {
    const ctx = this.context;
    const { width, height } = this.viewport;

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#0f2034");
    gradient.addColorStop(0.58, "#08111f");
    gradient.addColorStop(1, "#040914");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = "#f8c35c";
    ctx.beginPath();
    ctx.arc(width - 160, 130, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const startX = Math.floor((camera.x - width / 2) / WORLD_TILE_SIZE) - 1;
    const endX = Math.ceil((camera.x + width / 2) / WORLD_TILE_SIZE) + 1;
    const startY = Math.floor((camera.y - height / 2) / WORLD_TILE_SIZE) - 1;
    const endY = Math.ceil((camera.y + height / 2) / WORLD_TILE_SIZE) + 1;

    for (let tileY = startY; tileY <= endY; tileY += 1) {
      for (let tileX = startX; tileX <= endX; tileX += 1) {
        const worldX = tileX * WORLD_TILE_SIZE;
        const worldY = tileY * WORLD_TILE_SIZE;
        const screen = this.worldToScreen(worldX, worldY, camera);
        const isEven = (tileX + tileY) % 2 === 0;

        ctx.fillStyle = isEven
          ? "rgba(255,255,255,0.02)"
          : "rgba(255,255,255,0.012)";
        ctx.fillRect(screen.x, screen.y, WORLD_TILE_SIZE, WORLD_TILE_SIZE);

        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.strokeRect(screen.x, screen.y, WORLD_TILE_SIZE, WORLD_TILE_SIZE);

        const runePhase = ((tileX * 17 + tileY * 13) % 7) / 7;
        const shimmer =
          0.05 + Math.sin(elapsed * 0.5 + runePhase * Math.PI * 2) * 0.015;
        ctx.fillStyle = `rgba(248, 195, 92, ${Math.max(0.02, shimmer)})`;
        ctx.fillRect(screen.x + 8, screen.y + 8, 10, 10);
      }
    }
  }

  drawCircle(x, y, radius, fillStyle, alpha = 1) {
    const ctx = this.context;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawEntity(entity, camera, colorOverride) {
    const screen = this.worldToScreen(entity.x, entity.y, camera);
    const color = colorOverride || entity.color;
    this.drawCircle(screen.x, screen.y, entity.radius, color);

    if (entity.hitFlashTimer > 0) {
      this.drawCircle(screen.x, screen.y, entity.radius + 4, "#fff2c7", 0.25);
    }
  }

  drawPlayer(player, camera) {
    const screen = this.worldToScreen(player.x, player.y, camera);
    const alpha = player.invulnerableTimer > 0 ? 0.78 : 1;

    this.drawCircle(
      screen.x,
      screen.y,
      player.radius + 6,
      "rgba(78, 205, 196, 0.18)",
      0.8,
    );
    this.drawCircle(screen.x, screen.y, player.radius, "#4ecdc4", alpha);

    const ctx = this.context;
    ctx.save();
    ctx.strokeStyle = "#f8f1da";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(screen.x, screen.y);
    ctx.lineTo(screen.x + player.facingX * 18, screen.y + player.facingY * 18);
    ctx.stroke();
    ctx.restore();
  }

  drawProjectile(projectile, camera) {
    const screen = this.worldToScreen(projectile.x, projectile.y, camera);
    this.drawCircle(screen.x, screen.y, projectile.radius, projectile.color);
  }

  drawPickup(pickup, camera) {
    const screen = this.worldToScreen(pickup.x, pickup.y, camera);

    if (pickup.type === "chest") {
      const ctx = this.context;
      const colorMap = {
        xp: "#71f0cf",
        health: "#f56d5e",
        upgrade: "#f8c35c",
      };
      const fillStyle = colorMap[pickup.kind] || "#71f0cf";

      ctx.save();
      ctx.translate(screen.x, screen.y);
      ctx.rotate((pickup.bobTimer || 0) * 0.2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
      ctx.fillRect(
        -pickup.radius - 2,
        -pickup.radius - 2,
        pickup.radius * 2 + 4,
        pickup.radius * 2 + 4,
      );
      ctx.fillStyle = fillStyle;
      ctx.fillRect(
        -pickup.radius,
        -pickup.radius,
        pickup.radius * 2,
        pickup.radius * 2,
      );
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        -pickup.radius,
        -pickup.radius,
        pickup.radius * 2,
        pickup.radius * 2,
      );
      ctx.restore();
      return;
    }

    this.drawCircle(
      screen.x,
      screen.y,
      pickup.radius + 4,
      "rgba(78, 205, 196, 0.12)",
    );
    this.drawCircle(screen.x, screen.y, pickup.radius, "#71f0cf");
  }

  drawEffect(effect, camera) {
    const ctx = this.context;
    const screen = this.worldToScreen(effect.x, effect.y, camera);

    ctx.save();
    ctx.globalAlpha = Math.max(0, effect.ttl / effect.maxTtl);

    if (effect.type === "ring") {
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = effect.lineWidth;
      ctx.beginPath();
      ctx.arc(screen.x, screen.y, effect.radius, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (effect.type === "arc") {
      ctx.strokeStyle = effect.color;
      ctx.lineWidth = effect.lineWidth;
      ctx.beginPath();
      ctx.arc(
        screen.x,
        screen.y,
        effect.radius,
        effect.startAngle,
        effect.endAngle,
      );
      ctx.stroke();
    }

    ctx.restore();
  }

  drawEnemyHealth(enemy, camera) {
    if (!enemy.isBoss && enemy.health === enemy.maxHealth) {
      return;
    }

    const screen = this.worldToScreen(enemy.x, enemy.y, camera);
    const ctx = this.context;
    const width = enemy.isBoss ? 64 : 36;
    const height = enemy.isBoss ? 8 : 5;
    const x = screen.x - width / 2;
    const y = screen.y - enemy.radius - 16;
    const ratio = Math.max(0, enemy.health / enemy.maxHealth);

    ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = enemy.isBoss ? "#f8c35c" : "#f1685f";
    ctx.fillRect(x, y, width * ratio, height);
  }
}
