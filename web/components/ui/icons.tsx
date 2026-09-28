import type { SVGProps } from "react";

/**
 * Inline stroke icons (24px grid, 1.6 stroke) — a handful of paths is far
 * cheaper than an icon library dependency for a static site.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowLeft = (p: IconProps) => (
  <Base {...p}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </Base>
);

export const ArrowUpRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Menu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Mail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const Pipeline = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="4" width="6" height="6" rx="1.5" />
    <rect x="15" y="14" width="6" height="6" rx="1.5" />
    <path d="M9 7h4a2 2 0 0 1 2 2v5" />
    <path d="M3 17h6M6 14v6" />
  </Base>
);

export const Cloud = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4.25 4.25 0 0 1-.5 8.5H7Z" />
  </Base>
);

export const Sparkles = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.5l-1.8-5.8L4.5 10.8 10.2 9 12 3.5Z" />
    <path d="M19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3" />
  </Base>
);

export const Agent = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="5" cy="5" r="1.75" />
    <circle cx="19" cy="5" r="1.75" />
    <circle cx="5" cy="19" r="1.75" />
    <circle cx="19" cy="19" r="1.75" />
    <path d="m6.3 6.3 3.6 3.6M17.7 6.3l-3.6 3.6M6.3 17.7l3.6-3.6M17.7 17.7l-3.6-3.6" />
  </Base>
);

export const Server = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4" width="17" height="7" rx="2" />
    <rect x="3.5" y="13" width="17" height="7" rx="2" />
    <path d="M7.5 7.5h.01M7.5 16.5h.01M11 7.5h6M11 16.5h6" />
  </Base>
);

export const Eye = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </Base>
);

export const Pen = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 20h4L19 9a2.83 2.83 0 0 0-4-4L4 16v4Z" />
    <path d="m13.5 6.5 4 4" />
  </Base>
);

export const Play = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
  </Base>
);

export const Flask = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 3.5h6M10 3.5v5.2L4.6 17.9A1.75 1.75 0 0 0 6.1 20.5h11.8a1.75 1.75 0 0 0 1.5-2.6L14 8.7V3.5" />
    <path d="M7.5 14.5h9" />
  </Base>
);

export const Layers = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3.5 9 4.75-9 4.75-9-4.75 9-4.75Z" />
    <path d="m3 12.5 9 4.75 9-4.75" />
    <path d="m3 16.5 9 4.75 9-4.75" />
  </Base>
);

export const Check = (p: IconProps) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const Github = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.67-.21.67-.47v-1.65c-2.72.59-3.29-1.31-3.29-1.31-.45-1.13-1.09-1.43-1.09-1.43-.89-.61.07-.6.07-.6.98.07 1.5 1.01 1.5 1.01.87 1.5 2.29 1.07 2.85.82.09-.64.34-1.07.62-1.31-2.17-.25-4.46-1.09-4.46-4.83 0-1.07.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.59 0 0 .82-.26 2.68 1a9.3 9.3 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.35.2 2.34.1 2.59.63.68 1.01 1.55 1.01 2.62 0 3.75-2.29 4.58-4.47 4.82.35.3.66.9.66 1.81v2.69c0 .26.18.57.68.47A9.75 9.75 0 0 0 12 2.25Z" />
  </svg>
);

export const Linkedin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="1em" height="1em" {...p}>
    <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3ZM8.4 18.3H5.7V9.75h2.7v8.55ZM7.05 8.58a1.56 1.56 0 1 1 0-3.13 1.56 1.56 0 0 1 0 3.13Zm11.25 9.72h-2.7v-4.16c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2v4.23h-2.7V9.75h2.59v1.17h.04a2.84 2.84 0 0 1 2.56-1.4c2.73 0 3.24 1.8 3.24 4.14v4.64Z" />
  </svg>
);

export const iconMap = {
  pipeline: Pipeline,
  cloud: Cloud,
  sparkles: Sparkles,
  agent: Agent,
  server: Server,
  eye: Eye,
  pen: Pen,
  play: Play,
  flask: Flask,
  github: Github,
  linkedin: Linkedin,
} as const;

export type IconName = keyof typeof iconMap;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
