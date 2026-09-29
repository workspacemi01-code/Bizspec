"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";

import {
  consentServerSnapshot,
  consentSnapshot,
  subscribeToConsent,
} from "@/lib/consent";

/**
 * Analytics, loaded only after the visitor has said yes.
 *
 * The measurement id lives in NEXT_PUBLIC_GA_ID. With no id set — which is the
 * state the site ships in — this component renders nothing at all, so there is
 * no third-party request on the page until someone deliberately configures one.
 *
 * It listens for the consent event as well as reading the stored value, so
 * accepting in the banner starts measurement immediately rather than on the
 * next page load.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  const consent = useSyncExternalStore(
    subscribeToConsent,
    consentSnapshot,
    consentServerSnapshot,
  );

  if (!id || consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());
gtag('config','${id}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
