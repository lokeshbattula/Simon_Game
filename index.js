
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];

var userClickedPattern = [];
var level = 0;

var flag = false;


$(document).keypress(function (){
    if(!flag){
        $("h1").text("Level" + level);
        nextSequence();
        flag = true;
    }
})



$(".btn").click(function (){
    var userChosenColor = $(this).attr("id");
    pressed(userChosenColor);

    userClickedPattern.push(userChosenColor);

    checkanswer(userClickedPattern.length -1);
});




function nextSequence(){
    userClickedPattern = [];   
    level +=1; 
    $("h1").text("Level " + level);
    var randomNum = Math.floor(Math.random()*4); 
    var chosenColor = buttonColors[randomNum];
    gamePattern.push(chosenColor);
    $("#" + chosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(chosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}

function pressed(currentColor) {
    var curr = $("#" + currentColor);
    curr.addClass("pressed");
    setTimeout(function(){
        curr.removeClass("pressed");
    },500);
}
function checkanswer(currentnum){
    if(userClickedPattern[currentnum] === gamePattern[currentnum]){

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },500);
        }
    }
    else{
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 300);
        $("h1").text("To Restart,Press any key");
        
        startover();     
    }

}

function startover(){
    gamePattern = [];
    level = 0;
    flag = false;
}