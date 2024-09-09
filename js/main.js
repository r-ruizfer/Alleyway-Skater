//* ELEMENTOS PRINCIPALES DEL DOM

// pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// botones
const startBtnNode = document.querySelector("#start-btn");
const restartBtnNode = document.querySelector("#restart-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//* VARIABLES GLOBALES DEL JUEGO

// Game Objects
let skater = null;
let skateboard = null;
let skaterWithBoard = [skater, skateboard];
let obstArr = [];
let obstFrequency = 7000;
let canItJump = true;
let canSkaterCrouch = true;

// Game Intervals
let gameIntervalId = null;
let obstIntervalId = null;

//score
let score = 0;

//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  console.log("iniciando juego");

  // 1. cambiar pantallas.
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";
  // 2. añadir jugador
  skater = new Skater();
  skateboard = new Skateboard();
  canItJump = true;
  canSkaterCrouch = true;

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
  obstArr.forEach((eachObst) => {
    eachObst.automaticMovement();
  });
  checkIfObstLeft();
  checkSkaterObstacleColision();
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function addObst() {
  let randomNumber = getRandomNumber(1, 3);  
  if (randomNumber === 1) {
    let newObstBot = new Obstaculo("Rail");
    obstArr.push(newObstBot);
    console.log("añadiendo rail");
  } else if (randomNumber === 2) {
    let newObstMid = new Obstaculo("Box");
    obstArr.push(newObstMid);
    console.log("añadiendo caja");
  } else if (randomNumber === 3) {
    let newObstTop = new Obstaculo("tunel");
    obstArr.push(newObstTop);
    console.log("añadiendo tunel");
  }
}
function checkIfObstLeft() {
  if (obstArr.length === 0) {
    return;
  }
  if (obstArr[0].x + obstArr[0].w <= 0) {
    obstArr[0].node.remove();
    obstArr.shift();
    score += 100;
    console.log(score);
  }
}
function checkSkaterObstacleColision() {
  obstArr.forEach((eachObst) => {
    if (
      skater.x < eachObst.x + eachObst.w &&
      skater.x + skater.w > eachObst.x &&
      skater.y < eachObst.y + eachObst.h &&
      skater.y + skater.h > eachObst.y
    ) {
      disableBtns();
      skater.automaticMovement();
      if (skater.x + skater.w <= 0) {
        gameOver();
      }
      console.log("skater crashed!");
    }
  });
}
function gameOver() {
  skater = null;
  skateboard = null;
  obstArr = [];
  clearInterval(gameIntervalId);
  clearInterval(obstIntervalId);
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";
}
function disableBtns() {
  canItJump = false;
  canSkaterCrouch = false;
}
function restartGame() {
  gameBoxNode.innerHTML = "";

  skater = null;
  skateboard = null;
  obstArr = [];
  clearInterval(gameIntervalId);
  clearInterval(obstIntervalId);
  gameOverScreenNode.style.display = "none";
  splashScreenNode.style.display = "flex";
}
//* EVENT LISTENERS
startBtnNode.addEventListener("click", startGame);
restartBtnNode.addEventListener("click", restartGame);

window.addEventListener("keypress", (event) => {
  if (canItJump === true) {
    if (event.key === "z") {
      skater.jump("short");
      skateboard.jump();
      
    } else if (event.key === "x") {
      skater.jump("long");
      
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (canSkaterCrouch === true) {
    if (event.key === "c") {
      skater.crouch();
    }
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "c") {
    skater.uncrouch();
  }
});
