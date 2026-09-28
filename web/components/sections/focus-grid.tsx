import { focusAreas } from "@/lib/site";
import { Icon } from "@/components/ui/icons";

/** Areas of expertise as a bento grid; three across on desktop. */
export function FocusGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((area) => (
        <li key={area.title} className="reveal flex">
          <div className="card card-interactive group flex w-full flex-col p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-strong bg-bg-subtle text-[1.25rem] text-accent-text transition-colors duration-300 group-hover:border-[oklch(83%_0.13_200/45%)] group-hover:text-fg-strong">
              <Icon name={area.icon} />
            </span>
            <h3 className="mt-5 text-h4 text-fg-strong">{area.title}</h3>
            <p className="mt-2 text-caption text-fg-muted">{area.description}</p>
            <p className="mt-auto pt-5 font-mono text-label text-fg-subtle">
              {area.tools.join("  ·  ")}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
