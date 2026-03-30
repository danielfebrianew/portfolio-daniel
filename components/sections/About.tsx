"use client";

import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { CountUp } from "@/components/animated/CountUp";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { personal } from "@/data/personal";

const stats = [
  { label: "Production Apps", countTo: 4, prefix: "", suffix: "+" },
  { label: "Tech Stacks",     countTo: 4, prefix: "", suffix: "" },
  { label: "Wks to Learn",    countTo: 3, prefix: "~", suffix: "" },
  { label: "Lines of Code",   countTo: 50, prefix: "", suffix: "k+" },
];

export function About() {
  return (
    <section
      id="about"
      style={{
        padding: "clamp(64px, 8vw, 96px) 1.5rem",
        maxWidth: "1152px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ScrollReveal>
        <SectionHeader label="// about" title="I ship full products, not just features." />
      </ScrollReveal>

      {/* Bio block */}
      <ScrollReveal delay={0.1}>
        <div
          style={{
            maxWidth: 720,
            background: "var(--term-bg)",
            border: "1px solid var(--term-border)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            marginBottom: "1.5rem",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
            <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--term-text-dim)" }}>
              cat about.md
            </span>
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)" }}>readonly</span>
          </div>
          <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
            <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8rem", color: "var(--term-text)", lineHeight: 1.9, margin: "0 0 0.875rem" }}>
              {personal.description}
            </p>
            <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.8rem", color: "var(--term-text-dim)", lineHeight: 1.9, margin: 0 }}>
              {personal.bioExtended}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats grid */}
      <ScrollReveal delay={0.2}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "0.75rem",
            maxWidth: 680,
            marginBottom: "1.5rem",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--term-bg)",
                border: "1px solid var(--term-border)",
                borderRadius: "0.75rem",
                padding: "1.25rem 1rem",
                textAlign: "center",
                backdropFilter: "blur(10px)",
                transition: "box-shadow 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--term-border)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "2.25rem",
                  fontWeight: 700,
                  color: "var(--primary)",
                  margin: "0 0 0.25rem",
                  lineHeight: 1,
                }}
              >
                <CountUp target={stat.countTo} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p
                style={{
                  fontFamily: "var(--font-space-mono), monospace",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--term-text-dim)",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--term-comment)" }}>
          <span style={{ color: "var(--term-text-dim)" }}>% </span>
          <span style={{ color: "var(--term-text-dim)" }}># </span>
          {personal.personalNote}
        </p>
      </ScrollReveal>
    </section>
  );
}
