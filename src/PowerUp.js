import Enemy from "./Enemy";

class PowerUp extends Enemy {
  constructor({ x, y, owner }) {
    super({ x, y });
    this.color = "#ff0000";
    this.lastStepTime = 0;
    this.velocity = 80;

  }

  render({ ctx, size }) {
    const now = Date.now();
    if (now - this.lastStepTime > this.velocity) {
      this.lastStepTime = now;
      this.color = this.color === "#ff0000" ? "#00ff00" : "#ff0000";
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x * size, this.y * size, size, size)
  }
}
 export default PowerUp;
