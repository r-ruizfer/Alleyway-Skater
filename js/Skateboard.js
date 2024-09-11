let skateJumpMomentum = jumpMomentum;
let skateFallSpeed = fallSpeed;

class Skateboard {
  constructor() {
    this.x = 70;
    this.y = 350;
    this.h = 20;
    this.w = 45;
    this.jumpSpeed = 0;
    this.skateJumping = false;
    this.skateboardGrinding = false;
    this.canItJump = true;
    // 1. añadir Skater al DOM
    this.node = document.createElement("img");
    this.node.src = "./images/Skateboard.png";
    gameBoxNode.append(this.node);
    // 2. ajustar  dimensiones y posiciónes
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
  }
  fallDownSkate() {
    if (skateboardCrashed === false && this.skateboardGrinding === false) {
      if (this.skateJumping === true) {
        this.canItJump = false;
        this.jumpSpeed += skateFallSpeed;
        this.y += this.jumpSpeed;

        this.node.style.top = `${this.y}px`;
      }
      if (this.y >= 350) {
        this.y = 350;
        this.jumpSpeed = 0;
        this.skateJumping = false;
        this.canItJump = true;
      }
    }
  }

  startGrinding(rail) {
    this.node.src = "./images/skateboard-grinding.png";
    this.skateboardGrinding = true;
    this.y = rail.y - this.h;
    this.node.style.top = `${this.y}px`;
    this.jumpSpeed = 0;
  }
  checkLeaveRail(rail) {
    if (this.skateboardGrinding && this.x > rail.x + rail.w) {
      this.stopGrinding();
    }
  }

  stopGrinding() {
    this.skateboardGrinding = false;
    this.node.src = "./images/Skateboard.png";
  }
  skateboardGrounded() {
    this.canItJump = false;
  }
  skateboardUnGrounded() {
    this.canItJump = true;
  }

  jump() {
    if (
      this.skateJumping === false &&
      this.canItJump === true &&
      skater.skaterLongJumping === false
    ) {
      this.jumpSpeed = skateJumpMomentum;
      this.skateJumping = true;
      this.node.style.top = `${this.y}px`;
    }
  }
  lostSkate() {
    if (skateboardCrashed === true) {
      this.canItJump = false;
      this.node.src = "./images/Skateboard-lost.png";
      this.x -= gameSpeed;
      this.node.style.left = `${this.x}px`;
    }
  }
}
