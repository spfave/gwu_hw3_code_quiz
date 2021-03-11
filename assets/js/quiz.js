// Variables:

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
const startQuiz = () => {};

// Gets quiz questions from questions.js
const getQuestions = () => {};

// Renders next question to the window
const nextQuestion = () => {};

// Checks user selected answer against correct answer
const checkAnswer = () => {};

// Starts quiz timer
const startTimer = () => {};

// DOM Control:
// DOM Selectors
// Event listener on answer choices

// Webpage Execution:
startQuiz();
