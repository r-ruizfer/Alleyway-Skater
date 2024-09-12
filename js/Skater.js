let jumpMomentum = -15;
let fallSpeed = 1;

class Skater {
  constructor() {
    this.x = 70;
    this.y = 260;
    this.h = 100;
    this.w = 45;

    this.jumpSpeed = 0;

    this.skaterJumping = false;
    this.skaterLongJumping = false;
    this.skaterCrouching = false;
    this.skaterGrinding = false;

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

  // GRAVITY
  fallDown() {
    if (skaterCrashed === false) {
      if (
        (this.skaterJumping || this.skaterLongJumping) &&
        this.skaterGrinding === false
      ) {
        this.jumpSpeed += fallSpeed;
        this.y += this.jumpSpeed;
        this.node.style.top = `${this.y}px`;
      }
      if (this.skaterCrouching === true) {
        this.y = 305;
        this.node.style.top = `${this.y}px`;

        this.skaterJumping = false;
        this.skaterLongJumping = false;
      } else if (this.y >= 260) {
        this.y = 260;
        this.node.style.top = `${this.y}px`;

        this.node.src = "./images/Skater.png";
        this.h = 100;
        this.node.style.height = `${this.h}px`;

        this.jumpSpeed = 0;
        this.skaterJumping = false;
        canItJump = true
        this.skaterLongJumping = false;
      }
    }
  }

  //GRINDING MECHANICS
  startGrinding(rail) {
    this.node.src = "./images/Skater-Grinding.png";
    this.skaterGrinding = true;
    this.y = rail.y - this.h - 7
    this.node.style.top = `${this.y}px`;
    this.jumpSpeed = 0;
    this.skaterJumping = false
    canItJump = true
    this.skaterLongJumping = false

  }
  checkLeaveRail(rail) {
    if (this.skaterGrinding && this.x > rail.x + rail.w) {
      // Si el skater supera el borde derecho del rail
      this.stopGrinding();
    }
  }

  stopGrinding() {
    this.skaterGrinding = false;
    this.node.src = "./images/Skater.png";
    this.skaterJumping = true
    canItJump = false
    this.skaterLongJumping = true
   

  }
  // JUMPS
  jump(type) {
    if (this.skaterJumping === false && this.skaterLongJumping === false) {
      if (type === "short") {
        this.node.src = "./images/Skater-jumping.png";
        this.h = 75
        this.node.style.height = `${this.h}px`;

        this.jumpSpeed = jumpMomentum;
        this.skaterJumping = true;
        this.skaterGrinding = false;
        this.node.style.top = `${this.y}px`;

       

      } else if (type === "long") {
        this.node.src = "./images/Skater-longjumping.png";
        this.h = 100;
        this.node.style.height = `${this.h}px`;

        this.jumpSpeed = jumpMomentum * 1.5;
        this.skaterLongJumping = true;
        this.skaterGrinding = false;
        this.node.style.top = `${this.y}px`;
        
        longJumpSound.currentTime = 0
        longJumpSound.play()
      }
    }
  }
  // CROUCH MECHANICS
  crouch() {
    if (
      this.skaterCrouching === false &&
      this.skaterJumping === false &&
      this.skaterLongJumping === false
    ) {
      this.node.src = "./images/Skater-crouching.png";

      this.h = 50;
      this.node.style.height = `${this.h}px`;
      this.y = 300;
      this.node.style.top = `${this.y}px`;
      this.x += 10
      this.node.style.left = `${this.x}px`;

      this.skaterCrouching = true;
    }
  }

  uncrouch() {
    if (this.skaterCrouching === true) {
      this.node.src = "./images/Skater.png";

      this.h = 100;
      this.node.style.height = `${this.h}px`;
      this.y = 260;
      this.node.style.top = `${this.y}px`;
      this.x -= 10
      this.node.style.left = `${this.x}px`;
      this.skaterCrouching = false;
    }
  }
  automaticMovement() {
    if (skaterCrashed === true) {
      this.node.classList.add ('skater-above')
      this.node.src = "./images/skater-crashed.png";

      this.x -= gameSpeed;
      this.node.style.left = `${this.x}px`;
    }
  }
}
