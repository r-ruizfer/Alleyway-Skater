class Rail {
  constructor() {
    this.x = gameBoxNode.offsetWidth;
    this.y = 310;
    this.w = 500;
    this.h = 75;
    this.type = "rail";

    this.node = document.createElement("img");
    this.node.src = "./images/obstacle-rail.png";

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
