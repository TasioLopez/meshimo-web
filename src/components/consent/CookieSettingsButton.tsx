"use client";

import { openCookiePreferences } from "@/lib/consent/open-cookie-preferences";

type Props = {
  label: string;
  className?: string;
};

export function CookieSettingsButton({ label, className }: Props) {
  return (
    <button
      type="button"
      onClick={() => openCookiePreferences()}
      className={className}
    >
      {label}
    </button>
  );
}
