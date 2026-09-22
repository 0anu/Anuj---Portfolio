function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 text-fg-subtle"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PipelineDiagram({ steps, label }: { steps: string[]; label?: string }) {
  return (
    <div className="rounded-md border border-border bg-bg-subtle p-5 md:p-6">
      {label ? (
        <div className="mb-4 font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
          {label}
        </div>
      ) : null}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded border border-border-strong bg-surface px-3 py-2 surface-lift">
              <span className="font-mono text-label text-fg-subtle tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-caption text-fg">{step}</span>
            </div>
            {index < steps.length - 1 ? <Arrow /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
