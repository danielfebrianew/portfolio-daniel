import type { ReactNode } from "react";
import { Bot, Sparkles, Activity, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechPillProps {
  name: string;
  className?: string;
}

type IconMeta = {
  /** Devicon class WITHOUT the leading "devicon-" prefix, e.g. "nextjs-plain" */
  icon?: string;
  /** Lucide fallback when devicon has no entry for this tech */
  fallback?: ReactNode;
  color?: string;
  invertOnDark?: boolean;
};

/** Lowercased tech name → icon metadata. Devicon classes verified against v2.16.0 manifest. */
const ICON_MAP: Record<string, IconMeta> = {
  "next.js":     { icon: "nextjs-plain",         invertOnDark: true },
  "nextjs":      { icon: "nextjs-plain",         invertOnDark: true },
  "react":       { icon: "react-original",       color: "#61DAFB" },
  "typescript":  { icon: "typescript-plain",     color: "#3178C6" },
  "tailwind":    { icon: "tailwindcss-original", color: "#38BDF8" },
  "tailwindcss": { icon: "tailwindcss-original", color: "#38BDF8" },
  "nestjs":      { icon: "nestjs-original",      color: "#E0234E" },
  "spring boot": { icon: "spring-original",      color: "#6DB33F" },
  "spring":      { icon: "spring-original",      color: "#6DB33F" },
  "go":          { icon: "go-original-wordmark", color: "#00ADD8" },
  "golang":      { icon: "go-original-wordmark", color: "#00ADD8" },
  "go (echo)":   { icon: "go-original-wordmark", color: "#00ADD8" },
  "postgresql":  { icon: "postgresql-plain",     color: "#4169E1" },
  "postgres":    { icon: "postgresql-plain",     color: "#4169E1" },
  "mysql":       { icon: "mysql-original",       color: "#4479A1" },
  "docker":      { icon: "docker-plain",         color: "#2496ED" },
  "docker compose": { icon: "docker-plain",      color: "#2496ED" },
  "nginx":       { icon: "nginx-original",       color: "#009639" },
  "linux":       { icon: "linux-plain",          color: "#FCC624" },
  "java":        { icon: "java-plain",           color: "#E76F00" },
  "googlecloud": { icon: "googlecloud-plain",    color: "#4285F4" },

  // Lucide fallbacks for techs devicon doesn't ship
  "pm2":    { fallback: <Activity size={13} strokeWidth={2.2} />, color: "#2B037A" },
  "openai": { fallback: <Bot size={13} strokeWidth={2.2} />,      color: "#10A37F" },
  "gemini": { fallback: <Sparkles size={13} strokeWidth={2.2} />, color: "#4285F4" },
  "ffmpeg": { fallback: <Film size={13} strokeWidth={2.2} />,     color: "#5CB85C" },
};

export function TechPill({ name, className }: TechPillProps) {
  const meta = ICON_MAP[name.toLowerCase()];

  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.04em",
        color: "var(--term-func)",
        background: "rgba(220,220,170,0.08)",
        border: "1px solid rgba(220,220,170,0.18)",
        borderRadius: "4px",
        padding: "2px 8px",
        gap: "0.35rem",
        whiteSpace: "nowrap",
      }}
    >
      {meta?.icon && (
        <i
          className={`devicon-${meta.icon} colored`}
          style={{
            fontSize: "0.85rem",
            lineHeight: 1,
            color: meta.color,
            filter: meta.invertOnDark ? "var(--devicon-invert, none)" : undefined,
            display: "inline-block",
          }}
          aria-hidden="true"
        />
      )}
      {meta?.fallback && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: meta.color,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {meta.fallback}
        </span>
      )}
      {name}
    </span>
  );
}
