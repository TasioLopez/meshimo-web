export type CookieBannerMessages = {
  prompt_description: string;
  accept_all: string;
  accept_all_a11y: string;
  reject_nonessential: string;
  reject_nonessential_a11y: string;
  preferences: string;
  preferences_a11y: string;
  preferences_title: string;
  preferences_description: string;
  save: string;
  save_a11y: string;
  credit: string;
  credit_a11y: string;
  necessary_label: string;
  necessary_description: string;
  analytics_label: string;
  analytics_description: string;
};

export type SilktideConsentTypeConfig = {
  id: string;
  required?: boolean;
  defaultValue?: boolean;
  label: string;
  description: string;
  gtag?: string | string[];
};

export type SilktideManagerConfig = {
  eventName: string;
  consentTypes: SilktideConsentTypeConfig[];
  text: {
    prompt: {
      description: string;
      acceptAllButtonText: string;
      acceptAllButtonAccessibleLabel: string;
      rejectNonEssentialButtonText: string;
      rejectNonEssentialButtonAccessibleLabel: string;
      preferencesButtonText: string;
      preferencesButtonAccessibleLabel: string;
    };
    preferences: {
      title: string;
      description: string;
      saveButtonText: string;
      saveButtonAccessibleLabel: string;
      creditLinkText: string;
      creditLinkAccessibleLabel: string;
    };
  };
  prompt: { position: string };
  icon: { position: string };
  backdrop: { show: boolean };
};

export function getCookieMessagesFromRecord(
  record: Record<string, unknown>,
): CookieBannerMessages {
  const c = record as Record<string, string>;
  return {
    prompt_description: c.prompt_description ?? "",
    accept_all: c.accept_all ?? "",
    accept_all_a11y: c.accept_all_a11y ?? "",
    reject_nonessential: c.reject_nonessential ?? "",
    reject_nonessential_a11y: c.reject_nonessential_a11y ?? "",
    preferences: c.preferences ?? "",
    preferences_a11y: c.preferences_a11y ?? "",
    preferences_title: c.preferences_title ?? "",
    preferences_description: c.preferences_description ?? "",
    save: c.save ?? "",
    save_a11y: c.save_a11y ?? "",
    credit: c.credit ?? "",
    credit_a11y: c.credit_a11y ?? "",
    necessary_label: c.necessary_label ?? "",
    necessary_description: c.necessary_description ?? "",
    analytics_label: c.analytics_label ?? "",
    analytics_description: c.analytics_description ?? "",
  };
}

export function buildSilktideConfig(
  messages: CookieBannerMessages,
): SilktideManagerConfig {
  return {
    eventName: "stcm_consent_update",
    consentTypes: [
      {
        id: "necessary",
        required: true,
        label: messages.necessary_label,
        description: messages.necessary_description,
        gtag: ["functionality_storage", "security_storage"],
      },
      {
        id: "analytics",
        required: false,
        defaultValue: false,
        label: messages.analytics_label,
        description: messages.analytics_description,
        gtag: "analytics_storage",
      },
    ],
    text: {
      prompt: {
        description: messages.prompt_description,
        acceptAllButtonText: messages.accept_all,
        acceptAllButtonAccessibleLabel: messages.accept_all_a11y,
        rejectNonEssentialButtonText: messages.reject_nonessential,
        rejectNonEssentialButtonAccessibleLabel: messages.reject_nonessential_a11y,
        preferencesButtonText: messages.preferences,
        preferencesButtonAccessibleLabel: messages.preferences_a11y,
      },
      preferences: {
        title: messages.preferences_title,
        description: messages.preferences_description,
        saveButtonText: messages.save,
        saveButtonAccessibleLabel: messages.save_a11y,
        creditLinkText: messages.credit,
        creditLinkAccessibleLabel: messages.credit_a11y,
      },
    },
    prompt: { position: "bottomCenter" },
    icon: { position: "bottomRight" },
    backdrop: { show: true },
  };
}
