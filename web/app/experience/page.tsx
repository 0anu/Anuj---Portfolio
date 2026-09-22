import type { Metadata } from "next";
import Link from "next/link";
import { capabilityGroups } from "@/lib/site";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Experience" };

interface Stage {
  label: string;
  description: string;
  tools: string[];
  projectSlugs: string[];
}

const stages: Stage[] = [
  {
    label: "Data Engineering",
    description:
      "Event-driven pipelines, ETL, and reverse ETL — moving data reliably between systems and modeling it for downstream use.",
    tools: ["Python", "SQL", "Spark", "Pandas", "NumPy", "AWS Lambda", "SQS", "MySQL"],
    projectSlugs: ["freshdesk-realtime-data-pipeline", "hubspot-crm-data-integration"],
  },
  {
    label: "AI / Data Engineering",
    description:
      "Bringing LLM tooling into the data layer — retrieval, tool integration, and prompt engineering on top of existing pipelines.",
    tools: ["LangChain", "RAG", "Prompt engineering", "Tool integration", "GCP BigQuery"],
    projectSlugs: [],
  },
  {
    label: "Agentic AI",
    description:
      "Stateful, multi-agent systems that reason across steps — LangGraph workflows and multi-agent computer-vision pipelines.",
    tools: ["LangGraph", "Stateful agents", "Multi-agent systems", "PyTorch", "YOLO", "LoRA"],
    projectSlugs: ["pricing-genie", "vehide"],
  },
];

export default function ExperiencePage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">
          Experience
        </p>
        <h1 className="mt-4 text-h1 text-fg-strong">A trajectory, not a résumé</h1>
        <p className="mt-4 text-body-lg text-fg-muted">
          The through-line from data engineering into agentic AI, and the tools that mark each
          stage.
        </p>
      </header>

      <ol className="relative border-l border-border pl-10">
        {stages.map((stage) => (
          <li key={stage.label} className="mb-14 last:mb-0">
            <span
              className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg-deep"
              aria-hidden="true"
            />
            <h2 className="text-h3 text-fg-strong">{stage.label}</h2>
            <p className="mt-2 max-w-2xl text-body text-fg-muted">{stage.description}</p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-label text-fg-subtle">
              {stage.tools.map((tool) => (
                <li key={tool} className="rounded border border-border px-2 py-1">
                  {tool}
                </li>
              ))}
            </ul>
            {stage.projectSlugs.length > 0 ? (
              <ul className="mt-4 space-y-1">
                {stage.projectSlugs.map((slug) => {
                  const project = projects.find((p) => p.slug === slug);
                  if (!project) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/projects/${slug}`}
                        className="text-caption text-accent-text hover:underline"
                      >
                        → {project.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>

      <section className="mt-20">
        <h2 className="mb-6 text-h2 text-fg-strong">Capabilities</h2>
        <div className="overflow-x-auto rounded-md border border-border">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-bg-subtle">
                <th className="whitespace-nowrap px-4 py-3 font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
                  Domain
                </th>
                <th className="px-4 py-3 font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
                  Tools &amp; concepts
                </th>
              </tr>
            </thead>
            <tbody>
              {capabilityGroups.map((group, i) => (
                <tr key={group.label} className={i % 2 === 1 ? "bg-bg-subtle/40" : undefined}>
                  <td className="whitespace-nowrap border-t border-border px-4 py-3 align-top font-mono text-caption text-fg">
                    {group.label}
                  </td>
                  <td className="border-t border-border px-4 py-3 text-caption text-fg-muted">
                    {group.items.join(" · ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
