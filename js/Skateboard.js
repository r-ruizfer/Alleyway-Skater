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
  //GRAVITY
  fallDownSkate() {
    if (skateboardCrashed === false) {
      if (this.skateJumping === true && this.skateboardGrinding === false) {
        this.canItJump = false;
        this.jumpSpeed += skateFallSpeed;
        this.y += this.jumpSpeed;

        this.node.style.top = `${this.y}px`;
      }
      if (this.y >= 350) {
        if (this.skateJumping ||this.skateboardGrinding){
          landingSound.currentTime = 0
          landingSound.play()
          


        } else if (!this.skateJumping && !this.skateboardGrinding){
          rollingSound.play()

        }
        this.y = 350;
        this.jumpSpeed = 0;
        this.skateJumping = false;
        this.canItJump = true;
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

    rollingSound.pause()
    grindingSound.currentTime = 0
    grindingSound.play()
  }
  checkLeaveRail(rail) {
    if (this.skateboardGrinding && this.x > rail.x + rail.w) {
      this.stopGrinding();
    }
  }

  stopGrinding() {
    this.skateboardGrinding = false;
    grindingSound.pause()
    grindingSound.currentTime= 0
    this.node.src = "./images/Skateboard.png";
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
      this.skateJumping === false &&
      this.canItJump === true &&
      skater.skaterLongJumping === false
    ) {
      rollingSound.pause()
      this.jumpSpeed = skateJumpMomentum;
      this.skateJumping = true;
      this.skateboardGrinding = false;
      this.node.style.top = `${this.y}px`;
    }
  }

  // SKATE CRASHED :(
  lostSkate() {
    if (skateboardCrashed === true) {
      rollingSound.pause()
      this.canItJump = false;
      this.node.src = "./images/Skateboard-lost.png";
      this.x -= gameSpeed;
      this.node.style.left = `${this.x}px`;
    }
  }
}
