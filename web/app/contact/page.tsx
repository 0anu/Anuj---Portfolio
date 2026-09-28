import type { Metadata } from "next";
import { socialLinks } from "@/lib/site";
import { Container } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";
import { ArrowUpRight, Check, Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch about data pipelines, cloud data platforms, or agentic AI.",
  alternates: { canonical: "/contact" },
};

const topics = [
  "Event-driven pipelines and ETL / reverse ETL",
  "Cloud data platforms on AWS and GCP",
  "LangGraph agents, RAG, and tool integration",
  "Collaborating on open-source or AI experiments",
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
      <div
        className="bloom -top-40 right-0 h-96 w-[32rem] bg-[oklch(70%_0.17_292/14%)]"
        aria-hidden="true"
      />
      <Container className="relative grid gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <div>
          <p className="eyebrow animate-rise">Contact</p>
          <h1 className="mt-5 animate-rise text-h1 text-fg-strong [animation-delay:60ms]">
            Let&apos;s build{" "}
            <span className="font-serif font-normal tracking-[-0.02em] italic">
              <span className="text-gradient">something</span>
            </span>{" "}
            that holds up.
          </h1>
          <p className="mt-5 max-w-md animate-rise text-body-lg text-fg-muted [animation-delay:120ms]">
            Pipelines, agentic AI, or anything in between — send a message and I&apos;ll get back to
            you.
          </p>

          <ul className="mt-10 animate-rise space-y-3 [animation-delay:180ms]">
            {topics.map((topic) => (
              <li key={topic} className="flex items-start gap-3 text-body text-fg">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(83%_0.13_200/15%)] text-[0.75rem] text-accent-text">
                  <Check />
                </span>
                {topic}
              </li>
            ))}
          </ul>

          {socialLinks.length > 0 ? (
            <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:240ms]">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card card-interactive group flex items-center gap-3 !rounded-xl px-4 py-3 text-caption text-fg-strong"
                >
                  <span className="text-[1.125rem]">
                    <Icon name={link.icon} />
                  </span>
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 text-fg-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="animate-rise [animation-delay:160ms]">
          <div className="panel-inverse card p-6 shadow-[0_40px_100px_-40px_oklch(70%_0.14_240/55%)] sm:p-8">
            <h2 className="text-h4 text-fg-strong">Send a message</h2>
            <p className="mt-1 mb-7 text-caption text-fg-muted">All fields are required.</p>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
