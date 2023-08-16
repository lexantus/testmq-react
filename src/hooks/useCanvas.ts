import { RefObject, useEffect, useRef } from "react";

export interface UseCanvasOutput {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export function useCanvas(w: number, h: number): UseCanvasOutput {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;
    canvasRef.current.style.width = `${w}px`;
    canvasRef.current.style.height = `${h}px`;
    canvasRef.current.width = w;
    canvasRef.current.height = h;
  }, [w, h]);

  return { canvasRef };
}
