"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "@/components/shared/GithubIcon";
import { TypeWriter } from "@/components/animated/TypeWriter";
import { personal } from "@/data/personal";

const SKILLS = ["springboot", "nest-js", "golang", "next-js", "mysql", "postgresql", "docker"];
const LINES = ["whoami", "cat bio.md", "ls skills/"];

const lineReveal = (done: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
  transition: { duration: 0.35, delay, ease: "easeOut" as const },
});

export function Hero() {
  const [completedLines, setCompletedLines] = useState<number[]>([]);
  const allDone = completedLines.length >= LINES.length;

  const lineComplete = (i: number) =>
    setCompletedLines((prev) => (prev.includes(i) ? prev : [...prev, i]));

  const done0 = completedLines.includes(0);
  const done1 = completedLines.includes(1);
  const done2 = completedLines.includes(2);

  return (
    <section
      id="hero"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "96px 1.5rem 4rem", position: "relative", zIndex: 1, overflow: "hidden" }}
    >

      <div style={{ maxWidth: 680, width: "100%", textAlign: "center", position: "relative", zIndex: 2 }}>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          style={{
            background: "var(--term-bg)",
            borderRadius: "0.75rem",
            border: "1px solid var(--term-border)",
            marginBottom: "2rem",
            textAlign: "left",
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {/* macOS title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.65rem 1rem", background: "var(--term-bg-bar)", borderBottom: "1px solid var(--term-border)" }}>
            <span className="mac-dot-red"   style={{ width: 12, height: 12, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-yellow" style={{ width: 12, height: 12, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-green"  style={{ width: 12, height: 12, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-text-dim)", letterSpacing: "0.02em" }}>
              daniel@dev: ~
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>

            {/* Prompt + TypeWriter */}
            <div style={{ marginBottom: "0.75rem" }}>
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.875rem", color: "var(--term-text)", margin: 0, lineHeight: 1.7 }}>
                <span style={{ color: "var(--term-type)" }}>daniel</span>
                <span style={{ color: "var(--term-text-dim)" }}>@</span>
                <span style={{ color: "var(--term-keyword)" }}>dev</span>
                <span style={{ color: "var(--term-text-dim)" }}> ~ </span>
                <span style={{ color: "var(--term-prompt)" }}>% </span>
                <TypeWriter lines={LINES} speed={48} delay={500} onLineComplete={lineComplete} />
              </p>

              {/* whoami output */}
              <AnimatePresence>
                {done0 && (
                  <motion.div
                    {...lineReveal(done0, 0.1)}
                    style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.875rem", flexWrap: "wrap" }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      style={{ flexShrink: 0 }}
                    >
                      <Image
                        src="/profile-picture.png"
                        alt="Daniel Febrian Eka Wijaya"
                        width={72}
                        height={72}
                        priority
                        style={{ borderRadius: "10px", objectFit: "cover", display: "block", border: "1px solid var(--term-border)" }}
                      />
                    </motion.div>
                    <div>
                      <p style={{ fontFamily: "var(--font-eb-garamond), serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 700, color: "var(--term-text)", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
                        Daniel Febrian
                        <br />
                        Eka Wijaya
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* cat bio output */}
            <AnimatePresence>
              {done1 && (
                <motion.div {...lineReveal(done1, 0.05)} style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8rem", color: "var(--term-string)", margin: "0 0 0.2rem" }}>
                    {personal.role}
                  </p>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-comment)", margin: 0 }}>
                    {personal.location}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ls skills output */}
            <AnimatePresence>
              {done2 && (
                <motion.div {...lineReveal(done2, 0.05)}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                    {SKILLS.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-func)", background: "rgba(220,220,170,0.08)", border: "1px solid rgba(220,220,170,0.18)", borderRadius: "4px", padding: "2px 8px" }}
                      >
                        {skill}/
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final prompt */}
            {allDone && (
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.875rem", color: "var(--term-text)", margin: "0.875rem 0 0" }}>
                <span style={{ color: "var(--term-type)" }}>daniel</span>
                <span style={{ color: "var(--term-text-dim)" }}>@</span>
                <span style={{ color: "var(--term-keyword)" }}>dev</span>
                <span style={{ color: "var(--term-text-dim)" }}> ~ </span>
                <span style={{ color: "var(--term-prompt)" }}>% </span>
                <span className="cursor-blink-accent">▋</span>
              </p>
            )}
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={allDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1rem", color: "var(--muted-foreground)", lineHeight: 1.75, margin: "0 auto 2rem", maxWidth: 480 }}
        >
          {personal.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={allDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.9rem", fontWeight: 600, color: "var(--primary-foreground)", background: "var(--primary)", borderRadius: "0.5rem", padding: "0.75rem 1.5rem", textDecoration: "none", transition: "opacity 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.transform = "scale(1)"; }}
          >
            View Projects
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.9rem", fontWeight: 600, color: "var(--foreground)", background: "transparent", border: "1px solid var(--border)", borderRadius: "0.5rem", padding: "0.75rem 1.5rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem", transition: "border-color 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--primary)"; el.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--border)"; el.style.transform = "scale(1)"; }}
          >
            <GithubIcon size={16} />
            GitHub →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={allDone ? { opacity: 0.5 } : {}}
        transition={{ delay: 0.5 }}
        className="bounce-slow"
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", color: "var(--muted-foreground)" }}
        aria-hidden="true"
      >
        <ChevronDown size={22} />
      </motion.div>
    </section>
  );
}
