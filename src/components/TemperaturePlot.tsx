import { useEffect } from "react";
import { ItemData } from "../types";
import { drawGrid, drawAxis, drawHistogramCol, drawHistogramColTopLine, clear } from "../draw";
import { useCanvas } from "../hooks";

interface Props {
  title: string;
  data: ItemData[];
}

function cutWindow(data: ItemData[], startIndex: number, limit: number) {
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
}

const w = 1080;
const h = 600;

export function TemperaturePlot({ title, data }: Props): JSX.Element {
  const { canvasRef } = useCanvas(w, h);

  useEffect(() => {
    const windowedData = cutWindow(data, 90, 10);
    console.table(windowedData);
    const ctx = canvasRef?.current?.getContext("2d");
    if (ctx) {
      clear(ctx, w, h);
      drawGrid(ctx, w, h);
      drawAxis(ctx, w, h);
      const maxAbsValue = Math.max(...windowedData.map((item) => Math.abs(item.v)));
      const yRatio = maxAbsValue / (h / 2);
      const gap = 10;

      windowedData.forEach((item, index) => {
        const gapTotalW = gap * (windowedData.length - 1);
        const colW = (w - gapTotalW) / windowedData.length;
        const x = index * colW + colW / 2;
        const h = item.v;
        drawHistogramCol(ctx, x + gap * index, colW, h / yRatio, item.v);
      });
    }
  }, [data]);

  return (
    <canvas ref={canvasRef}>
      <p>Canvas is not supported</p>
    </canvas>
  );
}
