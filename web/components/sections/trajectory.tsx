import Link from "next/link";
import { stages } from "@/lib/experience";
import { getProjectBySlug } from "@/lib/projects";
import { ChipList } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";

/**
 * The Data → AI/Data → Agentic trajectory. Three connected columns on
 * desktop; a vertical rail with nodes on mobile and tablet.
 */
export function Trajectory({ showTools = true }: { showTools?: boolean }) {
  return (
    <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
      {/* Desktop connector rail */}
      <span
        aria-hidden="true"
        className="absolute top-[2.15rem] right-[16%] left-[16%] hidden h-px bg-[linear-gradient(90deg,var(--accent),var(--accent-2))] opacity-40 lg:block"
      />
      {stages.map((stage, i) => (
        <li key={stage.label} className="reveal relative flex gap-4 lg:flex-col lg:gap-0">
          {/* Mobile rail */}
          <div className="flex flex-col items-center lg:hidden" aria-hidden="true">
            <span className="mt-6 h-3 w-3 shrink-0 rounded-full border-2 border-accent bg-bg-deep" />
            {i < stages.length - 1 ? (
              <span className="mt-1 w-px flex-1 bg-[linear-gradient(var(--border-strong),transparent)]" />
            ) : null}
          </div>

          <div className="card flex-1 p-6">
            <div className="flex items-center gap-3">
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-bg-deep font-mono text-label text-accent-text">
                {stage.step}
              </span>
              <span className="font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
                Stage {i + 1} of {stages.length}
              </span>
            </div>
            <h3 className="mt-5 text-h3 text-fg-strong">{stage.label}</h3>
            <p className="mt-2 text-caption text-fg-muted">{stage.description}</p>
            {showTools ? <ChipList items={stage.tools} className="mt-5" /> : null}
            {stage.projectSlugs.length > 0 ? (
              <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                {stage.projectSlugs.map((slug) => {
                  const project = getProjectBySlug(slug);
                  if (!project) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/projects/${slug}`}
                        className="group inline-flex items-center gap-1.5 text-caption text-accent-text"
                      >
                        {project.title}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-5 border-t border-border pt-4 font-mono text-label text-fg-subtle">
                Applied across the projects on either side of it.
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
