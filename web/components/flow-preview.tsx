/**
 * Compact, decorative preview of a project's architecture: the first few
 * steps as connected nodes. The full, accessible diagram lives on the case
 * study page, so this one is aria-hidden.
 */
export function FlowPreview({ steps, max = 5 }: { steps: string[]; max?: number }) {
  const shown = steps.slice(0, max);
  const remaining = steps.length - shown.length;

  return (
    <ol aria-hidden="true" className="relative mx-auto flex w-full max-w-[19rem] flex-col gap-0">
      {shown.map((step, i) => (
        <li key={`${step}-${i}`} className="flex flex-col items-start">
          <div
            className="flex items-center gap-2.5 rounded-lg border border-border-strong bg-surface/90 px-3 py-1.5 shadow-[0_1px_0_0_var(--card-sheen)_inset] transition-transform duration-300 group-hover:translate-x-1"
            style={{ marginLeft: `${i * 6}%`, transitionDelay: `${i * 40}ms` }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                background:
                  i === 0
                    ? "var(--fg-subtle)"
                    : i === shown.length - 1
                      ? "var(--accent-2)"
                      : "oklch(83% 0.13 var(--tone-h, 200))",
              }}
            />
            <span className="truncate font-mono text-[0.6875rem] text-fg">{step}</span>
          </div>
          {i < shown.length - 1 ? (
            <span
              className="my-0.5 h-3 w-px bg-[linear-gradient(var(--border-strong),transparent)]"
              style={{ marginLeft: `calc(${i * 6}% + 1.1rem)` }}
            />
          ) : null}
        </li>
      ))}
      {remaining > 0 ? (
        <li
          className="mt-1.5 font-mono text-[0.6875rem] text-fg-subtle"
          style={{ marginLeft: `calc(${(shown.length - 1) * 6}% + 0.25rem)` }}
        >
          +{remaining} more steps
        </li>
      ) : null}
    </ol>
  );
}
