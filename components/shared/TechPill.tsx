import { cn } from "@/lib/utils";

interface TechPillProps {
  name: string;
  className?: string;
}

export function TechPill({ name, className }: TechPillProps) {
  return (
    <span
      className={cn("inline-block", className)}
      style={{
        fontFamily: "var(--font-space-mono), monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.04em",
        color: "var(--term-func)",
        background: "rgba(220,220,170,0.08)",
        border: "1px solid rgba(220,220,170,0.18)",
        borderRadius: "4px",
        padding: "2px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  );
}
