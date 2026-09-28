import Link from "next/link";
import { contactLink, footerNav, person, socialLinks } from "@/lib/site";
import { Container } from "@/components/ui/section";
import { ArrowUpRight, Icon } from "@/components/ui/icons";
import { Logo } from "@/components/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-border bg-bg">
      <Container className="py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Logo />
              <span className="text-body font-semibold tracking-tight text-fg-strong">
                {person.name}
              </span>
            </Link>
            <p className="mt-4 text-caption text-fg-muted">{person.summary}</p>
          </div>

          {footerNav.map((group) => (
            <div key={group.label}>
              <h2 className="font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
                {group.label}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-fg-muted transition-colors hover:text-fg-strong"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
              Connect
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href={contactLink.href}
                  className="text-caption text-fg-muted transition-colors hover:text-fg-strong"
                >
                  {contactLink.label}
                </Link>
              </li>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-caption text-fg-muted transition-colors hover:text-fg-strong"
                  >
                    <Icon name={link.icon} />
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-fade mt-14" />
        <div className="mt-6 flex flex-col gap-2 font-mono text-label text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {person.name}
          </span>
          <span>Static Next.js · S3 + CloudFront · one Python Lambda</span>
        </div>
      </Container>
    </footer>
  );
}
