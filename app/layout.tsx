import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/lib/content";
import "./globals.css";

/**
 * IBM Plex rather than a default UI sans: it was drawn for technical and
 * business documentation, which is what this company does, and the mono gives
 * the process numbers and labels somewhere to sit without a second typeface.
 */
const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bizspec — Business Systems, Digital Products & Technology Solutions",
    template: "%s — Bizspec",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Bizspec — Business Systems, Digital Products & Technology Solutions",
    description: site.description,
    url: site.url,
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bizspec — Business Systems, Digital Products & Technology Solutions",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} h-full antialiased`}
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
      </body>
    </html>
  );
}
