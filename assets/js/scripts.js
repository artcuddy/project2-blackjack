// Global object to avoid global variable issues
var cardApp = {};
var Swal;

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

// Audio
cardApp.hitSound = new Audio('../assets/audio/hit.ogg');
cardApp.newHandSound = new Audio('../assets/audio/newhand.ogg');
cardApp.winSound = new Audio('../assets/audio/win.wav');
cardApp.gameOverSound = new Audio('../assets/audio/gameover.wav');
cardApp.newGameSound = new Audio('../assets/audio/new-game.ogg');
cardApp.staySound = new Audio('../assets/audio/stay.wav');
cardApp.tieSound = new Audio('../assets/audio/tie.ogg');
cardApp.youLoseSound = new Audio('../assets/audio/you_lose.ogg');
cardApp.youWinSound = new Audio('../assets/audio/you_win.ogg');

// Click event listeners
cardApp.nextHandNode.addEventListener('click', newHand);
cardApp.gameOverRestart.onclick = () => resetGameArea();

//listens for click on new game button plays new game sound and calls getNewGame function. Then alerts wwith popup ito confrim reset
cardApp.newGameNode.addEventListener('click', function () {
  cardApp.newGameSound.play();
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(238, 2, 2)',
    cancelButtonColor: 'green',
    confirmButtonText: 'Yes, Reset Game!'
  }).then((result) => {
    if (result.isConfirmed) {

      getNewGame();

    }
  });
});

//listens for click on Instructions button and displays the info
cardApp.instructionsNode.addEventListener('click', function () {
  cardApp.newGameSound.play();
  Swal.fire({
    title: '<strong>How To Play</strong>',
    icon: 'info',
    html: "Hi Player,<br> Can you beat The Demon.<br>" +
      "<br>The goal of this game is to get as many points as possible but without going over 21 points, because then you will automatically lose the hand!<br>" +
      "<br>Press the 'NEW HAND' button to start a new round:<br>" +
      "<br>Then based on your cards score either click the 'HIT' button or 'STAY' button <br>" +
      "<br>The 'HIT' button turns over a new card to your hand<br>" +
      "<br>The 'STAY' button stops play for you and lets the Demon play<br>" +
      "<br>Then it will be my turn to beat your score!<br>" +
      "<br>The first one to win 5 rounds will be the final winner.<br>",

    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> GOOD LUCK!',
    confirmButtonAriaLabel: 'Thumbs up, good luck!',
  });
});

//listens for click on Card Values button and displays the info
cardApp.cardValuesNode.addEventListener('click', function () {
  cardApp.newGameSound.play();
  Swal.fire({
    title: '<strong>Card Values</strong>',
    icon: 'info',
    html: "These are the card values:<br>" +
      "<br>Ace (A): 11 points or 1 point if you go over 21.<br>" +
      "<br>Court cards (J, Q and K): 10 points.<br>" +
      "<br>Rest of the deck: card points.<br>" +
      "<br>The card suit (♠️, ♥️, ♣️, ♦️) has no influence in the outcome.<br>",

    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> GOOD LUCK!',
    confirmButtonAriaLabel: 'Thumbs up, good luck!',
  });
});

//listens for click on hit button plays hit sound and calls hitMe function
cardApp.hitMeNode.addEventListener('click', function () {
  cardApp.hitSound.play();
  hitMe('player');

});
//listens for click on stay button plays stay sound sets a delay for the computer and hides hit button
cardApp.stayNode.addEventListener('click', function () {
  cardApp.staySound.play();
  cardApp.hitMeNode.style.display = 'none';
  setTimeout(function () {
    computerPlays();
  }, 600);
});

/**
 * Check if the DOM content has loaded and then run getNewGame
 */
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', getNewGame);
} else {
  getNewGame();
}

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
      cardApp.hitMeNode.style.display = 'none';
      cardApp.stayNode.style.display = 'none';
    })
    .catch(console.error);
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
 * This function resets the game area, makes an API call to the deckofcards API and returns 2 cards for the player and 2 for the computer
 */
function newHand() {
  newHandReset();
  fetch(`https://deckofcardsapi.com/api/deck/${cardApp.deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(response => {

      cardApp.newHandSound.play();
      //display the hit and stay buttons
      cardApp.hitMeNode.style.display = 'block';
      cardApp.stayNode.style.display = 'block';
      //output cards
      cardApp.computerCards.push(response.cards[0], response.cards[1]);
      cardApp.playerCards.push(response.cards[2], response.cards[3]);

      cardApp.computerScore = '?';
      cardApp.computerScoreNode.textContent = cardApp.computerScore;
      //show cards but hide the first computer card
      cardApp.computerCards.forEach((card, i) => {
        let cardDomElement = document.createElement('img');
        if (i === 0) {
          cardDomElement.src = '../assets/images/card.png';
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
      // you got black jack you win and the hit and stay buttons are removed
      cardApp.playerScore = calculateScore(cardApp.playerCards);
      if (cardApp.playerScore === 21) {
        cardApp.roundWon = true;
        cardApp.messageNode.textContent = 'BlackJack! You Win!';
        cardApp.winSound.play();
        incrementPlayerGamesWon();
        cardApp.hitMeNode.style.display = 'none';
        cardApp.stayNode.style.display = 'none';
      }
      cardApp.playerScoreNode.textContent = cardApp.playerScore;

    })
    .catch(console.error);
}

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
 * This function adds a card to the copmuters hand until one of the conditions is met
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

  if (cardApp.computerScore < 17) {
    setTimeout(() => hitMe('computer'), 900);
  } else if (cardApp.computerScore > 21) {
    //computer bust roundwon play win sound and update player games won
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'Demon bust!';
    cardApp.winSound.play();
    incrementPlayerGamesWon();
    gameOver();
  } else if (cardApp.computerScore > cardApp.playerScore) {
    //you lost roundlost play game over sound and update computer games won
    cardApp.roundLost = true;
    cardApp.messageNode.textContent = 'You Lost!';
    cardApp.gameOverSound.play();
    cardApp.stayNode.style.display = 'none';
    incrementComputerGamesWon();
    gameOver();
  } else if (cardApp.computerScore === cardApp.playerScore) {
    //you tied roundtied play tie sound and hide hit button
    cardApp.roundTied = true;
    cardApp.messageNode.textContent = "It's a Tie";
    cardApp.tieSound.play();
    cardApp.hitMeNode.style.display = 'none';
    gameOver();
  } else {
    //you won roundtied play win sound and update players games won
    cardApp.roundWon = true;
    cardApp.messageNode.textContent = 'You Won!';
    cardApp.winSound.play();
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