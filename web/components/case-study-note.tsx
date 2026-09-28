export function CaseStudyNote() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-border-strong bg-bg-subtle px-4 py-3.5">
      <span
        className="pulse mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
        aria-hidden="true"
      />
      <p className="font-mono text-caption text-fg-muted">
        Case study in progress — metrics, outcomes, and write-up to follow.
      </p>
    </div>
  );
}
