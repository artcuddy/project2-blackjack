//Variables for initial game state
let deckID = '';
let computerCards = [];
let playerCards = [];
let roundLost = false;
let roundWon = false;
let roundTied = false;
let gameOver = false;

// score nodes from the DOM where the scores will be displayed
let computerScoreNode = document.getElementById('computer-score');
let playerScoreNode = document.getElementById('player-score');
let playerGamesWonNode = document.getElementById('player-games-won');
let computerGamesWonNode = document.getElementById('computer-games-won');

// card area nodes rom the DOM where the cards will be displayed
let computerCardsNode = document.getElementById('computer-cards');
let playerCardsNode = document.getElementById('player-cards');

// other nodes for messaging and game buttons
let messageNode = document.getElementById('message');
let newGameNode = document.getElementById('new-game')
let newHandNode = document.getElementById('new-hand');
let hitNode = document.getElementById('hit');
let stayNode = document.getElementById('stay');


// Game Functions

/**
 * Call the resetPlayingArea function
 */
function getNewGame() {


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
function newHand() {


}

/**
 * Reset game to their defaults
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
  
    if (computerScore < 17) {
      // a delay here makes for nicer game play because of  suspence.
      setTimeout(()=>hitMe('computer'), 1000)
    }
    else if (computerScore > 21) {
      roundWon = true;
      // Update the player message to reflect this
    }
    else if (computerScore > playerScore) {
      roundLost = true;
      // Update the player message to reflect this
    }
    else if (computerScore === playerScore) {
      roundTied = true;
      // Update the player message to reflect this
    }
    else {
      roundWon = true;
      // Update the player message to reflect this
    }
  
  }

