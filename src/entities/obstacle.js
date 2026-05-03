export class Obstacle {
  constructor({
    x,
    y,
    width,
    height,
    color = "#4a5d6c",
    sprite = null,
    renderWidth = width,
    renderHeight = height,
    renderBottomOffset = height / 2,
    shadowWidth = width * 0.68,
    shadowHeight = Math.max(12, height * 0.24),
    shadowAlpha = 0.24,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.sprite = sprite;
    this.renderWidth = renderWidth;
    this.renderHeight = renderHeight;
    this.renderBottomOffset = renderBottomOffset;
    this.shadowWidth = shadowWidth;
    this.shadowHeight = shadowHeight;
    this.shadowAlpha = shadowAlpha;
  }

  getBounds() {
    return {
      left: this.x - this.width / 2,
      right: this.x + this.width / 2,
      top: this.y - this.height / 2,
      bottom: this.y + this.height / 2,
    };
  }
}
