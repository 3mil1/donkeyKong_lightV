import {LEVEL, OBJECT_TYPE} from "./setup.mjs";
import {plumber} from "./Mario.mjs";
// Classes
import GameBoard from "./GameBoard.mjs";
import {animate} from "./Mario.mjs";
import Donkey from "./donkey.mjs";
import Barrel from "./barrel.mjs";


// game const
const startGameBtn = document.querySelector("#start-button")
const gameGrid = document.querySelector("#game")
let donkey


function startGame() {
    startGameBtn.classList.add('hide')
    GameBoard.createGameBoard(gameGrid, LEVEL)


    let mario = document.createElement("div")
    mario.id = "mario"
    mario.classList.add('right');
    let startMario = document.querySelector('.marioStart')
    startMario.appendChild(mario)

    Donkey.create()
    donkey = new Donkey()

    window.requestAnimationFrame(playGame)
}

let lastIntervalTimestamp = 0;

function playGame(now) {
    window.requestAnimationFrame(playGame)

    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 20 * 1000) {
        lastIntervalTimestamp = now;
        if (!donkey.angry) donkey.attackD()
    }
    animate()

    if (!donkey.takeBarrel) donkey.angryAnimate()
}

export function gameOver() {
    if (plumber.onFloor === -1) {
        let div = document.getElementById('game')
        div.innerHTML = ''
        alert("Game over")
        startGameBtn.classList.remove('hide')
    }
}


// events
startGameBtn.addEventListener('click', startGame)
