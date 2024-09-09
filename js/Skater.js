let jumpMomentum = -40;
let fallSpeed = 5;

class Skater {
  constructor() {
    this.x = 70;
    this.y = 250;
    this.h = 100;
    this.w = 45;

    this.jumpSpeed = 0;
    this.speed = 5;

    this.skaterJumping = false;
    this.skaterCrouching = false;

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
    if (this.skaterJumping) {
      this.jumpSpeed += fallSpeed;
      this.y += this.jumpSpeed;
      this.node.style.top = `${this.y}px`;
    }
    if (this.y >= 250) {
      this.y = 250;
      this.jumpSpeed = 0;
      this.skaterJumping = false;
    }
  }

  jump(type) {
    if (this.skaterJumping === false) {
      if (type === "short") {
        this.jumpSpeed = jumpMomentum;
        this.skaterJumping = true;
        this.node.style.top = `${this.y}px`;
      } else if (type === "long") {
        this.jumpSpeed = jumpMomentum * 1.2;
        this.skaterJumping = true;
        this.node.style.top = `${this.y}px`;
      }
    }
  }

  crouch() {
    if (this.skaterCrouching === false) {
      this.node.src = "./images/Skater-crouching.png";

      this.h = 50;
      this.node.style.height = `${this.h}px`;
      this.y = 300;
      this.node.style.top = `${this.y}px`;
      this.skaterCrouching = true;
    }
  }

  uncrouch() {
    if (this.skaterCrouching === true) {
      this.node.src = "./images/Skater.png";

      this.h = 100;
      this.node.style.height = `${this.h}px`;
      this.y = 250;
      this.node.style.top = `${this.y}px`;
      this.skaterCrouching = false;
    }
  }
  automaticMovement() {
    this.node.src = "./images/skater-crashed.png";
    this.x -= this.speed;
    this.node.style.left = `${this.x}px`;
  }
}
