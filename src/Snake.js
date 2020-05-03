import BodyItem from "./BodyItem";
import Food from "./Food";
import PowerUp from "./PowerUp";
import { UP, DOWN, LEFT, RIGHT } from "./Direction";

class Snake {
  constructor({ x, y, velocity, direction }) {
    this.velocity = velocity;
    this.direction = direction;
    this.body = [ new BodyItem({ x, y, owner: this }) ];
    this.lastStepTime = 0;
  }

  eat(item) {
    if (item instanceof BodyItem) {
      const index = item.owner.body.indexOf(item);
      item.owner.body = item.owner.body.slice(0, index);
    }
    if (item instanceof Food) {
      item.dead();
      this.body[0].hasFood = true;
    }
    if (item instanceof PowerUp) {
      item.dead();
      this.body[0].hasFood = true;
      const oldVelocity = this.velocity;
      this.velocity *= 0.5;
      setTimeout(() => this.velocity = oldVelocity, 5000);
    }
  }

  calculateStep() {
    const head = this.body[0];
    if ([UP, DOWN].includes(this.direction)) {
      const newY = this.direction === UP ? head.y - 1 : head.y + 1;
      return new BodyItem({ x: head.x, y: newY, owner: this });
    }
    if ([LEFT, RIGHT].includes(this.direction)) {
      const newX = this.direction === LEFT ? head.x - 1 : head.x + 1;
      return new BodyItem({ x: newX, y: head.y, owner: this });
    }
  }

  step() {
    const now = Date.now();
    if (now - this.lastStepTime > this.velocity) {
      this.lastStepTime = now;
      const head = this.calculateStep();
      const lastItem = this.body.slice(-1)[0];
      this.body = [head, ...this.body.slice(0, -1)];
      if (lastItem.hasFood) {
        console.log("keep last item")
        lastItem.hasFood = false;
        this.body.push(lastItem);
      }
    }
  }

  render({ ctx, size }) {
    this.body.forEach(item => item.render({ ctx, size }));
  }

  setDirection(direction) {
    if (this.direction === DOWN && direction === UP) return
    if (this.direction === UP && direction === DOWN) return
    if (this.direction === LEFT && direction === RIGHT) return
    if (this.direction === RIGHT && direction === LEFT) return
    this.direction = direction;
  }
}

export default Snake;
