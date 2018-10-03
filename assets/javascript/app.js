var correctAnswers = 0;
var wrongAnswers = 0;
var bestScore = 0;

var intervalID;
var timePassed = 0;

var whichQ;
var correctRef;

var hasAnswered = false;

var questions = [];
var skippedQuestions = [];
var questionStore = [
    {
        q: "Harry's Scar was what shape?",
        a: ["Lightning Bolt", "Horseshoe", "Pentagram", "Map of Ukraine"],
        correct: 0
    },

    {
        q: "A Horcrux is what?",
        a: ["Map of Hogwarts", "Type of Candy", "Piece of your soul", "Party Drug"],
        correct: 2
    },

    {
        q: "Dobby's first and last words were 'Harry Potter!'",
        a: ["True", "False"],
        correct: 0
    },

    {
        q: "Who is Ripper?",
        a: ["A rouge house-elf", "Harry's pet snake", "Hagrid's crossbow", "Aunt Marge's Bulldog"],
        correct: 3
    },

    {
        q: "How much does a Firebolt cost?",
        a: ["500 galleons", "Inquire within", "How much you got?", "Your first born child"],
        correct: 1
    },

    {
        q: "What shape is Professor Snape's nose?",
        a: ["Hooked", "Bulbous", "Petite", "Extra-Long"],
        correct: 0
    },

    {
        q: "Who of the following is a registered Animagus?",
        a: ["Rita Skeeter", "Sirius Black", "Minervra McGonagal", "Neville Longbottom"],
        correct: 2
    },

    {
        q: "How many Christmas Trees does Hagrid put in the Great Hall every year?",
        a: ["13", "7", "3", "4"],
        correct: 0
    },

    {
        q: "Ron's favorite quidditch team is...",
        a: ["Holyhead Harpies", "Tutshil Tornadoes", "Wimbourne Wasps", "Chudley Cannons"],
        correct: 3
    },

    {
        q: "Ginny Weasley marries her celebrity crush.",
        a: ["True", "False"],
        correct: 0
    }
]

function qTime() {
    timePassed++;
    $(".time-passed").css("width", timePassed);
    if (timePassed === 200) {
        timePassed = 0;
        clearInterval(intervalId);
        message("slow");
    }
}

function pauseTime() {
    timePassed++;
    if (timePassed === 3) {
        timePassed = 0;
        clearInterval(intervalId);
        // $(".results").empty();
        if (questions.length > 0) {
            nextQuestion(questions);
        } else if (skippedQuestions.length > 0) {
            nextQuestion(skippedQuestions);
        } else {
            checkWin();
        }
    }
}

function message(message) {
    $(".question-area").empty();
    $(".results").empty();
    intervalId = setInterval(pauseTime, 1000);

    if (message === "correct") {
        $(".question-area").text("Correct");
        correctAnswers++;
    } else if (message === "slow") {
        $(".question-area").text("Too Slow!");
        wrongAnswers++;
    } else {
        $(".question-area").text("Wrong");
        wrongAnswers++;
    }

    $(".results").text("Correct: " + correctAnswers);
    $(".results").append("<p>Wrong: " + wrongAnswers + "</p>");

    if (questions.length > 0) {
        questions.splice(whichQ, 1);
    } else {
        skippedQuestions.splice(whichQ, 1);
    }
}

function nextQuestion(remaining) {
    $(".question-area").empty();
    $(".answer-table").empty();
    hasAnswered = false;
    if (remaining.length > 0) {
        intervalId = setInterval(qTime, 50); //Is this 50? Cause it should be for 10 sec timer

        //random question
        whichQ = Math.floor(Math.random() * remaining.length);
        correctRef = remaining[whichQ].correct;

        var questionQuestion = $("<p>");
        questionQuestion.addClass("question-question");
        questionQuestion.append(remaining[whichQ].q);
        $(".question-area").append(questionQuestion);

        for (var i = 0; i < remaining[whichQ].a.length; i++) { //answer populate
            var idvAnswer = $("<li>");
            idvAnswer.attr("value", i);
            idvAnswer.addClass("answer answer-" + i);
            idvAnswer.append(remaining[whichQ].a[i]);
            $(".answer-table").append(idvAnswer);
        } //end answers, and questions

        if (questions.length > 0) {
            var skipButton = $("<li>");
            skipButton.addClass("skip-bo");
            skipButton.text("Skip");
            $(".answer-table").append(skipButton);
        } else {
            var toldYaSo = $("<p>");
            toldYaSo.addClass("neener");
            toldYaSo.text("Told ya this would come back.");
            $(".answer-table").append(toldYaSo);
        }
    }
}

function gameReset() {
    $(".results").empty();
    questions = [];
    skippedQuestions = [];
    for (var i = 0; i < questionStore.length; i++) {
        questions.push(questionStore[i]);
    }
    wrongAnswers = 0;
    correctAnswers = 0;

    $(".timer").show();
    nextQuestion(questions);
}

function checkWin() {
    if (bestScore < correctAnswers) {
        bestScore = correctAnswers;
        $(".results").text("You got a new high score of " + bestScore + "!");
    } else {
        $(".results").text("No more questions.  You got " + correctAnswers + " correct.  Study up if you want to beat the high score of " + bestScore + ".");
    }
    $(".question-area").empty();
    $(".answer-table").empty();
    var nextGame = $("<div>");
    nextGame.addClass("next-game");
    var nextText = $("<h2>");
    nextText.addClass("next-text");
    nextText.text("Click to Play Again");
    nextGame.append(nextText);
    $(".question-area").append(nextGame);
    $(".next-game").on("click", gameReset);
}

$(document).on("click", ".answer", function () { // answer onClicks
    if (hasAnswered === false) {
        clearInterval(intervalId);
        timePassed = 0;
        var answerRef = $(this).attr("value");
        $(this).css("list-style-type", "disc");

        if (questions.length > 0) {
            for (var i = 0; i < questions[whichQ].a.length; i++) {
                $(".answer-" + i).css("color", "#f00");
            }
            $(".answer-" + correctRef).css("color", "#23DD2C")
        } else {
            for (var i = 0; i < skippedQuestions[whichQ].a.length; i++) {
                $(".answer-" + i).css("color", "#f00");
            }
            $(".answer-" + correctRef).css("color", "#23DD2C")
        }

        if (correctRef == answerRef) {
            message("correct");
        } else {
            message("wrong");
        }
        hasAnswered = true;
    }//end if
}); //end On.Click

$(document).on("click", ".skip-bo", function () {
    if (hasAnswered === false) {
        clearInterval(intervalId);
        timePassed = 0;
        intervalId = setInterval(pauseTime, 1000);
        $(".question-area").empty();
        $(".answer-table").empty();
        $(".question-area").text("Lame.  This will come back to haunt you.");

        skippedQuestions.push(questions[whichQ]);
        questions.splice(whichQ, 1);

        hasAnswered = true;
    }
});

$(".timer").hide();
$(".play-game").on("click", gameReset);
