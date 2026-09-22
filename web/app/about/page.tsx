import type { Metadata } from "next";
import { person } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

function Marginalia({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-label leading-relaxed text-fg-subtle before:mr-1 before:content-['—']">
      {children}
    </p>
  );
}

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-3xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">About</p>
        <h1 className="mt-4 font-serif text-display text-fg-strong">
          From pipelines to reasoning systems
        </h1>
      </header>

      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,68ch)_1fr]">
        <div className="space-y-7 font-serif text-prose text-fg">
          <p>
            {person.name} works as a {person.role}, building the systems that move data reliably
            from where it happens to where it&apos;s needed — webhooks, queues, transformations,
            warehouses. The unglamorous plumbing that everything else depends on.
          </p>
          <p>
            That work is event-driven pipelines and reverse ETL as much as it is batch jobs and SQL:
            Freshdesk tickets flowing through Lambda and SQS into a MySQL warehouse, HubSpot kept in
            sync in both directions with internal systems. Python, Spark, Pandas and NumPy for the
            transformation layer; AWS and GCP — Lambda, SQS, S3, BigQuery, Cloud Run — for where it
            runs.
          </p>

          <aside className="panel-inverse rounded-md px-6 py-6 not-italic">
            <p className="font-serif text-h4 leading-snug">
              &ldquo;The direction is Data Engineering → AI/Data Engineering → Agentic AI — treating
              agents as another kind of pipeline: one that reasons at each step instead of just
              transforming.&rdquo;
            </p>
          </aside>

          <p>
            That direction shows up directly in the project work: LangGraph agents that research and
            reason before producing an explainable recommendation, and a computer-vision pipeline —
            YOLO segmentation tuned with LoRA and Optuna — feeding a chain of agents that assess,
            check policy, and report. RAG, prompt engineering, tool integration and stateful
            multi-agent design sit alongside the data engineering, not apart from it.
          </p>
          <p>
            The throughline is systems that hold up under real inputs: pipelines that don&apos;t
            silently drop events, agents that can explain the step that led to a conclusion. This
            site is where that work gets written up as it happens.
          </p>
        </div>

        <div className="hidden space-y-10 pt-2 lg:block">
          <Marginalia>Event-driven pipelines, not just batch.</Marginalia>
          <Marginalia>Agents treated as reasoning pipelines.</Marginalia>
          <Marginalia>CV and LLM work share the same rigor as the data layer.</Marginalia>
        </div>
      </div>
    </article>
  );
}
