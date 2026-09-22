"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

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
        headers: { "Content-Type": "application/json" },
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
      <p className="rounded-md border border-success/40 bg-bg px-5 py-4 text-body text-fg">
        Thanks — that&apos;s sent. I&apos;ll get back to you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-caption font-medium text-fg">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-body text-fg outline-none focus:border-accent-text"
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
          required
          className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-body text-fg outline-none focus:border-accent-text"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-caption font-medium text-fg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-md border border-border-strong bg-surface px-3.5 py-2.5 text-body text-fg outline-none focus:border-accent-text"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-caption text-error">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-md bg-accent px-5 py-3 text-caption font-medium text-accent-contrast transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
