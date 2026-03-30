const snippets = [
  `SELECT u.name, COUNT(t.id) AS tasks
FROM users u
JOIN tasks t ON t.user_id = u.id
WHERE t.status = 'done'
GROUP BY u.id
ORDER BY tasks DESC;`,

  `func (h *Handler) CreateTask(c echo.Context) error {
  var req CreateTaskRequest
  if err := c.Bind(&req); err != nil {
    return echo.ErrBadRequest
  }
  task, err := h.svc.Create(c.Request().Context(), req)
  if err != nil {
    return err
  }
  return c.JSON(http.StatusCreated, task)
}`,

  `export async function generateScript(topic: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SCRIPT_SYSTEM_PROMPT },
      { role: "user", content: topic },
    ],
    temperature: 0.7,
  });
  return completion.choices[0].message.content;
}`,
];

const positions = [
  { top: "15%", left: "2%", floatClass: "float-1" },
  { top: "40%", right: "2%", floatClass: "float-2" },
  { top: "70%", left: "1%", floatClass: "float-3" },
];

export function FloatingCode() {
  return (
    <>
      {snippets.map((code, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={positions[i].floatClass}
          style={{
            position: "fixed",
            top: positions[i].top,
            left: "left" in positions[i] ? (positions[i] as { left: string }).left : undefined,
            right: "right" in positions[i] ? (positions[i] as { right: string }).right : undefined,
            zIndex: 0,
            pointerEvents: "none",
            maxWidth: "320px",
            filter: "blur(1.5px)",
            opacity: 0.04,
          }}
        >
          <pre
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "10px",
              lineHeight: 1.6,
              color: "var(--foreground)",
              whiteSpace: "pre",
              margin: 0,
            }}
          >
            {code}
          </pre>
        </div>
      ))}
    </>
  );
}
