let blackJackGame = {
  'player': {
    'playerScore': '#player-score',
    'playerCards': '#player-cards',
    'playerGamesWon': '#player-games-won',
  },
  'computer': {
    'computerScore': '#computer-score',
    'computerCards': '#computer-cards',
    'computerGamesWon': '#computer-games-won',
  },
  'wins': 0,
  'losses': 0,
  'isStand': false,
  'isEndOfTurn': false,
  'pressOnce': false,
}

//deckofcards API DECKID
const DECKID = '';

//players 
const PLAYER = blackJackGame['player'];
const COMPUTER = blackJackGame['computer'];

//card area selectors
// const COMPUTERCARDS = document.getElementById('computer-cards');
// const PLAYERCARDS = document.getElementById('player-cards');

//scores selectors
// const COMPUTERSCORE = document.getElementById('computer-score');
// const PLAYERSCORE = document.getElementById('player-score');

//message area selectors
const MESSAGE = document.getElementById('message');

//audio
const HITSOUND = new Audio('audio/swish.mp3');
const WINSOUND = new Audio('audio/cash.mp3');
const LOSESOUND = new Audio('audio/aww.mp3');

//button event listeners
document.getElementById('hit').addEventListener('click', hitMe);
document.getElementById('new-game').addEventListener('click', getNewGame);


//button click selectors
// const HIT = document.getElementById('hit');
// const STAY = document.getElementById('stay');
// const NEWGAME = document.getElementById('new-game');
// const NEWCARDS = document.getElementById('new-hand');

// //on click events
// NEWGAME.onclick = getNewGame;
// NEWCARDS.onclick - getNewCards;
// HIT.onclick = ()=>hitMe('player');
// STAY.onclick = ()=>setTimeout(()=>computerPlays(), 700);

/**
 * This function should setup a new game, call the API for a new deck and clear the old game 
 */
function getNewGame() {

  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(response => {
      DECKID.response = response.deck_id;
    // blackJackGame[''].style.display = "block";
    // hitMeNode.style.display = "none";
    // stayNode.style.display = "none";

    })
    .catch(console.error)
    console.log('clicked new game');
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
  if (blackJackGame['isStand'] === false) {
    fetch(`https://deckofcardsapi.com/api/deck/${DECKID}/draw/?count=1`)
      .then(response => response.json())
      .then(response => {
        if (PLAYER === 'player') {
          blackJackGame['playerCards'].push(response.cards[0])
          let cardDomElement = document.createElement("img");
          cardDomElement.src = response.cards[0].image;
          blackJackGame['playerCards'].appendChild(cardDomElement)

          // playerScore = computeScore(playerCards);

          blackJackGame['playerScore'].textContent = playerScore;
          if (playerScore > 21) {
            roundLost = true;
            MESSAGE.textContent = "You broke. You Lose Your Soul!"
          }

        }

      })
  }
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