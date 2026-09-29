import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Manrope } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/content";
import "./globals.css";

/**
 * Three faces, each with one job.
 *
 * Archivo carries the headlines — a grotesque with enough weight to hold a
 * page without shouting, and close in temperament to the wordmark in the logo.
 * Manrope sets the reading text; its round bowls echo the circles the mark is
 * built from. Plex Mono is the instrument face: reference numbers, labels and
 * anything that belongs on a specification rather than in a sentence.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = "Bizspec — Business Systems, Digital Products & Technology Solutions";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s — Bizspec" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
    locale: "en_NG",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
};

/** The brand blue, so the phone's status bar belongs to the page. */
export const viewport: Viewport = {
  themeColor: "#336799",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link rounded-md bg-ink px-4 py-2 text-sm text-white">
          Skip to content
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
