import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * A marketing site holds no accounts and no data, so the risk is not theft —
 * it is the site being framed, impersonated, or used to carry something else's
 * script. These headers close those doors.
 *
 * One honest caveat: script-src allows 'unsafe-inline' because Next's
 * hydration bootstrap is an inline script. Removing it means per-request
 * nonces, which means giving up static rendering on every page. For a site
 * with no authenticated session and no user content rendered as HTML, that
 * trade is not worth it — see SECURITY.md.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  /* Two years, subdomains included, and eligible for the preload list — so a
     visitor who types the bare domain never makes a plaintext request. */
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  /* Nothing gains from announcing the framework version. */
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
