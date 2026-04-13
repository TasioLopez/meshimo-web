import Link from "next/link";
import { MeshimoLogoMark } from "@/components/branding/MeshimoLogo";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import en from "@/messages/en.json";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-taupe-line bg-surface-ink text-bone">
      <Container className="flex flex-col gap-10 py-14 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 outline-offset-4">
            <MeshimoLogoMark
              size="lg"
              decorative
              className="max-h-12 drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            />
            <span className="font-display text-2xl tracking-wide text-bone">Meshimo</span>
          </Link>
          <p className="text-sm leading-relaxed text-bone/75">
            Meshimo builds digital experiences, software, automations, and integrations for teams
            that need strong execution behind the idea.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-sm text-bone/80">
          <Link href="#capabilities" className="transition hover:text-accent-cta">
            Capabilities
          </Link>
          <Link href="#process" className="transition hover:text-accent-cta">
            Process
          </Link>
          <Link href="#contact" className="transition hover:text-accent-cta">
            Contact
          </Link>
          <Link href="/terms" className="transition hover:text-accent-cta">
            {en.footer.terms}
          </Link>
          <Link href="/terms-of-use" className="transition hover:text-accent-cta">
            {en.footer.website_terms}
          </Link>
          <Link href="/privacy-policy" className="transition hover:text-accent-cta">
            {en.footer.privacy_policy}
          </Link>
          <Link href="/cookie-policy" className="transition hover:text-accent-cta">
            {en.footer.cookie_policy}
          </Link>
          <CookieSettingsButton
            label={en.footer.cookies}
            className="text-left transition hover:text-accent-cta"
          />
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-bone/45 sm:flex-row sm:justify-between">
          <span>Meshimo. All rights reserved.</span>
          <span>Built with Next.js</span>
        </Container>
      </div>
    </footer>
  );
}
