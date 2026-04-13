/**
 * Runs before GTM: Consent Mode defaults from Silktide localStorage keys
 * (`stcm.consent.<id>`, legacy `silktideCookieChoice_<id>`).
 * Minified IIFE string for next/script strategy="beforeInteractive".
 */
export function getConsentDefaultInlineScript(): string {
  return '!function(){"use strict";window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=window.gtag||gtag;function readChoice(e){try{var t=localStorage.getItem("stcm.consent."+e);return null===t&&(t=localStorage.getItem("silktideCookieChoice_"+e)),null===t?null:"true"===t}catch(n){return null}}var a=readChoice("analytics"),m=readChoice("marketing");gtag("consent","default",{analytics_storage:!0===a?"granted":"denied",ad_storage:!0===m?"granted":"denied",ad_user_data:!0===m?"granted":"denied",ad_personalization:!0===m?"granted":"denied",functionality_storage:"granted",security_storage:"granted",wait_for_update:500})}();';
}
