"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { techStack, type TechCategory } from "@/data/techStack";

const categories: TechCategory[] = ["Backend", "Frontend", "Database", "DevOps", "AI/API"];

const categoryColors: Record<TechCategory, string> = {
  Backend:  "var(--term-keyword)",
  Frontend: "var(--term-type)",
  Database: "var(--term-string)",
  DevOps:   "var(--term-func)",
  "AI/API": "var(--term-comment)",
};

const categoryColorsRaw: Record<TechCategory, string> = {
  Backend:  "#569cd6",
  Frontend: "#4ec9b0",
  Database: "#ce9178",
  DevOps:   "#dcdcaa",
  "AI/API": "#6a9955",
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | "All">("All");
  const [tooltip, setTooltip] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? techStack
    : techStack.filter((tech) => tech.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    All:      "all",
    Backend:  "backend",
    Frontend: "frontend",
    Database: "database",
    DevOps:   "devops",
    "AI/API": "ai/api",
  };

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

      {/* Category filter */}
      <ScrollReveal delay={0.1}>
        <div
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}
          role="tablist"
          aria-label="Tech categories"
        >
          {(["All", ...categories] as const).map((cat) => {
            const isActive = activeCategory === cat;
            const color = cat === "All" ? "var(--primary)" : categoryColors[cat as TechCategory];
            const colorRaw = cat === "All" ? "#569cd6" : categoryColorsRaw[cat as TechCategory];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as TechCategory | "All")}
                role="tab"
                aria-selected={isActive}
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.06em",
                  padding: "5px 14px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: isActive ? `1px solid ${colorRaw}` : "1px solid var(--term-border)",
                  background: isActive ? `${colorRaw}18` : "transparent",
                  color: isActive ? color : "var(--term-text-dim)",
                }}
              >
                [ {categoryLabels[cat]} ]
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Tech grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
          gap: "0.625rem",
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((tech, i) => {
            const color = categoryColors[tech.category];
            const colorRaw = categoryColorsRaw[tech.category];
            return (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.035 }}
                onClick={() => setTooltip(tooltip === tech.id ? null : tech.id)}
                style={{ position: "relative", cursor: "pointer", userSelect: "none" }}
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    background: "var(--term-bg)",
                    border: `1px solid ${colorRaw}33`,
                    borderRadius: "0.5rem",
                    padding: "0.875rem 0.625rem",
                    textAlign: "center",
                    height: 120,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backdropFilter: "blur(8px)",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onHoverStart={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.boxShadow = `0 0 16px ${colorRaw}22`;
                    el.style.borderColor = `${colorRaw}88`;
                  }}
                  onHoverEnd={(e) => {
                    const el = e.target as HTMLElement;
                    el.style.boxShadow = "";
                    el.style.borderColor = `${colorRaw}33`;
                  }}
                >
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1.1rem", fontWeight: 700, color, lineHeight: 1 }}>
                    {tech.symbol}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--term-text)", lineHeight: 1.3, textAlign: "center" }}>
                    {tech.name}
                  </span>
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", color: "var(--term-text-dim)" }}>
                    {tech.detail}
                  </span>
                </motion.div>

                {/* Tooltip */}
                <AnimatePresence>
                  {tooltip === tech.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 20,
                        background: "var(--term-bg)",
                        border: `1px solid ${colorRaw}88`,
                        borderRadius: "0.5rem",
                        padding: "0.75rem 1rem",
                        minWidth: 210,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.5rem" }}>
                        // {tech.category}
                      </p>
                      <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text)", margin: "0 0 0.35rem", fontWeight: 700 }}>
                        {tech.experience}
                      </p>
                      {tech.patterns && (
                        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--term-text-dim)", margin: "0 0 0.35rem" }}>
                          {tech.patterns}
                        </p>
                      )}
                      <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-comment)", margin: 0 }}>
                        used_in: [{tech.usedIn.join(", ")}]
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
