import Enemy from "./Enemy";

class Food extends Enemy {
  constructor({ x, y, owner }) {
    super({ x, y });
  }

  render({ ctx, size }) {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(this.x * size, this.y * size, size, size)
  }
}
 export default Food;
