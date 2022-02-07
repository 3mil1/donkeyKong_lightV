import {plumber} from "./Mario.mjs";

let startFloor = 0

class Donkey {
    constructor() {
        this.angry = false
        this.prepearForThorw = false
        this.takesBarell = false
        this.haveBarell = false
        this.throwBarell = false
        this.me = document.getElementById('donkey')
        this.movesAngry = ['one', 'two', 'three']
        this.movesPrepare = ['one', 'two',]
    }

    angryAnimate() {
        if (plumber.onFloor > startFloor) {
            this.angry = true
            let x = 0
            let i = 0;
            let intervalID = setInterval(() => {
                this.me.classList.add('donkeyAngry')
                this.me.style.transform = 'scaleY(-1)'
                this.me.classList.remove(...this.movesAngry)
                this.me.classList.add(this.movesAngry[i % this.movesAngry.length])
                i++

                if (++x === 10) {
                    this.me.classList.remove('donkeyAngry')
                    this.me.style.transform = 'scaleY(1)'
                    window.clearInterval(intervalID)

                }
            }, 150);

            startFloor = plumber.onFloor

        }
    }

    prepare() {
        if (this.prepearToThrow) {
            this.me.style.width = '47px'
            this.me.style.height = '32px'
            this.me.classList.add('donkeyPrepare')

            let x
            let i = 0;
            let intervalID = setInterval(() => {
                this.me.classList.remove(...this.movesPrepare)
                this.me.classList.add(this.movesPrepare[i % this.movesPrepare.length])
                i++

                if (++x === 10) {
                    this.me.classList.remove('donkeyPrepare')
                    window.clearInterval(intervalID)

                }
            }, 300);

            this.prepearToThrow = false
        }
    }

    attack() {
        this.prepare()
        this.prepearToThrow = true
    }


    static create() {
        let donkey = document.createElement("div")
        donkey.id = "donkey"
        let startDonkey = document.querySelector('.donkey')
        startDonkey.appendChild(donkey)
    }
}

export default Donkey