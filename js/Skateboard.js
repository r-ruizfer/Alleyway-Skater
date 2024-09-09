let skateJumpMomentum = -40;
let skateFallSpeed = 5;

class Skateboard {
  constructor() {
    // .todos los pollitos se crearán con estos valores
    this.x = 70;
    this.y = 350;
    this.h = 20;
    this.w = 45;
    this.jumpSpeed = 0;
    this.skateJumping = false;
    

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
    if (this.skateJumping === true) {
      this.jumpSpeed += skateFallSpeed;
      this.y += this.jumpSpeed;
    
    this.node.style.top = `${this.y}px`;
    }
    if (this.y>=350){
      this.y = 350
      this.jumpSpeed=0
      this.skateJumping = false
    }
    
  }
  jump() {
    if (this.skateJumping === false) {
      this.jumpSpeed = skateJumpMomentum;
      this.skateJumping = true;
      this.node.style.top = `${this.y}px`;
  }
}
}