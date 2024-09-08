class Obstaculo {
  constructor(type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.speed = 2;

    this.node = document.createElement("img");
    if (type === "Top") {
      this.y = 0;
      this.w = 550;
      this.h = 290;
      this.node.src = "./images/obstacle-tunel.png";
    }

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
