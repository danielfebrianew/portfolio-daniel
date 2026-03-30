"use client";

import { motion } from "framer-motion";
import type { ExperienceItem } from "@/data/experience";

interface TimelineItemProps {
  item: ExperienceItem;
  index: number;
  isLast: boolean;
}

export function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ display: "flex", gap: "1.5rem" }}
    >
      {/* Dot + line */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "var(--primary)",
            border: "2px solid var(--background)",
            flexShrink: 0,
            marginTop: "0.35rem",
          }}
        />
        {!isLast && (
          <div style={{ width: 1, flex: 1, background: "var(--term-border)", margin: "0.4rem 0" }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: isLast ? 0 : "2.5rem", flex: 1 }}>
        {/* Date */}
        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text-dim)", marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--term-prompt)" }}>% </span>
          {item.startDate} — {item.endDate}
        </p>

        <motion.div
          whileHover={{ x: 4 }}
          transition={{ duration: 0.18 }}
          style={{
            background: "var(--term-bg)",
            border: "1px solid var(--term-border)",
            borderRadius: "0.75rem",
            overflow: "hidden",
            backdropFilter: "blur(10px)",
            transition: "border-color 0.2s, box-shadow 0.2s",
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
          {/* Terminal title bar */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.45rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
            
            {/* Bagian Kiri: Mac Dots */}
            <div style={{ display: "flex", gap: "0.5rem", zIndex: 1 }}>
              <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
              <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
              <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
            </div>

            {/* Bagian Tengah: Title (Absolute Center) */}
            <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6rem", color: "var(--term-text-dim)", zIndex: 0 }}>
              {item.id}
            </span>

            {/* Bagian Kanan: Badge ACTIVE atau Kosong */}
            <div style={{ zIndex: 1, display: "flex", justifyContent: "flex-end" }}>
              {item.current && (
                <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", color: "var(--term-type)", background: "rgba(78,201,176,0.1)", border: "1px solid rgba(78,201,176,0.25)", borderRadius: "3px", padding: "1px 6px" }}>
                  ACTIVE
                </span>
              )}
            </div>
            
          </div>

          <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
            <h3 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1rem", fontWeight: 700, color: "var(--term-type)", margin: "0 0 0.2rem" }}>
              {item.company}
            </h3>
            <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.68rem", color: "var(--term-text-dim)", margin: "0 0 0.875rem" }}>
              {item.role} · {item.type} · {item.location}
            </p>

            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.35rem" }}>
              {item.highlights.map((h) => (
                <li key={h} style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", color: "var(--term-text)", display: "flex", gap: "0.75rem", lineHeight: 1.7 }}>
                  <span style={{ color: "var(--term-keyword)", flexShrink: 0 }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
