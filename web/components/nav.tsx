"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { contactLink, person, primaryNav, socialLinks } from "@/lib/site";
import { ArrowRight, Close, Icon, Menu } from "@/components/ui/icons";
import { Logo } from "@/components/logo";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Close the mobile sheet on navigation by tracking the path it was opened on.
  const [openedAt, setOpenedAt] = useState(pathname);
  const menuOpen = open && openedAt === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-[var(--header-h)] border-b transition-[background-color,border-color] duration-300 ${
          scrolled || menuOpen ? "glass border-border" : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-caption focus:text-accent-contrast"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-6 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label={`${person.name} — home`}
          >
            <Logo />
            <span className="text-caption font-semibold tracking-tight text-fg-strong">
              {person.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1 rounded-full border border-border bg-[oklch(100%_0_0/2.5%)] p-1">
              {primaryNav.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-full px-3.5 py-1.5 text-caption transition-colors ${
                        active
                          ? "bg-[oklch(100%_0_0/8%)] text-fg-strong"
                          : "text-fg-muted hover:text-fg-strong"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="hidden h-9 w-9 items-center justify-center rounded-full text-[1.125rem] text-fg-muted transition-colors hover:bg-[oklch(100%_0_0/6%)] hover:text-fg-strong sm:inline-flex"
              >
                <Icon name={link.icon} />
              </a>
            ))}
            <Link
              href={contactLink.href}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-fg-strong px-4 text-caption font-medium text-bg-deep transition-opacity hover:opacity-90 sm:inline-flex"
            >
              {contactLink.label}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-[1.25rem] text-fg-strong lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setOpenedAt(pathname);
                setOpen(!menuOpen);
              }}
            >
              {menuOpen ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet sheet. Rendered outside <header>: the header's
          backdrop-filter would otherwise become this fixed element's
          containing block and collapse it to the header's height. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="glass fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 overflow-y-auto border-t border-border lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-6xl px-5 py-6 sm:px-6">
          <ul className="divide-y divide-border">
            {[...primaryNav, contactLink].map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <li
                  key={link.href}
                  className="animate-rise"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 text-h3 ${
                      active ? "text-accent-text" : "text-fg-strong"
                    }`}
                  >
                    {link.label}
                    <ArrowRight className="h-5 w-5 text-fg-subtle" />
                  </Link>
                </li>
              );
            })}
          </ul>
          {socialLinks.length > 0 ? (
            <div className="mt-8 flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip !px-3.5 !py-2 !text-caption text-fg"
                >
                  <Icon name={link.icon} />
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </nav>
      </div>
    </>
  );
}
