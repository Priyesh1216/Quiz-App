const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Dog", correct: false},
        ]
    },

    {
        question: "What is the capital of Australia?",
        answers: [
            {text: "Sydney", correct: false},
            {text: "Melbourne", correct: false},
            {text: "Canberra", correct: true},
            {text: "Brisbane", correct: false},
        ]
    },

    {
        question: "Who wrote the play \"Romeo and Juliet\"?",
        answers: [
            {text: "William Shakespeare", correct: true},
            {text: "Mark Twain", correct: false},
            {text: "Matt Haig", correct: false},
            {text: "Jane Austen", correct: false},
        ]
    },

    {
        question: "Which planet is known as the red planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false},
        ]
    },

    {
        question: "In which year did the Titanic sink?",
        answers: [
            {text: "1905", correct: false},
            {text: "1912", correct: true},
            {text: "1918", correct: false},
            {text: "1923", correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion ();
}

function showQuestion()
{
    resetState ();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    // Will give the question text
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        //Display button in the HTML div
        answerButtons.appendChild (button);
        if (answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState()
{
    nextButton.style.display = "none";
    while (answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }

    else
    {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
            
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length)
    {
        showQuestion();
    }

    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }

    else{
        startQuiz();
    }
}),

startQuiz();
