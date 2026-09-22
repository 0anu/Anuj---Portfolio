import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { CaseStudyNote } from "@/components/case-study-note";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getAllProjects();
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <>
      <article className="mx-auto max-w-6xl px-6 py-20">
        <header className="max-w-3xl">
          <Link href="/projects" className="text-caption text-fg-subtle hover:text-fg-muted">
            ← All projects
          </Link>
          <p className="mt-6 font-mono text-label uppercase tracking-[0.1em] text-accent-text">
            {project.domain}
          </p>
          <h1 className="mt-3 text-h1 text-fg-strong">{project.title}</h1>
          <p className="mt-5 text-body-lg text-fg-muted">{project.summary}</p>
        </header>

        {/* Spec bar — hairline cells, mono */}
        <div className="mt-10 grid grid-cols-2 border border-border md:grid-cols-4">
          <div className="border-b border-r border-border p-4 md:border-b-0">
            <div className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Domain
            </div>
            <div className="mt-1 text-caption text-fg">{project.domain}</div>
          </div>
          <div className="border-b border-border p-4 md:border-b-0 md:border-r">
            <div className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Stack
            </div>
            <div className="mt-1 text-caption text-fg">{project.stack.join(", ")}</div>
          </div>
          <div className="border-r border-border p-4">
            <div className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Steps
            </div>
            <div className="mt-1 text-caption text-fg tabular-nums">
              {project.architecture.length}
            </div>
          </div>
          <div className="p-4">
            <div className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Status
            </div>
            <div className="mt-1 text-caption text-fg">Case study in progress</div>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-5 text-h3 text-fg-strong">Architecture</h2>
          {project.architectureFlows ? (
            <div className="space-y-5">
              {project.architectureFlows.map((flow) => (
                <PipelineDiagram key={flow.label} steps={flow.steps} label={flow.label} />
              ))}
            </div>
          ) : (
            <PipelineDiagram steps={project.architecture} />
          )}
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,68ch)_1fr]">
          <div className="space-y-5 text-body-lg text-fg">
            <p>{project.summary}</p>
            <CaseStudyNote />
          </div>
          <aside>
            <h3 className="mb-4 font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Engineering concerns
            </h3>
            <ul className="space-y-4">
              {project.concerns.map((concern) => (
                <li key={concern} className="text-caption text-fg-muted">
                  {concern}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>

      <Link
        href={`/projects/${next.slug}`}
        className="group block border-t border-border bg-bg-subtle transition-colors hover:bg-surface"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-14">
          <div>
            <p className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
              Next project
            </p>
            <h2 className="mt-2 text-h1 text-fg-strong transition-colors group-hover:text-accent-text">
              {next.title}
            </h2>
          </div>
          <span aria-hidden="true" className="shrink-0 text-2xl text-fg-subtle">
            →
          </span>
        </div>
      </Link>
    </>
  );
}
