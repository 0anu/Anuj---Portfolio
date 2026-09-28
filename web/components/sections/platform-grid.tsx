import Link from "next/link";
import { platformSections } from "@/lib/platform";
import { StatusBadge } from "@/components/ui/badge";
import { ArrowUpRight, Icon } from "@/components/ui/icons";

/** Writing / Tutorials / Labs — the platform surfaces this site grows into. */
export function PlatformGrid() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {platformSections.map((section) => (
        <li key={section.href} className="reveal flex">
          <div className="card card-interactive group flex w-full flex-col p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,oklch(83%_0.13_200/18%),oklch(70%_0.17_292/18%))] text-[1.2rem] text-fg-strong">
                <Icon name={section.icon} />
              </span>
              <StatusBadge status={section.status} />
            </div>
            <p className="mt-6 font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
              {section.label}
            </p>
            <h3 className="mt-1.5 text-h4 text-fg-strong">
              <Link href={section.href} className="after:absolute after:inset-0 after:content-['']">
                {section.title}
              </Link>
            </h3>
            <p className="mt-2 text-caption text-fg-muted">{section.description}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-caption text-accent-text">
              Explore {section.label.toLowerCase()}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
