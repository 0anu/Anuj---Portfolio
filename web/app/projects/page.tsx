import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">Projects</p>
        <h1 className="mt-4 text-h1 text-fg-strong">Data and agentic AI systems</h1>
      </header>

      <div className="border-t border-border">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group grid grid-cols-1 gap-3 border-b border-border py-8 transition-colors hover:bg-bg-subtle/50 md:grid-cols-[3rem_1fr_auto] md:items-baseline md:gap-6 md:px-4"
          >
            <span className="font-mono text-caption tabular-nums text-fg-subtle">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-h1 text-fg-strong transition-colors group-hover:text-accent-text">
                {project.title}
              </h2>
              <p className="mt-2 max-w-2xl text-body text-fg-muted">{project.summary}</p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mono text-label text-fg-subtle">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>
            <span className="whitespace-nowrap font-mono text-label uppercase tracking-[0.08em] text-fg-subtle md:text-right">
              {project.domain}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
