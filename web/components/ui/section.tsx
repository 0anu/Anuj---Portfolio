import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow";
}) {
  const width = size === "narrow" ? "max-w-3xl" : "max-w-6xl";
  return (
    <div className={`mx-auto w-full ${width} px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Right-aligned slot on wide screens (e.g. "All projects →"). */
  action?: ReactNode;
  id?: string;
}

export function SectionHeader({ eyebrow, title, description, action, id }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-h2 text-fg-strong">
          {title}
        </h2>
        {description ? <p className="mt-4 text-body-lg text-fg-muted">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** aria-labelledby target; pass the SectionHeader id. */
  labelledBy?: string;
}

export function Section({ children, id, className = "", labelledBy }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Shared header for interior pages: eyebrow, title, lede, ambient backdrop. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
      <div
        className="bloom -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 bg-[oklch(83%_0.13_200/14%)]"
        aria-hidden="true"
      />
      <Container className="relative pt-16 pb-14 md:pt-24 md:pb-20">
        <p className="eyebrow animate-rise">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl animate-rise text-h1 text-fg-strong [animation-delay:60ms]">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl animate-rise text-body-lg text-fg-muted [animation-delay:120ms]">
            {description}
          </p>
        ) : null}
        {children ? (
          <div className="mt-8 animate-rise [animation-delay:180ms]">{children}</div>
        ) : null}
      </Container>
    </header>
  );
}
