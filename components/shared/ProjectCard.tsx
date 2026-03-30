"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { TiltCard } from "@/components/animated/TiltCard";
import { TechPill } from "@/components/shared/TechPill";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  labels?: {
    catCmd?: string;
    openLabel?: string;
    roleLabel?: string;
    closeLabel?: string;
    problemLabel?: string;
    solutionLabel?: string;
    impactLabel?: string;
    highlightsLabel?: string;
    stackLabel?: string;
  };
}

export function ProjectCard({ project, featured, labels = {} }: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const open = () => {
    setExpanded(true);
    document.body.setAttribute("data-modal-open", "true");
  };
  const close = () => {
    setExpanded(false);
    document.body.removeAttribute("data-modal-open");
  };
  const {
    catCmd = "cat project.json",
    openLabel = "./open",
    roleLabel = "role",
    closeLabel = "Close",
    problemLabel = "problem",
    solutionLabel = "solution",
    impactLabel = "impact",
    highlightsLabel = "highlights",
    stackLabel = "stack",
  } = labels;

  return (
    <>
      <TiltCard className="h-full">
        <motion.div
          onClick={open}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            height: "100%",
            minHeight: featured ? 400 : 400,
            background: "var(--term-bg)",
            border: "1px solid var(--term-border)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--primary)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 40px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.borderColor = "var(--term-border)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          }}
        >
          {/* Terminal title bar */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)", flexShrink: 0 }}>
            <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)" }}>
              {project.id}
            </span>
            <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", color: "var(--term-text-dim)" }}>
              {project.type.toLowerCase()}
            </span>
          </div>

          {/* Card body */}
          <div style={{ padding: "1.125rem 1.25rem 1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
              {/* Project name */}
              <div style={{ marginBottom: "0.625rem" }}>
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-text-dim)", margin: "0 0 0.2rem" }}>
                  <span style={{ color: "var(--term-prompt)" }}>% </span>{catCmd}
                </p>
                <h3 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1.1rem", fontWeight: 700, color: "var(--term-type)", margin: 0, letterSpacing: "-0.01em" }}>
                  {project.title}
                </h3>
                <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-comment)", margin: "0.2rem 0 0", letterSpacing: "0.04em" }}>
                  // {project.subtitle}
                </p>
              </div>

              {/* One-liner */}
              <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text)", lineHeight: 1.7, margin: "0 0 1rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {project.oneLiner}
              </p>

              {/* Tech pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "1rem" }}>
                {project.tech.slice(0, 5).map((t) => (
                  <TechPill key={t} name={t} />
                ))}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--term-border)", paddingTop: "0.75rem" }}>
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)" }}>
                {roleLabel}: <span style={{ color: "var(--term-string)" }}>{project.role}</span>
              </span>
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--primary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                {openLabel} <ExternalLink size={10} />
              </span>
            </div>
          </div>
        </motion.div>
      </TiltCard>

      {/* Expanded modal — uses simple scale/opacity, NOT layoutId, to avoid TiltCard 3D transform skew */}
      <AnimatePresence>
        {expanded && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(10px)" }}
            />
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 51,
                width: "min(700px, 95vw)",
              }}
            >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                maxHeight: "88vh",
                overflowY: "auto",
                background: "var(--term-bg)",
                border: "1px solid var(--term-border)",
                borderRadius: "0.75rem",
                boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
              }}
            >
              {/* Modal title bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)", position: "sticky", top: 0, zIndex: 1 }}>
                <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
                <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-text-dim)" }}>
                  {project.id} — details
                </span>
                <button
                  onClick={close}
                  aria-label={closeLabel}
                  style={{ background: "none", border: "1px solid var(--term-border)", borderRadius: "4px", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--term-text-dim)", flexShrink: 0 }}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ padding: "1.5rem" }}>
                {/* Header */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1.4rem", fontWeight: 700, color: "var(--term-type)", margin: "0 0 0.2rem" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-comment)", margin: 0 }}>
                    // {project.subtitle} · {project.role} · {project.type}
                  </p>
                </div>

                {/* Problem / Solution / Impact */}
                <div style={{ display: "grid", gap: "1rem", marginBottom: "1.5rem" }}>
                  {[
                    { key: "problem", label: problemLabel, text: project.problem },
                    { key: "solution", label: solutionLabel, text: project.solution },
                    { key: "impact", label: impactLabel, text: project.impact },
                  ].map(({ key, label, text }) => (
                    <div key={key} style={{ background: "var(--card)", border: "1px solid var(--term-border)", borderRadius: "0.5rem", padding: "1rem" }}>
                      <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-comment)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.5rem" }}>
                        // {label}
                      </p>
                      <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--term-text)", lineHeight: 1.8, margin: 0 }}>
                        {text}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.75rem" }}>
                    // {highlightsLabel}
                  </p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.4rem" }}>
                    {project.highlights.map((h) => (
                      <li key={h} style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-text)", display: "flex", gap: "0.75rem", alignItems: "flex-start", lineHeight: 1.7 }}>
                        <span style={{ color: "var(--term-keyword)", flexShrink: 0 }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech stack */}
                <div>
                  <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 0.625rem" }}>
                    // {stackLabel}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {project.tech.map((t) => <TechPill key={t} name={t} />)}
                  </div>
                </div>
              </div>
            </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
