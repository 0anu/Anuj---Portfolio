import Link from "next/link";
import type { CSSProperties } from "react";
import { getProjectHue, type Project } from "@/lib/projects";
import { ChipList } from "@/components/ui/badge";
import { ArrowUpRight, Icon } from "@/components/ui/icons";
import { FlowPreview } from "@/components/flow-preview";

type Variant = "feature" | "compact";

/**
 * Project card. "feature" is the wide homepage treatment (visual + problem +
 * highlights); "compact" is the grid card on /projects. Both read only from
 * the Project type, so a new entry in lib/projects.ts needs no UI work.
 */
export function ProjectCard({
  project,
  variant = "compact",
  index,
}: {
  project: Project;
  variant?: Variant;
  index?: number;
}) {
  const href = `/projects/${project.slug}`;
  const tone = { "--tone-h": getProjectHue(project) } as CSSProperties;
  const steps = project.architectureFlows?.[0]?.steps ?? project.architecture;

  if (variant === "feature") {
    return (
      <article
        style={tone}
        className="card card-interactive group grid overflow-hidden md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
      >
        <div className="relative flex min-h-56 items-center overflow-hidden border-b border-border bg-bg-subtle p-6 md:border-r md:border-b-0 md:p-8">
          <div className="tone-glow absolute inset-0" aria-hidden="true" />
          <div className="backdrop-grid absolute inset-0 opacity-60" aria-hidden="true" />
          <FlowPreview steps={steps} />
          {index !== undefined ? (
            <span
              className="absolute top-5 left-6 font-mono text-label text-fg-subtle tabular-nums md:left-8"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div className="flex items-center justify-between gap-4">
            <span className="tone-text font-mono text-label uppercase tracking-[0.12em]">
              {project.domain}
            </span>
            <span className="font-mono text-label text-fg-subtle">{project.status}</span>
          </div>
          <h3 className="mt-3 text-h3 text-fg-strong">
            <Link href={href} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </h3>
          <p className="mt-3 text-body text-fg-muted">{project.summary}</p>

          <dl className="mt-5 space-y-3 border-l border-border pl-4">
            <div>
              <dt className="font-mono text-label uppercase tracking-[0.1em] text-fg-subtle">
                Problem
              </dt>
              <dd className="mt-1 text-caption text-fg">{project.problem}</dd>
            </div>
            <div>
              <dt className="font-mono text-label uppercase tracking-[0.1em] text-fg-subtle">
                Engineering highlight
              </dt>
              <dd className="mt-1 text-caption text-fg">{project.concerns[0]}</dd>
            </div>
          </dl>

          <ChipList items={project.stack} className="mt-6" />

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
            <span className="inline-flex items-center gap-1.5 text-caption font-medium text-accent-text">
              Read case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <ProjectLinks project={project} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article style={tone} className="card card-interactive group flex flex-col overflow-hidden">
      <div className="relative h-44 overflow-hidden border-b border-border bg-bg-subtle px-5">
        <div className="tone-glow absolute inset-0" aria-hidden="true" />
        <div className="backdrop-grid absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex h-full items-center">
          <FlowPreview steps={steps} max={3} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="tone-text font-mono text-label uppercase tracking-[0.12em]">
            {project.domain}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-fg-subtle transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg-strong"
          />
        </div>
        <h3 className="mt-3 text-h4 text-fg-strong">
          <Link href={href} className="after:absolute after:inset-0 after:content-['']">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-caption text-fg-muted">{project.summary}</p>
        <ChipList items={project.stack} className="mt-auto pt-5" />
        {project.links.length > 0 ? (
          <div className="mt-4 flex gap-4">
            <ProjectLinks project={project} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** External repo/demo links. Sit above the card's stretched link (z-10). */
export function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 inline-flex items-center gap-1.5 text-caption text-fg-muted transition-colors hover:text-fg-strong"
        >
          {link.kind === "github" ? (
            <Icon name="github" />
          ) : (
            <ArrowUpRight className="h-3.5 w-3.5" />
          )}
          {link.label}
        </a>
      ))}
    </>
  );
}
