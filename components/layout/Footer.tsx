"use client";

import { personal } from "@/data/personal";
import { Mail } from "lucide-react";
import { GithubIcon } from "@/components/shared/GithubIcon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ borderTop: "1px solid var(--border)", padding: "1.5rem", background: "var(--background)" }}
      role="contentinfo"
    >
      <div style={{ maxWidth: "1152px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center" }}>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            style={{ color: "var(--muted-foreground)", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")}
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            style={{ color: "var(--muted-foreground)", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--foreground)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--muted-foreground)")}
          >
            <Mail size={18} />
          </a>
        </div>

        <p style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.65rem", color: "var(--muted-foreground)", margin: 0 }}>
          © {year} Daniel Febrian Eka Wijaya. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
