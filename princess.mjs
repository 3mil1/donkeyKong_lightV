import {FLOORS} from "./setup.mjs";
import {pauseGame} from "./index.mjs";

class Princess {
    constructor() {
        this.moveAnimate = false
        this.free = false
        this.onFloor = FLOORS - 1
        this.movePos = ['first', 'second']
        this.me = null
        this.exist = false
        this.moveLeft = false
    }

    createPrincess() {
        if (!this.exist) {
            let princess = document.createElement("div")
            princess.id = "princess"
            let princessPos = document.querySelector('.princessStart')
            princessPos.appendChild(princess)
            this.exist = true
            this.me = document.getElementById('princess')
            this.me.style.top = '10px'

            this.animate()
        }
    }

    move() {
        this.createPrincess()

        let platform = document.querySelectorAll(`.platform.floor${this.onFloor}`)
        let meRect = this.me.getBoundingClientRect()
        let pCurrentH = this.me.offsetLeft;

        if (!this.moveLeft) {
            if ((meRect.right) < platform.item(platform.length - 1).getBoundingClientRect().right) {
                this.me.style.left = pCurrentH + 1 + 'px'
            } else {
                this.moveLeft = true
            }
        }
        if (this.moveLeft) {
            if ((meRect.left) > platform.item(0).getBoundingClientRect().left) {
                this.me.style.left = pCurrentH - 1 + 'px'
            } else {
                this.moveLeft = false
            }
        }
    }

    animate() {
        this.move()
        if (!this.moveAnimate) {
            this.moveAnimate = true
            let i = 0;
            let intervalID = setInterval(() => {
                this.me.classList.remove(...this.movePos)
                this.moveLeft ? this.me.style.transform = 'scaleX(-1)' : this.me.style.transform = 'scaleX(1)'
                this.me.classList.add(this.movePos[i % this.movePos.length])
                i++

                if (pauseGame.isPaused()) {
                    this.moveAnimate = false
                    window.clearInterval(intervalID)
                }

            }, 150);
        }
    }
}

export default Princess