import type { Metadata } from "next";
import { posts, writingCategories } from "@/lib/platform";
import { Container, PageHeader } from "@/components/ui/section";
import { StatusBadge } from "@/components/ui/badge";
import { ContactCta } from "@/components/sections/contact-cta";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing on data engineering, cloud infrastructure, agentic AI, and computer vision.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const hasPosts = posts.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title={hasPosts ? "Notes from the build" : "Nothing published yet"}
        description="Long-form writing on pipelines, cloud trade-offs, and agentic systems — grounded in real project work. The categories below are the plan, not a backlog of drafts."
      />

      <Container className="py-14 md:py-20">
        {hasPosts ? (
          <ul className="mb-16 divide-y divide-border border-y border-border">
            {posts.map((post) => (
              <li key={post.slug} className="grid gap-2 py-7 md:grid-cols-[10rem_1fr] md:gap-8">
                <time className="font-mono text-label text-fg-subtle" dateTime={post.date}>
                  {post.date}
                </time>
                <div>
                  <p className="font-mono text-label uppercase tracking-[0.12em] text-accent-text">
                    {post.category}
                  </p>
                  <h2 className="mt-2 text-h3 text-fg-strong">{post.title}</h2>
                  <p className="mt-2 text-body text-fg-muted">{post.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        <h2 className="mb-6 font-mono text-label uppercase tracking-[0.14em] text-fg-subtle">
          Categories
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {writingCategories.map((category, i) => (
            <li key={category.label} className="reveal card flex flex-col p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-label text-fg-subtle tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <StatusBadge status="Planned" />
              </div>
              <h3 className="mt-5 text-h3 text-fg-strong">{category.label}</h3>
              <p className="mt-2 text-body text-fg-muted">{category.description}</p>
            </li>
          ))}
        </ul>
      </Container>

      <ContactCta
        title="Want a topic covered first?"
        description="If there's a pipeline pattern or agent design you'd like written up, send it over."
      />
    </>
  );
}
