var boy, cloud, bird, bg, restart;
var boyimg, cloudimg, birdimg, bgimg, restartimg;
var birdsGroup, cloudsGroup;
var Play = 1;
var End = 0;
var gameState = Play;
var score = 0;
var collectSound, dieSound;


function preload(){
boyimg = loadImage("Sprites/Boy (2).png");
cloudimg = loadImage("Sprites/cloud.png");
birdimg = loadImage("Sprites/bird.png");
bgimg = loadImage ("Sprites/bg.png");
collectSound = loadSound("Sprites/collect (2).mp3");
dieSound = loadSound("Sprites/die.mp3");
restartimg = loadImage("Sprites/restart.png");
}

function setup() {
  createCanvas(1500,700);
  bg = createSprite(600,400,1200,800);
  bg.addImage(bgimg);
  bg.scale = 7;
  
    boy = createSprite(100,350,20,20);
    boy.addImage(boyimg);
    boy.scale = 0.9;
    boy.debug = false;
    boy.setCollider ("rectangle",0,0,100,200);

    cloudsGroup = new Group();
birdsGroup = new Group();
 
}

function draw() {
  if(gameState===Play){
    //bgSound.play();
     bg.velocityX=-4;
 if(bg.x < 0){
 bg.x = bg.width/2;
 }

 score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
      collectSound.play();
    }




if (keyDown ("space")){
  boy.velocityY = -12;
  }
  
  boy.velocityY = boy.velocityY + 1;

  spawnCloud();
  spawnBird();
  if(boy.isTouching(cloudsGroup)||boy.isTouching(birdsGroup)|| boy.y > 700 || boy.y < 50){
    gameState = End;
    bg.velocityX = 0;
    cloudsGroup.destroyEach();
    birdsGroup.destroyEach();
        restart = createSprite(650,350,20,20);
    restart.addImage(restartimg);
    restart.scale = 1;
    dieSound.play();
    }
  }
  else if(gameState===End){
    boy.velocityY = 0;
    cloudsGroup.destroyEach();
    birdsGroup.destroyEach();
   
    //bgSound.stop();
    
      }

      if(mousePressedOver(restart)){
        /*  gameState=Play;
          coinsGroup.destroyEach();
          rocketsGroup.destroyEach();*/
          reset();
          }
 
 
  background(255,255,255);  
  drawSprites();

  fill ("black")
  textSize(50);
  text("Score: " +score,1000,180);
}

function spawnCloud(){
  if(frameCount % 80 ===0){
    cloud = createSprite(1500,Math.round(random(300,400)),20,20);
    cloud.velocityX = -10;
    cloud.addImage(cloudimg);
    cloud.debug = false;
    cloud.setCollider ("rectangle",0,0,300,300);
    cloudsGroup.add(cloud);
    cloud.scale = 0.4;
    
    
      }
}

function spawnBird(){
  if(frameCount % 100 ===0){
    bird = createSprite(1500,Math.round(random(110,400)),20,20);
    bird.velocityX = -15;
    bird.addImage(birdimg);
    bird.debug = false;
    bird.setCollider ("rectangle",0,0,75,75);
    bird.scale=1;
    birdsGroup.add (bird);
      }
}

function reset(){
  gameState=Play;
  cloudsGroup.destroyEach();
  birdsGroup.destroyEach();
boy.x = 100;
boy.y = 350
  restart.visible = false;
  score = 0;


}
