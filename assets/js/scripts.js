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

// On click events
newGameNode.onclick = getNewDeck;
newHandNode.onclick = getNewGame;
hitNode.onclick = ()=>hit('player');
stayNode.onclick = ()=>setTimeout(()=>computerPlays(), 600);


// Game Functions

/**
 * Call the resetPlayingArea function and start new game 
 * This should clear the game settings and restart
 */
 function getNewGame() {
  resetPlayingArea();
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
  .then(response => response.json())
  .then(response => {
    hitNode.style.display = 'block';
    stayNode.style.display = 'block';

    computerCards.push(response.cards[0], response.cards[1])
    playerCards.push(response.cards[2], response.cards[3])

    computerScore = '?';
    computerScoreNode.textContent = computerScore;

    computerCards.forEach((card, i) => {
      let cardDomElement = document.createElement('img');
      if(i===0) {
        cardDomElement.src = './assets/images/card.png';
      } else {
        cardDomElement.src = card.image;
      }
      computerCardsNode.appendChild(cardDomElement)
    })

    playerCards.forEach(card => {
      let cardDomElement = document.createElement('img');
      cardDomElement.src = card.image;
      playerCardsNode.appendChild(cardDomElement)
    })

    playerScore = computeScore(playerCards);
    if (playerScore === 21) {
      roundWon = true;
      messageNode.textContent = 'BlackJack! You Win!';
      incrementPlayerGamesWon();
    }
    playerScoreNode.textContent = playerScore;

  })
  .catch(console.error)


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
  resetPlayingArea();
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  .then(response => response.json())
  .then(response => {
    deckID = response.deck_id;
    newHandNode.style.display = 'block';
    hitNode.style.display = 'none';
    stayNode.style.display = 'none';
  })
  .catch(console.error)


}

/**
 * Reset the game variables to their defaults
 */
function resetPlayingArea() {
  computerCards = [];
  playerCards = [];
  roundLost = false;
  roundWon = false;
  roundTied = false;
  gameOver = false;
  computerScore = '';
  playerScore = 0;
  playerGamesWon = '';
  computerGamesWon = '';
  computerScoreNode.textContent = computerScore;
  playerGamesWonNode.textContent = playerGamesWon;
  computerGamesWonNode.textContent = computerGamesWon;

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

