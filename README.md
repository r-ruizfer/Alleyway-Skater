# ALLEYWAY SKATER

## [Play the Game!](https://r-ruizfer.github.io/Alleyway-Skater/)




# Description

Alleyway Skater is a game where our skater friend is fleeing the police through a tight alleyway after making some graffiti and must dodge all the obstacles in his way so he doesnt fall and get caught. The game doesnt end until the skater crashes, so your objective is to get as many points as posible to beat the HI-Score


# Main Functionalities

- The skater and skateboard models are static at the left side of the screen.
- The skater can perform a short jump with the skate by pressing Z, a long jump without the skate by pressing X and he can crouch by pressing C.
- The obstacles appear from the right side and each obstacle has its own placing.
- To jump over manholes the skater must short jump with his skate or the skate will fall in!
- The ventilation boxes are too low to crouch beneath but too tall to jump with the skate so he must jump high leaving the skate on ground.
- There are tunnels that the skater must crouch beneath to go through.
- There are also rails the skater must land with his skate over or he will meet a painful end...
- The more the skater flees the more intense the police chase becomes so he must flee faster and has less time to react to incoming obstacles.
- Each obstacle surpassed is +100 points to your score.

# Backlog Functionalities

- Adding more obstacles
- Making speed effects for the player model
- Adding more variability to the existing obstacle's models

# Technologies used

- - HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes
- JS Audio() and JS Image()

# States

- Start Screen
- Game Screen
- Game Over Screen

# Proyect Structure

- List here sections for your your different JS files.
- One for main.js to manage DOM elements, one for the Game class and one for each other class file of your game.
- Inside each file you can list the functions, clases, properties and methods of your code.

Example:

## main.js
- startGame()   
- gameLoop()
- getRandomNumber(min, max)
- addObst() 
- checkIfObstLeft() 
- checkIfRailLeft() 
- checkSkaterCollision() 
- playGameOverVideo() 
- gameOver() 
- disableBtns() 
- restartGame() 
- levelUp() 
- showSpeedUp(color, bgcolor)

## Skater.js 
- Skater () {
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.jumpSpeed; 
    - this.skaterJumping;
    - this.skaterLongJumping;
    - this.skaterCrouching;
    - this.skaterGrinding;
}
- fallDown(){}
- startGrinding(rail) {}
- checkLeaveRail(rail){}
- stopGrinding(){}
- jump(type){}
- crouch(){}
- uncrouch(){}
- automaticMovement(){}

## Skateboard.js
- Skateboard(){
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.jumpSpeed; 
    - this.skateboardJumping;    
    - this.skateboardGrinding;
    - this.canItJump
}
- fallDownSkate(){}
- startGrinding(rail){}
- checkLeaveRail(rail){}
- stopGrinding(){}
- skateboardGrounded(){}
- skateboardUnGrounded(){}
- Jump(){}
- lostSkate(){}

## Obstaculos.js
- Obstaculo(){
    - this.x;
    - this.y;
    - this.w;
    - this.h;
}
- automaticMovement(){}

## rail.js
- Rail(){
    - this.x;
    - this.y;
    - this.w;
    - this.h;
}
- automaticMovement(){}


# Extra Links 

### Sketch
[Link](https://excalidraw.com/#json=QXSZ88d5BrAl13hcTC_m2,3LjiRoseh7w1g1-QBqIvEw)

### Slides
[Link](www.your-slides-url-here.com)

## Deploy
[Link](https://r-ruizfer.github.io/Alleyway-Skater/)