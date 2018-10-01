var correctAnswers = 0;
var wrongAnswers = 0;
var bestScore = 0;

var intervalID;
var timePassed = 0;

var whichQ;
var correctRef;

var questions = [];
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
        nextQuestion();
    }
}

function message(message) {
    $(".question-area").empty();
    $(".results").empty();
    intervalId = setInterval(pauseTime, 1000);

    for (var i = 0; i < questions[whichQ].a.length; i++) {
        $(".answer-"+i).css("color", "#f00");
    }
    $(".answer-"+correctRef).css("color", "#23DD2C")

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
    
    questions.splice(whichQ, 1);
}

function nextQuestion() {
    $(".question-area").empty();
    $(".answer-table").empty();
    if (questions.length > 0) {
        intervalId = setInterval(qTime, 50); //Is this 50? Cause it should be for 10 sec timer

        //random question
        whichQ = Math.floor(Math.random() * questions.length);
        correctRef = questions[whichQ].correct;

        var questionQuestion = $("<p>");
        questionQuestion.addClass("question-question");
        questionQuestion.append(questions[whichQ].q);
        $(".question-area").append(questionQuestion);

        for (var i = 0; i < questions[whichQ].a.length; i++) { //answer populate
            var idvAnswer = $("<li>");
            idvAnswer.attr("value", i);
            idvAnswer.addClass("answer answer-"+i);
            idvAnswer.append(questions[whichQ].a[i]);
            $(".answer-table").append(idvAnswer);
        } //end answers, and questions

        

        $(".answer").on("click", function () { //onClicks
            clearInterval(intervalId);
            timePassed = 0;
            var answerRef = $(this).attr("value");
            $(this).css("list-style-type", "disc");

            for (var i = 0; i < questions[whichQ].a.length; i++) {
                $(".answer-"+i).css("color", "#f00");
            }
            $(".answer-"+correctRef).css("color", "#23DD2C")

            if (correctRef == answerRef) {
                message("correct");
            } else {
                message("wrong");
            }
        }); //end On.Click
    } //end if
    else {
        if (bestScore < correctAnswers) {
            bestScore = correctAnswers;
            $(".results").text("You got a new high score of " + bestScore + "!");
        } else {
            $(".results").text("No more questions.  You got " + correctAnswers + " correct.  Study up if you want to beat the high score of " + bestScore + ".");
        }

        var nextGame = $("<div>");
        nextGame.addClass("next-game");
        var nextText = $("<h2>");
        nextText.addClass("next-text");
        nextText.text("Click to Play Again");
        nextGame.append(nextText);
        $(".question-area").append(nextGame);
        $(".next-game").on("click", gameReset)
    }
}

function gameReset() {
    $(".results").empty()
    for (var i = 0; i < questionStore.length; i++) {
        questions.push(questionStore[i]); }
    wrongAnswers = 0;
    correctAnswers = 0;
    $(".timer").show();
    nextQuestion();
    
}

$(".timer").hide();
$(".play-game").on("click", gameReset);
