import type { CSSProperties } from "react";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import { person, siteUrl, socialLinks } from "@/lib/site";
import { stages } from "@/lib/experience";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, Icon } from "@/components/ui/icons";
import { HeroGraph } from "@/components/hero-graph";
import { ProjectCard } from "@/components/project-card";
import { FocusGrid } from "@/components/sections/focus-grid";
import { Trajectory } from "@/components/sections/trajectory";
import { TechEcosystem } from "@/components/sections/tech-ecosystem";
import { PlatformGrid } from "@/components/sections/platform-grid";
import { ContactCta } from "@/components/sections/contact-cta";
import { TechMarquee } from "@/components/sections/tech-marquee";

const glance = [
  { label: "Role", value: person.role, hue: 200 },
  { label: "Focus", value: "Event-driven pipelines · Agentic AI", hue: 292 },
  { label: "Cloud", value: "AWS · GCP", hue: 240 },
  { label: "Building", value: "AI Labs on this site", hue: 70 },
];

export default function HomePage() {
  const featured = getFeaturedProjects();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    url: siteUrl,
    sameAs: socialLinks.map((link) => link.href),
    knowsAbout: ["Data Engineering", "Cloud Data Platforms", "Agentic AI", "LangGraph", "ETL"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------------ Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="backdrop-grid absolute inset-0" aria-hidden="true" />
        <div
          className="bloom -top-32 right-[-10%] h-[28rem] w-[40rem] bg-[oklch(70%_0.17_292/16%)]"
          aria-hidden="true"
        />
        <div
          className="bloom -top-40 left-[-10%] h-[26rem] w-[36rem] bg-[oklch(83%_0.13_200/13%)] [animation-delay:-9s]"
          aria-hidden="true"
        />
        <div
          className="bloom right-[30%] bottom-[-12rem] h-80 w-[30rem] bg-[oklch(78%_0.14_40/9%)] [animation-delay:-4s]"
          aria-hidden="true"
        />

        <Container className="relative grid items-center gap-14 pt-14 pb-20 md:pt-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 lg:pt-20 lg:pb-24">
          <div>
            <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-border-strong bg-tint py-1 pr-3.5 pl-1.5 text-caption text-fg-muted">
              <span className="rounded-full bg-[oklch(83%_0.13_200/15%)] px-2 py-0.5 font-mono text-label text-accent-text">
                {person.role}
              </span>
              moving into agentic AI
            </p>

            <h1
              id="hero-title"
              className="mt-7 animate-rise text-display text-fg-strong [animation-delay:80ms]"
            >
              Data pipelines that hold up.{" "}
              <span className="font-serif font-normal tracking-[-0.02em] italic">
                <span className="text-gradient">Agents</span>
              </span>{" "}
              that reason through them.
            </h1>

            <p className="mt-6 max-w-xl animate-rise text-body-lg text-fg-muted [animation-delay:160ms]">
              I&apos;m {person.name} — I build event-driven data systems on AWS and GCP, and
              I&apos;m taking that same engineering rigor into LLM applications and multi-agent
              systems.
            </p>

            <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:240ms]">
              <ButtonLink href="/projects" size="lg">
                View projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
              </ButtonLink>
              <ButtonLink href="/blog" variant="secondary" size="lg">
                Read the blog
              </ButtonLink>
              {socialLinks.map((link) => (
                <ButtonLink
                  key={link.href}
                  href={link.href}
                  variant="ghost"
                  size="lg"
                  external
                  aria-label={link.label}
                  className="!px-3 text-[1.25rem]"
                >
                  <Icon name={link.icon} />
                </ButtonLink>
              ))}
            </div>

            <ol
              aria-label="Career direction"
              className="mt-12 flex animate-rise flex-wrap items-center gap-x-2 gap-y-2 font-mono text-label text-fg-subtle [animation-delay:320ms]"
            >
              {stages.map((stage, i) => (
                <li key={stage.label} className="flex items-center gap-2">
                  <span className={i === stages.length - 1 ? "text-accent-text" : undefined}>
                    {stage.label}
                  </span>
                  {i < stages.length - 1 ? (
                    <ArrowRight aria-hidden="true" className="h-3 w-3" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <div className="animate-rise [animation-delay:200ms]">
            <HeroGraph />
          </div>
        </Container>
      </section>

      <TechMarquee />

      {/* ------------------------------------ About + Expertise (light sheet) */}
      <Section id="about" labelledBy="about-title" tone="light">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-20">
          <div className="reveal">
            <p className="eyebrow">About</p>
            <h2 id="about-title" className="mt-5 text-h2 text-fg-strong">
              I treat agents as another kind of{" "}
              <span className="font-serif font-normal tracking-[-0.01em] italic">
                <span className="text-gradient">pipeline</span>
              </span>{" "}
              —{" "}
              <span className="text-fg-subtle">
                one that reasons at each step instead of just transforming.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-body-lg text-fg-muted">
              My day-to-day is the plumbing everything else depends on: webhooks, queues,
              transformations, warehouses, and reverse ETL back into the tools people use. The
              throughline into AI is the same — systems that hold up under real inputs, and agents
              that can explain the step that led to a conclusion.
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex items-center gap-1.5 text-caption font-medium text-accent-text"
            >
              More about me
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <dl className="reveal card self-start divide-y divide-border p-2">
            {glance.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-6 px-4 py-4"
                style={{ "--tone-h": item.hue } as CSSProperties}
              >
                <dt className="flex items-center gap-2.5 font-mono text-label uppercase tracking-[0.12em] text-fg-subtle">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: `oklch(72% 0.15 ${item.hue})` }}
                    aria-hidden="true"
                  />
                  {item.label}
                </dt>
                <dd className="text-right text-caption font-medium text-fg-strong">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-24 md:mt-32">
          <SectionHeader
            id="expertise-title"
            eyebrow="Expertise"
            title="Where I work, from ingestion to reasoning"
            description="Six areas that show up across the projects — the data layer first, and the AI layer built on top of it."
          />
          <FocusGrid />
        </div>
      </Section>

      {/* ------------------------------------------------- Projects (dark) */}
      <Section id="projects" labelledBy="projects-title" className="relative overflow-hidden">
        <div
          className="bloom top-40 -left-40 h-96 w-96 bg-[oklch(83%_0.13_200/10%)]"
          aria-hidden="true"
        />
        <div
          className="bloom right-[-10rem] bottom-40 h-96 w-96 bg-[oklch(70%_0.17_292/12%)] [animation-delay:-6s]"
          aria-hidden="true"
        />
        <div className="relative">
          <SectionHeader
            id="projects-title"
            eyebrow="Selected work"
            title="Projects"
            description="Real pipelines and agent systems, each written up with its architecture and the engineering concerns that shaped it."
            action={
              <ButtonLink href="/projects" variant="secondary">
                All projects
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            }
          />
          <div className="space-y-5 md:space-y-6">
            {featured.map((project, i) => (
              <div key={project.slug} className="reveal">
                <ProjectCard project={project} variant="feature" index={i} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------- Experience + Stack (light sheet) */}
      <Section id="experience" labelledBy="experience-title" tone="light">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title="A trajectory, not a résumé"
          description="Data engineering → AI/data engineering → agentic AI, and the work that marks each stage."
          action={
            <ButtonLink href="/experience" variant="secondary">
              Full experience
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          }
        />
        <Trajectory showTools={false} />

        <div id="stack" className="mt-24 md:mt-32">
          <SectionHeader
            id="stack-title"
            eyebrow="Technology"
            title="The ecosystem I build with"
            description="Languages, cloud services, and AI tooling in regular use across data and agent work."
          />
          <TechEcosystem />
        </div>
      </Section>

      {/* ------------------------------------------------- Platform (dark) */}
      <Section id="platform" labelledBy="platform-title">
        <SectionHeader
          id="platform-title"
          eyebrow="Beyond the portfolio"
          title="Writing, tutorials, and AI labs"
          description="This site is growing into a place to learn from the work, not just look at it. Here's what's being built."
        />
        <PlatformGrid />
      </Section>

      <ContactCta />
    </>
  );
}
