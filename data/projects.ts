import projectsData from "./projects.json";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  role: string;
  type: "Contract" | "Internal" | "Freelance";
  accent: string;
  gradientFrom: string;
  gradientTo: string;
  glowColor: string;
  tech: string[];
  featured: boolean;
  problem: string;
  solution: string;
  impact: string;
  highlights: string[];
}

export const projects: Project[] = projectsData as Project[];
