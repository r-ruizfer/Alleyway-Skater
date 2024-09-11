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
const speedUp = document.getElementById("SpeedUp");
const scoreDisplay = document.getElementById("Score");
const hiScoreDisplay = document.getElementById("HiScore");

function originalColor() {
  scoreDisplay.style.color = "darkcyan";
  scoreDisplay.style.backgroundColor = "greenyellow";
  hiScoreDisplay.style.color = "darkcyan";
  hiScoreDisplay.style.backgroundColor = "greenyellow";
}

//* VARIABLES GLOBALES DEL JUEGO
let canItJump;
let canSkaterCrouch;
let skaterCrashed;
let skateboardCrashed;
let gameSpeed;

// Game Objects
let skater;
let skateboard;
let rail;

let obstArr = [];

let obstFrequency = 0;

// Game Intervals
let gameIntervalId;
let obstIntervalId;

//Score
let Score = 0;
let hiScore = 0;

// dificulty multipliers
let augmentObstFrequency = (obstFrequency -= 1500);
let augmentGameSpeed = (gameSpeed += 4);

//* FUNCIONES GLOBALES DEL JUEGO

function startGame() {
  // 1. cambiar pantallas.
  splashScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  skater = new Skater();
  skateboard = new Skateboard();
  rail = new Rail();

  canItJump = true;
  canSkaterCrouch = true;
  skaterCrashed = false;
  skateboardCrashed = false;
  obstFrequency = 5000;
  gameSpeed = 7;
  Score = 0;
  document.getElementById("Score").innerText = "Score: " + Score;

  originalColor();

  // 3. intervalo 60 fps
  gameIntervalId = setInterval(() => {
    gameLoop();
  }, Math.round(1000 / 60));

  obstIntervalId = setInterval(() => {
    addObst();
  }, obstFrequency);
}
function gameLoop() {
  obstArr.forEach((obst) => {
    obst.automaticMovement();
  });

  checkIfObstLeft();

  checkSkaterCollision();
  obstArr.forEach((obst) => {
    if (obst.type === "rail") {
      skater.checkLeaveRail(obst);
    }
  });

  skateboard.fallDownSkate();
  skater.fallDown();

  if (skaterCrashed === true) {
    skater.automaticMovement();
    if (skater.x + skater.w <= 0) {
      gameOver();
    }
  } else if (skateboardCrashed === true) {
    skateboard.lostSkate();
    if (skateboard.x + skateboard.w <= 0) {
      gameOver();
    }
  }
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function addObst() {
  let randomNumber = getRandomNumber(1, 4);
  if (randomNumber === 1) {
    let newObstBot = new Obstaculo("manhole");
    obstArr.push(newObstBot);
  } else if (randomNumber === 2) {
    let newObstMid = new Obstaculo("box");
    obstArr.push(newObstMid);
  } else if (randomNumber === 3) {
    let newObstTop = new Obstaculo("tunel");
    obstArr.push(newObstTop);
  } else if (randomNumber === 4) {
    let newRail = new Rail();
    obstArr.push(newRail);
  }
}
function checkIfObstLeft() {
  if (obstArr.length === 0) {
    return;
  }

  if (obstArr[0].x + obstArr[0].w <= 0) {
    obstArr[0].node.remove();
    obstArr.shift();
    Score += 100;
    document.getElementById("Score").innerText = "Score: " + Score;
    console.log(Score);
    levelUp();
  }
}
function checkIfRailLeft() {
  if (railArray.length === 0) {
    return;
  }
  if (railArray[0].x + railArray[0].w <= 0) {
    railArray[0].node.remove();
    railArray.shift();
    Score += 100;
    document.getElementById("Score").innerText = "Score: " + Score;
    console.log(Score);
    levelUp();
  }
}

function checkSkaterCollision() {
  obstArr.forEach((eachObst) => {
    if (
      skater.x < eachObst.x + eachObst.w &&
      skater.x + skater.w > eachObst.x &&
      skater.y < eachObst.y + eachObst.h &&
      skater.y + skater.h > eachObst.y
    ) {
      if (eachObst.type === "rail" && skater.y + skater.h <= eachObst.y + 15) {
        
        skater.startGrinding(eachObst);
      } else {
        
        skaterCrashed = true;
        disableBtns();
      }
    } else if (
      skateboard.x < eachObst.x + eachObst.w &&
      skateboard.x + skateboard.w > eachObst.x &&
      skateboard.y < eachObst.y + eachObst.h &&
      skateboard.y + skateboard.h > eachObst.y
    ) {if (eachObst.type === "rail" && skateboard.y + skateboard.h <= eachObst.y + 10) {
      
      skateboard.startGrinding(eachObst);
    } else {
      skateboardCrashed = true;
    }
    }
  });
  
}

function gameOver() {
  skater = null;
  skateboard = null;
  obstArr = [];
  railArray = [];
  clearInterval(gameIntervalId);
  clearInterval(obstIntervalId);
  gameScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "flex";

  document.getElementById("finalScore").innerText = "Score: " + Score;

  if (hiScore < Score) {
    hiScore = Score;
    document.getElementById("HiScore").innerText = "Hi-Score: " + hiScore;

    document.getElementById("finalHiScore").innerText = "Hi-Score: " + hiScore;
  }
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
function levelUp() {
  if (Score === 700) {
    showSpeedUp("blue", "darkblue");
    obstFrequency = 4000;
    gameSpeed = 9;
    setTimeout(clearInterval(obstIntervalId), 500);
    obstIntervalId = setInterval(() => {
      addObst();
    }, obstFrequency);
  }
  if (Score === 1400) {
    showSpeedUp("gold", "purple");
    obstFrequency = 2000;
    gameSpeed = 12;
    setTimeout(clearInterval(obstIntervalId), 500);
    obstIntervalId = setInterval(() => {
      addObst();
    }, obstFrequency);
  }
  if (Score === 2100) {
    showSpeedUp("darkred", "pink");
    obstFrequency = 1500;
    gameSpeed = 15;
    setTimeout(clearInterval(obstIntervalId), 500);
    obstIntervalId = setInterval(() => {
      addObst();
    }, obstFrequency);
  }
}

function showSpeedUp(color, bgcolor) {
  speedUp.style.color = color;
  speedUp.style.backgroundColor = bgcolor;

  scoreDisplay.style.color = color;
  scoreDisplay.style.backgroundColor = bgcolor;
  hiScoreDisplay.style.color = color;
  hiScoreDisplay.style.backgroundColor = bgcolor;

  speedUp.style.display = "block";

  speedUp.classList.add("blinking");

  setTimeout(() => {
    speedUp.classList.remove("blinking");
    speedUp.style.display = "none";
  }, 3000);
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
  if (
    canSkaterCrouch === true &&
    skater.skaterJumping === false &&
    skater.skaterLongJumping === false
  ) {
    if (event.key === "c") {
      skater.canItFall = false;
      canItJump = false;
      skater.crouch();
    }
  }
});
window.addEventListener("keyup", (event) => {
  if (event.key === "c") {
    skater.canItFall = true;
    canItJump = true;
    skater.uncrouch();
  }
});
