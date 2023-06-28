const baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';
const gameID = 'Zl4d7IVkemOTTVg2fUdzzzz';
let leaderboardData = null;

// Function to create a new score for a game
const createScore = async (user, score) => {
  const url = `${baseURL}/games/${gameID}/scores/`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user,
      score,
    }),
  });
  const data = await response.json();
  return data;
};

// Function to get the scores for a game
const getScores = async () => {
  const url = `${baseURL}/games/${gameID}/scores/`;
  const response = await fetch(url);
  const data = await response.json();
  leaderboardData = data.result;
};

// Function to update the leaderboard on the web page
const updateLeaderboard = () => {
  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = '';

  leaderboardData.forEach((score) => {
    const listItem = document.createElement('li');
    listItem.classList.add('leader-s-listitems');
    listItem.textContent = `${score.user}: ${score.score}`;
    scoreList.appendChild(listItem);
  });
};

// Function to handle form submission
const submitScore = async (event) => {
  event.preventDefault();

  const nameField = document.getElementById('nameField');
  const scoreField = document.getElementById('scoreField');

  const name = nameField.value;
  const score = parseInt(scoreField.value, 10);

  if (!name || Number.isNaN(score)) {
    const alertPara = document.querySelector('.alert-parascore');
    alertPara.textContent = 'Please enter a valid name and score';
    return;
  }

  try {
    await createScore(name, score);
    const alertPara = document.querySelector('.alert-parascore');
    alertPara.textContent = 'Name and Score added soccessfully';

    nameField.value = '';
    scoreField.value = '';
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
  }
};

// Function to handle refresh button click
const refreshScores = async () => {
  try {
    await getScores();
    updateLeaderboard();
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
  }
};

const submitButton = document.querySelector('.leader-a-submit');
submitButton.addEventListener('click', submitScore);

const refreshButton = document.querySelector('.leader-r-btn');
refreshButton.addEventListener('click', refreshScores);

// Initial loading of leaderboard
refreshScores();
