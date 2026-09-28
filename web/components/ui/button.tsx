import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-contrast shadow-[0_0_0_1px_oklch(83%_0.13_200/40%),0_8px_24px_-10px_oklch(83%_0.13_200/70%)] hover:shadow-[0_0_0_1px_oklch(83%_0.13_200/60%),0_10px_36px_-8px_oklch(83%_0.13_200/80%)] hover:brightness-105",
  secondary:
    "border border-border-strong bg-[oklch(100%_0_0/4%)] text-fg-strong hover:border-[oklch(100%_0_0/28%)] hover:bg-[oklch(100%_0_0/8%)]",
  ghost: "text-fg-muted hover:text-fg-strong hover:bg-[oklch(100%_0_0/6%)]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-caption",
  lg: "h-12 px-6 text-body",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab with rel=noopener; use for off-site links. */
  external?: boolean;
  "aria-label"?: string;
}

/** Link styled as a button. Internal hrefs use next/link for client routing. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
