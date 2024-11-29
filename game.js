
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;

var level = 0;

$(document).on("keypress", startGame);

function startGame(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    $(document).off("keypress", startGame);
    $(".btn").on("click", userClickHandle);
  }
}

function gameOver(){
  level = 0;
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  gotWrongSound();
  $(".btn").off("click", userClickHandle);
  $(document).on("keypress", startGame);
}

function userClickHandle(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
}

function nextSequence() {

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gotWrongSound(){
  var wrongSound = new Audio("sounds/wrong.mp3");
  wrongSound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function animateWrong(currentColor){
  $("#level-title").text("Game Over, Press Any Key to Restart");

  $("#" + currentColor).addClass("pressed-wrong");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed-wrong");
  }, 150);

  $("body").css("backgroundColor", "red");
  setTimeout(function(){
    $("body").css("backgroundColor", "#011F3F");
  }, 150);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log("success")
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);

    if(userClickedPattern.length == gamePattern.length){
      console.log("user finished the sequence");
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }else{
      console.log("user is still in the sequence");
    }

  }else{
    console.log("fail")
    console.log(userClickedPattern[currentLevel]);
    console.log(gamePattern[currentLevel]);
    animateWrong(userClickedPattern[currentLevel]);
    gameOver();
  }
}