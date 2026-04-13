import type { Metadata } from "next";
import { Bebas_Neue, Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleTagManager } from "@/components/analytics/GoogleTagManager";
import { SilktideCookieConsent } from "@/components/consent/SilktideCookieConsent";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteMeta } from "@/content/site";
import { getConsentDefaultInlineScript } from "@/lib/consent/consent-default-script";
import { getCookieMessagesFromRecord } from "@/lib/consent/silktide-config";
import en from "@/messages/en.json";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
  icons: {
    icon: [{ url: "/meshimo-logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/meshimo-logo.svg", type: "image/svg+xml" }],
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const cookieMessages = getCookieMessagesFromRecord(
  en.cookies as unknown as Record<string, unknown>,
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bebas.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="/vendor/silktide/silktide-consent-manager.css"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-charcoal">
        <Script id="consent-defaults" strategy="beforeInteractive">
          {getConsentDefaultInlineScript()}
        </Script>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SilktideCookieConsent locale="en" cookieMessages={cookieMessages} />
        <GoogleTagManager />
      </body>
    </html>
  );
}
