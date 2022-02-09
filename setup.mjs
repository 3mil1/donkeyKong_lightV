export const GRID_SIZE = 16
export const CELL_SIZE = 16
export const FLOORS = 4

export const OBJECT_TYPE = {
    BLANK: 'blank',
    PLATFORM: 'platform',
    LADDER: 'ladder',
    BARREL: 'barrel',
    DONKEY: 'donkey',
    PRINCESS: 'princessPos',
    MARIO: 'marioStart',
    HOLE: 'hole',
}

export const CLASS_LIST = [
    OBJECT_TYPE.BLANK, //0
    OBJECT_TYPE.PLATFORM, //1
    OBJECT_TYPE.LADDER, //2
    OBJECT_TYPE.BARREL, //3
    OBJECT_TYPE.DONKEY, //4
    OBJECT_TYPE.PRINCESS, //5
    OBJECT_TYPE.MARIO, //6
    OBJECT_TYPE.HOLE, //7
]

export const LEVEL = [
    // 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
    0, 0, 3, 3, 4, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
    0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 7, 1, 7, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 0,
]