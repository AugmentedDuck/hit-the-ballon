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

function setup() {
  createCanvas(1280, 720);
  frameRate(30)
}

function draw() {
  background(220);

  goalLocation();

  birdFlight();

  goalHit();

  fill(250)
  circle(dartX, dartY, 10)

  fill(0)
  textSize(24)
  textAlign(CENTER)
  text("Score: " + score + "\nHighscore: " + highscore, width / 2, 20)

  displayButtons();

  line(100, 600, mouseX, mouseY)
}

function mouseClicked(){
  if(mouseY <= height && isThrown == false && restarter != 1){
    isThrown = true
    gravity = (mouseY - 600) * -0.2
    dartSpeed = (mouseX - 100) * -0.2
  } else if (restarter == 1) {
    restarter = 0
  }
}

function birdFlight(){
  if(isThrown){
    if(dartY < height-5){
      gravity += 0.5
    } else {
      gravity = 0
      dartY = height - 5
      
      if(dartSpeed > 0.5){
        dartSpeed -= 0.5
      } else if (dartSpeed < -0.5){
        dartSpeed += 0.5
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
    newBallon = false
  }

  fill(0,100,0)
  circle(ballonX, ballonY, ballonSize)
}

function goalHit(){
  if(dartX < ballonX + 20 && dartX > ballonX - 20 && dartY < ballonY + 20 && dartY > ballonY - 20){
    
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

  restartButton.position(width / 2 - 50, 60);
  restartButton.size(100);
  restartButton.mousePressed(restartGame);

  noRestartButton.size(100)
  noRestartButton.position(-10,-100)

  if(dartSpeed != 0 || gravity != 0){
    noRestartButton.position(width / 2 - 50, 60)
  }
}