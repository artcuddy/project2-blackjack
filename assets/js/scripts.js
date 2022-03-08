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
cardApp.playerGamesWonNode = document.getElementById('player-games-won');
cardApp.computerGamesWonNode = document.getElementById('computer-games-won');

// card area nodes
cardApp.computerCardsNode = document.getElementById('computer-cards');
cardApp.playerCardsNode = document.getElementById('player-cards');

// other nodes
cardApp.messageNode = document.getElementById('message');
cardApp.newDeckNode = document.getElementById('new-game');
cardApp.nextHandNode = document.getElementById('next-hand');
cardApp.hitMeNode = document.getElementById('hit');
cardApp.stayNode = document.getElementById('stay');
cardApp.gameOverRestart = document.getElementsByClassName('overlay-text');

// On click events
cardApp.newDeckNode.onclick = getNewDeck;
cardApp.nextHandNode.onclick = newHand;
cardApp.hitMeNode.onclick = () => hitMe('player') || cardApp.hitSound.play();
cardApp.stayNode.onclick = () => setTimeout(() => computerPlays(), 500);
cardApp.gameOverRestart.onclick = resetGameArea;

// Audio
cardApp.hitSound = new Audio('../assets/audio/hit.wav');
cardApp.newHandSound = new Audio('../assets/audio/newhand.wav');
cardApp.winSound = new Audio('../assets/audio/win.wav');
cardApp.gameOverSound = new Audio('../assets/audio/gameover.wav');


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
  cardApp.computerCards = [];
  cardApp.playerCards = [];
  cardApp.roundLost = false;
  cardApp.roundWon = false;
  cardApp.roundTied = false;
  cardApp.gameOver = false;
  cardApp.computerScore = '';
  cardApp.playerScore = 0;
  cardApp.playerGamesWon = 0;
  cardApp.computerGamesWon = 0;
  // cardApp.playerGamesWonNode.textContent = cardApp.playerGamesWon;
  // cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.messageNode.textContent = '';
  while (cardApp.computerCardsNode.firstChild) {
    cardApp.computerCardsNode.removeChild(cardApp.computerCardsNode.firstChild);
  }
  while (cardApp.playerCardsNode.firstChild) {
    cardApp.playerCardsNode.removeChild(cardApp.playerCardsNode.firstChild);
  }
}


/**
 * This function resets the game area, makes an API call to the deckofcards API and returns 2 cards for the player and 2 for the computer
 */
function newHand() {
  resetGameArea();
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(response => {

      cardApp.newHandSound.play();

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
        cardApp.winSound.play();
        incrementplayerGamesWon();
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
          cardApp.messageNode.textContent = 'You Bust!'
          cardApp.gameOverSound.play();
          incrementComputerGamesWon();
        }

      }

      // If computer
      if (target === 'computer') {
        let cardDomElement = document.createElement('img');
        cardApp.computerCards.push(response.cards[0])
        cardDomElement.src = response.cards[0].image;
        cardApp.computerCardsNode.appendChild(cardDomElement)
        computerPlays();
      }

    })
    .catch(console.log)
}

function computerPlays() {

  if (cardApp.roundLost || cardApp.roundWon || cardApp.roundTied) {
    return
  }
  cardApp.computerScore = calculateScore(cardApp.computerCards);
  cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.computerCardsNode.firstChild.src = cardApp.computerCards[0].image;

  if (cardApp.computerScore < 17) {
    setTimeout(() => hitMe('computer'), 900)
  } else if (cardApp.computerScore > 21) {
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'House bust. You Won the hand!';
    cardApp.gameOverSound.play();
    incrementPlayerGamesWon();
  } else if (cardApp.computerScore > cardApp.playerScore) {
    cardApp.roundLost = true;
    cardApp.messageNode.textContent = 'You Lost the hand';
    cardApp.gameOverSound.play();
    incrementComputerGamesWon();
  } else if (cardApp.computerScore === cardApp.playerScore) {
    cardApp.roundTied = true;
    cardApp.messageNode.textContent = "It's a Tie, you don't lose your soul yet";
  } else {
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'You Won the hand!';
    cardApp.winSound.play();
    incrementComputerGamesWon();
  }

}

/**
 * This function is to calculate the card score and return the score
 */
 function calculateScore(playerCards) {
  let hasAce = false;
  score = playerCards.reduce((acc, card) => {
    if (card.value === "ACE") {
      hasAce = true;
      return acc + 1
    }
    if (isNaN(card.value)) {
      return acc + 10
    }
    return acc + Number(card.value);
  }, 0)
  if (hasAce) {
    score = (score + 10) > 21 ? score : score + 10;
  }
  return score
}

/**
 * Gets the current tally of player scores from the DOM and increments it by 1
 */
function incrementPlayerGamesWon() {

  let oldPlayerScore = parseInt(document.getElementById('player-games-won').innerText);
  cardApp.playerGamesWonNode.innerText = ++oldPlayerScore;
}

/**
 * Gets the current tally of computer scores from the DOM and increments it by 1
 */
function incrementComputerGamesWon() {

  let oldComputerScore = parseInt(document.getElementById('computer-games-won').innerText);
  cardApp.computerGamesWonNode.innerText = ++oldComputerScore;
}

/**
 * This function is called when the game is over, player has lost 5 games
 */
 function gameOver(){
  if (cardApp.computerScore === 2) {
    cardApp.gameOver = true;
    // cardApp.gameOverSound.play();
    document.getElementById('game-over-text').classList.add('visible');

  } else if (cardApp.playerScore === 2) {
    cardApp.gameOver = true;
    // cardApp.gameOverSound.play();
    document.getElementById('win-text').classList.add('visible');
  }
}

