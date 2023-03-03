const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const OUTLINE_COLOR = "black";

function renderBlock(position, color, clear = false, drawOutline = false) {
  ctx.fillStyle = clear ? "white" : `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  ctx.fillRect(position[0] * BLOCK_SIZE, (ROWS - 1 - position[1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  if (drawOutline) {
    ctx.strokeStyle = clear ? "white" : OUTLINE_COLOR;
    ctx.lineWidth = 2;
    ctx.strokeRect(position[0] * BLOCK_SIZE, (ROWS - 1 - position[1]) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }
}