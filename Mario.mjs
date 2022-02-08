import {gameOver} from "./index.mjs";

export let plumber = {
    right: false,
    left: false,
    moving: false,
    up: false,
    down: false,
    jump: false,
    onFloor: 0,
}


const game = {
    animation: null,
}

let mario
export const animate = () => {
    mario = document.getElementById('mario');
    document.addEventListener("keydown", (e) => {
        e.preventDefault()
        plumber.moving = true;
        if (e.code === 'KeyD') plumber.right = true;
        if (e.code === 'KeyA') plumber.left = true;
        if (e.code === 'KeyW') plumber.up = true;
        if (e.code === 'KeyS') plumber.down = true;

        if (!e.repeat) {
            if (e.code === 'Space') plumber.jump = true
        } else {
            plumber.jump = false
        }

    })

    document.addEventListener('keyup', function (e) {
        e.preventDefault()
        plumber.moving = false;
        if (e.code === 'KeyD') plumber.right = false;
        if (e.code === 'KeyA') plumber.left = false;
        if (e.code === 'KeyW') plumber.up = false;
        if (e.code === 'KeyS') plumber.down = false;
        if (e.code === 'Space') plumber.jump = false;
    })
    let i = 0;
    setInterval(() => {
        mario.classList.remove(...moves)
        if (plumber.moving) {
            mario.classList.add(moves[i % moves.length])
            i++
        } else {
            i = 0;
        }
    }, 200);
    game.animation = window.requestAnimationFrame(move);
}
const moves = ['move1', 'move2'];
const directions = ['right', 'left', 'vertical'];

function move() {
    if (!canClimbDown()) plumber.down = false
    if (!canClimbUp()) plumber.up = false

    let pCurrentH = mario.offsetLeft;
    let pCurrentV = mario.offsetTop;
    if (plumber.right) {
        mario.classList.remove(...directions);
        mario.classList.add('right');
        pCurrentH += 1;
    }
    if (plumber.left) {
        mario.classList.remove(...directions);
        mario.classList.add('left');
        pCurrentH -= 1;
    }


    if (plumber.up) {
        mario.classList.remove(...directions);
        mario.classList.add('vertical');
        pCurrentV -= 1;
    }

    if (plumber.down) {
        mario.classList.remove(...directions);
        mario.classList.add('vertical');
        pCurrentV += 1;
    }

    if (!jump()) {
        if (plumber.jump) {
            pCurrentV -= 20
        }
    }

    mario.style.top = pCurrentV + 'px';
    mario.style.left = pCurrentH + 'px';

    changeFloor()
    isCollide()
    if (bump()) {
        //game over
        //clear all intervals
        console.log('game over');
    }
    // game.animation = window.requestAnimationFrame(move);
}

function jump() {
    let platform = document.querySelectorAll(`.platform.floor${plumber.onFloor}`)
    let marioRect = mario.getBoundingClientRect()

    return (
        platform.item(0).getBoundingClientRect().top > marioRect.bottom
    )
}

function isCollide() {
    let platform = document.querySelectorAll(`.platform.floor${plumber.onFloor}`)
    let falling = document.querySelectorAll(`.hole`)
    let ladder = document.querySelectorAll(`.ladder.floor${plumber.onFloor}`)
    let marioRect = mario.getBoundingClientRect()

    // falls into a hole
    for (const hole of falling) {
        let holeRect = hole.getBoundingClientRect()
        if (marioRect.bottom === holeRect.top
            && marioRect.left >= holeRect.left
            && marioRect.right <= holeRect.right
        ) {
            mario.style.top = parseInt(mario.style.top, 10) + 1 + 'px'
        }
    }


    // falling down from platform
    if (!(marioRect.right - 10 >= platform.item(0).getBoundingClientRect().left && (marioRect.left + 10) <= platform.item(platform.length - 1).getBoundingClientRect().right)) {
        mario.style.top = parseInt(mario.style.top, 10) + 3 + 'px'
    } else {
        // // falling down from ladder
        if (ladder.length > 0) {
            if (!(ladder.item(0).getBoundingClientRect().left < marioRect.right - 10
                    && ladder.item(0).getBoundingClientRect().right > marioRect.right - 10)
                && platform.item(0).getBoundingClientRect().top !== marioRect.bottom) {
                mario.style.top = parseInt(mario.style.top, 10) + 1 + 'px'
            }

            // if there are no any ladder
        } else if (marioRect.bottom !== platform.item(0).getBoundingClientRect().top) {
            mario.style.top = parseInt(mario.style.top, 10) + 1 + 'px'
        }
    }


}


function canClimbDown() {
    let ladder = document.querySelectorAll(`.ladder.floor${plumber.onFloor}`)
    let marioRect = mario.getBoundingClientRect()

    let ladder_1 = undefined
    if (plumber.onFloor > 0) {
        ladder_1 = document.querySelectorAll(`.ladder.floor${plumber.onFloor - 1}`)
        ladder_1 = ladder_1.item(0)
    }

    if (ladder_1) {
        if (ladder_1.getBoundingClientRect().left < marioRect.right - 10
            && ladder_1.getBoundingClientRect().right > marioRect.right - 10) {
            return true
        }
    }

    if (ladder.length > 1) {
        if (marioRect.bottom === ladder.item(1).getBoundingClientRect().bottom) {
            return false
        }
    }

    return canClimbUp()
}

function canClimbUp() {
    let ladder = document.querySelectorAll(`.ladder.floor${plumber.onFloor}`)
    let marioRect = mario.getBoundingClientRect()

    if (ladder.length > 1) {
        if (marioRect.bottom <= ladder.item(1).getBoundingClientRect().bottom && marioRect.bottom >= ladder.item(0).getBoundingClientRect().top - 20) {
            for (const el of ladder) {
                if (el.getBoundingClientRect().left < marioRect.right - 10
                    && el.getBoundingClientRect().right > marioRect.right - 10) {
                    return true
                }
            }
        }
    }

    let ladderBottom
    let ladderTop

    for (const ladderEl of ladder) {
        ladderEl.getBoundingClientRect().bottom

    }

    return false
}

function changeFloor() {
    let floor = document.querySelectorAll(".platform[class*=floor]")
    let marioRect = mario.getBoundingClientRect()

    for (let i = floor.length - 1; i >= 0; i--) {
        if ((marioRect.bottom + 4) === floor.item(i).getBoundingClientRect().top
            || marioRect.bottom === floor.item(i).getBoundingClientRect().top) {
            plumber.onFloor = floor.item(i).classList.item(floor.item(i).classList.length - 1).replace(/[^0-9]/g, "")
            if (!plumber.up && !plumber.down) {
                mario.style.top = (floor.item(i).getBoundingClientRect().top - 24) + 'px'
            }
        }
    }
    let floor1 = document.querySelectorAll(`.platform[class*=floor${plumber.onFloor}]`)
    if (marioRect.bottom > floor1.item(0).getBoundingClientRect().top) {
        plumber.onFloor = floor1.item(0).classList.item(floor.item(0).classList.length - 1).replace(/[^0-9]/g, "") - 1
    }

}

function bump() {
    let mRect = mario.getBoundingClientRect();
    let barrels = document.querySelectorAll('.barrel');
    for (const barrel of barrels) {
        const b = barrel.getBoundingClientRect();
         return !(mRect.top > b.bottom || mRect.bottom < b.top || mRect.left > b.right || mRect.right < b.left);
        // return mRect.top > b.bottom || mRect.bottom < b.top
    }
    return false;
}
