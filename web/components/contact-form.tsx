"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "@/components/ui/icons";

type Status = "idle" | "submitting" | "success" | "error";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

const fieldClasses =
  "mt-2 w-full rounded-xl border border-border-strong bg-bg-subtle px-4 py-3 text-body text-fg-strong placeholder:text-fg-subtle outline-none transition-[border-color,box-shadow] duration-200 hover:border-tint-border focus:border-accent focus:shadow-[0_0_0_4px_oklch(83%_0.13_200/15%)]";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("error");
      setErrorMessage("Contact form isn't configured yet — check back soon.");
      return;
    }

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        // Accept makes form services (e.g. Formspree) reply with JSON rather
        // than redirecting; the Lambda ignores it.
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Request failed with ${response.status}`);

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong sending that — try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-[oklch(78%_0.15_152/35%)] bg-bg-subtle px-5 py-4"
      >
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[oklch(78%_0.15_152/15%)] text-success">
          <Check />
        </span>
        <p className="text-body text-fg">Thanks — that&apos;s sent. I&apos;ll get back to you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-caption font-medium text-fg">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            className={fieldClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-caption font-medium text-fg">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            className={fieldClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="block text-caption font-medium text-fg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="What are you building?"
          className={`${fieldClasses} resize-y`}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && errorMessage ? (
          <p className="text-caption text-error">{errorMessage}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-body font-medium text-accent-contrast shadow-[0_0_0_1px_oklch(83%_0.13_200/40%),0_8px_24px_-10px_oklch(83%_0.13_200/70%)] transition-[box-shadow,opacity] duration-200 hover:shadow-[0_0_0_1px_oklch(83%_0.13_200/60%),0_10px_36px_-8px_oklch(83%_0.13_200/80%)] disabled:cursor-wait disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
        {status !== "submitting" ? (
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        ) : null}
      </button>
    </form>
  );
}
