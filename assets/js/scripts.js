// to avoid global variable drama
var cardApp = {};

// deckofcards API deckID
cardApp.deckID = '';

// initial game state

cardApp.computerCards = [];
cardApp.playerCards = [];
cardApp.roundLost = false;
cardApp.roundWon = false;
cardApp.roundTied = false;
cardApp.playerScore = 0;
cardApp.dealerScore = 0;

//players 
cardApp.player = 'player';
cardApp.computer = 'computer';

//card area selectors
cardApp.computerCards = document.getElementById('computer-cards');
cardApp.playerCards = document.getElementById('player-cards');

//scores selectors
cardApp.computerScore = document.getElementById('computer-score');
cardApp.playerScore = document.getElementById('player-score');

//message area selectors
cardApp.message = document.getElementById('message');

//audio
// cardApp.hitSound = new Audio('audio/swish.mp3');
// cardApp.winSound = new Audio('audio/cash.mp3');
// cardApp.lostSound = new Audio('audio/aww.mp3');

//button event listeners
// document.getElementById('hit').addEventListener('click', hitMe);
// document.getElementById('new-game').addEventListener('click', getNewGame);


//button click selectors
cardApp.hit = document.getElementById('hit');
cardApp.stay = document.getElementById('stay');
cardApp.newGame = document.getElementById('new-game');
cardApp.newHand = document.getElementById('new-hand');

// //on click events
cardApp.newGame.onclick = getNewGame;
cardApp.newHand.onclick - getNewCards;
cardApp.hit.onclick = () => hitMe('player');
cardApp.stay = () => setTimeout(() => computerPlays(), 700);

/**
 * This function should setup a new game, call the API for a new deck and clear the old game 
 */
function getNewGame() {
  resetCardGame();

  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(response => {
      cardApp.deckID = response.deck_id;


    })
    .catch(console.error)
  console.log('clicked new game');
}

/**
 * This function should call a new hand from the API and remove the old hand 
 */
function getNewCards() {

  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(response => {


    })
    .catch(console.error)
}

/**
 * This function should get a new card from the API when the hit button is clicked 
 */
function hitMe(target) {
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=1`)
    .then(response => response.json())
    .then(response => {
      // If player
      if (target === 'player') {
        cardApp.playerCards.push(response.cards[0])
        let cardDomElement = document.createElement("img");
        cardDomElement.src = response.cards[0].image;
        cardApp.playerCards.appendChild(cardDomElement)

        // playerScore = computeScore(playerCards);

        cardApp.playerScore.textContent = playerScore;
        if (playerScore > 21) {
          roundLost = true;
          cardApp.message.textContent = "You broke. You Lose Your Soul!";
        }

      }

      // If dealer
      if (target === 'computer') {
        let cardDomElement = document.createElement("img");
        cardApp.computerCards.push(res.cards[0])
        cardDomElement.src = response.cards[0].image;
        cardApp.computerCards.appendChild(cardDomElement);
        // dealerPlays();
      }

    })
}

/**
 * This function should clear the old game and reset all variables to the default settings
 */
function resetCardGame() {
  cardApp.computerCards = [];
  cardApp.playerCards = [];
  cardApp.roundLost = false;
  cardApp.roundWon = false;
  cardApp.roundTied = false;

  cardApp.computerScore = '';
  cardApp.playerScore = 0;
  cardApp.computerScore.textContent = cardApp.computerScore;

  cardApp.message.textContent = "";

  while (cardApp.computerCards.firstChild) {
    cardApp.computerCards.removeChild(cardApp.computerCards.firstChild);
  }
  while (cardApp.playerCards.firstChild) {
    cardApp.playerCards.removeChild(cardApp.playerCards.firstChild);
  }

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