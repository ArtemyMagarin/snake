import Enemy from "./Enemy";

class BodyItem extends Enemy {
  constructor({ x, y, owner }) {
    super({ x, y });
    this.owner = owner;
    this.hasFood = false;
  }

  render({ ctx, size }) {
    ctx.fillStyle = this.hasFood ? "#ff00ff" : "#0000ff" 
    ctx.fillRect(this.x * size, this.y * size, size, size)
  }
}

export default BodyItem;
