import Food from "./Food";
import PowerUp from "./PowerUp";
import Snake from "./Snake";
import * as Direction from "./Direction";

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.resizeCanvas();
    this.ctx = this.canvas.getContext("2d");
    this.itemSize = Math.floor(Math.max(this.canvas.width, this.canvas.height) / 100);
    this.maxHeight = this.canvas.height / this.itemSize;
    this.maxWidth = this.canvas.width / this.itemSize;
    
    this.setupEventHandlers();
    this.paused = false;
    this.gameEnded = false;
  }

  run() {
    this.gameEnded = false;
    this.food = this.generateFood();
    this.powerUp = null;
    this.snake = new Snake({ x: Math.floor(this.maxWidth / 2), y: Math.floor(this.maxHeight / 2), velocity: 80, direction: Direction.RIGHT });
    window.requestAnimationFrame(this.render.bind(this));
  }

  gameOver() {
    this.gameEnded = true;
  }


  setupEventHandlers() {
    document.addEventListener("keydown", ({ code }) => {
      if (this.gameEnded) {
        this.run();
        return
      }
      switch (code) {
        case "KeyW":
        case "ArrowUp":
          !this.paused && this.snake.setDirection(Direction.UP)
          break
        case "KeyS":
        case "ArrowDown":
          !this.paused && this.snake.setDirection(Direction.DOWN)
          break
        case "KeyA":
        case "ArrowLeft":
          !this.paused && this.snake.setDirection(Direction.LEFT)
          break
        case "KeyD":
        case "ArrowRight":
          !this.paused && this.snake.setDirection(Direction.RIGHT)
          break
        case "Space":
          this.paused = !this.paused;
          break
      }
    })
    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  resizeCanvas() {
    this.canvas.width = this.canvas.clientWidth * (window.devicePixelRatio || 1);
    this.canvas.height = this.canvas.clientHeight * (window.devicePixelRatio || 1);
    this.maxHeight = this.canvas.height / this.itemSize;
    this.maxWidth = this.canvas.width / this.itemSize;
  }

  getRandomCoord() {
    const x = Math.floor(Math.random() * this.maxWidth);
    const y = Math.floor(Math.random() * this.maxHeight);
    return { x, y };
  }

  generateFood(isPowerUp) {
    const { x, y } = this.getRandomCoord();
    return isPowerUp ? new PowerUp({ x, y }) : new Food({ x, y });
  }

  render(timestamp) {
    if (!this.paused) {
      if (this.food.isDead) {
        this.food = this.generateFood(false);
        if ((!this.powerUp || this.powerUp.isDead) && Math.random() < 0.8) {
          this.powerUp = this.generateFood(true);
        }
      }

      this.snake.step();
      const head = this.snake.body[0];
      if (head.x > this.maxWidth || head.x < 0 || head.y > this.maxHeight || head.y < 0) {
        this.gameOver()
        return
      }

      if (this.food.isCollides(head)) {
        this.snake.eat(this.food);
      }
      if (this.powerUp && !this.powerUp.isDead && this.powerUp.isCollides(head)) {
        this.snake.eat(this.powerUp);
      }

      this.snake.body.slice(1).forEach(item => {
        if (item.isCollides(head)) {
          this.snake.eat(item)
        }
      })

      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.snake.render({ ctx: this.ctx, size: this.itemSize });
      this.food.render({ ctx: this.ctx, size: this.itemSize });
      if (this.powerUp && !this.powerUp.isDead) this.powerUp.render({ ctx: this.ctx, size: this.itemSize });
    }
    if (!this.gameEnded) {
      window.requestAnimationFrame(this.render.bind(this));
    }
  }
}

export default Game;
