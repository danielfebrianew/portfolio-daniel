# portfolio-daniel

Personal portfolio site for **Daniel Febrian Eka Wijaya** — a fullstack engineer who ships end-to-end web apps. Built as a VSCode-inspired, terminal-themed single page with light/dark switching.

Live: [danielfebrian.dev](https://danielfebrian.dev)

---

## Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Styling:** Tailwind CSS v4 + CSS variables for the VSCode Light+ / Dark+ palette
- **Animation:** Framer Motion
- **Icons:** [devicon](https://devicon.dev) (via CDN) for brand glyphs + lucide-react for UI icons
- **Typography:** Space Mono (mono), Amiko (sans), EB Garamond (serif) — all via `next/font`
- **Package manager:** Bun (lockfile committed; npm/pnpm/yarn also work)

---

## Getting started

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script         | What it does                       |
| -------------- | ---------------------------------- |
| `bun run dev`   | Start Next dev server              |
| `bun run build` | Production build                   |
| `bun run start` | Serve the production build         |
| `bun run lint`  | Run ESLint                         |

---

## Project layout

```
app/
  layout.tsx        # root: fonts, theme provider, devicon CDN
  page.tsx          # composes all sections
  globals.css       # theme tokens (--term-*, --devicon-invert, etc.)

components/
  sections/         # Hero, About, TechStack, Projects, Experience, Contact
  shared/           # SectionHeader, ProjectCard, TechPill, TimelineItem
  animated/         # ScrollReveal, TiltCard, MatrixRain, TypeWriter, DotGrid, …
  ThemeProvider.tsx # light/dark toggle (persists in localStorage)

data/
  projects.json     # project content
  projects.ts       # types + loader

hooks/              # useInView, useMousePosition, useScrollProgress
lib/utils.ts        # cn() helper
public/             # static assets (images, CV pdf, og-image)
```

---

## Theming

The whole palette is driven by CSS custom properties in [app/globals.css](app/globals.css):

- Light mode (`:root`) uses the VSCode Light+ palette.
- Dark mode (`.dark`) uses VSCode Dark+.
- The `ThemeProvider` toggles the `.dark` class on `<html>` and writes to `localStorage`.

Key tokens: `--term-bg`, `--term-bg-bar`, `--term-border`, `--term-text`, `--term-text-dim`, `--term-keyword`, `--term-string`, `--term-func`, `--term-type`, `--term-comment`, `--term-prompt`.

`--devicon-invert` flips dark brand glyphs (Next.js, OpenAI, GitHub) when the page is in dark mode.

---

## Editing content

- **Projects** — edit [data/projects.json](data/projects.json). Each entry needs `id`, `title`, `subtitle`, `oneLiner`, `role`, `type`, `tech[]`, `problem`, `solution`, `impact`, `highlights[]`, and optional `images[]`.
- **Tech stack pills** — edit the `CATEGORIES` array in [components/sections/TechStack.tsx](components/sections/TechStack.tsx). Each skill uses a devicon class (e.g. `nextjs-plain`) or a lucide `fallback` for techs devicon doesn't ship.
- **Tech → icon mapping** for project cards lives in [components/shared/TechPill.tsx](components/shared/TechPill.tsx). Lookup is lowercased so `"Next.js"`, `"NEXTJS"`, etc. all work.
- **Experience / About / Hero copy** — directly inside the matching `components/sections/*.tsx` file.

### Adding a new tech icon

1. Check the [devicon manifest](https://devicon.dev) for a matching class (e.g. `redis-plain`).
2. Add it to the `ICON_MAP` in `TechPill.tsx` keyed by the lowercased tech name:
   ```ts
   "redis": { icon: "redis-plain", color: "#DC382D" },
   ```
3. If devicon doesn't ship the icon, use a lucide-react component as `fallback` instead of `icon`.
4. Set `invertOnDark: true` for dark glyphs so they flip in dark mode.

---

## Deployment

Optimized for Vercel — push to `main` and let it build. The site is a fully static Next.js export aside from theme persistence.

```bash
bun run build
bun run start
```

---

## License

Personal portfolio — code is reference-only, content (copy, images, CV) is © Daniel Febrian Eka Wijaya.
