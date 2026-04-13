/**
 * Opens the Silktide preferences modal when running in the browser.
 */
export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  if (typeof window.__neroOpenCookiePreferences === "function") {
    window.__neroOpenCookiePreferences();
    return;
  }
  window.silktideConsentManager?.getInstance()?.toggleModal(true);
}
