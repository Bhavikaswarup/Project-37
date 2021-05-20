var bgImage;
var player, player_run_anim;
var enemyGroup, enemy_anim;
var ground;
var weapon_img;

var score = 0;

var gameState = 'play';

function preload(){
  player_run_anim = loadAnimation("run_1.png","run_2.png");
  bgImage = loadImage("Landscapes-1.png");
  enemy_anim = loadAnimation("enemy-walk (2).png","enemy-walk (3).png","enemy-walk (4).png","enemy-walk (5).png","enemy-walk (6).png","enemy-walk (7).png");
  weapon_img = loadImage("weapon 5.png");
}

function setup() {
 createCanvas(windowWidth, windowHeight);
  
  player = createSprite(50, height-50, 10, 10);
  player.addAnimation("run", player_run_anim);
  player.scale = 0.13;
  
  ground = createSprite(width/2, height, width, 40);
  ground.shapeColor = "blue";
  
  enemyGroup = new Group();
  
  player.setCollider("rectangle", 0, 0, 200, 500);
  
}

function draw() {
  
  background(bgImage);
  
  fill("white");
  text("score : "+ score, width-100, 40);
  
  player.collide(ground);
  
  if(gameState === 'play'){
    score = Math.round(score + getFrameRate()/60);
    if(frameCount % 80 === 0){
        spawnEnemy();
    }
    
    if(score > 100 && frameCount % 100 === 0){
      spawnBlade();
    }
    
    
    if(keyDown("space") && player.y >= height-70){
      player.velocityY = -12;
    }
    
    if(enemyGroup.isTouching(player)){
      gameState = 'end';
    }
    
    player.velocityY = player.velocityY + .5;
  }
  
  if(gameState === 'end'){
    
    player.velocityY = player.velocityY + .5;
    text("press r to re-start", width/2, height/2);
    enemyGroup.setLifetimeEach(-1);
    enemyGroup.setVelocityXEach(0);
    if(keyDown("r")){
      reset();
    }
  }
  
  drawSprites();
 
}

function reset(){
  gameState = 'play';
  score = 0;
  enemyGroup.destroyEach();
}

function spawnEnemy() {
  var enemy = createSprite(width, height-60, 10, 10);
  enemy.addAnimation('walking', enemy_anim)
  enemy.velocityX = -4;
  
  enemy.lifetime = width/4;
  enemy.scale = 0.13;
  enemy.mirrorX(-1);
  
  enemyGroup.add(enemy);
}

function spawnBlade(){
  var blade = createSprite(width, height-60, 10, 10);
  blade.addImage(weapon_img);
  blade.rotation = -90;
  blade.scale = 0.2;
  blade.velocityX = -10;
  blade.lifetime = width/10;
  enemyGroup.add(blade);
}




