var userClickedPattern=[];
var gamePattern =[];
const buttonColours=["red","blue","green","yellow"];
var randomChosenColour;
gamePattern.push(randomChosenColour);

var level = 0;
var started = false;


function nextSequence()
{
    var randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(document).keydown(function()
{
    if (!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}


function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function ()
            {
                nextSequence();
            },1000);
            userClickedPattern=[];
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function ()
        {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function playSound(whichColor)
{
    var audio = new Audio("sounds/"+whichColor+".mp3");
    audio.play();
}

function animatePress(whichColor)
{
    $("."+whichColor).addClass("pressed")
    setTimeout(() => {  $("."+whichColor).removeClass("pressed")}, 100);
}

$(".btn").click(function(Event)
{
    var userChosenColour;
    userChosenColour = Event.target.classList[1];
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

