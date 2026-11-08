/** Shared site constants. */
export const SITE_NAME = 'QPushly';
// Brand tagline (guidelines §02). Never translated; the final full stop is brand blue.
export const TAGLINE = 'One tap, always reachable.';

// Live App Store listing (published 2026-10-26). Every primary CTA points here.
export const APP_STORE_URL = 'https://apps.shopify.com/qpushly';

// No "Book a demo": the old link pointed at a booking page that never existed.
// The listing's demo store (qdn-demo-store.myshopify.com) is password-protected
// and only opens through Shopify's signed, expiring link — do not link it here.

// One-minute product intro (same cut as the App Store listing video).
/** The 1-minute intro, hosted on the QDN YouTube channel (unlisted). Same cut as the App Store listing. */
export const INTRO_YOUTUBE_ID = 'FgelO6Ejc04';
export const INTRO_YOUTUBE_URL = `https://youtu.be/${INTRO_YOUTUBE_ID}`;
export const INTRO_POSTER = '/assets/intro-poster.jpg';

// User guide — served on the guide.qpushly.com subdomain (the qpushly-user-guide
// repo). Point links at the subdomain.
export const GUIDE_URL = 'https://guide.qpushly.com';

// Per brand guidelines §11 (support email signature).
export const SUPPORT_EMAIL = 'hello@qdn.vn';

// Primary nav.
export const NAV = [
  ['/automations', 'Automations'],
  ['/how-it-works', 'How it works'],
  ['/integrations', 'Integrations'],
  ['/pricing', 'Pricing'],
  [GUIDE_URL, 'Guide'],
] as const;

// QOne Desk support chat. Classic inline script only: the widget finds its
// config through document.currentScript, which is null for a module or a
// bundled script. The widget takes its API origin from its own src, so it
// stays on qdn.qone.work.
export const SUPPORT_WIDGET_URL = 'https://qdn.qone.work/widget.js';
export const SUPPORT_WIDGET_PRODUCT = 'fp_31fd090f4d61ec740903f34a';
