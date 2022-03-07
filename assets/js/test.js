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