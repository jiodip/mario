//loading game materials
function preload(){
bgImg=loadImage("images/bgnew.jpg")
marioImg=loadAnimation("images/mar1.png","images/mar2.png","images/mar3.png","images/mar4.png","images/mar5.png","images/mar6.png","images/mar7.png")
brickimg=loadImage("images/brick.png")
coinImg=loadAnimation("images/con1.png","images/con2.png","images/con3.png","images/con4.png","images/con5.png","images/con6.png")
coinsound=loadSound("sounds/coinSound.mp3")
jumpsound=loadSound("sounds/jump.mp3")
diesound=loadSound("sounds/dieSound.mp3")
mushImg=loadAnimation("images/mush1.png","images/mush2.png","images/mush3.png","images/mush4.png","images/mush5.png","images/mush6.png")
turImg=loadAnimation("images/tur1.png","images/tur2.png","images/tur3.png","images/tur4.png","images/tur5.png")
deadImg=loadAnimation("images/dead.png")
heartImg=loadImage("images/heart.png")
restartImg=loadImage("images/restart.png")

}
//creating sizes,positions and characters
var Score=0
var health=5
var gamestate="play"
function setup() {
createCanvas(windowWidth,windowHeight);
bg=createSprite(windowWidth/2,windowHeight/2)
bg.addImage(bgImg)
bg.scale=.600


mario=createSprite(200,500)
mario.addAnimation("run",marioImg)
mario.addAnimation("dead",deadImg)

mario.scale=.3
g=createSprite(windowWidth/2,740,windowWidth,10)
g.visible=false
brickgroup=new Group()
coingroup=new Group()
npcgroup=new Group()
healthgrp=[]
re=createSprite(windowWidth/2,windowHeight/2)
re.visible=false
re.addImage(restartImg)
for(i=1;i<=health;i+=1){
  h=createSprite(windowWidth-50*i,100)
  h.addImage(heartImg)
  h.scale=.05
  healthgrp.push(h)
  
}
//creating rules
}

function draw() {//creating the keybinds
    if (gamestate=="play")
    {
      if(keyDown("space")&&mario.velocityY==0){mario.velocityY=-15;
         jumpsound.play()}
        

     mario.velocityY+=.5
    mario.collide(g)
    if (mario.y<50){
        mario.y=50
    }

    bg.velocityX=-9
   
    if(mario.x<200){
        mario.x=200
    }
    if(bg.x<100){
        bg.x=bg.width/3
    }
    if (frameCount%80==0){createbrick()}

    //materials rules
    for(i=0;i<brickgroup.length;i+=1){
        temp=brickgroup.get(i)
      if(mario.isTouching(temp)){
        mario.collide(temp)
      }
    }
    if (frameCount%50==0){createcoin()
      }
    for(i=0;i<coingroup.length;i+=1){
       temp=coingroup.get(i)
      if(mario.isTouching(temp)){
        temp.destroy()
        Score=Score+1
        coinsound.play()
    }
    }
    
  
    for(i=0;i<npcgroup.length;i+=1){
      temp=npcgroup.get(i)
       if(mario.isTouching(temp))
         {temp.destroy()
          health=health-1
          a=healthgrp.pop()
          a.destroy()
          if(health==0){
            diesound.play()
            gamestate= "stop"

            }
        }
    }

   if (frameCount%145==0){createnpc()}
    }//during the time of deadstate
    else{mario.changeAnimation("dead",deadImg)
    mario.velocityX=0
    mario.velocityY=0
    bg.velocityX=0
    coingroup.setVelocityXEach(0)
    brickgroup.setVelocityXEach(0)
    npcgroup.setVelocityXEach(0)
    coingroup.setLifetimeEach(-1)
    brickgroup.setLifetimeEach(-1)
    npcgroup.setLifetimeEach(-1)
    mario.y=740
    re.visible=true
    if(mousePressedOver(re)){
      if (health>0){
        restartgame();}
      
     
    }
    }
    if (health===0) {
      restart.visible=true;
    }

  drawSprites()
  textSize(30)
  fill("red")
  text("score:"+Score,50,50)
}// al groups (npc,coin,brick)
function createbrick(){b=createSprite(windowWidth,0)
   b.addImage(brickimg)
   b.y=random(450,500)
   b.velocityX=-9
   b.lifetime=300
   brickgroup.add(b)}

function createcoin(){b=createSprite(windowWidth,0)
    b.addAnimation("coin",coinImg)
    b.scale=.1
    b.y=random(300,400)
    b.velocityX=-9
    b.lifetime=300
    coingroup.add(b)
}
function createnpc(){b=createSprite(windowWidth,0)
        x=random(1,2)
        x=Math.round(x)  
        switch(x){
            case 1:b.addAnimation("npc",mushImg)
            break
            case 2:b.addAnimation("npc",turImg)
            break

        } 
        
        b.scale=.25
        b.y=700
        b.velocityX=-15
        b.lifetime=300
        npcgroup.add(b)  
}

function restartgame()
{gamestate="play"
 npcgroup.destroyEach();
 coingroup.destroyEach();
 brickgroup.destroyEach();
 mario.changeAnimation("run",marioImg)
 Score=0
 re.visible=false
 
}
