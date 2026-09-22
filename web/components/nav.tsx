import Link from "next/link";
import { person, primaryNav } from "@/lib/site";

export function Nav() {
  return (
    <header className="border-b border-border bg-bg-deep/90 backdrop-blur supports-[backdrop-filter]:bg-bg-deep/70 sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap font-mono text-label uppercase tracking-[0.08em] text-fg-strong transition-colors hover:text-accent-text"
        >
          {person.name}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
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
        </nav>
        <nav aria-label="Primary" className="min-w-0 md:hidden">
          <ul className="flex items-center gap-4 overflow-x-auto">
            {primaryNav.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link href={link.href} className="text-caption text-fg-muted">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
