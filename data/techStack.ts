export type TechCategory = "Backend" | "Frontend" | "Database" | "DevOps" | "AI/API";

export interface Tech {
  id: string;
  symbol: string;
  name: string;
  detail: string;
  category: TechCategory;
  usedIn: string[];
  experience: string;
  patterns?: string;
}

export const techStack: Tech[] = [
  // Backend
  {
    id: "spring-boot",
    symbol: "SB",
    name: "Spring Boot",
    detail: "6mo",
    category: "Backend",
    usedIn: ["Pohon Kinerja", "WorkTracker"],
    experience: "6 months production",
    patterns: "REST API, JDBC Template, raw SQL",
  },
  {
    id: "nestjs",
    symbol: "NJ",
    name: "NestJS",
    detail: "6mo",
    category: "Backend",
    usedIn: ["Arisan Platform"],
    experience: "6 months production",
    patterns: "REST API, Prisma ORM, Guards",
  },
  {
    id: "go-echo",
    symbol: "Go",
    name: "Go Echo",
    detail: "3mo",
    category: "Backend",
    usedIn: ["WorkTracker"],
    experience: "3 months production",
    patterns: "REST API, GORM, middleware",
  },
  {
    id: "nextjs",
    symbol: "Nx",
    name: "Next.js",
    detail: "9mo",
    category: "Frontend",
    usedIn: ["NovusNext Gen", "WorkTracker", "Pohon Kinerja"],
    experience: "9 months production",
    patterns: "App Router, SSR, ISR",
  },
  {
    id: "react",
    symbol: "Re",
    name: "React",
    detail: "9mo",
    category: "Frontend",
    usedIn: ["All projects"],
    experience: "9 months",
    patterns: "Hooks, context, component design",
  },
  // Database
  {
    id: "postgresql",
    symbol: "PG",
    name: "PostgreSQL",
    detail: "fluent",
    category: "Database",
    usedIn: ["Arisan Platform", "WorkTracker"],
    experience: "Fluent — schema design to query opt.",
    patterns: "Indexes, CTEs, transactions",
  },
  {
    id: "mysql",
    symbol: "MY",
    name: "MySQL",
    detail: "fluent",
    category: "Database",
    usedIn: ["Pohon Kinerja"],
    experience: "Fluent",
    patterns: "Stored procedures, raw SQL",
  },
  // DevOps
  {
    id: "docker",
    symbol: "Dk",
    name: "Docker",
    detail: "Compose",
    category: "DevOps",
    usedIn: ["NovusNext Gen", "Pohon Kinerja"],
    experience: "Production compose stacks",
    patterns: "Multi-service compose, networking",
  },
  {
    id: "pm2",
    symbol: "PM",
    name: "PM2",
    detail: "prod",
    category: "DevOps",
    usedIn: ["Arisan Platform"],
    experience: "Production process manager",
    patterns: "Cluster mode, log management",
  },
  {
    id: "nginx",
    symbol: "Ng",
    name: "Nginx",
    detail: "prod",
    category: "DevOps",
    usedIn: ["Arisan Platform", "NovusNext Gen"],
    experience: "Reverse proxy, SSL termination",
    patterns: "Proxy pass, rate limiting",
  },
  // AI/API
  {
    id: "openai",
    symbol: "OA",
    name: "OpenAI API",
    detail: "scripting",
    category: "AI/API",
    usedIn: ["NovusNext Gen"],
    experience: "GPT-4 scripting pipeline",
    patterns: "Chat completions, prompt engineering",
  },
  {
    id: "gemini",
    symbol: "Gm",
    name: "Gemini API",
    detail: "TTS/Img",
    category: "AI/API",
    usedIn: ["NovusNext Gen"],
    experience: "TTS + image generation",
    patterns: "Gemini 1.5 Flash, streaming",
  },
  {
    id: "seedance",
    symbol: "Sd",
    name: "Seedance",
    detail: "video",
    category: "AI/API",
    usedIn: ["NovusNext Gen"],
    experience: "AI video generation API",
    patterns: "Async job polling, webhook",
  },
  {
    id: "fal-ai",
    symbol: "Ff",
    name: "fal.ai / FFmpeg",
    detail: "stitch",
    category: "AI/API",
    usedIn: ["NovusNext Gen"],
    experience: "Video stitching pipeline",
    patterns: "FFmpeg concat, audio sync",
  },
];
