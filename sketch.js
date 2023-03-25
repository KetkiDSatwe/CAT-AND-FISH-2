var PLAY = 1;
var END = 0;

var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadImage("cat-images1.png");
 // trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("shark-image.png");
  
  obstacle1 = loadImage("fish-1.png");
  obstacle2 = loadImage("fish-2.png");
  obstacle3 = loadImage("fish-3.png");
  obstacle4 = loadImage("fish-4.png");
  obstacle5 = loadImage("fish-5.png");

  backgroundImage = loadImage("background.gif")
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(100,720,20,50);
  
  trex.addImage("running", trex_running);
  //trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,800,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(800,400);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(800,440);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(10,height-100,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(180);
  image(backgroundImage,0,0,width,height)
  textSize (30)
  text("Score: "+ score, 500,50);
  
  
  if (gameState===PLAY){
  if(obstaclesGroup.isTouching(trex)){
    score+=10
  }
  
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("RIGHT_ARROW") ) {
    //  trex.velocityX = -12;
    trex.x=trex.x+10
    }

    if(keyDown("LEFT_ARROW")){
      trex.x=trex.x-10
    }
  
    //trex.velocityX = trex.velocityX + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    
    if(cloudsGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 170 === 0) {
    var cloud = createSprite(1600,height-100,40,10);
    cloud.y = Math.round(random(600,height-100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.25;
    cloud.velocityX = -6;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 50 === 0) {
    var obstacle = createSprite(1600,height-190,10,40);
    //obstacle.debug = true;
    //if (obstacle.x>width/2){
     obstacle.velocityX = -6
    //}
   // else {obstacle.velocityX=0}
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25;
    obstacle.lifetime = 200
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}