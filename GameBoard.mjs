import {GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST, FLOORS} from "./setup.mjs";

class GameBoard {
    constructor(DOMGrid) {
        this.grid = []
        this.DOMGrid = DOMGrid
    }

    createGrid(level) {
        this.grid = []
        this.DOMGrid.innerHTML = ''
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${CELL_SIZE}, ${CELL_SIZE}px)`

        let floor = FLOORS
        level.forEach((square, i) => {
            const div = document.createElement('div')
            div.classList.add('square', CLASS_LIST[square])
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px`

            if (CLASS_LIST[square] === 'platform') {
                div.classList.add(`floor${floor}`)
            }

            if (CLASS_LIST[square] === 'ladder') {
                div.classList.add(`floor${floor}`)
            }

            if (i % (3 * 16) === 0) {
                floor--
            }

            this.DOMGrid.appendChild(div)
            this.grid.push(div)
        })
    }

    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid)
        board.createGrid(level)
        return board
    }
}

export default GameBoard