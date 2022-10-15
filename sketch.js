let gravity = 0
let dartX = 100
let dartY = 600
let isThrown = false
let dartSpeed = 1
let ballonX = 0
let ballonY = 0
let score = 0
let newBallon = true
let restarter = 1
let highscore = 0
let ballonSize = 50
let ballonR = 0
let ballonG = 0
let ballonB = 0 

function setup() {
  createCanvas(1280, 720);
  frameRate(30)
}

function draw() {
  displayBackground();

  strokeWeight(1);

  goalLocation();

  dartFlight();

  goalHit();

  drawDart();

  fill(0)
  textSize(24)
  textAlign(CENTER)
  text("Score: " + score + "\nHighscore: " + highscore, width / 2, 25)

  displayButtons();

  if(!isThrown){
    line(100, 600, mouseX, mouseY)
  }
}

function mouseClicked(){
  if(mouseY <= height && isThrown == false && restarter != 1){
    isThrown = true
    gravity = (mouseY - 600) * -0.22
    dartSpeed = (mouseX - 100) * -0.22
  } else if (restarter == 1) {
    restarter = 0
  }
}

function dartFlight(){
  if(isThrown){
    if(dartY < height - 25){
      gravity += 0.5
    } else {
      gravity = 0
      dartY = height - 25
      
      if(dartSpeed > 0.5 || dartSpeed < -0.5){
        dartSpeed *= 0.9
      } else {
        dartSpeed = 0
      }
    }

    

    if(dartX < 5 || dartX > width-5){
      dartSpeed *= -1
    }

    dartY += gravity
    dartX += dartSpeed
  }
}

function goalLocation(){
  if(newBallon){
    ballonX = random(1280);
    ballonY = random(720);
    ballonR = random(255)
    ballonG = random(255)
    ballonB = random(255)
    newBallon = false
  }

  fill(ballonR,ballonB,ballonG)
  quad(ballonX + 2, ballonY + ballonSize / 2 - 1, ballonX + 10, ballonY + ballonSize / 2 + 10, ballonX - 10, ballonY + ballonSize / 2 + 10, ballonX - 2, ballonY + ballonSize / 2 - 1)
  circle(ballonX, ballonY, ballonSize)


}

function goalHit(){
  if(dartX < ballonX + ballonSize && dartX > ballonX - ballonSize && dartY < ballonY + ballonSize && dartY > ballonY - ballonSize){
    
    resetVariables();

    score++
    if(ballonSize > 10){
      ballonSize -= 5
    }
  }
}

function restartGame(){
  if(score > highscore){
    highscore = score
  }

  resetVariables();

  score = 0
  restarter = 1
  ballonSize = 50
}

function resetVariables(){
  gravity = 0
  dartX = 100
  dartY = 600
  isThrown = false
  dartSpeed = 1
  ballonX = 0
  ballonY = 0
  newBallon = true
}

function displayButtons(){
  let restartButton = createButton("RETRY");
  let noRestartButton = createButton("UNAVAILABLE")

  restartButton.position(width / 2 - 50, 65);
  restartButton.size(100);
  restartButton.mousePressed(restartGame);

  noRestartButton.size(100)
  noRestartButton.position(-10,-100)

  if(dartSpeed != 0 || gravity != 0){
    noRestartButton.position(width / 2 - 50, 65)
  }
}

function drawDart(){
  fill(0)
  circle(dartX, dartY, 10)
}

function displayBackground(){
  let backgroundHillSpace = 400
  let middlegroundHillSpace = 300
  let foregroundHillSpace = 250 
  
  background(255)
  strokeWeight(0)

  fill(0, 100, 200)
  rect(0, 0, width, height)

  fill(250, 200, 0)
  circle(width / 2 + 100, height / 2, 100)
  
  fill(0, 100, 0)
  for(let i = 61; i < width; i += backgroundHillSpace){
    ellipse(i, height, 500, 700)
  }

  fill(0, 133, 0)
  for(let i = 72; i < width; i += middlegroundHillSpace){
    ellipse(i, height, 375, 375)
  }
  
  fill(0, 160, 0)
  for(let i = 27; i < width; i += foregroundHillSpace){
    ellipse(i, height, 300, 200)
  }

  fill(0, 200, 0)
  rect(0, height - 20, width, 20)
}