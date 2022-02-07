import {LEVEL, OBJECT_TYPE} from "./setup.mjs";
import {plumber} from "./Mario.mjs";
// Classes
import GameBoard from "./GameBoard.mjs";
import {animate} from "./Mario.mjs";
import Donkey from "./donkey.mjs";


// game const
const startGameBtn = document.querySelector("#start-button")
const gameGrid = document.querySelector("#game")
let donkey


function startGame() {
    startGameBtn.classList.add('hide')
    GameBoard.createGameBoard(gameGrid, LEVEL)


    let mario = document.createElement("div")
    mario.id = "mario"
    let startMario = document.querySelector('.marioStart')
    startMario.appendChild(mario)

    Donkey.create()
    donkey = new Donkey()


    window.requestAnimationFrame(playGame)
}

function playGame() {
    animate()
    donkey.angryAnimate()
    donkey.prepare()

    window.requestAnimationFrame(playGame)
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
