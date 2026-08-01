"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { ScrollReveal } from "@/components/animated/ScrollReveal";
import { projects } from "@/data/projects";

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

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
        className="projects-grid"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
          >
            <ProjectCard project={project} featured={project.featured} />
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 767px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
