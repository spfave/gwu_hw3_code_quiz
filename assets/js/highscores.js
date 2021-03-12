// FUNCTIONS:
// Render table of scores
const displayScores = () => {
  const scores = getScores();
  console.log(scores);
};

// Create and add score to scores table
const displayScore = () => {};

// Get scores from local storage
const getScores = () => {
  // Get scores stored in local storage
  let scores = localStorage.getItem("scores");

  // if: scores does not exist return empty list
  // else: return list of scores
  if (scores === null) {
    scores = [];
  } else {
    scores = JSON.parse(scores);
  }

  return scores;
};

// DOM CONTROL:
// Dom Selectors
const scoresTable = document.getElementById("scores-table");

// WEBPAGE EXECUTION:
displayScores();
