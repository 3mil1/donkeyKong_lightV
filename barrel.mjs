import {bump, plumber} from "./Mario.mjs";
import gamePause from "./gamePause.mjs";
import {pauseGame} from "./index.mjs";

class Barrel {
    constructor() {
        this.game = document.getElementById('game')
        const donkey = document.getElementById('donkey');
        this.barrel = document.createElement('div');
        this.barrel.classList.add('barrel', 'vertical');
        this.barrel.style.top = donkey.offsetTop + 19 + 'px';
        this.barrel.style.left = donkey.offsetLeft + 13 + 'px';
        this.game.appendChild(this.barrel);
        this.moves = ['move1', 'move2'];
        // this.brakeMoves = ['one', 'two', 'three', 'four', 'five']
    }

    moving() {
        let i = 0;
        let gR = this.game.getBoundingClientRect();
        let x = Math.floor(Math.random() * gR.width + 15) / 20;
        x = x * (Math.round(Math.random()) * 2 - 1);
        let iId = setInterval(() => {
            let wCurrent = this.barrel.offsetLeft;
            let hCurrent = this.barrel.offsetTop;
            wCurrent += x;
            hCurrent += 5;
            if (!pauseGame.paused) {
                this.barrel.style.top = hCurrent + 'px';
                this.barrel.style.left = wCurrent + 'px';

                this.barrel.classList.remove(...this.moves);
                this.barrel.classList.add(this.moves[i % this.moves.length]);
            }
            i++;

            if (this.barrel.offsetLeft < 0 || this.barrel.offsetLeft + 15 > gR.width || this.barrel.offsetTop + 15 > gR.bottom) {
                clearInterval(iId);
                this.barrel.remove();
            }

        }, 100);
        this.barrel.dataset.intervalID = iId + '';

    }
}

export default Barrel;