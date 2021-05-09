var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var ground; 
var FoodGroup, obstacleGroup, bananaGroup;
var score;
var survivalTime;


function preload(){
  
  
  monkey_running = loadAnimation("color+block+black.png")
  obstacleImage = loadImage("pngfind.com-white-triangle-png-906.png");
 
}



function setup() {
  createCanvas(600, 360);

  
  score = 0;
  survivalTime = 0;


  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 1300, 10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)

  obstacleGroup = createGroup();
  
}


function draw() {
  background(0, 168, 48);
  
  if(gameState === PLAY){
    if(ground.x<0) {
      ground.x = ground.width/2;
  }

    if(keyDown("space")){
      monkey.velocityY = -12;
  }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnObstacles();
  
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  else if (gameState === END){
    obstacleGroup.velocityXEach = 0;
    monkey.velocityX = 0;
    monkey.destroy();
    ground.velocityX = 0;
    textSize(20);
    fill("black");
    stroke("black")
    text("GAME OVER", 225, 180);
    score = 0;
   
  }
   
  drawSprites();
  
    stroke("black");
  textSize(20);
  fill("black")
  score = score + Math.round(getFrameRate()/60);
  text("Score: "+ score, 100, 50);

}

function spawnObstacles() {
  if(frameCount % 200 === 0){
    obstacle = createSprite(600, 330, 10, 40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -5
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
}