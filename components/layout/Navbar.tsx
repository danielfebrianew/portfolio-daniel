"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Menu, Sun, Moon } from "lucide-react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useTheme } from "@/components/ThemeProvider";
import { MobileMenu } from "./MobileMenu";
import { personal } from "@/data/personal";

const navLinks = [
  { label: "about", href: "#about" },
  { label: "stack", href: "#stack" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];

export function Navbar() {
  const { scrollY } = useScrollProgress();
  const scrolled = scrollY > 50;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setModalOpen(document.body.hasAttribute("data-modal-open"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-modal-open"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { threshold: 0.3, rootMargin: "-64px 0px 0px 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const cycleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const ThemeIcon = theme === "dark" ? Moon : Sun;

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: modalOpen ? 49 : 40,
          height: 56,
          display: "flex",
          alignItems: "center",
          transition: "background 0.3s, box-shadow 0.3s, opacity 0.3s",
          background: scrolled ? "color-mix(in srgb, var(--background) 92%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          opacity: modalOpen ? 0 : 1,
          pointerEvents: modalOpen ? "none" : "auto",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div style={{ width: "100%", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "1rem", fontWeight: 700, color: "var(--term-type)", textDecoration: "none" }}
          >
            daniel
            <span style={{ color: "var(--term-text-dim)" }}>@dev</span>
            <span style={{ color: "var(--term-prompt)" }}>:~</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "1.75rem" }}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                  data-active={isActive}
                  className="nav-link"
                >
                  {link.label}
                </a>
              );
            })}

            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              aria-label={`Theme: ${theme}`}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "5px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted-foreground)", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--foreground)"; el.style.borderColor = "var(--primary)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLButtonElement; el.style.color = "var(--muted-foreground)"; el.style.borderColor = "var(--border)"; }}
            >
              <ThemeIcon size={14} />
            </button>

            {/* CV button */}
            <a
              href={personal.cv}
              download
              style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.04em", color: "var(--primary-foreground)", background: "var(--primary)", borderRadius: "5px", padding: "6px 12px", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.35rem", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
            >
              <Download size={12} />
              CV
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden" style={{ alignItems: "center", gap: "0.625rem" }}>
            <button
              onClick={cycleTheme}
              aria-label={`Theme: ${theme}`}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "5px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--muted-foreground)" }}
            >
              <ThemeIcon size={14} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              style={{ background: "none", border: "1px solid var(--border)", borderRadius: "5px", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--foreground)" }}
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
        activeSection={activeSection}
        cvHref={personal.cv}
      />
    </>
  );
}
