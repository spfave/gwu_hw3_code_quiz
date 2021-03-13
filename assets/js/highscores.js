// FUNCTIONS:
// Render table of scores
const displayScores = () => {
  const scores = getScores();

  // Render each score to score table
  for (const [i, score] of scores.entries()) {
    displayScore(i, score);
  }
};

// Create and add score to scores table
const displayScore = (place, score) => {
  const scoresTable = document.getElementById("scores-table");

  // Create score table row and append to table
  const scoreRow = document.createElement("tr");
  scoreRow.innerHTML = `
    <td>${place}</td>
    <td>${score.initials}</td>
    <td>${score.quizScore}</td>
    <td>${score.numCorrect}</td>
    <td>${score.quizTime}</td>
  `;
  scoresTable.appendChild(scoreRow);
};

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

// Save scores to local storage
// const saveScores = () => {}

// Add score to list of scores
const addScore = (score) => {
  // Get current scores list and append score
  const scores = getScores();
  scores.push(score);

  // Sort scores based on quiz score
  scores.sort((s1, s2) => {
    s1.quizScore - s2.quizScore;
  });

  // Write score list to storage
  localStorage.setItem("scores", JSON.stringify(scores));
};

// Clear stored scores list
const clearScores = () => {
  localStorage.removeItem("scores");
  displayScores();
};

// DOM CONTROL:
// DOM Selectors
const btnClear = document.getElementById("btn-clear");

// Event listener on clear scores button
btnClear.addEventListener("click", () => {
  clearScores();
});

// WEBPAGE EXECUTION:
displayScores();
