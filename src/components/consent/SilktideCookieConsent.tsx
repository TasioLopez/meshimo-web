"use client";

import Script from "next/script";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildSilktideConfig,
  type CookieBannerMessages,
} from "@/lib/consent/silktide-config";

type Props = {
  locale: string;
  cookieMessages: CookieBannerMessages;
};

export function SilktideCookieConsent({ locale, cookieMessages }: Props) {
  const [scriptReady, setScriptReady] = useState(false);
  const messagesKey = useMemo(() => JSON.stringify(cookieMessages), [cookieMessages]);

  const applyConfig = useCallback(() => {
    if (typeof window === "undefined" || !window.silktideConsentManager) return;
    const config = buildSilktideConfig(cookieMessages);
    if (window.silktideConsentManager.getInstance()) {
      window.silktideConsentManager.update(config);
    } else {
      window.silktideConsentManager.init(config);
    }
    window.__neroOpenCookiePreferences = () => {
      window.silktideConsentManager?.getInstance()?.toggleModal(true);
    };
  }, [cookieMessages]);

  const onScriptLoad = useCallback(() => {
    setScriptReady(true);
  }, []);

  useEffect(() => {
    if (!scriptReady) return;
    applyConfig();
  }, [locale, messagesKey, scriptReady, applyConfig]);

  return (
    <Script
      src="/vendor/silktide/silktide-consent-manager.js"
      strategy="afterInteractive"
      onLoad={onScriptLoad}
    />
  );
}
