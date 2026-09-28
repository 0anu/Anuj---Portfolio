"use client";

import { useState } from "react";
import { getProjectCategories, type Project } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

const ALL = "All";

/**
 * Filterable project grid. The full list is server-rendered into the static
 * HTML; filtering is purely client-side, so crawlers see every project.
 */
export function ProjectGrid({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState(ALL);
  const visible =
    active === ALL
      ? projects
      : projects.filter((project) => getProjectCategories(project).includes(active));

  const count = (category: string) =>
    category === ALL
      ? projects.length
      : projects.filter((p) => getProjectCategories(p).includes(category)).length;

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {[ALL, ...categories].map((category) => {
          const selected = active === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-caption transition-colors ${
                selected
                  ? "border-transparent bg-fg-strong text-bg-deep"
                  : "border-border-strong text-fg-muted hover:border-tint-border hover:text-fg-strong"
              }`}
            >
              {category}
              <span
                className={`font-mono text-label tabular-nums ${selected ? "text-bg-deep/60" : "text-fg-subtle"}`}
              >
                {count(category)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug} className="flex">
            <div className="flex w-full animate-rise">
              <ProjectCard project={project} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
