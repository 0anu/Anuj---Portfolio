import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, getProjectHue } from "@/lib/projects";
import { Container } from "@/components/ui/section";
import { ChipList } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { PipelineDiagram } from "@/components/pipeline-diagram";
import { CaseStudyNote } from "@/components/case-study-note";
import { ProjectLinks } from "@/components/project-card";

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
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title: project.title, description: project.summary, type: "article" },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projects = getAllProjects();
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;
  const tone = { "--tone-h": getProjectHue(project) } as CSSProperties;

  const spec = [
    { label: "Domain", value: project.domain },
    { label: "Stack", value: `${project.stack.length} technologies` },
    { label: "Pipeline", value: `${project.architecture.length} steps` },
    { label: "Status", value: project.status },
  ];

  return (
    <article style={tone}>
      {/* Header */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
        <div className="tone-glow absolute inset-0 opacity-80" aria-hidden="true" />
        <Container className="relative pt-10 pb-14 md:pt-14 md:pb-20">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-caption text-fg-muted transition-colors hover:text-fg-strong"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            All projects
          </Link>
          <p className="tone-text mt-10 animate-rise font-mono text-label uppercase tracking-[0.14em]">
            {project.domain}
          </p>
          <h1 className="mt-4 max-w-4xl animate-rise text-h1 text-fg-strong [animation-delay:60ms]">
            {project.title}
          </h1>
          <p className="mt-5 max-w-3xl animate-rise text-body-lg text-fg-muted [animation-delay:120ms]">
            {project.summary}
          </p>
          <div className="mt-7 flex animate-rise flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:180ms]">
            <ChipList items={project.stack} />
            {project.links.length > 0 ? (
              <div className="flex gap-4">
                <ProjectLinks project={project} />
              </div>
            ) : null}
          </div>

          <dl className="mt-12 grid animate-rise grid-cols-2 overflow-hidden rounded-2xl border border-border bg-bg/70 backdrop-blur md:grid-cols-4 [animation-delay:240ms]">
            {spec.map((item, i) => (
              <div
                key={item.label}
                className={`p-4 md:p-5 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} ${
                  i === 1 ? "md:border-r" : ""
                } border-border`}
              >
                <dt className="font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-caption text-fg-strong">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      <div className="panel-inverse sheet my-4 sm:my-6">
        <Container className="py-16 md:py-24">
          {/* Problem */}
          <section
            aria-labelledby="problem-title"
            className="reveal grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12"
          >
            <h2
              id="problem-title"
              className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle md:pt-2"
            >
              The problem
            </h2>
            <p className="max-w-3xl text-h3 font-medium text-fg-strong">{project.problem}</p>
          </section>

          <div className="divider-fade my-14 md:my-20" />

          {/* Architecture */}
          <section aria-labelledby="architecture-title" className="reveal">
            <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
              <h2
                id="architecture-title"
                className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle md:pt-2"
              >
                Architecture
              </h2>
              <div className="space-y-4">
                {project.architectureFlows ? (
                  project.architectureFlows.map((flow) => (
                    <PipelineDiagram key={flow.label} steps={flow.steps} label={flow.label} />
                  ))
                ) : (
                  <PipelineDiagram steps={project.architecture} />
                )}
              </div>
            </div>
          </section>

          <div className="divider-fade my-14 md:my-20" />

          {/* Engineering concerns */}
          <section aria-labelledby="concerns-title" className="reveal">
            <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-12">
              <h2
                id="concerns-title"
                className="font-mono text-label uppercase tracking-[0.14em] text-fg-subtle md:pt-2"
              >
                Engineering concerns
              </h2>
              <div>
                <ol className="grid gap-4 lg:grid-cols-3">
                  {project.concerns.map((concern, i) => (
                    <li key={concern} className="card p-5">
                      <span className="tone-text font-mono text-label tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 text-caption text-fg">{concern}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-6">
                  <CaseStudyNote />
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-t border-border bg-bg">
        <Container className="grid gap-4 py-10 md:grid-cols-2 md:py-14">
          <Link href={`/projects/${prev.slug}`} className="card card-interactive group p-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-2 block text-h3 text-fg-strong">{prev.title}</span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="card card-interactive group p-6 md:text-right"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
              Next
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-2 block text-h3 text-fg-strong">{next.title}</span>
          </Link>
        </Container>
      </nav>
    </article>
  );
}
