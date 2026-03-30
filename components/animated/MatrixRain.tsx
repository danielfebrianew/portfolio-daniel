"use client";

import { useEffect, useRef } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" +
  "{}[]()<>/\\|@#$%^&*=+-_~;:.!?";

const CELL = 14;
const FPS = 20;
const FRAME_INTERVAL = 1000 / FPS;

function getCSSVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.innerWidth < 640) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let lastTime = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const cols = () => Math.floor(canvas.width / CELL);

    let drops: number[] = Array.from({ length: cols() }, () =>
      Math.floor(Math.random() * -(canvas.height / CELL))
    );

    const rainColor = getCSSVar("--rain-color") || "rgba(86,156,214,0.6)";
    const rainHead  = getCSSVar("--rain-head")  || "rgba(200,230,255,0.9)";

    const drawStatic = () => {
      ctx.font = `${CELL - 2}px monospace`;
      const count = cols();
      for (let i = 0; i < count; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = Math.floor(Math.random() * (canvas.height / CELL)) * CELL;
        ctx.fillStyle = rainColor;
        ctx.fillText(char, i * CELL, y);
      }
    };

    if (reducedMotion) { drawStatic(); return; }

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastTime < FRAME_INTERVAL) return;
      lastTime = timestamp;

      const numCols = cols();
      if (drops.length !== numCols) {
        drops = Array.from({ length: numCols }, (_, i) =>
          drops[i] ?? Math.floor(Math.random() * -(canvas.height / CELL))
        );
      }

      ctx.fillStyle = "rgba(0,0,0,0.07)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${CELL - 2}px monospace`;

      for (let i = 0; i < numCols; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * CELL;
        const y = drops[i] * CELL;

        ctx.fillStyle = rainHead;
        ctx.fillText(char, x, y);

        const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillStyle = rainColor;
        ctx.fillText(trailChar, x, y - CELL);

        drops[i]++;
        if (drops[i] * CELL > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20);
        }
      }
    };

    animId = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      drops = Array.from({ length: cols() }, () =>
        Math.floor(Math.random() * -(canvas.height / CELL))
      );
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: "var(--rain-opacity)" as never,
        pointerEvents: "none",
        zIndex: 0,
        willChange: "transform",
      }}
    />
  );
}
