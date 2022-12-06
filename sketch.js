const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world

var player , playerImg;
var bg;
var gamestate = 0;
var play = 1;
var over = 2;

var zombie , zomImg;
var playerLife = 100;
var zombieList = [];



function preload(){
playerImg = loadImage("player.png");
bg = loadImage("bedroomfornow.png");
zomImg = loadImage("zombie.png");
}


function setup() {
  createCanvas(windowWidth , windowHeight);

  engine = Engine.create();
world = engine.world;

 player = new Player(200,windowHeight - 100,300,300);




}

function draw() {
  background(0);  
 //image(bg , 0 , 0);

Engine.update(engine);
console.log(gamestate);

player.display();

if(gamestate === 0){

 if(keyIsDown(ENTER)){
  gamestate = 1;


  console.log(gamestate)

 }
}

if(gamestate === 1){

  fill(229, 99, 241);
  textSize(25);
  text("score: 0" , 200 , 400);
  text("Life: 100" , 200 , 300);

  console.log(frameCount);

showZombie();

  zombieCollision();
if(keyIsDown(RIGHT_ARROW)){
  player.body.position.x =   player.body.position.x + 10
  }
  if(keyIsDown(LEFT_ARROW)){
    player.body.position.x =  player.body.position.x- 10
    }
    
    if(playerLife <= 0){
gamestate = 2;

    }
    if(gamestate === 2){
      fill(197, 118, 43);
      textSize(22);
      text("GAME OVER. Try Again?" , 200 , 350);
      console.log(gamestate);
    }


}

  drawSprites();
}

function zombieCollision(){
for(var i = 0; i < zombieList.length; i++){
  if(player!== undefined && zombieList[i].body!== undefined){
    console.log(Matter.Collision);

    var colliding  = Matter.Collision.create(player.body , zombieList[i].body);
    console.log(collision);

    if(colliding.collided){
    playerLife = playerLife - 20;
    
    
      Matter.world.remove(world , zombieList[i].body);
      zombieList.splice(i , 1);
    }
    }
}


}

function showZombie(){
if(zombieList.length >= 0 && frameCount%120 === 0){
  var x = Math.round(random(windowWidth -500 ,windowWidth));

  zombie = new Zombies (x,windowHeight - 100, 300 , 300);
  zombieList.push(zombie);

} 

for(var i=0; i< zombieList.length; i++){

  zombieList[i].display();

}
}



