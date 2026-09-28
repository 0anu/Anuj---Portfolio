import { ArrowRight } from "@/components/ui/icons";

/**
 * Architecture diagram as real DOM (an ordered list), not Mermaid: static
 * content shouldn't ship a diagram runtime. Stacks vertically on small
 * screens and wraps horizontally from md up.
 */
export function PipelineDiagram({ steps, label }: { steps: string[]; label?: string }) {
  return (
    <figure className="card relative overflow-hidden p-5 md:p-7">
      <div className="backdrop-grid absolute inset-0 opacity-50" aria-hidden="true" />
      {label ? (
        <figcaption className="relative mb-5 flex items-center gap-2 font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {label}
        </figcaption>
      ) : null}
      <ol className="relative flex flex-col gap-0 md:flex-row md:flex-wrap md:items-center md:gap-y-4">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li key={`${step}-${index}`} className="flex flex-col md:flex-row md:items-center">
              <div
                className={`flex items-center gap-3 rounded-xl border bg-surface px-3.5 py-2.5 shadow-[0_1px_0_0_oklch(100%_0_0/5%)_inset] ${
                  last ? "border-[oklch(83%_0.13_200/45%)]" : "border-border-strong"
                }`}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-bg-subtle font-mono text-label text-fg-subtle tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-caption text-fg-strong">{step}</span>
              </div>
              {!last ? (
                <>
                  <span
                    aria-hidden="true"
                    className="ml-[1.6rem] h-4 w-px bg-border-strong md:hidden"
                  />
                  <ArrowRight
                    aria-hidden="true"
                    className="mx-2 hidden h-4 w-4 shrink-0 text-fg-subtle md:block"
                  />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
