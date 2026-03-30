"use client";

import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { Mail, Download } from "lucide-react";
import { GithubIcon } from "@/components/shared/GithubIcon";
import { personal } from "@/data/personal";

export function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "clamp(64px, 8vw, 96px) 1.5rem",
        position: "relative",
        zIndex: 1,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto" }}>

        <ScrollReveal>
          <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.75rem" }}>
            // contact
          </p>
          <h2 style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 0.5rem" }}>
            Let&apos;s build something together.
          </h2>
          <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.72rem", color: "var(--term-comment)", margin: "0 0 2.5rem", lineHeight: 1.8 }}>
            <span style={{ color: "var(--term-text-dim)" }}># </span>
            {personal.availability}
          </p>
        </ScrollReveal>

        {/* Terminal card */}
        <ScrollReveal delay={0.1}>
          <div
            style={{
              maxWidth: 560,
              background: "var(--term-bg)",
              border: "1px solid var(--term-border)",
              borderRadius: "0.75rem",
              overflow: "hidden",
              backdropFilter: "blur(10px)",
              marginBottom: "2rem",
            }}
          >
            {/* title bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderBottom: "1px solid var(--term-border)", background: "var(--term-bg-bar)" }}>
              <span className="mac-dot-red"   style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
              <span className="mac-dot-yellow" style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
              <span className="mac-dot-green"  style={{ width: 10, height: 10, borderRadius: "50%", display: "block", flexShrink: 0 }} aria-hidden="true" />
              <span style={{ flex: 1, textAlign: "center", fontFamily: "var(--font-space-mono), monospace", fontSize: "0.62rem", color: "var(--term-text-dim)" }}>
                contact.sh
              </span>
            </div>

            <div style={{ padding: "1.25rem" }}>
              {/* Links */}
              <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.5rem" }}>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--term-keyword)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  <span style={{ color: "var(--term-prompt)" }}>% </span>
                  <GithubIcon size={14} />
                  github.com/danielfebrianew
                </a>
                <a
                  href={`mailto:${personal.email}`}
                  style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--term-keyword)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.625rem", transition: "opacity 0.2s" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                >
                  <span style={{ color: "var(--term-prompt)" }}>% </span>
                  <Mail size={14} />
                  {personal.email}
                </a>
              </div>

              {/* CTAs */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a
                  href={`mailto:${personal.email}`}
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--primary-foreground)",
                    background: "var(--primary)",
                    borderRadius: "5px",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    letterSpacing: "0.03em",
                    transition: "opacity 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "0.85"; el.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.opacity = "1"; el.style.transform = "scale(1)"; }}
                >
                  <Mail size={14} />
                  Send Email
                </a>
                <a
                  href={personal.cv}
                  download
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.75rem",
                    color: "var(--foreground)",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "5px",
                    padding: "0.625rem 1.25rem",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    letterSpacing: "0.03em",
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--primary)"; el.style.transform = "scale(1.03)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = "var(--border)"; el.style.transform = "scale(1)"; }}
                >
                  <Download size={14} />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
