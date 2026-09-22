import Link from "next/link";
import { person, primaryNav } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="font-mono text-label uppercase tracking-[0.08em] text-fg-subtle">
          © {year} {person.name}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-caption text-fg-muted hover:text-fg-strong transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
