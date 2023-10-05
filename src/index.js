// Select DOM elements using querySelector
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const startButton = document.querySelector("#start");
const score = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");

// Define global variables
let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

// Generates a random integer within a range.
// Function that takes two values as parameters that limit the range of the number to be generated.
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sets the time delay given a difficulty parameter.
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500; // 1.5 seconds
  } else if (difficulty === "normal") {
    return 1000; // 1 second
  } else if (difficulty === "hard") {
    // Randomly delay between 600 and 1200 milliseconds
    return randomInteger(600, 1200);
  } else {
    // Default to 1 second for unsupported difficulty levels
    return 1000;
  }
}

// Chooses a random hole from a list of holes.
function chooseHole(holes) { 
  const index = randomInteger(0,8);
  const hole = holes[index];
  if (hole === lastHole) {
   return chooseHole(holes);
  }
 lastHole = hole;
 return hole;
   
 }

// Calls the showUp function if time > 0 and stops the game if time = 0.
function gameOver() {
  if (time > 0) {
    timeoutId = showUp();
    return timeoutId; // Continue the game
  } else {
    gameStopped = stopGame();
    showGameOverScreen(); // Call the function to display the game over screen
    return gameStopped; // Game over
  }
}

// Calls the showAndHide() function with a specific delay and a hole.
function showUp() {
  let delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

// Shows and hides the mole given a delay time and the hole where the mole is hidden
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole after the delay
    gameOver();
  }, delay);
  return timeoutID;
}

// Adds or removes the 'show' class that is defined in styles.css to a given hole.
function toggleVisibility(hole) {
  hole.classList.toggle("show"); // Add or remove the 'show' class
  return hole;
}

// Increments the points global variable and updates the scoreboard
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

// Clears the score by setting `points = 0` and updates the scoreboard
function clearScore() {
  points = 0;
  score.textContent = points;  
  return points;
}

// Updates the control board with the timer if time > 0
function updateTimer() {
  if (time > 0) {
    time--;
    timerDisplay.textContent = time;
    // gameOver(); // Stops the game when time reaches 0
  }
  return time;
}

// Starts the timer using setInterval. For each 1000ms (1 second) the updateTimer function get called
function startTimer() {
  setInterval(updateTimer, 1000); // Updates timer every 1 second
  return timer;
}

// Function that sets the hitAudio sound
function playHitSound() {
  const hitAudio = document.getElementById("hit-audio");
  hitAudio.volume = 1.0;
  hitAudio.play();
}

// Function that sets the moleAudio sound
function playMoleSound() {
  const moleAudio = document.getElementById("mole-audio");
  moleAudio.volume = 1.0;
  moleAudio.play();
}

function playGameMusic() {
  const moleAudio = document.getElementById("game-music");
  moleAudio.volume = 1.0;
  moleAudio.play();
}

// Event handler that gets called when a player clicks on a mole
function whack(event) { 
  playHitSound(); // Plays the punch.wav sound when a mole is clicked
  updateScore();

  
  return points;
}

// Adds the 'click' event listeners to the moles.
function setEventListeners() {
  moles.forEach((mole) => {
    mole.addEventListener("click", whack); // Add click event listener to each mole
  });
  return moles;
}



// Sets the duration of the game. The time limit, in seconds, that a player has to click on the sprites
function setDuration(duration) {
  time = duration; // Set the game duration in seconds
  return time;
}

// Function to display the game over screen with the final score
function showGameOverScreen() {
  const gameOverScreen = document.getElementById("game-over-screen");
  const finalScore = document.getElementById("final-score");
  finalScore.textContent = points;
  gameOverScreen.style.display = "block";
}

// Function to hide the game over screen when clicked
function hideGameOverScreen() {
  const gameOverScreen = document.getElementById("game-over-screen");
  gameOverScreen.style.display = "none";
}

const gameOverScreen = document.getElementById("game-over-screen");
gameOverScreen.addEventListener("click", hideGameOverScreen);

startButton.addEventListener("click", startGame); // Add a click event listener to the startButton

// Function that starts the game when the `startButton` is clicked.
function startGame() {
  // Clear the previous timer if it exists
  if (timer) {
    clearInterval(timer);
  }

  playGameMusic(); // Plays the evil-theme audio at the start of the game
  setDuration(10); // Set the game duration to 10 seconds
  startTimer(); // Start the game timer
  showUp(); // Start the game by showing the moles
  clearScore(); // Initialize the score to 0
  document.body.style.cursor = 'url("assets/mallet.png"), auto'; // Sets the cursor style

  setEventListeners(); // Set click event listeners for moles

  return "game started";
}

// Called when the game is stopped. Clears the time using clearInterval. Returns "game stopped"
function stopGame() {
  clearInterval(timer); // Stop the timer
  document.body.style.cursor = ""; // Reset the cursor style
  playMoleSound(); // Plays the molesong.mp3
  return "game stopped";
}

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;