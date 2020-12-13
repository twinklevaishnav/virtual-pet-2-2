var dog,bottle,food, database;
var position;

function preload ()
{
  dogImage = loadImage("Dog.png");
  dogImage2 = loadImage("happydog.png");
  bottleImage = loadImage("bottle.png");
}
function setup(){
  
  createCanvas(600,400);

  database=firebase.database();

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

 dog = createSprite(450,200,20,20);
 dog.addImage(dogImage);
 dog.scale = 0.09;
 feed_but = createButton('FEED THE BRAVO');
 feed_but.position(600,120);
 feed_but.mousePressed(feedDog);
 bottle_but = createButton('ADD THE FOOD');
 bottle_but.position(480,120);
 bottle_but.mousePressed(addFoods)

 
}

function draw () {
background("lightblue");

foodObj.display();

//text(mouseX + "," + mouseY, 35, 100);

drawSprites();

}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(dogImage2);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
