"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured);
const medium   = projects.filter((p) => !p.featured);

export function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(64px, 8vw, 96px) 1.5rem",
        maxWidth: "1152px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
      }}
    >
      <ScrollReveal>
        <SectionHeader label="// projects" title="Things I've built." />
      </ScrollReveal>

      {/* Row 1: NovusNext (2/3) + Pohon Kinerja (1/3) */}
      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem", marginBottom: "1rem" }}
        className="bento-row"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard project={featured[0]} featured />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProjectCard project={medium[0]} />
        </motion.div>
      </div>

      {/* Row 2: Arisan (1/3) + WorkTracker (2/3) */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1rem" }}
        className="bento-row"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ProjectCard project={medium[1]} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <ProjectCard project={featured[1]} featured />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .bento-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
