//Variables for initial game state
let deckID = '';
let computerCards = [];
let playerCards = [];
let roundLost = false;
let roundWon = false;
let roundTied = false;
let gameOver = false;

// score nodes
let computerScoreNode = document.getElementById('computer-score');
let playerScoreNode = document.getElementById('player-score');
let playerGamesWonNode = document.getElementById('player-games-won');
let computerGamesWonNode = document.getElementById('computer-games-won');


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

