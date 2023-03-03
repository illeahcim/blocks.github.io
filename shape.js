const SHAPE_J = 0;
const SHAPE_L = 1;
const SHAPE_O = 2;
const SHAPE_T = 3;
const SHAPE_Z = 4;
const SHAPE_S = 5;
const SHAPE_LINE = 6;

const tetrominoColor = [[0, 0, 250], [255, 170, 0], [255, 255, 0], [191, 64, 191], [238, 75, 43], [155, 255, 112], [55, 253, 252]];

function Tetromino(shapeId) {
  this.shapeId = shapeId;
  this.color = tetrominoColor[shapeId];
  this.blocks = []; // Array of locations of the minos that composites the tetromino.
}

/**
 * getBlocks 
 * @param {number} variant variant of the tetromino
 * @returns {number[][]} rotated blocks of the tetromino
 */
Tetromino.prototype.getBlocks = function (variant) {
  const effectiveVariant = variant % 4;
  return this.blocks.map(block => {
    let rotatedBlock = [...block];
    for (let i = 0; i < effectiveVariant; i++) {
      // 90 degree rotation clockwise.
      const tmp = rotatedBlock[0];
      rotatedBlock[0] = rotatedBlock[1];
      rotatedBlock[1] = -tmp;
    }

    return rotatedBlock;
  })
}

Tetromino.prototype.draw = function (position, variant, clear = false, drawOutline = true) {
  const blocks = this.getBlocks(variant);
  blocks.forEach(block => {
    renderBlock([position[0] + block[0], position[1] + block[1]], this.color, clear, drawOutline)
  })
}

// Y is pointing upwards.
const TetrominoJ = new Tetromino(SHAPE_J);
TetrominoJ.blocks = [[-1, 1], [-1, 0], [0, 0], [1, 0]];

const TetrominoL = new Tetromino(SHAPE_L);
TetrominoL.blocks = [[1, 1], [-1, 0], [0, 0], [1, 0]];

const TetrominoO = new Tetromino(SHAPE_O);
TetrominoO.blocks = [[0, 1], [1, 1], [0, 0], [1, 0]];
TetrominoO.getBlocks = function (variant) {
  return this.blocks;
}

const TetrominoT = new Tetromino(SHAPE_T);
TetrominoT.blocks = [[0, 1], [-1, 0], [0, 0], [1, 0]];

const TetrominoZ = new Tetromino(SHAPE_Z);
TetrominoZ.blocks = [[-1, 1], [0, 1], [0, 0], [1, 0]];

const TetrominoS = new Tetromino(SHAPE_S);
TetrominoS.blocks = [[0, 1], [1, 1], [-1, 0], [0, 0]];

const TetrominoLine = new Tetromino(SHAPE_LINE);
TetrominoLine.blocks = [
  [-1, 0], [0, 0], [1, 0], [2, 0], // variant 0
  [1, 1], [1, 0], [1, -1], [1, -2], // variant 1
  [-1, -1], [0, -1], [1, -1], [2, -1], // variant 2
  [0, 1], [0, 0], [0, -1], [0, -2], // variant 3
];
TetrominoLine.getBlocks = function (variant) {
  const effectiveVariant = variant % 4;

  let blocks = [];

  for (let i = 0; i < 4; i++) {
    const block = this.blocks[i + effectiveVariant * 4];
    blocks.push(block);
  }

  return blocks;
}

const tetrominos = [TetrominoJ, TetrominoL, TetrominoO, TetrominoT, TetrominoZ, TetrominoS, TetrominoLine];