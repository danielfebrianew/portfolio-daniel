import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <p
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.75rem",
          color: "var(--muted-foreground)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "0.75rem",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "var(--foreground)",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}
