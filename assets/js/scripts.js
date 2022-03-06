let blackJackGame = {
  'player' : {
    'cardNumberSpan' : '#player-score',
    'gamesWon' : '#player-games-won',
  },
  'computer' : {
    'cardNumberSpan' : '#computer-score',
    'gamesWon' : '#computer-games-won',
  }
}

//deckofcards API DECKID
const DECKID = '';

//card area selectors
const COMPUTERCARDS = document.getElementById('computer-cards');
const PLAYERCARDS = document.getElementById('player-cards');

//scores selectors
const COMPUTERSCORE = document.getElementById('computer-score');
const PLAYERSCORE = document.getElementById('player-score');

//message area selectors
const MESSAGE = document.getElementById('message');

//audio
const HITSOUND = new Audio('audio/swish.mp3');

//button click selectors
const HIT = document.getElementById('hit');
const STAY = document.getElementById('stay');
const NEWGAME = document.getElementById('new-game');
const NEWCARDS = document.getElementById('new-hand');

//on click events
NEWGAME.onclick = getNewGame;
NEWCARDS.onclick - getNewCards;
HIT.onclick = ()=>hitMe('player');
STAY.onclick = ()=>setTimeout(()=>computerPlays(), 700);

/**
 * This function should setup a new game, call the API for a new deck and clear the old game 
 */
function getNewGame() {

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(response => {

    })
    .catch(console.error)
}

/**
 * This function should call a new hand from the API and remove the old hand 
 */
function getNewCards() {

  fetch(`https://deckofcardsapi.com/api/deck/${DECKID}/draw/?count=4`)
  .then(response => response.json())
  .then(response => {
  

  })
  .catch(console.error)
}

/**
 * This function should get a new card from the API when the hit button is clicked 
 */
function hitMe() {
  if (roundLost || roundWon || roundTied) {return}
  fetch(`https://deckofcardsapi.com/api/deck/${DECKID}/draw/?count=1`)
  .then(response => response.json())
  .then(response => {

  })
}

/**
 * This function should clear the old game and reset all variables to the default settings
 */
function resetCardGame() {

}

/**
 * This function controls when the computer plays
 */
function computerPlays() {

}

/**
 * This function calculates and matches the scores
 */
function calculateScore() {

}