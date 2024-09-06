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
}
function gameLoop() {
  skater.fallDown();
}

//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);
window.addEventListener("keypress", (event) => {
  if (!skaterJumping) {
    if (event.key === "z") {
      skaterJumping = true;
      skater.jump("short");

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
    skater.crouch();
  }
});
window.addEventListener("keyup", (event) => {
    if (event.key === "c") {
      skater.uncrouch();
    }
  });
  
