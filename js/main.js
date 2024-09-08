//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// botones
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//* VARIABLES GLOBALES DEL JUEGO
let skater = null;
let skateboard = null;
let gameIntervalId = null;
let skaterJumping = false;
let skaterCrouching = false;
let skaterWithBoard = [skater, skateboard];
let obstArr = [];
let obstFrequency = 10000;
let obstIntervalId = null

//* FUNCIONES GLOBALES DEL JUEGO
function startGame() {
  console.log("iniciando juego");

  // 1. cambiar pantallas.
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  // 2. añadir jugador
  skater = new Skater();
  skateboard = new Skateboard();

  // 3. intervalo 60 fps
  gameIntervalId = setInterval(() => {
    console.log("intervalo funciona");
    gameLoop();
  }, Math.round(1000 / 60));
  
  obstIntervalId = setInterval(() => {
    addObst();
  }, obstFrequency);
}
function gameLoop() {
  skateboard.fallDownSkate();
  skater.fallDown();
  obstArr.forEach((eachTub) => {
    eachTub.automaticMovement();
  });
  
}
function addObst() {
  

  let newObstTop = new Obstaculo("Top");
  obstArr.push(newObstTop);
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);
window.addEventListener("keypress", (event) => {
  if (!skaterJumping) {
    if (event.key === "z") {
      skaterJumping = true;
      skater.jump("short");
      skateboard.jump();

      setTimeout(() => {
        skaterJumping = false;
      }, 500);
    } else if (event.key === "x") {
      skaterJumping = true;
      skater.jump("long");

      setTimeout(() => {
        skaterJumping = false;
      }, 1000);
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "c") {
    if (skaterCrouching === false) {
      skater.crouch();
      skaterCrouching = true;
    }
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "c") {
    skaterCrouching = false;
    skater.uncrouch();
  }
});
