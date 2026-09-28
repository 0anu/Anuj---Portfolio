import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { person, siteUrl } from "@/lib/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Used sparingly: one italic accent phrase per page heading at most. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});

const title = `${person.name} — ${person.role}`;
const description = `${person.name}, ${person.role}. Event-driven data pipelines, cloud data platforms, reverse ETL, and agentic AI systems.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${person.name}`,
  },
  description,
  keywords: [
    "Data Engineer",
    "AI Engineer",
    "Agentic AI",
    "LangGraph",
    "Data pipelines",
    "AWS",
    "GCP",
    "Reverse ETL",
  ],
  authors: [{ name: person.name, url: siteUrl }],
  creator: person.name,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: person.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#121927",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col antialiased">
        <Nav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
