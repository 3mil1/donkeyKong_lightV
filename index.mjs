import {FLOORS, LEVEL, OBJECT_TYPE} from "./setup.mjs";
import {plumber} from "./Mario.mjs";
// Classes
import GameBoard from "./GameBoard.mjs";
import {animateMario} from "./Mario.mjs";
import Donkey from "./donkey.mjs";
import Barrel from "./barrel.mjs";
import Princess from "./princess.mjs";
import GamePause from "./gamePause.mjs";


// game const
const startGameBtn = document.querySelector("#start-button")
const gameGrid = document.querySelector("#game")
let gameStatus = document.querySelector('.game-status');
let pause = document.querySelector('.pause')
let donkey
let princess
export const pauseGame = new GamePause()


function startGame() {
    startGameBtn.classList.add('hide')
    gameStatus.style.display = "block";
    GameBoard.createGameBoard(gameGrid, LEVEL)
    startTimer(0, 0);

    let mario = document.createElement("div")
    mario.id = "mario"
    mario.classList.add('right');
    let startMario = document.querySelector('.marioStart')
    startMario.appendChild(mario)

    Donkey.create()
    donkey = new Donkey()
    princess = new Princess()

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape') {
            pauseGame.pause()
            if (pauseGame.isPaused()) {
                let body = document.querySelector('body')
                let div = document.createElement('div')
                div.classList.add('bg-fon')
                body.appendChild(div)
                pauseTimer();
            } else {
                let div = document.querySelector('.bg-fon')
                div.remove()
                resumeTimer();
            }
        }
    })
    window.requestAnimationFrame(playGame)
}

let lastIntervalTimestamp = 0;


function pauseMenu() {
    pause.classList.remove('hide')
    let restartBtn = document.querySelector('#restart-button')


    // restartBtn.addEventListener('click', () => {
    //     startGame()
    //
    // })
}

function playGame(now) {
    if (pauseGame.isPaused()) pauseMenu()

    if (!pauseGame.isPaused()) {
        pause.classList.add('hide')
        // не ставить меньше 5 т.к. прошлая анимация у конга не успевает завершиться
        if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 5 * 1000) {
            lastIntervalTimestamp = now;
            if (!donkey.angry) donkey.attackD()
        }

        if (!donkey.takeBarrel) donkey.angryAnimate()
        princess.animate()

        playerWon()
    }

    animateMario()


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

let value = '00:00';

function pauseTimer() {
    value = timer.textContent;
    clearTimeout(timeInt);
}

function resumeTimer() {
    let time = value.split(":");
    startTimer(parseInt(time[0], 10), parseInt(time[1], 10));
}


// events
startGameBtn.addEventListener('click', startGame)
