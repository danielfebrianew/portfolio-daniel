"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  text?: string;
  lines?: string[];
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  onLineComplete?: (index: number) => void;
  className?: string;
}

// Multi-line sequential mode
function MultiLineTypeWriter({
  lines,
  speed = 50,
  delay = 0,
  onComplete,
  onLineComplete,
  className,
}: Required<Pick<TypeWriterProps, "lines">> & Omit<TypeWriterProps, "text" | "lines">) {
  const [started, setStarted] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [lineDone, setLineDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started || currentLine >= lines.length) return;
    const target = lines[currentLine];
    if (displayed.length < target.length) {
      const t = setTimeout(() => {
        setDisplayed(target.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(t);
    } else {
      setLineDone(true);
      onLineComplete?.(currentLine);
      const pause = setTimeout(() => {
        if (currentLine + 1 < lines.length) {
          setCurrentLine((l) => l + 1);
          setDisplayed("");
          setLineDone(false);
        } else {
          onComplete?.();
        }
      }, 400);
      return () => clearTimeout(pause);
    }
  }, [started, displayed, currentLine, lines, speed, onLineComplete, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!lineDone && started && <span className="cursor-blink">_</span>}
    </span>
  );
}

// Single-line mode (original behaviour, unchanged)
function SingleLineTypeWriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  className,
}: Required<Pick<TypeWriterProps, "text">> & Omit<TypeWriterProps, "text" | "lines">) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      setDone(true);
      onComplete?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="cursor-blink">_</span>}
    </span>
  );
}

export function TypeWriter({ text, lines, ...rest }: TypeWriterProps) {
  if (lines && lines.length > 0) {
    return <MultiLineTypeWriter lines={lines} {...rest} />;
  }
  return <SingleLineTypeWriter text={text ?? ""} {...rest} />;
}
