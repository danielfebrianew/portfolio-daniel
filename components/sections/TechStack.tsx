"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, Activity, Film } from "lucide-react";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface Skill {
  id: string;
  name: string;
  /** devicon class WITHOUT leading "devicon-" prefix, e.g. "nextjs-plain" */
  icon?: string;
  /** Lucide fallback when devicon has no entry */
  fallback?: ReactNode;
  /** brand color used for the icon glyph; falls back to currentColor when omitted */
  color?: string;
  detail: string;
  patterns: string;
  /** true → render the icon inverted (for dark glyphs on dark bg, e.g. Next.js) */
  invertOnDark?: boolean;
}

interface Category {
  id: string;
  label: string;
  accent: string;
  skills: Skill[];
}

const CATEGORIES: Category[] = [
  {
    id: "backend",
    label: "backend",
    accent: "var(--term-keyword)",
    skills: [
      { id: "spring-boot", name: "Spring Boot", icon: "spring-original",      color: "#6DB33F", detail: "6 mo",  patterns: "JDBC · raw SQL" },
      { id: "nestjs",      name: "NestJS",      icon: "nestjs-original",      color: "#E0234E", detail: "6 mo",  patterns: "TypeORM · Prisma" },
      { id: "go-echo",     name: "Go (Echo)",   icon: "go-original-wordmark", color: "#00ADD8", detail: "3 mo",  patterns: "sqlx · raw PG" },
    ],
  },
  {
    id: "frontend",
    label: "frontend",
    accent: "var(--term-type)",
    skills: [
      { id: "nextjs",     name: "Next.js",    icon: "nextjs-plain",          detail: "9 mo", patterns: "App Router · SSR", invertOnDark: true },
      { id: "react",      name: "React",      icon: "react-original",        color: "#61DAFB", detail: "9 mo", patterns: "Hooks · Context" },
      { id: "typescript", name: "TypeScript", icon: "typescript-plain",      color: "#3178C6", detail: "9 mo", patterns: "strict mode" },
      { id: "tailwind",   name: "Tailwind",   icon: "tailwindcss-original",  color: "#38BDF8", detail: "9 mo", patterns: "utility-first" },
    ],
  },
  {
    id: "database",
    label: "database",
    accent: "var(--term-string)",
    skills: [
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql-plain", color: "#4169E1", detail: "fluent", patterns: "raw queries" },
      { id: "mysql",      name: "MySQL",      icon: "mysql-original",   color: "#4479A1", detail: "fluent", patterns: "JDBC · raw" },
    ],
  },
  {
    id: "devops",
    label: "devops",
    accent: "var(--term-func)",
    skills: [
      { id: "docker", name: "Docker Compose", icon: "docker-plain",  color: "#2496ED", detail: "prod", patterns: "multi-container" },
      { id: "pm2",    name: "PM2",            fallback: <Activity size={15} strokeWidth={2.2} />, color: "#2B037A", detail: "prod", patterns: "zero-downtime" },
      { id: "nginx",  name: "Nginx",          icon: "nginx-original", color: "#009639", detail: "prod", patterns: "reverse proxy" },
      { id: "linux",  name: "Linux",          icon: "linux-plain",    color: "#FCC624", detail: "prod", patterns: "VPS · systemd" },
    ],
  },
  {
    id: "ai-api",
    label: "ai / api",
    accent: "var(--term-comment)",
    skills: [
      { id: "openai", name: "OpenAI", fallback: <Bot size={15} strokeWidth={2.2} />,      color: "#10A37F", detail: "scripting", patterns: "prompt engineering" },
      { id: "gemini", name: "Gemini", fallback: <Sparkles size={15} strokeWidth={2.2} />, color: "#4285F4", detail: "TTS · Img", patterns: "streaming" },
      { id: "ffmpeg", name: "FFmpeg", fallback: <Film size={15} strokeWidth={2.2} />,     color: "#5CB85C", detail: "stitch",    patterns: "concat · transcode" },
    ],
  },
];

function Pill({ skill, accent }: { skill: Skill; accent: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "0.45rem 0.85rem 0.45rem 0.65rem",
        borderRadius: 999,
        border: `1px solid ${hovered ? accent : "var(--term-border)"}`,
        background: hovered
          ? "color-mix(in srgb, var(--term-bg-bar) 80%, transparent)"
          : "var(--term-bg-bar)",
        boxShadow: hovered
          ? `0 6px 18px -8px ${accent}, inset 0 0 0 1px color-mix(in srgb, ${accent} 18%, transparent)`
          : "0 1px 0 rgba(0,0,0,0.04)",
        transition: "background 0.18s, border-color 0.18s, box-shadow 0.18s",
        cursor: "default",
      }}
    >
      {skill.icon && (
        <i
          className={`devicon-${skill.icon} colored`}
          style={{
            fontSize: "1.05rem",
            lineHeight: 1,
            color: skill.color,
            filter: skill.invertOnDark
              ? "var(--devicon-invert, none)"
              : undefined,
            display: "inline-block",
          }}
          aria-hidden="true"
        />
      )}
      {skill.fallback && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: skill.color,
            lineHeight: 1,
          }}
          aria-hidden="true"
        >
          {skill.fallback}
        </span>
      )}
      <span
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.72rem",
          color: hovered ? "var(--foreground)" : "var(--term-text)",
          fontWeight: 600,
          letterSpacing: "-0.01em",
          transition: "color 0.18s",
        }}
      >
        {skill.name}
      </span>
      <span
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.6rem",
          color: "var(--term-text-dim)",
          paddingLeft: "0.15rem",
          borderLeft: "1px solid var(--term-border)",
          marginLeft: "0.1rem",
          paddingInlineStart: "0.5rem",
        }}
      >
        {skill.detail}
      </span>

      {/* Hover tooltip with pattern detail */}
      <motion.span
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "absolute",
          bottom: "calc(100% + 6px)",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "0.3rem 0.55rem",
          borderRadius: 6,
          background: "var(--term-bg)",
          border: `1px solid ${accent}`,
          boxShadow: "0 10px 24px -10px rgba(0,0,0,0.45)",
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.6rem",
          color: "var(--term-text)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 5,
        }}
      >
        {skill.patterns}
      </motion.span>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section
      id="stack"
      style={{
        padding: "clamp(64px, 8vw, 96px) 1.5rem",
        maxWidth: "1152px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ScrollReveal>
        <SectionHeader label="// stack" title="Tools I build with." />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <p
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.78rem",
            color: "var(--muted-foreground)",
            marginBottom: "2.25rem",
            marginTop: "-1.5rem",
          }}
        >
          Technologies I use day-to-day, grouped by what they do.
        </p>
      </ScrollReveal>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
        {CATEGORIES.map((cat, ci) => (
          <ScrollReveal key={cat.id} delay={0.08 + ci * 0.05}>
            <div>
              {/* Category label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.85rem",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: cat.accent,
                    boxShadow: `0 0 8px ${cat.accent}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.68rem",
                    color: cat.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    fontWeight: 700,
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      "linear-gradient(to right, var(--term-border), transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.6rem",
                    color: "var(--term-text-dim)",
                  }}
                >
                  {String(cat.skills.length).padStart(2, "0")}
                </span>
              </div>

              {/* Pill grid */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.55rem",
                }}
              >
                {cat.skills.map((skill) => (
                  <Pill key={skill.id} skill={skill} accent={cat.accent} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
