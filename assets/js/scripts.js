// Global object to avoid global variable drama
var cardApp = {};

// game variables 
cardApp.deckID = '';
cardApp.computerCards = [];
cardApp.playerCards = [];
cardApp.roundLost = false;
cardApp.roundWon = false;
cardApp.roundTied = false;
cardApp.gameOver = false;
cardApp.playerScore = 0;
cardApp.computerScore = 0;

// score nodes
cardApp.computerScoreNode = document.getElementById('computer-score');
cardApp.playerScoreNode = document.getElementById('player-score');

// card area nodes
cardApp.computerCardsNode = document.getElementById('computer-cards');
cardApp.playerCardsNode = document.getElementById('player-cards');

// other nodes
cardApp.messageNode = document.getElementById('message');
cardApp.newDeckNode = document.getElementById('new-game');
cardApp.nextHandNode = document.getElementById('next-hand');
cardApp.hitMeNode = document.getElementById('hit');
cardApp.stayNode = document.getElementById('stay');

// On click events
cardApp.newDeckNode.onclick = getNewDeck;
cardApp.nextHandNode.onclick = newHand;
cardApp.hitMeNode.onclick = () => hitMe('player');
cardApp.stayNode.onclick = () => setTimeout(() => computerPlays(), 700);

// Audio controller
class AudioController {
  constructor() {
      this.flipSound = new Audio('../assets/audio/flip.wav');
      this.matchSound = new Audio('../assets/audio/match.wav');
      this.winSound = new Audio('../assets/audio/win.wav');
      this.gameOverSound = new Audio('../assets/audio/gameOver.wav');
  }
  flip() {
      this.flipSound.play();
  }
  match() {
      this.matchSound.play();
  }
  victory() {
      this.winSound.play();
  }
  gameOver() {
      this.gameOverSound.play();
  }
}

/**
 * Check if the DOM content has loaded and then run getNewDeck
 */
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', getNewDeck);
} else {
  getNewDeck();
}

/**
 * This function resets the game area and makes a call to the deckofcards API 
 * Returns 6 shuffled decks to start the game with
 */
function getNewDeck() {
  resetGameArea();
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(response => {
      cardApp.deckID = response.deck_id;
      cardApp.nextHandNode.style.display = 'block';
      cardApp.hitMeNode.style.display = 'none';
      cardApp.stayNode.style.display = 'none';
    })
    .catch(console.error)
}
/**
 * This function resets the game area by setting all game variables to default settings
 * Clears the card area
 */
function resetGameArea() {
  cardApp.dealerCards = [];
  cardApp.playerCards = [];
  cardApp.roundLost = false;
  cardApp.roundWon = false;
  cardApp.roundTied = false;
  cardApp.gameOver = false;
  cardApp.computerScore = '';
  cardApp.playerScore = 0;
  cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.messageNode.textContent = '';
  while (cardApp.computerCardsNode.firstChild) {
    cardApp.computerCardsNode.removeChild(cardApp.computerCardsNode.firstChild);
  }
  while (cardApp.playerCardsNode.firstChild) {
    cardApp.playerCardsNode.removeChild(cardApp.playerCardsNode.firstChild);
  }
}


/**
 * This function resets the game area, makes an API call to the deckofcards API and returns 2 cards each
 */
function newHand() {
  resetGameArea();
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(response => {
      cardApp.hitMeNode.style.display = 'block';
      cardApp.stayNode.style.display = 'block';

      cardApp.computerCards.push(response.cards[0], response.cards[1])
      cardApp.playerCards.push(response.cards[2], response.cards[3])

      cardApp.computerScore = '?';
      cardApp.computerScoreNode.textContent = cardApp.computerScore;

      cardApp.computerCards.forEach((card, i) => {
        let cardDomElement = document.createElement('img');
        if (i === 0) {
          cardDomElement.src = '../assets/images/card.png';
        } else {
          cardDomElement.src = card.image;
        }
        cardApp.computerCardsNode.appendChild(cardDomElement)
      })

      cardApp.playerCards.forEach(card => {
        let cardDomElement = document.createElement('img');
        cardDomElement.src = card.image;
        cardApp.playerCardsNode.appendChild(cardDomElement)
      })

      cardApp.playerScore = calculateScore(cardApp.playerCards);
      if (cardApp.playerScore === 21) {
        cardApp.roundWon = true;
        cardApp.messageNode.textContent = 'BlackJack! You Win!';
      }
      cardApp.playerScoreNode.textContent = cardApp.playerScore;

    })
    .catch(console.error)
}

/**
 * This function adds a card to the players hand when the hit button is clicked
 * also checks if the round was won, lost or tied
 */
function hitMe(target) {
  if (cardApp.roundLost || cardApp.roundWon || cardApp.roundTied) {
    return
  }
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=1`)
    .then(response => response.json())
    .then(response => {

      // If player
      if (target === 'player') {
        cardApp.playerCards.push(response.cards[0])
        let cardDomElement = document.createElement('img');
        cardDomElement.src = response.cards[0].image;
        cardApp.playerCardsNode.appendChild(cardDomElement)

        cardApp.playerScore = calculateScore(cardApp.playerCards);

        cardApp.playerScoreNode.textContent = cardApp.playerScore;
        if (cardApp.playerScore > 21) {
          cardApp.roundLost = true;
          cardApp.message.Node.textContent = 'You Bust!'
        }
      }

      // If computer
      if (target === 'computer') {
        let cardDomElement = document.createElement('img');
        cardApp.computerCards.push(response.cards[0])
        cardDomElement.src = response.cards[0].image;
        computerCardsNode.appendChild(cardDomElement)
        computerPlays();
      }

    })
    .catch(console.log)
}

function calculateScore() {

}

function gameOver() {
  this.audioController.gameOver();
  document.getElementById('game-over-text').classList.add('visible');
}