import { useEffect, useRef } from "react";
import { ItemData } from "../types"; 

interface Props {
  title: string;
  data: ItemData[];
}

export function PrecipitationPlot({ title, data }: Props): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const WIDTH = 900;
    const HEIGHT = 640;
    const DPI_WIDTH = WIDTH * 2;
    const DPI_HEIGHT = HEIGHT * 2;
    const ROWS_COUNT = 5;
    const PADDING = 40;
    const VIEW_HEIGHT = DPI_HEIGHT - 2 * PADDING;
    const VIEW_WIDTH = DPI_WIDTH - PADDING;

    if (canvasRef.current == null) {
      return
    }

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.style.width = `${WIDTH}px`;
    canvasRef.current.style.height = `${HEIGHT}px`;
    canvasRef.current.width = DPI_WIDTH;
    canvasRef.current.height = DPI_HEIGHT;

    function xAxis(ctx: CanvasRenderingContext2D, data: string[], xRatio: number) {
      const colsCount = 6;
      const step = Math.round(data.length / colsCount);

      ctx.beginPath();
      ctx.fillStyle = "black";

      for (let i = 1; i < data.length; i++) {
        const x = i * xRatio;

        if ((i - 1) % step === 0) {
          const txt = data[i];
          ctx.fillText(txt, x, DPI_HEIGHT - 10);
        }
      }
      ctx.stroke();
      ctx.closePath();
    }

    function yAxis(ctx: CanvasRenderingContext2D, yMin: number, yMax: number) {
      const step = VIEW_HEIGHT / ROWS_COUNT;
      const textStep = (yMax - yMin) / ROWS_COUNT;

      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.strokeStyle = "lightgray";
      ctx.lineWidth = 0.25;
      ctx.font = "normal 20px Helvetica,sans-serif";

      for (let i = 0; i <= ROWS_COUNT; i++) {
        const y = step * i;
        const text = Math.round(yMax - textStep * i);
        ctx.fillText(String(text), 10, y + PADDING);
        ctx.moveTo(PADDING, y + PADDING);
        ctx.lineTo(DPI_WIDTH, y + PADDING);
      }
      ctx.stroke();
      ctx.closePath();
    }

    function boundaries(data: ItemData[]): [number, number] {
      const values = data.map((item) => item.v);
      const max = Math.max(...values);
      const min = Math.min(...values);
      console.log("max", max, "min", min);
      return [min, max];
    }

    function toCoord(xRatio: number, yRatio: number) {
      return (y: number, i: number) => [
        i * xRatio + PADDING,
        DPI_HEIGHT - y * yRatio - PADDING,
      ];
    }

    function clear(ctx: CanvasRenderingContext2D) {
      ctx.clearRect(0, 0, DPI_WIDTH, DPI_HEIGHT);
    }

    function axisLines(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.moveTo(PADDING, 0);
      ctx.lineTo(PADDING, DPI_HEIGHT - PADDING);
      ctx.lineTo(DPI_WIDTH, DPI_HEIGHT - PADDING);
      ctx.stroke();
      ctx.closePath();
    }

    function line(ctx: CanvasRenderingContext2D, coords: number[], { color }: { color: string}) {
      ctx.lineWidth = 4;
      ctx.strokeStyle = color;
      ctx.fillStyle = "white";
      ctx.lineTo(coords[0], coords[1]);
      ctx.stroke();
    }

    function draw(ctx: CanvasRenderingContext2D) {
      clear(ctx);
      axisLines(ctx);

      const xData = data.map(({ t }) => t);
      const yData = data.map(({ v }) => v);

      const [yMin, yMax] = boundaries(data);

      const xRatio = VIEW_WIDTH / (xData.length - 2);
      const yRatio = VIEW_HEIGHT / (yMax - yMin);

      yAxis(ctx, yMin, yMax);
      xAxis(ctx, xData, xRatio);

      ctx.beginPath();
      ctx.moveTo(PADDING, DPI_HEIGHT - PADDING);
      yData.map(toCoord(xRatio, yRatio)).forEach((coords) => {
        line(ctx, coords, { color: "green" });
      });
      ctx.closePath();
    }

    if (ctx !== null) {
      draw(ctx);
    }
  }, [data, canvasRef]);

  return (
    <>
      <h2 className="text-center">{title}</h2>
      <canvas ref={canvasRef} id="canvas" width="800" height="600">
        <p>Canvas is not supported in your browser.</p>
      </canvas>
      <div className="flex flex-space-between">
        <span className="plot-source">
          Источник: Данные непонятно откуда (требуется источник)
        </span>
        <span className="plot-author">
          Автор: Рожин Алексей{" "}
          <a href="mailto:alexey.rozhin90@gmail.com">
            alexey.rozhin90@gmail.com
          </a>
        </span>
      </div>
      <div>
        Data length: {data.length}
        <details>
          <summary>Data is: </summary>
          {JSON.stringify(data)}
        </details>
      </div>
    </>
  );
}
