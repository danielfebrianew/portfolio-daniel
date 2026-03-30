"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { useEffect, useState, useRef } from "react";

export function CursorGlow() {
  const { x, y } = useMousePosition();
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const trailX = useRef(x);
  const trailY = useRef(y);
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const down = () => setClicking(true);
    const up = () => setClicking(false);
    window.addEventListener("mousemove", show, { once: true });
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  // Lerp trail behind cursor
  useEffect(() => {
    const animate = () => {
      trailX.current += (x - trailX.current) * 0.12;
      trailY.current += (y - trailY.current) * 0.12;
      setTrail({ x: trailX.current, y: trailY.current });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [x, y]);

  if (typeof window !== "undefined" && window.innerWidth < 768) return null;

  const opacity = visible ? 1 : 0;

  return (
    <>
      {/* Dot — snaps exactly to cursor */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
          width: clicking ? 6 : 5,
          height: clicking ? 6 : 5,
          borderRadius: "50%",
          background: "var(--primary)",
          transform: `translate(${x - 2.5}px, ${y - 2.5}px)`,
          opacity,
          transition: "opacity 0.3s, width 0.1s, height 0.1s",
        }}
      />

      {/* Ring — lags behind for trail effect */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9998,
          width: clicking ? 20 : 28,
          height: clicking ? 20 : 28,
          borderRadius: "50%",
          border: "1px solid var(--primary)",
          transform: `translate(${trail.x - (clicking ? 10 : 14)}px, ${trail.y - (clicking ? 10 : 14)}px)`,
          opacity: visible ? 0.5 : 0,
          transition: "opacity 0.3s, width 0.15s, height 0.15s, border-color 0.2s",
        }}
      />
    </>
  );
}
