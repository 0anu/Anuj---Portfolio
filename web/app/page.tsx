import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { capabilityGroups, person } from "@/lib/site";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <section className="relative overflow-hidden bg-bg-deep bg-bloom">
        <div className="absolute inset-0 bg-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
          <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">
            {person.role}
          </p>
          <h1 className="mt-5 max-w-3xl text-display text-fg-strong">
            Data pipelines that hold up, agents that reason through them.
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-fg-muted">
            {person.name} builds event-driven data systems and is moving that craft toward agentic
            AI — {person.direction}.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="rounded-md bg-accent px-5 py-2.5 text-caption font-medium text-accent-contrast transition-opacity hover:opacity-90"
            >
              View projects
            </Link>
            <Link
              href="/about"
              className="rounded-md border border-border-strong px-5 py-2.5 text-caption text-fg transition-colors hover:border-fg-subtle"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="text-h2 text-fg-strong">Selected projects</h2>
          <Link href="/projects" className="text-caption text-accent-text hover:underline">
            All projects →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-bg">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="mb-10 text-h2 text-fg-strong">Capabilities</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-3 font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
                  {group.label}
                </h3>
                <ul className="space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-body text-fg">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-md border border-border bg-surface p-8 surface-lift md:p-10">
          <span className="font-mono text-label uppercase tracking-[0.08em] text-accent-text">
            Labs
          </span>
          <h2 className="mt-3 text-h2 text-fg-strong">Interactive AI labs, in progress</h2>
          <p className="mt-4 max-w-2xl text-body text-fg-muted">
            A standalone agents package — RAG over this site&apos;s own content, multi-agent
            workflows — is being built beside the static site, not into it. The manifest tracks
            what&apos;s planned.
          </p>
          <Link
            href="/labs"
            className="mt-6 inline-block text-caption text-accent-text hover:underline"
          >
            View the labs manifest →
          </Link>
        </div>
      </section>

      <section className="panel-inverse">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="text-h2 text-fg-strong">Building a data or AI system?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-fg-muted">
            Reach out to talk pipelines, agentic AI, or anything in between.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-md bg-accent px-6 py-3 text-caption font-medium text-accent-contrast transition-opacity hover:opacity-90"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
