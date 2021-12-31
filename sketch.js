var bgimg
var bg
var spaceship,spaceshipimg
var star,starimg
var meteroids,meteroidsimg
var astranautimg
var asteroidimg,satelliteimg
var obstacle
var starG,obstacleG;
var score=0;
var gameState="play"
var gameover,gameoverimg
var music;

function preload(){
 bgimg=loadImage("space.jpg")
 spaceshipimg=loadImage("spaceship.png")
 starimg=loadImage("star.png")
 meteroidsimg=loadImage("meteroids.png")
 astranautimg=loadImage("astranaut.png")
 asteroidimg=loadImage("asteroid.png")
 satelliteimg=loadImage("satellite.png")
 gameoverimg=loadImage("gameover.png")
 //music=loadSound("music.mp3")
}


function setup(){
 createCanvas(800,600) 
 bg= createSprite(400,300)
 bg.velocityY=0.5
 bg.addImage("moving",bgimg)

 spaceship=createSprite(400,545)
 spaceship.addImage("scrolling",spaceshipimg)
 spaceship.scale=0.3
 spaceship.debug=true
 spaceship.setCollider("rectangle",0,0,20,20)
 starG=new Group()
 obstacleG= new Group()

 gameover=createSprite(374,263)
 gameover.addImage(gameoverimg)
}

function draw(){
 background("blue")
  if(gameState==="play"){
   if(bg.y>600){
    bg.y=300
   }
   
   if(keyDown("LEFT_ARROW")&& spaceship.x>60){
    spaceship.x=spaceship.x-50
   }
   if(keyDown("RIGHT_ARROW")&& spaceship.x<740){
    spaceship.x=spaceship.x+50
   }
   spawnObstacles()
   spawnstars()
   for(var i=0; i<starG.length; i++){
    if(starG[i].isTouching(spaceship)){
      score=score+5
      starG[i].destroy()
    }
   }
   for(var g=0; g<obstacleG.length; g++){
     if(obstacleG[g].isTouching(spaceship)){
      gameState="end"
      obstacleG[g].destroy();
    }

   }
  
   gameover.visible=false
   //music.play();

  }
 else if(gameState==="end"){
   bg.velocityY=0
   obstacleG.setVelocityYEach(0)
   starG.setVelocityYEach(0)
   obstacleG.setLifetimeEach(-1)
   starG.setLifetimeEach(-1)

   gameover.visible=true;
   //music.stop();
 }

 drawSprites()
 text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY)
 textSize(30)
 fill(255,243,109)
 text("SCORE: "+ score,58,49)
}

function spawnstars(){
  if(frameCount%330==0){
    stars=createSprite(random(30,770),1,20,20)
    
    stars.velocityY=35
    var r=Math.round(random(1,2))
    if(r===1){
      stars.addImage(starimg)
      stars.scale=0.5
    }
    else if(r==2){
      stars.addImage(astranautimg)
      stars.scale=0.8
    }
    stars.lifetime=500
   starG.add(stars)
  }

}

function spawnObstacles(){
  if(frameCount%20===0){
    obstacle=createSprite(random(15,785),1,20,20);
    obstacle.velocityY=15;
    var rand=Math.round(random(1,3))
    
    switch(rand){
      case 1: obstacle.addImage(satelliteimg)
      obstacle.scale=0.3
      break;
      case 2: obstacle.addImage(meteroidsimg)
      obstacle.scale=0.61
      break;
      case 3: obstacle.addImage(asteroidimg) 
      obstacle.scale=0.8
      
      break;
      default:break
    }
    obstacle.lifetime=500
    obstacleG.add(obstacle)
  }
}

