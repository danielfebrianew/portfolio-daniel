export interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  type: string;
  startDate: string;
  endDate: string;
  current: boolean;
  built: string[];
  stack: string[];
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "artha-growth",
    company: "CV Artha Growth",
    location: "Madiun",
    role: "Fullstack Software Engineer",
    type: "Full-time",
    startDate: "Nov 2025",
    endDate: "Present",
    current: true,
    built: ["Pohon Kinerja", "E-Kinerja"],
    stack: ["Spring Boot", "Golang Echo", "Next.js", "MySQL", "PostgreSQL", "Docker"],
    highlights: [
      "Built Pohon Kinerja — hierarchical KPI system used by 200+ government employees",
      "Built E-Kinerja — internal Jira-like PM tool adopted by 3 engineering teams",
      "Deployed with Docker Compose on company VPS",
    ],
  },
  {
    id: "freelance",
    company: "Freelance",
    location: "Remote",
    role: "Fullstack Engineer",
    type: "Freelance",
    startDate: "Jan 2026",
    endDate: "Mar 2026",
    current: false,
    built: ["Arisan Platform"],
    stack: ["NestJS", "Next.js", "PostgreSQL", "Nginx"],
    highlights: [
      "Built Arisan Platform — end-to-end digital savings group management",
      "Lead a team of 3 engineer: auth, payments, admin dashboard, mobile UI",
    ],
  },
  {
    id: "jasa-cipta",
    company: "Koperasi Jasa Cipta Makmur Damai",
    location: "Remote",
    role: "Fullstack Software Engineer",
    type: "Contract",
    startDate: "Dec 2025",
    endDate: "Feb 2025",
    current: false,
    built: ["NovusNext Gen"],
    stack: ["Next.js", "OpenAI API", "Gemini API", "Seedance", "FFmpeg", "Docker"],
    highlights: [
      "Sole engineer — designed, built, and deployed an AI video generation platform",
      "Integrated 4 AI APIs in a single automated pipeline",
      "Reduced video production time from 4 hours to 8 minutes",
    ],
  },
];

export const education = {
  school: "UPN \"Veteran\" Yogyakarta",
  degree: "Bachelor of Informatics",
  year: "2025",
  gpa: "3.78 / 4.00",
};
