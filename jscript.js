//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 16;
let countdown;
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "A female deer is called doe",
        options: ["True", "False", "Maybe", "I do not know"],
        correct: "True",
    },
    {
        id: "1",
        question: "Does an octopus have eight tentacles ?",
        options: ["True", "False", "Maybe", "I do not know"],
        correct: "True",
    },
    {
        id: "2",
        question: "The baby of Zebra animal is called a joey?",
        options: ["True", "False", "Maybe", "I do not know"],
        correct: "False",
    },
    {
        id: "3",
        question: "Which bird lays the largest eggs?",
        options: ["Chicken", "Eagle", "Ostrich", "Roadrunner"],
        correct: "Ostrich",
    },
    {
        id: "4",
        question: "Which animal is known as the best friend of man?",
        options: ["Cat", "Bat", "Dog", "Bear"],
        correct: "Dog",
    },
    {
        id: "5",
        question: "Which is the only land animal that cannot jump?",
        options: ["Crocodile", "Bear", "Hippopotamus", "Elephant"],
        correct: "Elephant",
    }, {
        id: "6",
        question: "What is the biggest animal in the entire world?",
        options: ["Whale", "Elephant", "Hippopotamus", "Gorilla"],
        correct: "Whale",
    },
    {
        id: "7",
        question: "What is the horn of a rhinoceros made of?",
        options: ["Bones", "Hair", "Skin", "Rock"],
        correct: "Hair",
    },
    {
        id: "8",
        question: "What is a group of crows called?",
        options: ["A comedy", "A murder", "A witch", "A nightmare"],
        correct: "A murder",
    },
    {
        id: "9",
        question: "How many years can a snail sleep for?",
        options: ["100 Days", "5 months", "Three years", "A millennium"],
        correct: "Three years",
    },




];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 16;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 16;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};