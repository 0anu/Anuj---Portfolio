import type { Metadata } from "next";
import { person } from "@/lib/site";
import { Container, PageHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { Trajectory } from "@/components/sections/trajectory";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "About",
  description: `${person.name}, ${person.role} — from event-driven data pipelines toward agentic AI.`,
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Event-driven, not just batch",
    body: "Webhooks, queues, and idempotent workers — data that arrives when it happens, and survives being delivered twice.",
  },
  {
    title: "Agents are reasoning pipelines",
    body: "The same discipline as a data pipeline: clear steps, explicit state, and every conclusion traceable to its inputs.",
  },
  {
    title: "Same rigor, every layer",
    body: "Computer vision and LLM work are held to the same standard as the data layer they sit on.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            From pipelines to{" "}
            <span className="font-serif font-normal tracking-[-0.02em] italic">
              <span className="text-gradient">reasoning systems</span>
            </span>
          </>
        }
        description={`${person.name} · ${person.role} · ${person.direction}`}
      />

      <Container className="py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr] lg:gap-16">
          <div className="space-y-6 text-prose text-fg">
            <p className="reveal">
              I work as a {person.role}, building the systems that move data reliably from where it
              happens to where it&apos;s needed — webhooks, queues, transformations, warehouses. The
              unglamorous plumbing that everything else depends on.
            </p>
            <p className="reveal">
              That work is event-driven pipelines and reverse ETL as much as it is batch jobs and
              SQL: Freshdesk tickets flowing through Lambda and SQS into a MySQL warehouse, HubSpot
              kept in sync in both directions with internal systems. Python, Spark, Pandas and NumPy
              for the transformation layer; AWS and GCP — Lambda, SQS, S3, BigQuery, Cloud Run — for
              where it runs.
            </p>

            <blockquote className="reveal relative my-10 overflow-hidden rounded-2xl border border-border-strong bg-surface px-6 py-7 md:px-8">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-[linear-gradient(var(--accent),var(--accent-2))]"
              />
              <p className="font-serif text-h3 leading-snug font-normal text-fg-strong italic">
                &ldquo;The direction is Data Engineering → AI/Data Engineering → Agentic AI —
                treating agents as another kind of pipeline: one that reasons at each step instead
                of just transforming.&rdquo;
              </p>
            </blockquote>

            <p className="reveal">
              That direction shows up directly in the project work: LangGraph agents that research
              and reason before producing an explainable recommendation, and a computer-vision
              pipeline — YOLO segmentation tuned with LoRA and Optuna — feeding a chain of agents
              that assess, check policy, and report. RAG, prompt engineering, tool integration and
              stateful multi-agent design sit alongside the data engineering, not apart from it.
            </p>
            <p className="reveal">
              The throughline is systems that hold up under real inputs: pipelines that don&apos;t
              silently drop events, agents that can explain the step that led to a conclusion. This
              site is where that work gets written up as it happens.
            </p>
            <div className="reveal flex flex-wrap gap-3 pt-4">
              <ButtonLink href="/projects">
                See the projects
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/experience" variant="secondary">
                Experience
              </ButtonLink>
            </div>
          </div>

          <aside aria-label="Principles" className="lg:pt-2">
            <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <h2 className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
                How I work
              </h2>
              {principles.map((p, i) => (
                <div key={p.title} className="reveal card p-5">
                  <span className="font-mono text-label text-accent-text tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h4 text-fg-strong">{p.title}</h3>
                  <p className="mt-1.5 text-caption text-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>

      <section
        aria-labelledby="trajectory-title"
        className="border-t border-border bg-bg py-16 md:py-24"
      >
        <Container>
          <p className="eyebrow">Trajectory</p>
          <h2 id="trajectory-title" className="mt-4 mb-10 text-h2 text-fg-strong">
            Three stages, one throughline
          </h2>
          <Trajectory showTools={false} />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
