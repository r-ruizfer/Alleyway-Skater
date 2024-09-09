class Obstaculo {
  constructor(type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.speed = 7;

    this.node = document.createElement("img");
    if (type === "Rail") {
      this.y = 330;
      this.w = 100;
      this.h = 50;
      this.node.src = "./images/obstacle-rail.png";
    } else if (type === "Box") {
      this.y = 200;
      this.w = 100;
      this.h = 100;
      this.node.src = "./images/obstacle-box.png";
    } else if (type === "tunel") {
      this.y = 0;
      this.w = 550;
      this.h = 280;
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
