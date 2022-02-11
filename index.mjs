import {FLOORS, LEVEL, OBJECT_TYPE} from "./setup.mjs";
import {plumber} from "./Mario.mjs";
// Classes
import GameBoard from "./GameBoard.mjs";
import {animate} from "./Mario.mjs";
import Donkey from "./donkey.mjs";
import Barrel from "./barrel.mjs";
import Princess from "./princess.mjs";


// game const
const startGameBtn = document.querySelector("#start-button")
const gameGrid = document.querySelector("#game")
let gameStatus = document.querySelector('.game-status');
let donkey
let princess


function startGame() {
    startGameBtn.classList.add('hide')
    gameStatus.style.display = "block";
    GameBoard.createGameBoard(gameGrid, LEVEL)
    startTimer(0,0);

    let mario = document.createElement("div")
    mario.id = "mario"
    mario.classList.add('right');
    let startMario = document.querySelector('.marioStart')
    startMario.appendChild(mario)

    Donkey.create()
    donkey = new Donkey()

    princess = new Princess()
    window.requestAnimationFrame(playGame)
}

let lastIntervalTimestamp = 0;

function playGame(now) {
    window.requestAnimationFrame(playGame)


    // не ставить меньше 5 т.к. прошлая анимация у конга не успевает завершиться
    if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 5 * 1000) {
        lastIntervalTimestamp = now;
        if (!donkey.angry) donkey.attackD()
    }
    animate()

    if (!donkey.takeBarrel) donkey.angryAnimate()
    princess.move()

    playerWon()
}

export function gameOver() {
    if (plumber.onFloor === -1) {
        let div = document.getElementById('game')
        div.innerHTML = ''
        alert("Game over")
        startGameBtn.classList.remove('hide')
    }
}

function playerWon() {
    if (Number(plumber.onFloor) === FLOORS - 1) {
        alert('U won')
    }
}

const timer = document.getElementById('timer');
let timeInt;

function startTimer(minute, second) {
    clearInterval(timeInt);
    timer.textContent =
        (minute < 10 ? '0' + minute : minute) +
        ':' +
        (second < 10 ? '0' + second : second);
    second++;
    if (second === 60) {
        minute++;
        second = 0;
    }
    timeInt = setInterval(() => {
        startTimer(minute, second);
    }, 1000);
}



// events
startGameBtn.addEventListener('click', startGame)
