// Variables:
const numQuestions = questionBank.length;
let questionNum = 0;

// Utility Functions:
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

// Functions:
// startQuiz is called on page load
const startQuiz = () => {
  // Get list of questions for quiz and prepare for user
  getQuestions();

  // Set total number of questions in header
  document.getElementById("num-questions").textContent = numQuestions;

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
  // if questions remain in question bank show next question
  if (questionNum < numQuestions) {
    // Set question number in header
    questionCounter.textContent = questionNum + 1;
    question = questionBank[questionNum];

    // Set question text
    questionText.textContent = question.question;

    // Set question answer choices text
    for (let c = 0; c < question.choices.length; c++) {
      questionChoices[c].textContent = question.choices[c];
    }

    // Increase question number by 1
    questionNum++;
  } else {
    endQuiz();
  }
};

// Checks user selected answer against correct answer
const checkAnswer = () => {};

// Starts quiz timer
const startTimer = () => {};

// Ends quiz and routes user to quiz score display
const endQuiz = () => {};

// DOM Control:
// DOM Selectors
const questionCounter = document.getElementById("question-num");
const quizTimer = document.getElementById("quiz-timer");
const questionText = document.getElementById("question-text");
const questionChoices = document.querySelectorAll(".choice");

// Event listener on answer choices

// Webpage Execution:
startQuiz();
