var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
  .fadeOut(100)
  .fadeIn(100)
  .fadeOut(100)
  .fadeIn(100);
  playSound(randomChosenColor);  
  level++;
  $("h1").text("Level "+level);
  userClickedPattern=[];
}
$(".btn").click(function()
{
  var UserSelectedColor=(this.id);
  userClickedPattern.push(UserSelectedColor);
  playSound(this.id);
  animatePress(this);  
  check(userClickedPattern.length-1);  
})
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor)
{
  $(currentColor).addClass("pressed");
  setTimeout(function()
  {
    $(currentColor).removeClass("pressed");
  },100);
}
$(document).keydown(function()
{
  if(!started)
  {
    started=true;
    nextSequence(); 
  }   
})
function check(currentlevel)
{
  if(gamePattern[currentlevel]===userClickedPattern[currentlevel])
  {
    if(gamePattern.length==userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      }, 1000);  
    }      
  }
  else
  {
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver()
{
  level=0;
  started=0;
  gamePattern=[];
}