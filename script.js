const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffleQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    quizScore = 0;
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true"; // Ensure correct is a boolean

    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });

    if (shuffleQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }

    if (correct) {
        quizScore++;
    }

    document.getElementById('right-answer').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'Which is Chethan’s favourite food?',
        answers: [
            { text: 'Mudde Saaru', correct: false },
            { text: 'Biryani', correct: false },
            { text: 'Chapati Yengai', correct: true },
            { text: 'Mutton Curry Rice', correct: false }
        ]
    },
    {
        question: 'Which is Chethan’s favourite film?',
        answers: [
            { text: 'Googly', correct: true },
            { text: 'Paramathma', correct: false },
            { text: 'KGF', correct: false },
            { text: 'Mungaru Male', correct: false }
        ]
    },
    {
        question: 'Which is Chethan’s favourite actor?',
        answers: [
            { text: 'Yash', correct: true },
            { text: 'Puneeth Rajkumar', correct: false },
            { text: 'Sudeep', correct: false },
            { text: 'Darshan', correct: false }
        ]
    }
];
