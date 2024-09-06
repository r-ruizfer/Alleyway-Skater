class Tuberia {
  constructor(positionY, type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = positionY;
    this.w = 55;
    this.h = 220;
    this.speed = 2;

    this.node = document.createElement("img");
    this.node.src = "./images/obstacle_top.png";

    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  automaticMovement() {
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
