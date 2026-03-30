"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  activeSection: string;
  cvHref: string;
}

export function MobileMenu({ open, onClose, links, activeSection, cvHref }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            style={{ position: "fixed", inset: 0, zIndex: 48, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(300px, 85vw)",
              zIndex: 49,
              background: "var(--background)",
              borderLeft: "1px solid var(--border)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              padding: "1.25rem",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
              <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.85rem", fontWeight: 700, color: "var(--term-type)" }}>
                daniel<span style={{ color: "var(--term-text-dim)" }}>@dev</span>
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                style={{ background: "none", border: "1px solid var(--border)", borderRadius: "5px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted-foreground)" }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Links */}
            <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.125rem" }}>
              {links.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }), 300); }}
                    style={{
                      fontFamily: "var(--font-space-mono), monospace",
                      fontSize: "0.85rem",
                      color: isActive ? "var(--primary)" : "var(--muted-foreground)",
                      textDecoration: "none",
                      padding: "0.75rem 1rem",
                      borderRadius: "5px",
                      background: isActive ? "color-mix(in srgb, var(--primary) 8%, transparent)" : "transparent",
                      border: isActive ? "1px solid color-mix(in srgb, var(--primary) 25%, transparent)" : "1px solid transparent",
                      transition: "color 0.2s, background 0.2s",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: isActive ? "var(--primary)" : "var(--term-text-dim)" }}>❯</span>
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>

            {/* CV */}
            <motion.a
              href={cvHref}
              download
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--primary-foreground)",
                background: "var(--primary)",
                borderRadius: "5px",
                padding: "0.75rem 1rem",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <Download size={14} />
              Download CV
            </motion.a>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
