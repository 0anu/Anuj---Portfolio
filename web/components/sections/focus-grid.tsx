import type { CSSProperties } from "react";
import { focusAreas } from "@/lib/site";
import { Icon } from "@/components/ui/icons";

/** Areas of expertise, three across on desktop; each card carries its own hue. */
export function FocusGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {focusAreas.map((area) => (
        <li
          key={area.title}
          className="reveal flex"
          style={{ "--tone-h": area.hue } as CSSProperties}
        >
          <div className="card card-interactive group flex w-full flex-col overflow-hidden p-6">
            <div
              className="tone-glow pointer-events-none absolute inset-x-0 top-0 h-32 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <span className="icon-tile relative h-11 w-11 text-[1.3rem] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Icon name={area.icon} />
            </span>
            <h3 className="relative mt-5 text-h4 text-fg-strong">{area.title}</h3>
            <p className="relative mt-2 text-caption text-fg-muted">{area.description}</p>
            <ul className="relative mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-5">
              {area.tools.map((tool) => (
                <li key={tool} className="tone-text font-mono text-label">
                  #{tool.toLowerCase().replace(/\s+/g, "-")}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
