//Variables for initial game state
let deckID = '';
let computerCards = [];
let playerCards = [];
let roundLost = false;
let roundWon = false;
let roundTied = false;
let cardGameOver = false;

// score nodes from the DOM where the scores will be displayed
const computerScoreNode = document.getElementById('computer-score');
const playerScoreNode = document.getElementById('player-score');
const playerGamesWonNode = document.getElementById('player-games-won');
const computerGamesWonNode = document.getElementById('computer-games-won');

// card area nodes rom the DOM where the cards will be displayed
const computerCardsNode = document.getElementById('computer-cards');
const playerCardsNode = document.getElementById('player-cards');

// other nodes for messaging and game buttons
const messageNode = document.getElementById('message');
const newGameNode = document.getElementById('new-game')
const newHandNode = document.getElementById('new-hand');
const hitNode = document.getElementById('hit');
const stayNode = document.getElementById('stay');

// On click events
newGameNode.onclick = getNewDeck;
newHandNode.onclick = getNewGame;
hitNode.onclick = () => hit('player');
stayNode.onclick = () => setTimeout(() => computerPlays(), 600);


// Game Functions

/**
 * Call the resetPlayingArea function and start new game 
 * This should clear the game settings and restart
 */
function getNewGame() {
  

}

/**
 * 
 * Game over and call resetPlayingArea and message the player that the game is over
 */
function gameOver() {
 
}

/**
 * 
 * This function receives an array of cards and returns the total score
 */
function computeScore(cards) {


}

/**
 * 
 * Make a call to deckofcardsapi using the deckID state variable in order
 * to retrieve 4 draw cards from the deck
 */
function getNewDeck() {
 
}

/**
 * Reset the game variables to their defaults
 */
function resetPlayingArea() {
  

}

/**
 * 
 * If any of roundLost or roundWon or roundTied is true, return immediately
 */
function hit(target) {
  

}

/**
 * Compute the computers score by calling the computeScore() function and 
 * update the player message to reflect this
 */
function computerPlays() {
  
}

