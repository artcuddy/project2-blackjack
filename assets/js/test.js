class AudioController {
    constructor() {
        this.hitSound = new Audio('../assets/audio/hit.wav');
        this.newHandSound = new Audio('../assets/audio/newHand.wav');
        this.winSound = new Audio('../assets/audio/win.wav');
        this.gameOverSound = new Audio('../assets/audio/gameOver.wav');
    }
    hit() {
        this.hitSound.play();
    }
    newHand() {
        this.newHandSound.play();
    }
    win() {
        this.winSound.play();
    }
    gameOver() {
        this.gameOverSound.play();
    }
}

class blackJack {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining')
        this.ticker = document.getElementById('flips');
        this.audioController = new AudioController();
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerText = this.totalClicks;
    }
    gameOver() {
        this.audioController.gameOver();
        document.getElementById('game-over-text').classList.add('visible');
    }
    win() {
        this.audioController.win();
        document.getElementById('win-text').classList.add('visible');
    }
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}