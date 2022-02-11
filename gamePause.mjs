class GamePause {
    constructor() {
        this.barrelPos = null
        this.marioPos = null
        this.princessPos = null
        this.paused = false
    }

    isPaused() {
        return this.paused
    }

    pause() {
        this.paused = !this.paused
    }


}

export default GamePause