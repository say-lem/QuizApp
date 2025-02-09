const quizData = [
  {
    question:
      "What will be the output of the following code? console.log(0.1 + 0.2 === 0.3);",
    options: ["true", "false", "undefined", "NaN"],
    answer: "false",
  },
  {
    question: "What will the following code output? console.log(typeof NaN);",
    options: ["undefined", "object", "number", "NaN"],
    answer: "number",
  },
  {
    question: "What does the map() function return when used on an array?",
    options: [
      "A modified version of the original array",
      "A new array with transformed elements",
      "The length of the array",
      "undefined",
    ],
    answer: "A new array with transformed elements",
  },
  {
    question:
      "What will be logged to the console in the following code? console.log(1 + '1');",
    options: ["2", "11", "SyntaxError", "NaN"],
    answer: "11",
  },
  {
    question:
      "Which of the following will correctly check if a variable x is an array?",
    options: [
      `typeof x === "array"`,
      "x instanceof Array",
      "x === Array",
      'typeof x === "object"',
    ],
    answer: "x instanceof Array",
  },
  {
    question: "Who is the learnable coordinator?",
    options: ["Tappi", "Ezra", "Livinus", "Amara"],
    answer: "Tappi",
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;
let answered = false;

function startTimer() {
  clearInterval(timer);
  timeLeft = 10;
  document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
  answered = false;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      if (!answered) {
        nextQuestion();
      }
    }
  }, 1000);
}

function loadQuestion() {
  document.getElementById("result").innerText = "";
  const questionData = quizData[currentQuestionIndex];
  document.getElementById("question").innerText = questionData.question;
  document.getElementById("options").innerHTML = "";

  questionData.options.forEach((option) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    button.onclick = () => selectAnswer(button, option, questionData.answer);
    document.getElementById("options").appendChild(button);
  });

  document.getElementById("progress").innerText = `Question ${
    currentQuestionIndex + 1
  } of ${quizData.length}`;
  document.getElementById("next-btn").disabled = true;

  startTimer();
}

function selectAnswer(button, selected, correct) {
  document
    .querySelectorAll(".btn")
    .forEach((btn) => btn.classList.remove("selected"));
  button.classList.add("selected");

  answered = true;
  clearInterval(timer);

  if (selected === correct) {
    score++;
  }
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById(
    "quiz-container"
  ).innerHTML = `<h2>Quiz Completed!</h2><p id='result'>Your Score: ${score} / ${quizData.length}</p>`;
}

loadQuestion();
