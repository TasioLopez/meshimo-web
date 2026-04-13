export {};

type GtagConsentArg = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "consent" | "config" | "event" | "js" | "set",
      targetOrAction: string,
      params?: GtagConsentArg,
    ) => void;
    silktideConsentManager?: {
      init: (config: Record<string, unknown>) => void;
      update: (config: Record<string, unknown>) => void;
      getInstance: () => {
        toggleModal: (show: boolean) => void;
        getConsentChoice: (typeId: string) => boolean | null;
        clearAllConsents: () => void;
      } | null;
      resetConsent: () => void;
    };
    __neroOpenCookiePreferences?: () => void;
  }
}
