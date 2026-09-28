import Link from "next/link";
import { primaryNav } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { ArrowLeft } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
      <div
        className="bloom top-10 left-1/2 h-72 w-[30rem] -translate-x-1/2 bg-[oklch(70%_0.17_292/14%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
        <span className="rounded-full border border-border-strong px-3 py-1 font-mono text-label uppercase tracking-[0.2em] text-fg-subtle">
          Error · route not found
        </span>
        <p className="text-gradient mt-6 font-mono text-[clamp(4.5rem,3rem+8vw,9rem)] leading-none font-semibold tracking-[-0.06em] tabular-nums">
          404
        </p>
        <h1 className="mt-6 text-h2 text-fg-strong">This route doesn&apos;t exist</h1>
        <p className="mt-3 text-body text-fg-muted">
          Nothing&apos;s here. Try one of these instead.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-2">
          {primaryNav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="chip !px-3.5 !py-1.5 !text-caption hover:text-fg-strong"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink href="/" variant="secondary" className="mt-10">
          <ArrowLeft className="h-4 w-4" />
          Back home
        </ButtonLink>
      </div>
    </div>
  );
}
