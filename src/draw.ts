const GRID_COLOR = "lightgray";
const AXIS_COLOR = "black";
const GRID_LINE_WIDTH = 1;
const AXIS_LINE_WIDTH = 2;

function drawXAxe(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.beginPath();
  ctx.strokeStyle = AXIS_COLOR;
  ctx.lineWidth = AXIS_LINE_WIDTH;
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w, h / 2);
  ctx.stroke();
  ctx.closePath();
}

function drawYAxe(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.beginPath();
  ctx.strokeStyle = AXIS_COLOR;
  ctx.lineWidth = AXIS_LINE_WIDTH;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, h);
  ctx.stroke();
  ctx.closePath();
}

function drawAxis(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  drawXAxe(ctx, w, h);
  drawYAxe(ctx, w, h);
}

function drawHorizontalGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  step: number
): void {
  const n = Math.trunc(w / step);
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = GRID_LINE_WIDTH;
  for (let i = 0; i < n; i++) {
    ctx.moveTo(0, i * step);
    ctx.lineTo(w, i * step);
    ctx.stroke();
  }
  ctx.closePath();
}

function drawVerticalGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  step: number
): void {
  const n = Math.trunc(w / step);
  ctx.beginPath();
  ctx.strokeStyle = GRID_COLOR;
  ctx.lineWidth = GRID_LINE_WIDTH;
  for (let i = 0; i < n; i++) {
    ctx.moveTo(i * step, 0);
    ctx.lineTo(i * step, h);
    ctx.stroke();
  }
  ctx.closePath();
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  drawHorizontalGrid(ctx, w, 100);
  drawVerticalGrid(ctx, w, h, 400);
}

function drawHistogramCol(
  ctx: CanvasRenderingContext2D,
  x: number,
  colW: number,
  h: number,
  label: string
): void {
  ctx.beginPath();
  ctx.fillStyle = h > 0 ? "red" : "blue";
  ctx.lineWidth = 2;
  ctx.fillRect(x - colW / 2, 300 - h, colW, h);

  ctx.font = "12px sans-serif";
  ctx.fillText(label, x - colW / 2, h > 0 ? 300 - h - 6 : 300 - h + 12);
  ctx.closePath();
}

function drawHistogramColTopLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  colW: number,
  h: number,
  label: string
): void {
  ctx.beginPath();
  ctx.strokeStyle = h > 0 ? "red" : "blue";
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = 4;
  ctx.moveTo(x - colW / 2, 300 - h);
  ctx.lineTo(x + colW / 2, 300 - h);
  ctx.stroke();
  ctx.font = "12px sans-serif";
  ctx.fillText(label, x - colW / 2, h > 0 ? 300 - h - 6 : 300 - h + 12);
  ctx.closePath();
}

function clear(ctx: CanvasRenderingContext2D, w: number, h: number): void {
  ctx.clearRect(0, 0, w, h);
}

export { drawGrid, drawAxis, drawHistogramCol, drawHistogramColTopLine, clear };
