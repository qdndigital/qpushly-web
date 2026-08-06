/** Shared site constants. */
export const SITE_NAME = 'Qpushly';
export const TAGLINE = 'One tap to subscribe. Every send accounted for.';

// Live App Store listing. Every primary CTA on the site points here.
// TODO: placeholder until Qpushly is published — see docs/APP_STORE_SUBMISSION.md
// in the app repo for what still gates submission.
export const APP_STORE_URL = 'https://apps.shopify.com/qpushly';

// TODO: placeholder booking link — every "Book a demo" button 404s until this is
// replaced. Those are all SECONDARY CTAs (primary is install), so the funnel
// works meanwhile, but fix before running paid traffic.
export const DEMO_URL = 'https://cal.com/qpushly/demo';

// User guide — served on the guide.qpushly.com subdomain (the qpushly-user-guide
// repo). Point links at the subdomain.
export const GUIDE_URL = 'https://guide.qpushly.com';

export const SUPPORT_EMAIL = 'support@qpushly.com';

// Primary nav.
export const NAV = [
  ['/automations', 'Automations'],
  ['/how-it-works', 'How it works'],
  ['/integrations', 'Integrations'],
  ['/pricing', 'Pricing'],
  [GUIDE_URL, 'Guide'],
] as const;
