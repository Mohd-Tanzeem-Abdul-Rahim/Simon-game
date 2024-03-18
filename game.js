
var buttonColour = ["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern =[];

var started = false;
var level = 0; 

$(document).keypress(function(){
    if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started = true;
    }
});

$(".btn").click( function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    sounds(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    //console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        sounds("wrong");
        $("body").addClass("game-over")
        $("#level-title").text("Game Over Press Any Key To Restart The Game");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }

}


function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level"+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColour[randomNumber];
    gamePattern.push(randomChosenColour);
    //console.log(gamePattern);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    sounds(randomChosenColour);
 
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);

}


function sounds(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}




function startOver(){
    level = 0;
    gamePattern = [];
    started = false;

}

