const stages = {
    "node-1": [
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
    ],
    "node-2": [
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Pacific Ocean", correct: true },
                { text: "Arctic Ocean", correct: false }
            ]
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: [
                { text: "William Shakespeare", correct: true },
                { text: "Charles Dickens", correct: false },
                { text: "Mark Twain", correct: false },
                { text: "Jane Austen", correct: false }
            ]
        }
    ],
    "node-3": [
        {
            question: "What is the chemical symbol for water?",
            answers: [
                { text: "H2O", correct: true },
                { text: "CO2", correct: false },
                { text: "NaCl", correct: false },
                { text: "O2", correct: false }
            ]
        },
        {
            question: "Which country is known as the Land of the Rising Sun?",
            answers: [
                { text: "China", correct: false },
                { text: "Japan", correct: true },
                { text: "South Korea", correct: false },
                { text: "Thailand", correct: false }
            ]
        }
    ],
    "node-4": [
        {
            question: "What is the largest mammal in the world?",
            answers: [
                { text: "Elephant", correct: false },
                { text: "Blue Whale", correct: true },
                { text: "Giraffe", correct: false },
                { text: "Shark", correct: false }
            ]
        },
        {
            question: "Which gas do plants absorb from the atmosphere?",
            answers: [
                { text: "Oxygen", correct: false },
                { text: "Carbon Dioxide", correct: true },
                { text: "Nitrogen", correct: false },
                { text: "Hydrogen", correct: false }
            ]
        }
    ],
    "node-5": [
        {
            question: "What is the smallest prime number?",
            answers: [
                { text: "1", correct: false },
                { text: "2", correct: true },
                { text: "3", correct: false },
                { text: "5", correct: false }
            ]
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: [
                { text: "Oxygen", correct: true },
                { text: "Gold", correct: false },
                { text: "Silver", correct: false },
                { text: "Iron", correct: false }
            ]
        }
    ]
};

let currentStage = null;
let currentQuestionIndex = 0;
let score = 0;

const mapContainer = document.getElementById("map-container");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const quizForm = document.getElementById("quiz-form");
const resultsContainer = document.getElementById("results-container");
const chartContainer = document.getElementById("chart-container");
const backToMapButton = document.getElementById("back-to-map");

// Track completed stages
const completedStages = new Set();

// Show the selected stage's quiz
document.querySelectorAll("circle").forEach(node => {
    node.addEventListener("click", function() {
        if (!completedStages.has(this.id)) {
            currentStage = this.id;
            currentQuestionIndex = 0;
            score = 0;
            mapContainer.style.display = "none";
            quizContainer.style.display = "block";
            quizForm.style.display = "block";
            resultsContainer.innerHTML = "";
            chartContainer.style.display = "none";
            backToMapButton.style.display = "none";
            showQuestion();
        }
    });
});

function showQuestion() {
    const currentQuestion = stages[currentStage][currentQuestionIndex];
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

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    const answerIndex = parseInt(selectedAnswer.value);
    if (stages[currentStage][currentQuestionIndex].answers[answerIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < stages[currentStage].length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    const totalQuestions = stages[currentStage].length;
    const incorrect = totalQuestions - score;

    resultsContainer.innerHTML = `
        <h2 class="text-lg font-bold">Stage ${currentStage.split("-")[1]} Completed!</h2>
        <p>Your score: <span class="text-green-600">${score}</span> out of <span class="text-blue-600">${totalQuestions}</span></p>
    `;
    
    quizForm.style.display = "none";
    chartContainer.style.display = "block";
    backToMapButton.style.display = "block";

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

    // Mark the stage as complete
    completedStages.add(currentStage);
    const node = document.getElementById(currentStage);
    node.setAttribute("fill", "#48BB78"); // Change node color to green
}

// Back to Map Button
backToMapButton.addEventListener("click", function() {
    quizContainer.style.display = "none";
    mapContainer.style.display = "block";
});