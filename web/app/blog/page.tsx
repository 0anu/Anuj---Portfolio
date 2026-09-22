import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

interface Category {
  label: string;
  description: string;
}

const categories: Category[] = [
  {
    label: "Data Engineering",
    description:
      "Event-driven pipelines, reverse ETL, and the data-modeling decisions behind projects like the Freshdesk pipeline and the HubSpot integration.",
  },
  {
    label: "Cloud & Infrastructure",
    description:
      "Notes on running data and AI workloads on AWS and GCP — Lambda, SQS, S3, BigQuery, Cloud Run — and the cost/architecture trade-offs behind them.",
  },
  {
    label: "Agentic AI",
    description:
      "LangGraph and LangChain in practice: tool calling, stateful multi-agent design, RAG, and prompt engineering, grounded in projects like Pricing Genie.",
  },
  {
    label: "Computer Vision",
    description:
      "Segmentation, fine-tuning, and hyperparameter search — YOLO, LoRA, and Optuna — as used in the VehiDE damage-assessment pipeline.",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">Blog</p>
        <h1 className="mt-4 text-h1 text-fg-strong">Nothing published yet</h1>
        <p className="mt-4 text-body-lg text-fg-muted">
          The categories below are where writing will land as it&apos;s produced. This ledger is the
          plan, not a backlog of drafts.
        </p>
      </header>

      <div className="divide-y divide-border border-y border-border">
        {categories.map((category) => (
          <div
            key={category.label}
            className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[16rem_1fr] md:gap-8"
          >
            <h2 className="font-mono text-caption uppercase tracking-[0.06em] text-fg-strong">
              {category.label}
            </h2>
            <p className="max-w-2xl text-body text-fg-muted">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
