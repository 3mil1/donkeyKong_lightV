import {plumber} from "./Mario.mjs";
import Barrel from "./barrel.mjs";

let startFloor = 0

class Donkey {
    constructor() {
        this.angry = false
        this.takeBarrel = false
        this.throwBarrel = false
        this.me = document.getElementById('donkey')
        this.movesAngry = ['one', 'two', 'three']
        this.movesPrepare = ['one', 'two',]
        this.movesNewBarrel = ['take', 'have',]
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
                    this.angry = false
                }
            }, 150);
            startFloor = plumber.onFloor
        }
    }

    prepare() {
        this.takeBarrel = true
        let x = 0
        let i = 0;
        let intervalID = setInterval(() => {
            this.me.classList.add('donkeyPrepare')
            this.me.classList.remove(...this.movesPrepare)
            this.me.classList.add(this.movesPrepare[i % this.movesPrepare.length])
            i++
            if (++x === 10) {
                this.me.classList.remove('donkeyPrepare')
                this.me.classList.remove(...this.movesPrepare)
                window.clearInterval(intervalID)
                this.takeNewBarrel()
            }
        }, 300);
    }

    takeNewBarrel() {
        if (this.takeBarrel) {
            let x = 0
            let i = 0;
            let intervalID = setInterval(() => {
                this.me.classList.add('donkeyNewBarrel')
                this.me.classList.remove(...this.movesNewBarrel)
                this.me.style.width = '43px'
                this.me.classList.add(this.movesNewBarrel[i % this.movesNewBarrel.length])
                i++
                if (++x === 3) {
                    this.me.style.width = '47px'
                    this.me.classList.remove('donkeyNewBarrel')
                    this.me.classList.remove(...this.movesNewBarrel)
                    this.takeBarrel = false
                    window.clearInterval(intervalID)

                    this.throwBarrel = true
                    let b = new Barrel()
                    b.moving();
                }
            }, 600);
        }
    }

    attackD() {
        this.prepare()
    }

    static create() {
        let donkey = document.createElement("div")
        donkey.id = "donkey"
        let startDonkey = document.querySelector('.donkey')
        startDonkey.appendChild(donkey)
    }
}

export default Donkey