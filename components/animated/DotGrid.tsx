export function DotGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `radial-gradient(circle, var(--dot-grid-color) 1.5px, transparent 1.5px)`,
        backgroundSize: "24px 24px",
      }}
    />
  );
}
