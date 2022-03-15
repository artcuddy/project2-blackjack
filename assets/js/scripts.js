/*jshint esversion: 6 */
// Global object to avoid global variable issues
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
cardApp.score = 0;

// score nodes
cardApp.computerScoreNode = document.getElementById('computer-score');
cardApp.playerScoreNode = document.getElementById('player-score');
cardApp.playerGamesWonNode = document.getElementById('player-games-won');
cardApp.computerGamesWonNode = document.getElementById('computer-games-won');

// card area nodes
cardApp.computerCardsNode = document.getElementById('computer-cards');
cardApp.playerCardsNode = document.getElementById('player-cards');

// other needed nodes
cardApp.messageNode = document.getElementById('message');
cardApp.newGameNode = document.getElementById('new-game');
cardApp.nextHandNode = document.getElementById('next-hand');
cardApp.hitMeNode = document.getElementById('hit');
cardApp.stayNode = document.getElementById('stay');
cardApp.gameOverRestart = document.getElementsByClassName('overlay-text');
cardApp.instructionsNode = document.getElementById('instructions-button');
cardApp.cardValuesNode = document.getElementById('rules-button');
cardApp.cancelButton = document.getElementById('cancel-button');
cardApp.confirmButton = document.getElementById('confirm-button');
cardApp.instructionsGoodLuckButton = document.getElementById('instructions-good-luck-button');
cardApp.cardValueGoodLuckButton = document.getElementById('card-value-good-luck-button');

// Audio
cardApp.hitSound = new Audio('assets/audio/hit.wav');
cardApp.newHandSound = new Audio('assets/audio/newhand.wav');
cardApp.winSound = new Audio('assets/audio/win.wav');
cardApp.gameOverSound = new Audio('assets/audio/gameover.wav');
cardApp.newGameSound = new Audio('assets/audio/new-game.wav');
cardApp.staySound = new Audio('assets/audio/stay.wav');
cardApp.tieSound = new Audio('assets/audio/tie.wav');
cardApp.youLoseSound = new Audio('assets/audio/you_lose.wav');
cardApp.youWinSound = new Audio('assets/audio/you_win.wav');


// Click event listeners
cardApp.nextHandNode.addEventListener('click', newHand);
cardApp.gameOverRestart.onclick = () => resetGameArea();

//listens for click on new game button plays new game sound and calls getNewGame function. Then alerts with popup to confrim reset
cardApp.newGameNode.addEventListener('click', function () {
  cardApp.newGameSound.play();
  document.getElementById('reset-game-modal').classList.add('visible');
});

//listens for click on cancel button 
cardApp.cancelButton.addEventListener('click', function () {
  document.getElementById('reset-game-modal').classList.remove('visible');
});

//listens for click on confirm button 
cardApp.confirmButton.addEventListener('click', function () {
  document.getElementById('reset-game-modal').classList.remove('visible');
  cardApp.newGameSound.play();
  getNewGame();
});

//listens for click on instructions button 
cardApp.instructionsNode.addEventListener('click', function () {
  document.getElementById('instructions-modal').classList.add('visible');
  cardApp.newGameSound.play();
});

//listens for click on Good luck button  button 
cardApp.instructionsGoodLuckButton.addEventListener('click', function () {
  document.getElementById('instructions-modal').classList.remove('visible');
});

//listens for click on Card Values button and displays the card value info
cardApp.cardValuesNode.addEventListener('click', function () {
  document.getElementById('card-values-modal').classList.add('visible');
  cardApp.newGameSound.play();
});

//listens for click on Good luck button  button 
cardApp.cardValueGoodLuckButton.addEventListener('click', function () {
  document.getElementById('card-values-modal').classList.remove('visible');
});

//listens for click on hit button plays hit sound and calls hitMe function
cardApp.hitMeNode.addEventListener('click', function () {
  cardApp.hitSound.play();
  hitMe('player');

});

//listens for click on stay button plays stay sound sets a delay for the demon and hides hit button
cardApp.stayNode.addEventListener('click', function () {
  cardApp.staySound.play();
  cardApp.hitMeNode.style.display = 'none';
  setTimeout(function () {
    computerPlays();
  }, 600);
});

/**
 * This function resets the game area and makes a call to the deckofcards API 
 * Returns 6 shuffled decks to start the game with
 */
function getNewGame() {
  resetGameArea();
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
    .then(response => response.json())
    .then(response => {
      cardApp.deckID = response.deck_id;
      cardApp.nextHandNode.style.display = 'block';
      hidePlayButtons();
    })
    .catch(console.error);
}

/**
 * This function resets the game area by setting all game variables to the default settings
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
  cardApp.playerGamesWonNode.textContent = cardApp.playerGamesWon;
  cardApp.computerGamesWonNode.textContent = cardApp.computerGamesWon;
  cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.playerScoreNode.textContent = cardApp.playerScore;
  cardApp.messageNode.textContent = '';
  while (cardApp.computerCardsNode.firstChild) {
    cardApp.computerCardsNode.removeChild(cardApp.computerCardsNode.firstChild);
  }
  while (cardApp.playerCardsNode.firstChild) {
    cardApp.playerCardsNode.removeChild(cardApp.playerCardsNode.firstChild);
  }
  // Listens for click on the Game Over screen plays new game sound and resets the game
  let overlays = Array.from(document.getElementsByClassName('overlay-text'));
  overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      resetGameArea();
      cardApp.newGameSound.play();
    });
  });
}

/**
 * This function resets the game area by setting all game variables to default settings
 * Clears the card area but not the games won counters
 */
function newHandReset() {
  cardApp.computerCards = [];
  cardApp.playerCards = [];
  cardApp.roundLost = false;
  cardApp.roundWon = false;
  cardApp.roundTied = false;
  cardApp.gameOver = false;
  cardApp.computerScore = '';
  cardApp.playerScore = 0;
  cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.playerScoreNode.textContent = cardApp.playerScore;
  cardApp.messageNode.textContent = '';
  while (cardApp.computerCardsNode.firstChild) {
    cardApp.computerCardsNode.removeChild(cardApp.computerCardsNode.firstChild);
  }
  while (cardApp.playerCardsNode.firstChild) {
    cardApp.playerCardsNode.removeChild(cardApp.playerCardsNode.firstChild);
  }
}

/**
 * This function resets the game area, makes an API call to the deckofcards API and returns 2 cards for the player and 2 for the demon
 */
function newHand() {
  newHandReset();
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(response => {

      cardApp.newHandSound.play();
      //display the hit and stay buttons
      showPlayButtons();

      //output cards
      cardApp.computerCards.push(response.cards[0], response.cards[1]);
      cardApp.playerCards.push(response.cards[2], response.cards[3]);

      cardApp.computerScore = '?';
      cardApp.computerScoreNode.textContent = cardApp.computerScore;
      //show cards but hide the first computer card
      cardApp.computerCards.forEach((card, i) => {
        let cardDomElement = document.createElement('img');
        if (i === 0) {
          cardDomElement.src = 'assets/images/card.png';
        } else {
          cardDomElement.src = card.image;
        }
        cardApp.computerCardsNode.appendChild(cardDomElement);
      });

      cardApp.playerCards.forEach(card => {
        let cardDomElement = document.createElement('img');
        cardDomElement.src = card.image;
        cardApp.playerCardsNode.appendChild(cardDomElement);
      });
      // you got black jack you win and the hit and stay buttons are removed and win sound played
      cardApp.playerScore = calculateScore(cardApp.playerCards);
      if (cardApp.playerScore === 21) {
        cardApp.roundWon = true;
        cardApp.messageNode.textContent = 'BlackJack! You Win!';
        cardApp.winSound.play();
        incrementPlayerGamesWon();
        hidePlayButtons();
      }
      cardApp.playerScoreNode.textContent = cardApp.playerScore;

    })
};


/**
 * This function hides the hit and stay buttons
 */
function hidePlayButtons() {

  cardApp.hitMeNode.style.display = 'none';
  cardApp.stayNode.style.display = 'none';

};

/**
 * This function shows the hit and stay buttons
 */
function showPlayButtons() {

  cardApp.hitMeNode.style.display = 'block';
  cardApp.stayNode.style.display = 'block';

};

/**
 * This function adds a card to the players hand when the hit button is clicked
 * also checks if the round was won, lost, tied or game over 
 */
function hitMe(target) {

  if (cardApp.roundLost || cardApp.roundWon || cardApp.roundTied || cardApp.gameOver) {
    return;
  }
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=1`)
    .then(response => response.json())
    .then(response => {

      // If player is playing
      if (target === 'player') {
        cardApp.playerCards.push(response.cards[0]);
        let cardDomElement = document.createElement('img');
        cardDomElement.src = response.cards[0].image;
        cardApp.playerCardsNode.appendChild(cardDomElement);

        cardApp.playerScore = calculateScore(cardApp.playerCards);

        cardApp.playerScoreNode.textContent = cardApp.playerScore;
        //you bust roundlost play game over sound and update computer games won
        if (cardApp.playerScore > 21) {
          cardApp.roundLost = true;
          cardApp.messageNode.textContent = 'You Bust!';
          hidePlayButtons();
          cardApp.gameOverSound.play();
          incrementComputerGamesWon();
          gameOver();
        }

      }

      // If computer is playing
      if (target === 'computer') {
        let cardDomElement = document.createElement('img');
        cardApp.computerCards.push(response.cards[0]);
        cardDomElement.src = response.cards[0].image;
        cardApp.computerCardsNode.appendChild(cardDomElement);
        computerPlays();
        gameOver();
      }

    })
    .catch(console.log);
}

/**
 * This function adds a card to the computers hand until one of the conditions is met
 * also checks if the round was won, lost, tied or game over 
 */
function computerPlays() {
  if (cardApp.roundLost || cardApp.roundWon || cardApp.roundTied || cardApp.gameOver) {
    return;
  }
  cardApp.computerScore = calculateScore(cardApp.computerCards);
  cardApp.computerScoreNode.textContent = cardApp.computerScore;
  cardApp.computerCardsNode.firstChild.src = cardApp.computerCards[0].image;
  cardApp.hitSound.play();
  cardApp.stayNode.style.display = 'none';

  if (cardApp.computerScore < 17) {
    setTimeout(() => hitMe('computer'), 900);
  } else if (cardApp.computerScore > 21) {
    //computer bust you won the round play win sound and update player games won
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'Demon bust!';
    cardApp.winSound.play();
    hidePlayButtons();
    incrementPlayerGamesWon();
    gameOver();
  } else if (cardApp.computerScore > cardApp.playerScore) {
    //you lost the round play game over sound and update computer games won
    cardApp.roundLost = true;
    cardApp.messageNode.textContent = 'You Lost!';
    cardApp.gameOverSound.play();
    hidePlayButtons();
    incrementComputerGamesWon();
    gameOver();
  } else if (cardApp.computerScore === cardApp.playerScore) {
    //you tied the round play tie sound and hide hit button
    cardApp.roundTied = true;
    cardApp.messageNode.textContent = "It's a Tie";
    cardApp.tieSound.play();
    hidePlayButtons();
    gameOver();
  } else {
    //you won the round play win sound and update players games won
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'You Won!';
    cardApp.winSound.play();
    hidePlayButtons();
    incrementPlayerGamesWon();
    gameOver();
  }

}

/**
 * This function is to calculate the card score and return the score of the played cards
 */
function calculateScore(playerCards) {
  let hasAce = false;
  cardApp.score = playerCards.reduce((acc, card) => {
    if (card.value === "ACE") {
      hasAce = true;
      return acc + 1;
    }
    if (isNaN(card.value)) {
      return acc + 10;
    }
    return acc + Number(card.value);
  }, 0);
  if (hasAce) {
    cardApp.score = (cardApp.score + 10) > 21 ? cardApp.score : cardApp.score + 10;
  }
  return cardApp.score;
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
 * This function is called when the game is over, 
 * player has lost 5 games or computer has lost 5 games
 */
function gameOver() {
  if (cardApp.computerGamesWonNode.innerText === '5') {
    cardApp.gameOver = true;
    cardApp.youLoseSound.play();
    document.getElementById('game-over-text').classList.add('visible');
    newHandReset();
  } else if (cardApp.playerGamesWonNode.innerText === '5') {
    cardApp.gameOver = true;
    cardApp.youWinSound.play();
    document.getElementById('win-text').classList.add('visible');
    newHandReset();
  }
}

/**
 * Check if the window has loaded and then run getNewGame
 */
window.onload = getNewGame();