import {FLOORS, LEVEL, OBJECT_TYPE} from "./setup.mjs";
import {moveMario, plumber, showLives, showScore} from "./Mario.mjs";
// Classes
import GameBoard from "./GameBoard.mjs";
import {animateMario} from "./Mario.mjs";
import Donkey from "./donkey.mjs";
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

window.addEventListener('keydown', esc)

function esc(e) {
    if (e.code === 'Escape') {
        gameMenu('pause')
        if (pauseGame.paused) {
            pauseTimer();
        } else resumeTimer();
    }
}


function startGame() {
    startGameBtn.classList.add('hide')
    gameStatus.style.display = "flex";
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
    showLives()
    window.requestAnimationFrame(playGame)
}


function gameMenu(gameStatus) {
    pause.classList.remove('hide')
    document.querySelector('#restart-button').addEventListener('click', () => {
        location.reload();
    });
    document.querySelector('#resume-button').addEventListener('click', () => {
        gameMenu('pause')
        if (pauseGame.paused) {
            pauseTimer();
        } else resumeTimer();
    });
    let menuStatus = document.querySelector('.menuStatus')
    switch (gameStatus) {
        case "over":
            plumber.gameOver = true
            menuStatus.textContent = "GAME OVER"
            gameStatus = 'over'
            pauseTimer();
            break
        case "pause":
            menuStatus.textContent = "PAUSE"
            break
        case "win":
            menuStatus.textContent = "YOU WIN"
            gameStatus = 'win'
            pauseTimer();
    }

    if (gameStatus !== 'pause') {
        window.removeEventListener('keydown', esc)
        document.querySelector('#resume-button').classList.add('hide')
    }

    pauseGame.pause()
    document.removeEventListener("keydown", moveMario)
    if (pauseGame.isPaused()) {
        let body = document.querySelector('body')
        let div = document.createElement('div')
        div.classList.add('bg-fon')
        body.appendChild(div)
    } else if (!pauseGame.isPaused()) {
        pause.classList.add('hide')
        let div = document.querySelector('.bg-fon')
        div.remove()
    }
}

function menu() {
    let menu = document.querySelector('.menu')
    menu.classList.remove('hide')
    menu.innerHTML = '.'
}

let lastIntervalTimestamp = 0;

function playGame(now) {
    if (pauseGame.isPaused()) menu()

    if (!plumber.gameOver) {
        if (!pauseGame.isPaused()) {
            // ???? ?????????????? ???????????? 5 ??.??. ?????????????? ???????????????? ?? ?????????? ???? ???????????????? ??????????????????????
            if (!lastIntervalTimestamp || now - lastIntervalTimestamp >= 5 * 1000) {
                lastIntervalTimestamp = now;
                if (!donkey.angry) donkey.attackD()
            }

            if (!donkey.takeBarrel) donkey.angryAnimate()
            princess.animate()

            animateMario()
            playerWon()
            gameOver()
        }
    }

    window.requestAnimationFrame(playGame)
}

export function gameOver() {
    if (plumber.onFloor < 0 || plumber.lives < 1) {
        gameMenu('over')
    }
}

function playerWon() {
    if (Number(plumber.onFloor) === FLOORS - 1) {
        gameMenu('win')
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
