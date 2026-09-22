import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tutorials" };

interface Tutorial {
  title: string;
  description: string;
}

const tutorials: Tutorial[] = [
  {
    title: "Building a webhook-to-warehouse pipeline",
    description:
      "Lambda, SQS, and idempotent enrichment — the shape behind the Freshdesk pipeline.",
  },
  {
    title: "A LangGraph agent from scratch",
    description:
      "Tool calling, multi-step reasoning, and an explainable output — the shape behind Pricing Genie.",
  },
  {
    title: "Fine-tuning a segmentation model with LoRA",
    description: "YOLO segmentation, LoRA adapters, and Optuna sweeps — the shape behind VehiDE.",
  },
];

export default function TutorialsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">
          Tutorials
        </p>
        <h1 className="mt-4 text-h1 text-fg-strong">Walkthroughs, planned</h1>
        <p className="mt-4 text-body-lg text-fg-muted">
          Frames are reserved so future video and diagram embeds won&apos;t shift the layout. No
          recordings exist yet.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {tutorials.map((tutorial) => (
          <div key={tutorial.title}>
            <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-border-strong bg-bg-subtle">
              <span className="font-mono text-label uppercase tracking-[0.1em] text-fg-subtle">
                Planned
              </span>
            </div>
            <h2 className="mt-4 text-h4 text-fg-strong">{tutorial.title}</h2>
            <p className="mt-2 text-body text-fg-muted">{tutorial.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
