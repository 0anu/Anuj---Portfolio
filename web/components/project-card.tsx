import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col gap-4 rounded-md border border-border bg-surface p-6 surface-lift transition-colors hover:border-border-strong hover:bg-surface-raised"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-label uppercase tracking-[0.08em] text-accent-text">
          {project.domain}
        </span>
        <span
          aria-hidden="true"
          className="text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          ↗
        </span>
      </div>
      <h3 className="text-h4 text-fg-strong">{project.title}</h3>
      <p className="text-body text-fg-muted">{project.summary}</p>
      <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-2 font-mono text-label text-fg-subtle">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
    </Link>
  );
}
