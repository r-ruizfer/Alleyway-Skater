let skateJumpMomentum = jumpMomentum;
let skateFallSpeed = fallSpeed;

class Skateboard {
  constructor() {
    this.x = 70;
    this.y = 350;
    this.h = 20;
    this.w = 45;
    this.jumpSpeed = 0;
    this.skateboardJumping = false;
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
  //GRAVITY
  fallDownSkate() {
    if (skateboardCrashed === false) {
      if (
        this.skateboardJumping === true &&
        this.skateboardGrinding === false
      ) {
        this.canItJump = false;
        this.jumpSpeed += skateFallSpeed;
        this.y += this.jumpSpeed;

        this.node.style.top = `${this.y}px`;
      }
      if (this.y >= 350) {
        if (this.skateboardJumping || this.skateboardGrinding) {
          landingSound.currentTime = 0;
          landingSound.play();
        } else if (!this.skateboardJumping && !this.skateboardGrinding) {
          rollingSound.play();
        }
        this.node.src = "./images/Skateboard.png";

        this.y = 350;
        this.node.style.top = `${this.y}px`;

        this.jumpSpeed = 0;
        this.skateboardJumping = false;
        this.canItJump = true;
        this.skateboardJumping = false;
      }
    }
  }
  // GRINDING MECHANICS
  startGrinding(rail) {
    this.node.src = "./images/skateboard-grinding.png";
    this.skateboardGrinding = true;
    this.y = rail.y - this.h;
    this.node.style.top = `${this.y}px`;
    this.jumpSpeed = 0;
    this.skateboardJumping = false;
    this.canItJump = true;

    rollingSound.pause();
    grindingSound.currentTime = 0;
    grindingSound.play();
  }
  checkLeaveRail(rail) {
    if (this.skateboardGrinding && this.x > rail.x + rail.w) {
      this.stopGrinding();
    }
  }

  stopGrinding() {
    this.skateboardGrinding = false;
    grindingSound.pause();
    grindingSound.currentTime = 0;
    this.node.src = "./images/Skateboard.png";
    this.skateboardJumping = true;
    this.canItJump = false;
  }

  //JUMPING MECHANICS
  skateboardGrounded() {
    this.canItJump = false;
  }
  skateboardUnGrounded() {
    this.canItJump = true;
  }

  jump() {
    if (
      this.skateboardJumping === false &&
      this.canItJump === true &&
      skater.skaterLongJumping === false
    ) {
      this.node.src = "./images/SKATE-FLIP.gif";

      rollingSound.pause();
      grindingSound.pause();
      grindingSound.currentTime = 0;
      this.jumpSpeed = skateJumpMomentum;
      this.skateboardJumping = true;
      this.skateboardGrinding = false;
      this.node.style.top = `${this.y}px`;
    }
  }

  // SKATE CRASHED :(
  lostSkate() {
    if (skateboardCrashed === true) {
      rollingSound.pause();

      this.canItJump = false;
      this.node.src = "./images/Skateboard-lost.png";
      this.x -= gameSpeed;
      this.node.style.left = `${this.x}px`;
      skater.node.src = "./images/skater-tripped.png";
      skateboardBreakingSound.play();
      skateboardBreakingSound.currentTime = 0;
    }
  }
}
