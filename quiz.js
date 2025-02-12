const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const quizForm = document.getElementById("quiz-form");
const resultsContainer = document.getElementById("results-container");
const chartContainer = document.getElementById("chart-container");

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <div class="question text-lg font-semibold">${currentQuestion.question}</div>
        ${currentQuestion.answers.map((answer, index) => `
            <label class="block border p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                <input type="radio" name="answer" value="${index}" required class="mr-2">
                ${answer.text}
            </label>
        `).join("")}
    `;
}

quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    // Add animation class when button is clicked
    const submitButton = event.target.querySelector("button");
    submitButton.classList.add("scale-90");
    
    // Remove animation class after animation ends
    setTimeout(() => {
        submitButton.classList.remove("scale-90");
    }, 200);

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    const answerIndex = parseInt(selectedAnswer.value);
    if (quizQuestions[currentQuestionIndex].answers[answerIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});


function showResults() {
    const totalQuestions = quizQuestions.length;
    const incorrect = totalQuestions - score;

    resultsContainer.innerHTML = `
        <h2 class="text-lg font-bold">Quiz Completed!</h2>
        <p>Your score: <span class="text-green-600">${score}</span> out of <span class="text-blue-600">${totalQuestions}</span></p>
    `;
    
    quizForm.style.display = "none";
    chartContainer.style.display = "block";

    const ctx = document.getElementById("scoreChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Correct Answers", "Wrong Answers"],
            datasets: [{
                data: [score, incorrect],
                backgroundColor: ["#4CAF50", "#F44336"]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

// Start quiz
showQuestion();
