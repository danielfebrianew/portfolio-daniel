"use client";

import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { experience, education } from "@/data/experience";
import { motion } from "framer-motion";
import { TechPill } from "@/components/shared/TechPill";

export function Experience() {
  return (
    <section
      id="experience"
      style={{
        padding: "clamp(64px, 8vw, 96px) 1.5rem",
        maxWidth: "1152px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ScrollReveal>
        <SectionHeader label="// experience" title="Where I've worked." />
      </ScrollReveal>

      <div style={{ maxWidth: 720 }}>
        {experience.map((exp, i) => {
          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{ display: "flex", gap: "1.5rem" }}
            >
              {/* Dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--primary)", border: "2px solid var(--background)", flexShrink: 0, marginTop: "0.35rem" }} />
                <div style={{ width: 1, flex: 1, background: "var(--term-border)", margin: "0.4rem 0" }} />
              </div>

              {/* Content */}
              <div style={{ paddingBottom: "2.5rem", flex: 1 }}>
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text-dim)", marginBottom: "0.5rem" }}>
                  <span style={{ color: "var(--term-prompt)" }}>% </span>
                  {exp.startDate} — {exp.endDate}
                </p>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  style={{ background: "var(--term-bg)", border: "1px solid var(--term-border)", borderRadius: "0.75rem", overflow: "hidden", backdropFilter: "blur(10px)", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(0,0,0,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--term-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                  {/* Title bar */}
                  <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
                    <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                    <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                    <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ position: "absolute", left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)", pointerEvents: "none" }}>
                      {exp.id}
                    </span>
                    {exp.current && (
                      <span style={{ marginLeft: "auto", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", color: "var(--term-type)", background: "rgba(78,201,176,0.1)", border: "1px solid rgba(78,201,176,0.25)", borderRadius: "3px", padding: "1px 6px" }}>
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1rem", fontWeight: 700, color: "var(--term-type)", margin: "0 0 0.2rem" }}>
                      {exp.company}
                    </h3>
                    <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-text-dim)", margin: "0 0 0.875rem" }}>
                      {exp.role} · {exp.type} · {exp.location}
                    </p>

                    <ul style={{ margin: "0 0 0.875rem", padding: 0, listStyle: "none", display: "grid", gap: "0.35rem" }}>
                      {exp.highlights.map((h) => (
                        <li key={h} style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text)", display: "flex", gap: "0.75rem", lineHeight: 1.7 }}>
                          <span style={{ color: "var(--term-keyword)", flexShrink: 0 }}>▸</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {exp.stack.map((s) => <TechPill key={s} name={s} />)}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}

        {/* Education node */}
        <ScrollReveal direction="left" delay={0.3}>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--term-text-dim)", border: "2px solid var(--background)", flexShrink: 0, marginTop: "0.35rem" }} />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text-dim)", marginBottom: "0.5rem" }}>
                <span style={{ color: "var(--term-prompt)" }}>% </span>
                2021 — {education.year}
              </p>
              <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                  style={{ background: "var(--term-bg)", border: "1px solid var(--term-border)", borderRadius: "0.75rem", overflow: "hidden", backdropFilter: "blur(10px)", transition: "border-color 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 20px rgba(0,0,0,0.15)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--term-border)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
                >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.45rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
                  <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                  <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                  <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                  <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)" }}>
                    upn-veteran
                  </span>
                  <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", color: "var(--term-text-dim)" }}>
                    education
                  </span>
                </div>
                <div style={{ padding: "1rem 1.25rem" }}>
                  <h3 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.95rem", fontWeight: 700, color: "var(--term-text-dim)", margin: "0 0 0.2rem" }}>
                    {education.school}
                  </h3>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-comment)", margin: 0 }}>
                    {education.degree} · {education.year} · GPA: <span style={{ color: "var(--term-text-dim)" }}>{education.gpa}</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
