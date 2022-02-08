class Barrel {
    constructor() {
        this.game = document.getElementById('game')
        const donkey = document.getElementById('donkey');
        this.barrel = document.createElement('div');
        this.barrel.classList.add('barrel', 'vertical');
        this.barrel.style.top = donkey.offsetTop + 19 + 'px';
        this.barrel.style.left = donkey.offsetLeft + 13 + 'px';
        this.game.appendChild(this.barrel);
        this.moves = ['move1', 'move2'];
    }

    moving() {
        let i = 0;
        let iId = setInterval(() => {
            let hCurrent = this.barrel.offsetTop;
            hCurrent += 5;
            this.barrel.style.top = hCurrent + 'px';
            this.barrel.classList.remove(...this.moves);
            this.barrel.classList.add(this.moves[i % this.moves.length]);
            i++;
            if (this.barrel.offsetTop + 15 > this.game.getBoundingClientRect().bottom) {
                clearInterval(iId);
                this.barrel.remove();
            }
        }, 100);
    }
}

export default Barrel;