// You'll create a trivia game that shows only one question until the player answers it or their time runs out.

// If the player selects the correct answer, show a screen congratulating them for choosing the right option. After a few seconds, display the next question -- do this without user input.

// The scenario is similar for wrong answers and time-outs.

// If the player runs out of time, tell the player that time's up and display the correct answer. Wait a few seconds, then show the next question.

// If the player chooses the wrong answer, tell the player they selected the wrong option and then display the correct answer. Wait a few seconds, then show the next question.

// On the final screen, show the number of correct answers, incorrect answers, and an option to restart the game (without reloading the page).


var correctAnswers = 0;
var wrongAnswers = 0;
var bestScore = 0;

var intervalID;
var timePassed = 0;

var whichQ;
var questions = [
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
    }
]

function increment() {
    timePassed++;
    $(".time-passed").css("width", timePassed);
    if (timePassed === 200) {
        timePassed = 0;
        clearInterval(intervalId);
        tooSlow();
    }
}

function decrement() {
    timePassed++;
    if (timePassed === 3) {
        timePassed = 0;
        clearInterval(intervalId);
        $(".results").empty();
        nextQuestion();
    }
}

function tooSlow() {
    $(".question-area").empty();
    $(".answer-area").empty();
    $(".results").text("Too slow");
    wrongAnswers++;
    intervalId = setInterval(decrement, 1000);
    questions.splice(whichQ, 1);
}

function thatIsWrong() {
    $(".question-area").empty();
    $(".answer-area").empty();
    $(".results").text("Wrong!");
    wrongAnswers++;
    intervalId = setInterval(decrement, 1000);
    questions.splice(whichQ, 1);
}

function thatIsCorrect () {
    $(".question-area").empty();
    $(".answer-area").empty();
    $(".results").text("Correct");
    correctAnswers++;
    intervalId = setInterval(decrement, 1000);
    questions.splice(whichQ, 1);
}

function nextQuestion() {
    if (questions.length === 0){
        $(".results").text("No more questions.  You got " + correctAnswers + " correct.  You can go home now");
    } else {
    intervalId = setInterval(increment, 50); //Is this 50? Cause it should be for 10 sec timer

    //random question
    whichQ = Math.floor(Math.random() * questions.length);

    $(".question-area").append(questions[whichQ].q);

    for (var i = 0; i < questions[whichQ].a.length; i++) { //answer populate
        var idvAnswer = $("<div>");
        idvAnswer.attr("value", i);
        idvAnswer.addClass("answer");
        idvAnswer.append(questions[whichQ].a[i]);
        $(".answer-area").append(idvAnswer);
    } //end answers, and questions

    //keeping score
    $(".results").append("<p>Correct: " + correctAnswers + "</p>");
    $(".results").append("<p>Wrong: " + wrongAnswers + "</p>");

    $(".answer").on("click", function () { //onClicks
        clearInterval(intervalId);
        timePassed = 0;
        var answerRef = $(this).attr("value");
        if (questions[whichQ].correct == answerRef) {
            console.log("Correct");
            thatIsCorrect();
        } else {
            console.log("Wrong");
            thatIsWrong();
        }
    }); //end On.Click
}
}

nextQuestion();
