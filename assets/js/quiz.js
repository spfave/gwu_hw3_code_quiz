// VARIABLES:
const questionTime = 5;
const questionPointVal = 10;

const numQuestions = questionBank.length;
const quizTime = numQuestions * questionTime; // Total quiz time = numQs * 5 seconds/question
let quizTimer;
let timeRemaining;
let questionNum = -1;
let numQuestionRight = 0;
let quizScore = 0;

// UTILITY FUNCTIONS:
// Randomly shuffle an array
const shuffleArray = (array) => {
  /**
   * Return random shuffle of array: uses Durstenfeld shuffle (Fisher-Yates) algorithm
   * Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   */
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Return a time in seconds in format mm:ss
const renderTime = (timeSeconds) => {
  const minutes = Math.floor(timeSeconds / 60);
  let seconds = timeSeconds % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

// FUNCTIONS:
// startQuiz is called on page load
const startQuiz = () => {
  // Get list of questions for quiz and prepare for user
  getQuestions();

  // Set total number of questions in header
  document.getElementById("num-questions").textContent = numQuestions;

  // Start quiz timer
  startTimer(quizTime);

  // get next (first) question
  nextQuestion();
};

// Gets quiz questions from questions.js
const getQuestions = () => {
  // questions array defined global from question.js file in questionBank variable
  // Shuffle order of questions
  shuffleArray(questionBank);

  // For each question combine correct answer and incorrect answer in single array of choices then shuffle order
  for (const question of questionBank) {
    question.choices = [question.answer, ...question.incorrect_answers];
    shuffleArray(question.choices);
  }
};

// Renders next question to the window
const nextQuestion = () => {
  // Increase question number by 1
  questionNum++;

  // if: questions remain in question bank and there is still time show next question
  // else if: time remaining is zero end quiz time ran out
  // else: end quiz finished answering all questions
  if (questionNum < numQuestions && timeRemaining > 0) {
    // Set question number in header
    questionCounter.textContent = questionNum + 1;
    question = questionBank[questionNum];

    // Set question text
    questionText.textContent = question.question;

    // Set question answer choices text
    for (let c = 0; c < question.choices.length; c++) {
      questionChoices[c].dataset.text = question.choices[c];
      questionChoices[c].textContent = question.choices[c];
    }
  } else if (timeRemaining === 0) {
    endQuiz("Times Up");
  } else {
    endQuiz("All Done!");
  }
};

// Checks user selected answer against correct answer
const checkAnswer = (userAnswer) => {
  // if: user selected answer is the question correct answer increase quiz score
  // else: deduct time
  if (userAnswer === questionBank[questionNum].answer) {
    numQuestionRight++;
    showAlert("Correct", "success");
  } else {
    timeRemaining =
      timeRemaining > questionTime ? (timeRemaining -= questionTime) : 0;
    showAlert("Incorrect", "danger");
    showTimeDeduction(`-${questionTime}`);
  }

  // Go to next question
  nextQuestion();
};

// Starts quiz timer
const startTimer = (quizTime) => {
  // Set and display initial time alloted to complete quiz
  timeRemaining = quizTime;
  quizTimerEl.textContent = renderTime(timeRemaining);

  // Decrement time remaining every second
  quizTimer = setInterval(() => {
    if (timeRemaining > 0) {
      if (timeRemaining === 6) {
        quizTimerEl.classList.add("text-danger");
      }
      quizTimerEl.textContent = renderTime(--timeRemaining);
    } else {
      quizTimerEl.textContent = renderTime(timeRemaining);
      endQuiz("Times Up");
    }
  }, 1000);
};

// Ends quiz and routes user to quiz score display
const endQuiz = (quizMessage) => {
  // End quiz timer and compute quiz score
  clearInterval(quizTimer);
  quizTimerEl.textContent = renderTime(timeRemaining);
  quizScore += numQuestionRight * questionPointVal + timeRemaining;

  // Show quiz results with submission form
  showQuizResult(quizMessage);
};

// Change quiz page display
const showQuizResult = (quizMessage) => {
  // Hide quiz header and question card
  questionCard.hidden = true;

  // Show quiz results with submission form
  quizResultEl.hidden = false;
  quizMsgEl.textContent = quizMessage;
  quizScoreEl.textContent = quizScore;
};

// Save quiz result to session storage
const saveQuizResult = (quizResult) => {
  sessionStorage.setItem("newScore", JSON.stringify(quizResult));
};

// Show answer alert
const showAlert = (message, alertType) => {
  // Create alert div
  const alert = document.createElement("div");
  alert.className = `alert alert-${alertType} text-center mt-4`;
  alert.appendChild(document.createTextNode(message));

  // Insert alert div in DOM
  const elmnt = document.getElementById("quiz-result");
  elmnt.parentElement.insertBefore(alert, elmnt.nextElementSibling);

  // Timeout alert message after 1 second
  setTimeout(() => {
    document.querySelectorAll(".alert").forEach((e) => {
      e.remove();
    });
  }, 1000);
};

const showTimeDeduction = (message) => {
  // Create alert p
  const alert = document.createElement("p");
  alert.className = `alert text-danger navbar-text m-0 py-2`;
  alert.textContent = message;

  // Insert alert in DOM
  const elmnt = document.getElementById("quiz-time");
  elmnt.insertAdjacentElement("afterend", alert);
};

// DOM CONTROL:
// DOM Selectors
const questionCounter = document.getElementById("question-num");
const quizTimerEl = document.getElementById("quiz-timer");
const questionCard = document.getElementById("question-card");
const questionText = document.getElementById("question-text");
const questionChoicesList = document.getElementById("choices-list");
const questionChoices = document.querySelectorAll(".choice");

const quizResultEl = document.getElementById("quiz-result");
const quizMsgEl = document.getElementById("quiz-message");
const quizScoreEl = document.getElementById("quiz-score");
const btnSubmitScore = document.getElementById("btn-submit-score");
const btnTryAgain = document.getElementById("btn-try-again");

// Event listener on answer choices
questionChoicesList.addEventListener("click", (e) => {
  const element = e.target;

  // if: click is on question answer choice then check selected answer
  if (element.matches(".choice")) {
    checkAnswer(element.dataset.text);
  }
});

// Event listener on score submission
btnSubmitScore.addEventListener("click", (e) => {
  e.preventDefault();

  // Initials entry validations
  const initials = document.getElementById("initials").value;
  if (initials.length !== 2) {
    showAlert("Enter two letter initials", "danger");
    return;
  }

  // Create quizResult object
  quizResult = {
    initials: initials,
    quizScore: `${quizScore}`,
    numCorrect: `${numQuestionRight}/${numQuestions}`,
    quizTime: renderTime(quizTime - timeRemaining),
  };

  // Submit score to local storage
  saveQuizResult(quizResult);

  // Redirect to quiz scores page
  // location.replace("/html/highscores.html");
  location.replace(
    "https://spfave.github.io/javascript-code-quiz/html/highscores.html"
  );
});

// WEBPAGE EXECUTION:
startQuiz();
