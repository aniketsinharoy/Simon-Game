var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    ++level;
    $("h1").text("Level "+level);
    animatePress(randomChosenColour);
    setTimeout(function(){
        animatePress(randomChosenColour);
    }, 100);
}

function handler(id) {
    var userChosenColour = id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    setTimeout(function(){
        animatePress(userChosenColour);
    }, 100);
    checkAnswer(level);
}

function playSound(name){
    var backgroundSound = new Audio("./sounds/"+name+".mp3");
    backgroundSound.play();
}

function animatePress(name){
    $("#"+name).toggleClass("pressed");
}

function checkAnswer(currentLevel){
    for(var i = 0;i<userClickedPattern.length;++i)
    {
        if(userClickedPattern[i]!=gamePattern[i])
        {
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").addClass("game-over");
            playSound("wrong");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            userClickedPattern.length = 0;
            level = 0;
        }
    }
    if(userClickedPattern.length === currentLevel)
    {
        setTimeout(function(){
            nextSequence();
        }, 1000);
        userClickedPattern.length = 0;
    }
    // console.log(gamePattern);
    // console.log(userClickedPattern);
}

$(".btn").click(function () {
    handler(this.id);
});

$("html").keydown(function (e) { 
    gamePattern.length = 0;
    nextSequence();
});
