import { contactLink, socialLinks } from "@/lib/site";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Icon } from "@/components/ui/icons";

/** Closing call to action, shared by the homepage and interior pages. */
export function ContactCta({
  title = "Building a data or AI system?",
  description = "Pipelines, cloud data platforms, agentic AI, or anything in between — I'm happy to talk it through.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-20 md:py-28">
      <Container>
        <div className="reveal relative overflow-hidden rounded-3xl border border-border-strong bg-surface px-6 py-14 text-center sm:px-10 md:py-20">
          <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
          <div
            className="bloom -bottom-24 left-1/4 h-64 w-96 bg-[oklch(83%_0.13_200/20%)]"
            aria-hidden="true"
          />
          <div
            className="bloom -top-24 right-1/4 h-64 w-96 bg-[oklch(70%_0.17_292/20%)] [animation-delay:-9s]"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="eyebrow justify-center">Let&apos;s talk</p>
            <h2 id="cta-title" className="mx-auto mt-5 max-w-2xl text-h1 text-fg-strong">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-body-lg text-fg-muted">{description}</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={contactLink.href} size="lg">
                Get in touch
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </ButtonLink>
              {socialLinks.map((link) => (
                <ButtonLink key={link.href} href={link.href} variant="secondary" size="lg" external>
                  <Icon name={link.icon} />
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
