var PLAY = 1;
var END = 0;
var gameState = PLAY;

var index = 0;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var backgroundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;


var score=0;

var gameOver, restart;


function preload(){
  trex_running =   loadAnimation("trex1.png","trex2.png","trex4.png","trex6.png",
                                 "trex7.png");
  trex_collided = loadAnimation("trex5.png");
  
  backgroundImage = loadImage("background.png");
  groundImage = loadImage("ground.png");
  
  obstacle1 = loadImage("cactus1.png");
  obstacle2 = loadImage("cactus2.png");
  obstacle3 = loadImage("cactus3.png");
  obstacle4 = loadImage("cactus4.png");
  obstacle5 = loadImage("cactus5.jpg");
  obstacle6 = loadImage("cactus6.jpg");

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
 canvas = createCanvas(700,300);  
  trex = createSprite(50,185,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /3;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstaclesGroup = new Group();
  
  score = 0;
  camera.on()
}

function draw() {
  //trex.debug = true;
  background(backgroundImage);
  text("Score: "+ score, 500,50);
  
  camera.x = trex.x
  camera.y = trex.y
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;

    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
            camera.off()

    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex5",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
     obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle1.addImage(obstacle1);
              break;
      case 2: obstacle2.addImage(obstacle2);
              break;
      case 3: obstacle3.addImage(obstacle3);
              break;
      case 4: obstacle4.addImage(obstacle4);
              break;
      case 5: obstacle5.addImage(obstacle5);
              break;
      case 5: obstacle6.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  
  
  score = 0;
  
}
