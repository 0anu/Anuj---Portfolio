import Link from "next/link";
import { primaryNav } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-bg-deep">
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <span className="font-mono text-label uppercase tracking-[0.2em] text-fg-subtle">
          Error
        </span>
        <p className="mt-4 font-mono text-display tabular-nums text-fg-strong">404</p>
        <h1 className="mt-4 text-h2 text-fg-strong">This route doesn&apos;t exist</h1>
        <p className="mt-3 text-body text-fg-muted">
          Nothing&apos;s here. Try one of these instead.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-caption text-accent-text hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/" className="mt-10 text-caption text-fg-subtle hover:text-fg-muted">
          ← Back home
        </Link>
      </div>
    </div>
  );
}
