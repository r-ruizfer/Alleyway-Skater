class Obstaculo {
  constructor(type) {
    this.x = gameBoxNode.offsetWidth;
    this.y = 0;
    this.w = 0;
    this.h = 0;

    this.node = document.createElement("img");
    if (type === "manhole") {
      this.y = 330;
      this.w = 75;
      this.h = 50;
      this.node.src = "./images/obstacle-manhole.png";
    } else if (type === "box") {
      this.y = 220;
      this.w = 100;
      this.h = 100;
      this.node.src = "./images/obstacle-box.png";
    } else if (type === "tunel") {
      this.y = 0;
      this.w = 550;
      this.h = 280;
      this.node.src = "./images/obstacle-tunel.png";
    } else if (type === "rail") {
      this.y = 310;
      this.w = 500;
      this.h = 75;
      this.node.src = "./images/obstacle-rail.png";
    }

    gameBoxNode.append(this.node);

    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }

  automaticMovement() {
    this.x -= gameSpeed;
    this.node.style.left = `${this.x}px`;
  }
}
