class Enemy {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.isDead = false;
  }

  isCollides(enemy) {
    return this.x === enemy.x && this.y === enemy.y;
  }

  dead() {
    this.isDead = true;
  }
}

export default Enemy;
