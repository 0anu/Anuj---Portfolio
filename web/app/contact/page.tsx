import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20 text-center">
      <p className="font-mono text-label uppercase tracking-[0.1em] text-accent-text">Contact</p>
      <h1 className="mt-4 text-h1 text-fg-strong">Get in touch</h1>
      <p className="mt-4 text-body-lg text-fg-muted">
        Pipelines, agentic AI, or anything in between — send a message.
      </p>

      <div className="panel-inverse mt-10 rounded-md p-8 text-left">
        <ContactForm />
      </div>
    </div>
  );
}
