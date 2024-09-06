class Skater {
  constructor() {
    // .todos los pollitos se crearán con estos valores
    this.x = 70;
    this.y = 250;
    this.h = 100;
    this.w = 45;
    this.fallSpeed = 2;
    this.jumpSpeed = 35;

    // 1. añadir Skater al DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Skater.png";
    gameBoxNode.append(this.node);
    // 2. ajustar  dimensiones y posiciónes
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
  fallDown() {
    if (this.y < 250) this.y += this.fallSpeed;
    this.node.style.top = `${this.y}px`;
  }

  jump(type) {
    if (type === "short") {
      this.y -= this.jumpSpeed;
      this.node.style.top = `${this.y}px`;
    } else if (type === "long") {
      this.y -= this.jumpSpeed * 3;
      this.node.style.top = `${this.y}px`;
    }
  }

  crouch() {
    this.node.src = "./images/Skater-crouching.png";
    
    this.h -= this.h / 2;
    this.node.style.height = `${this.h}px`;

    this.y += 50
    this.node.style.top = `${this.y}px`;
  }
  uncrouch(){
    this.node.src = "./images/Skater.png";

    this.h -= this.h * 2;
    this.node.style.height = `${this.h}px`;

    this.y -= 50
    this.node.style.top = `${this.y}px`;

  }
}
