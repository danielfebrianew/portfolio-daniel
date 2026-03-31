"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { CountUp } from "@/components/animated/CountUp";
import { SectionHeader } from "@/components/shared/SectionHeader";

const mono = "var(--font-space-mono), monospace";
const CMD = "node about.js";

const STATS = [
  { key: "apps_shipped",  value: "4+",  label: "production apps", countTo: 4,  prefix: "",  suffix: "+" },
  { key: "tech_stacks",   value: "4",   label: "tech stacks",     countTo: 4,  prefix: "",  suffix: "" },
  { key: "time_to_learn", value: "~3",  label: "wks to learn",    countTo: 3,  prefix: "~", suffix: "" },
  { key: "lines_of_code", value: "50k+",label: "lines of code",   countTo: 50, prefix: "",  suffix: "k+" },
];

const SECTIONS = ["bio", "approach", "stats", "footer"] as const;
type Section = (typeof SECTIONS)[number];

const reveal = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

export function About() {
  const [inView, setInView]     = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);
  const [cmdTyped, setCmdTyped] = useState("");
  const [revealed, setRevealed] = useState<Set<Section>>(new Set());
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

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

  useEffect(() => {
    if (!inView || cmdTyped.length >= CMD.length) return;
    const t = setTimeout(() => setCmdTyped(CMD.slice(0, cmdTyped.length + 1)), 42);
    return () => clearTimeout(t);
  }, [inView, cmdTyped]);

  const cmdDone = cmdTyped.length >= CMD.length;

  useEffect(() => {
    if (!cmdDone) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    SECTIONS.forEach((s, i) => {
      timers.push(setTimeout(() => setRevealed((prev) => new Set(prev).add(s)), 200 + i * 220));
    });
    return () => timers.forEach(clearTimeout);
  }, [cmdDone]);

  const has = (s: Section) => revealed.has(s);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ padding: "clamp(64px, 8vw, 96px) 1.5rem", maxWidth: "1152px", margin: "0 auto", position: "relative", zIndex: 1 }}
    >
      <ScrollReveal>
        <SectionHeader label="// about" title="I ship full products, not just features." />
      </ScrollReveal>

      {/* Terminal window */}
      <div
        style={{
          maxWidth: 760,
          background: "var(--term-bg)",
          border: "1px solid var(--term-border)",
          borderRadius: "0.75rem",
          overflow: "hidden",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(86,156,214,0.33)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 30px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--term-border)";
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";
        }}
      >
        {/* Title bar */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.55rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
          <span className="mac-dot-red"    style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
          <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
          <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
          <span style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: "0.6rem", color: "var(--term-text-dim)", pointerEvents: "none" }}>
            about.js
          </span>
          <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: "0.55rem", color: "var(--term-text-dim)" }}>
            readonly
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem 1.75rem 1.75rem" }}>

          {/* $ node about.js */}
          <div style={{ marginBottom: "1.25rem" }}>
            <span style={{ fontFamily: mono, fontSize: "0.75rem" }}>
              <span style={{ color: "var(--term-prompt)" }}>$ </span>
              <span style={{ color: "var(--term-text)" }}>{cmdTyped}</span>
              {!cmdDone && inView && <span className="cursor-blink">_</span>}
            </span>
          </div>

          <AnimatePresence>
            {cmdDone && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>

                {/* Bio — bright */}
                {has("bio") && (
                  <motion.p {...reveal} style={{
                    fontFamily: mono,
                    fontSize: "clamp(0.72rem, 1.4vw, 0.82rem)",
                    color: "var(--term-text)",
                    lineHeight: 1.85,
                    margin: "0 0 1.25rem",
                  }}>
                    I build{" "}
                    <span style={{ color: "var(--term-type)" }}>end-to-end web applications</span>
                    {" "}— from{" "}
                    <span style={{ color: "var(--term-keyword)" }}>database schema design</span>
                    {" "}to polished,{" "}
                    <span style={{ color: "var(--term-string)" }}>production-ready UIs</span>
                    . In under a year, I've already shipped{" "}
                    <span style={{ color: "var(--term-func)", fontWeight: 700 }}>four production applications</span>
                    , extending across AI video generation platforms, performance management systems, and social savings apps.
                  </motion.p>
                )}

                {/* Approach — same brightness, syntax highlights */}
                {has("approach") && (
                  <motion.p {...reveal} style={{
                    fontFamily: mono,
                    fontSize: "clamp(0.72rem, 1.4vw, 0.82rem)",
                    color: "var(--term-text)",
                    lineHeight: 1.85,
                    margin: "0 0 1.75rem",
                  }}>
                    My approach is T-shaped: I go deep on backend (
                    <span style={{ color: "var(--term-keyword)" }}>Spring Boot</span>,{" "}
                    <span style={{ color: "var(--term-keyword)" }}>Golang</span>,{" "}
                    <span style={{ color: "var(--term-keyword)" }}>NestJS</span>) while staying sharp on the frontend (
                    <span style={{ color: "var(--term-type)" }}>Next.js</span>,{" "}
                    <span style={{ color: "var(--term-type)" }}>React</span>). I pick up new tech stacks fast — usually production-ready in{" "}
                    <span style={{ color: "var(--term-string)" }}>3-4 weeks</span>{" "}
                    — because I focus on transferable fundamentals: good architecture, clean data modeling, and honest error handling.
                  </motion.p>
                )}

                {/* Stats grid */}
                {has("stats") && (
                  <motion.div
                    {...reveal}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                      gap: "0.625rem",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {STATS.map((stat) => (
                      <div
                        key={stat.key}
                        onMouseEnter={() => setHoveredStat(stat.key)}
                        onMouseLeave={() => setHoveredStat(null)}
                        style={{
                          background: hoveredStat === stat.key ? "rgba(78,201,176,0.08)" : "rgba(78,201,176,0.03)",
                          border: `1px solid ${hoveredStat === stat.key ? "rgba(78,201,176,0.35)" : "rgba(78,201,176,0.15)"}`,
                          borderRadius: "0.5rem",
                          padding: "1rem 0.75rem",
                          textAlign: "center",
                          transition: "all 0.2s",
                          cursor: "default",
                        }}
                      >
                        <p style={{ fontFamily: mono, fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 700, color: "#4EC9B0", margin: "0 0 4px", lineHeight: 1 }}>
                          <CountUp target={stat.countTo} prefix={stat.prefix} suffix={stat.suffix} />
                        </p>
                        <p style={{ fontFamily: mono, fontSize: "0.55rem", color: "var(--term-text-dim)", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Footer prompt */}
                {has("footer") && (
                  <motion.div {...reveal}>
                    <span style={{ fontFamily: mono, fontSize: "0.75rem" }}>
                      <span style={{ color: "var(--term-prompt)" }}>$ </span>
                      <span className="cursor-blink-accent">▋</span>
                    </span>
                  </motion.div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
