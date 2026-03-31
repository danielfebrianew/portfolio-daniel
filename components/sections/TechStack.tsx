"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";

interface SkillRow {
  id: string;
  name: string;
  detail: string;
  patterns: string;
  bar: number;
  usedIn: string[];
}

interface Category {
  id: string;
  label: string;
  color: string;
  skills: SkillRow[];
}

const CATEGORIES: Category[] = [
  {
    id: "backend",
    label: "backend/",
    color: "var(--term-keyword)",
    skills: [
      { id: "spring-boot", name: "spring-boot",  detail: "6mo",    patterns: "JDBC, raw SQL",       bar: 6,  usedIn: ["Pohon Kinerja", "WorkTracker"] },
      { id: "nestjs",      name: "nestjs",        detail: "6mo",    patterns: "TypeORM, Prisma",     bar: 6,  usedIn: ["Arisan Platform"] },
      { id: "go-echo",     name: "go-echo",       detail: "3mo",    patterns: "sqlx, raw PG",        bar: 4,  usedIn: ["WorkTracker"] },
    ],
  },
  {
    id: "frontend",
    label: "frontend/",
    color: "var(--term-type)",
    skills: [
      { id: "nextjs", name: "nextjs", detail: "9mo", patterns: "App Router, SSR", bar: 9, usedIn: ["NovusNext Gen", "WorkTracker", "Pohon Kinerja"] },
      { id: "react",  name: "react",  detail: "9mo", patterns: "Hooks, Context",  bar: 9, usedIn: ["All projects"] },
    ],
  },
  {
    id: "database",
    label: "database/",
    color: "var(--term-string)",
    skills: [
      { id: "postgresql", name: "postgresql", detail: "fluent", patterns: "raw queries", bar: 10, usedIn: ["Arisan Platform", "WorkTracker"] },
      { id: "mysql",      name: "mysql",      detail: "fluent", patterns: "JDBC, raw",   bar: 10, usedIn: ["Pohon Kinerja"] },
    ],
  },
  {
    id: "devops",
    label: "devops/",
    color: "var(--term-func)",
    skills: [
      { id: "docker-compose", name: "docker-compose", detail: "prod", patterns: "multi-container", bar: 6, usedIn: ["NovusNext Gen", "Pohon Kinerja"] },
      { id: "pm2",            name: "pm2",            detail: "prod", patterns: "zero-downtime",   bar: 6, usedIn: ["Arisan Platform"] },
      { id: "nginx",          name: "nginx",          detail: "prod", patterns: "reverse proxy",   bar: 6, usedIn: ["Arisan Platform", "NovusNext Gen"] },
    ],
  },
  {
    id: "ai-api",
    label: "ai-api/",
    color: "var(--term-comment)",
    skills: [
      { id: "openai-api",    name: "openai-api",    detail: "scripting", patterns: "prompt engineering", bar: 4, usedIn: ["NovusNext Gen"] },
      { id: "gemini-api",    name: "gemini-api",    detail: "TTS/Img",   patterns: "streaming",          bar: 4, usedIn: ["NovusNext Gen"] },
      { id: "seedance",      name: "seedance",      detail: "video gen", patterns: "async polling",       bar: 4, usedIn: ["NovusNext Gen"] },
      { id: "fal-ai-ffmpeg", name: "fal-ai-ffmpeg", detail: "stitch",    patterns: "FFmpeg concat",       bar: 4, usedIn: ["NovusNext Gen"] },
    ],
  },
];

const TOTAL_FILES = CATEGORIES.reduce((s, c) => s + c.skills.length, 0);

function Bar({ filled, color }: { filled: number; color: string }) {
  return (
    <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", letterSpacing: "0.02em" }}>
      <span style={{ color }}>{Array(filled).fill("█").join("")}</span>
      <span style={{ color: "var(--term-border)" }}>{Array(10 - filled).fill("░").join("")}</span>
    </span>
  );
}

// ─── Desktop skill row (typing animation + hover expand) ─────────────────────
function SkillLine({
  skill, prefix, color, revealDelay, visible,
}: {
  skill: SkillRow; prefix: string; color: string; revealDelay: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [shown, setShown] = useState(false);
  const [typed, setTyped] = useState("");
  const fullText = `${prefix}${skill.name}`;

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setShown(true), revealDelay);
    return () => clearTimeout(t);
  }, [visible, revealDelay]);

  useEffect(() => {
    if (!shown || typed.length >= fullText.length) return;
    const t = setTimeout(() => setTyped(fullText.slice(0, typed.length + 1)), 28);
    return () => clearTimeout(t);
  }, [shown, typed, fullText]);

  const prefixTyped = typed.slice(0, prefix.length);
  const nameTyped   = typed.slice(prefix.length);
  const fullyTyped  = typed.length >= fullText.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={shown ? { opacity: 1 } : {}}
      transition={{ duration: 0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "1px 0.5rem", margin: "0 -0.5rem", borderRadius: "3px",
        background: hovered ? "rgba(255,255,255,0.04)" : "transparent",
        transition: "background 0.15s", cursor: "default", minHeight: "1.6rem",
      }}
    >
      <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)", whiteSpace: "pre", flexShrink: 0 }}>
        {prefixTyped}
      </span>
      <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: hovered ? "var(--foreground)" : color, whiteSpace: "pre", flexShrink: 0, transition: "color 0.15s" }}>
        {nameTyped}
        {shown && !fullyTyped && <span className="cursor-blink">_</span>}
      </span>

      {fullyTyped && (
        <>
          <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-text-dim)", flexShrink: 0 }}>{skill.detail}</span>
          <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-comment)", flexShrink: 0 }}>· {skill.patterns}</span>
          <span style={{ flex: 1 }} />
          <Bar filled={skill.bar} color={color} />
          <AnimatePresence>
            {hovered && (
              <motion.span
                initial={{ opacity: 0, x: -6, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -6, width: 0 }}
                transition={{ duration: 0.18 }}
                style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-string)", whiteSpace: "nowrap", overflow: "hidden", marginLeft: "0.5rem", flexShrink: 0 }}
              >
                used_in: [{skill.usedIn.join(", ")}]
              </motion.span>
            )}
          </AnimatePresence>
        </>
      )}
    </motion.div>
  );
}

// ─── Mobile category row (tap to expand) ─────────────────────────────────────
function MobileCategoryRow({
  cat, isLast, isOpen, onToggle,
}: {
  cat: Category; isLast: boolean; isOpen: boolean; onToggle: () => void;
}) {
  const catPrefix  = isLast ? "└── " : "├── ";
  const childIndent = isLast ? "    " : "│   ";

  return (
    <div>
      {/* Category header — tappable */}
      <div
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "center", gap: "0.375rem",
          padding: "4px 0.5rem", margin: "0 -0.5rem", borderRadius: "3px",
          background: isOpen ? "rgba(255,255,255,0.05)" : "transparent",
          cursor: "pointer", userSelect: "none", minHeight: "1.8rem",
          transition: "background 0.15s",
        }}
      >
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)", whiteSpace: "pre" }}>
          {catPrefix}
        </span>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: cat.color, fontWeight: 700, flex: 1 }}>
          {cat.label}
        </span>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--term-text-dim)" }}>
          {isOpen ? "▾" : "▸"}
        </span>
      </div>

      {/* Expandable skill rows */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {cat.skills.map((skill, si) => {
              const isLastSkill = si === cat.skills.length - 1;
              const branch = isLastSkill ? "└── " : "├── ";
              return (
                <div
                  key={skill.id}
                  style={{ display: "flex", alignItems: "center", gap: "0.375rem", padding: "3px 0.5rem", margin: "0 -0.5rem", minHeight: "1.7rem" }}
                >
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text-dim)", whiteSpace: "pre" }}>
                    {childIndent}{branch}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: cat.color, flex: 1 }}>
                    {skill.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-text-dim)", flexShrink: 0 }}>
                    {skill.detail}
                  </span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer line between categories (mobile) */}
      {!isLast && !isOpen && (
        <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)" }}>
          {childIndent}
        </div>
      )}
    </div>
  );
}

// ─── Desktop tree body ────────────────────────────────────────────────────────
const CMD = "tree ./skills --detail";

function DesktopTree({ cmdDone, inView, rows, allDelay }: {
  cmdDone: boolean;
  inView: boolean;
  rows: { cat: Category; skill: SkillRow; catIdx: number; skillIdx: number; delay: number }[];
  allDelay: number;
}) {
  return (
    <>
      {/* Command line */}
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--term-prompt)" }}>$ </span>
          <span style={{ color: "var(--term-text)" }}>
            {rows.length > 0 ? CMD : ""}
          </span>
          {!cmdDone && inView && <span className="cursor-blink">_</span>}
        </span>
      </div>

      {cmdDone && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
          <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)", marginBottom: "0.4rem" }}>
            ./skills
          </div>

          {CATEGORIES.map((cat, ci) => {
            const isLastCat   = ci === CATEGORIES.length - 1;
            const catPrefix   = isLastCat ? "└── " : "├── ";
            const childIndent = isLastCat ? "    " : "│   ";
            const catDelay    = rows.find((r) => r.catIdx === ci)?.delay ?? 0;

            return (
              <motion.div key={cat.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15, delay: catDelay / 1000 }}>
                <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", marginBottom: "0.1rem" }}>
                  <span style={{ color: "var(--term-text-dim)" }}>{catPrefix}</span>
                  <span style={{ color: cat.color, fontWeight: 700 }}>{cat.label}</span>
                </div>

                {cat.skills.map((skill, si) => {
                  const isLastSkill = si === cat.skills.length - 1;
                  const prefix = `${childIndent}${isLastSkill ? "└── " : "├── "}`;
                  const row    = rows.find((r) => r.catIdx === ci && r.skillIdx === si)!;
                  return (
                    <SkillLine key={skill.id} skill={skill} prefix={prefix} color={cat.color} revealDelay={row.delay} visible={cmdDone} />
                  );
                })}

                {!isLastCat && (
                  <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)", marginBottom: "0.1rem" }}>
                    {childIndent}
                  </div>
                )}
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: allDelay / 1000 }}
            style={{ marginTop: "0.75rem", borderTop: "1px solid var(--term-border)", paddingTop: "0.75rem" }}
          >
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-text-dim)" }}>
              {CATEGORIES.length} directories,{" "}
              <span style={{ color: "var(--term-string)" }}>{TOTAL_FILES} files</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: (allDelay + 300) / 1000 }}
            style={{ marginTop: "0.75rem" }}
          >
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem" }}>
              <span style={{ color: "var(--term-prompt)" }}>$ </span>
              <span className="cursor-blink-accent">▋</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// ─── Mobile tree body ─────────────────────────────────────────────────────────
function MobileTree() {
  const [openCats, setOpenCats] = useState<Set<string>>(new Set(CATEGORIES.map((c) => c.id)));

  const toggle = (id: string) =>
    setOpenCats((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--term-prompt)" }}>$ </span>
          <span style={{ color: "var(--term-text)" }}>tree ./skills</span>
        </span>
      </div>

      <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text-dim)", marginBottom: "0.4rem" }}>
        ./skills
      </div>

      {CATEGORIES.map((cat, ci) => (
        <MobileCategoryRow
          key={cat.id}
          cat={cat}
          isLast={ci === CATEGORIES.length - 1}
          isOpen={openCats.has(cat.id)}
          onToggle={() => toggle(cat.id)}
        />
      ))}

      <div style={{ marginTop: "0.75rem", borderTop: "1px solid var(--term-border)", paddingTop: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-text-dim)" }}>
          {CATEGORIES.length} directories,{" "}
          <span style={{ color: "var(--term-string)" }}>{TOTAL_FILES} files</span>
        </span>
      </div>

      <div style={{ marginTop: "0.75rem" }}>
        <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem" }}>
          <span style={{ color: "var(--term-prompt)" }}>$ </span>
          <span className="cursor-blink-accent">▋</span>
        </span>
      </div>
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function TechStack() {
  const [inView, setInView]       = useState(false);
  const [isMobile, setIsMobile]   = useState(false);
  const sectionRef                = useRef<HTMLElement>(null);
  const [cmdTyped, setCmdTyped]   = useState("");

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Detect scroll into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Typing animation (desktop only)
  useEffect(() => {
    if (!inView || isMobile) return;
    if (cmdTyped.length >= CMD.length) return;
    const t = setTimeout(() => setCmdTyped(CMD.slice(0, cmdTyped.length + 1)), 38);
    return () => clearTimeout(t);
  }, [inView, isMobile, cmdTyped]);

  const cmdDone = cmdTyped.length >= CMD.length;

  // Build row list with staggered delays
  let cursor = 0;
  const rows: { cat: Category; skill: SkillRow; catIdx: number; skillIdx: number; delay: number }[] = [];
  CATEGORIES.forEach((cat, ci) => {
    cat.skills.forEach((skill, si) => {
      rows.push({ cat, skill, catIdx: ci, skillIdx: si, delay: cursor * 120 });
      cursor++;
    });
  });
  const allDelay = cursor * 120 + 200;

  return (
    <section
      ref={sectionRef}
      id="stack"
      style={{ padding: "clamp(64px, 8vw, 96px) 1.5rem", maxWidth: "1152px", margin: "0 auto", position: "relative", zIndex: 1 }}
    >
      <ScrollReveal>
        <SectionHeader label="// stack" title="Tools I build with." />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div
          style={{
            maxWidth: 780,
            background: "var(--term-bg)",
            border: "1px solid var(--term-border)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          {/* Title bar */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
            <span className="mac-dot-red"    style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)", pointerEvents: "none" }}>
              stack.js
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: "1.1rem 1.25rem 1.25rem", overflowX: isMobile ? "hidden" : "auto" }}>
            {isMobile
              ? <MobileTree />
              : <DesktopTree cmdDone={cmdDone} inView={inView} rows={rows} allDelay={allDelay} />
            }
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
