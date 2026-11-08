/**
 * Pricing — single source of truth for the marketing site.
 *
 * Confirmed 2026-11-07 against the app: ONE paid plan, defined in code with the
 * Shopify Billing API (`billing` in app/shopify.server.ts) — Pro, $19 USD every
 * 30 days, 7-day trial — plus the Free tier. There is NO annual plan in the app;
 * do not advertise one here or on the listing until `BillingInterval.Annual`
 * exists in that `billing` block.
 *
 * **Feature split** — mirrors `app/lib/plan-features.ts` in the app repo, which
 * is what the app actually enforces. Do not change one without the other; a
 * listing that promises what the app does not gate (or gates what the listing
 * says is free) is an App Store rejection. What is enforced:
 *   - Free: Welcome notifications only, 1 reminder per automation, no CSV import
 *   - Paid: all five automations, 3 reminders each, CSV import
 * Gates apply when a merchant CONFIGURES something, not when a notification is
 * sent, so a downgrade never stops sends already set up. Revenue attribution is
 * deliberately NOT gated — see the comment in plan-features.ts for why.
 *
 * **Prices** — the paid plan is defined in the app's code (Billing API, see
 * top of file). Change a price there first, then here, then in the listing copy
 * (app repo → docs/listing-v2/LISTING_COPY.md) and the user guide.
 */

/** Set to true once the numbers below have been reconciled with the Partner
 *  Dashboard. While false, /pricing renders a "confirm on the App Store" note
 *  instead of presenting these figures as final. */
export const PRICING_CONFIRMED = true;

/** Shopify's payment trial on the paid plan, before the first charge. */
export const PAYMENT_TRIAL_DAYS = 7;

export interface Plan {
  /** Plan name as shown to merchants — must match the Partner Dashboard exactly. */
  name: string;
  /** Display price, USD per 30-day billing cycle. */
  price: string;
  /** Who it's for — one line, sits under the price. */
  desc: string;
  /** Bullets. Keep to 6 max; anything longer belongs in the matrix. */
  features: string[];
  /** Ribbon text, or null. Only one plan should carry one. */
  badge?: string;
  /** true → render as the visually emphasised card. */
  feat?: boolean;
}

export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Everything you need to start collecting subscribers.',
    features: [
      'One-tap storefront opt-in',
      'Unlimited campaigns, sent now or scheduled',
      'A/B split test on campaigns',
      'Welcome notification (one message)',
      'Revenue attribution per send',
      'Subscriber segments and CSV export',
    ],
  },
  {
    name: 'Pro',
    price: '$19',
    desc: 'For stores running push as a real channel.',
    features: [
      'Everything in Free',
      'Abandoned cart recovery',
      'Browse abandonment',
      'Back-in-stock & price-drop alerts',
      'Up to 3 reminders per automation, welcome included',
      'CSV subscriber import',
    ],
    badge: 'Recommended',
    feat: true,
  },
];

/** Feature-comparison matrix. `cells` is [Free, Pro].
 *  '✓' / '—' render as yes/no marks; anything else renders as literal text. */
export const MATRIX: { label: string; cells: string[] }[] = [
  { label: 'One-tap storefront opt-in', cells: ['✓', '✓'] },
  { label: 'Unlimited subscribers', cells: ['✓', '✓'] },
  { label: 'Broadcast campaigns (image + click URL)', cells: ['✓', '✓'] },
  { label: 'Scheduled sends', cells: ['✓', '✓'] },
  { label: 'A/B split test (two versions per campaign)', cells: ['✓', '✓'] },
  { label: 'Subscriber segments (browser / OS / device)', cells: ['✓', '✓'] },
  { label: 'Impressions & clicks per campaign', cells: ['✓', '✓'] },
  // Not gated on purpose: attribution happens in the orders webhook, which has
  // no cheap way to know the plan, and withholding reporting a merchant already
  // earned is user-hostile. See app/lib/plan-features.ts.
  { label: 'Revenue attribution per send', cells: ['✓', '✓'] },
  { label: 'Welcome notifications', cells: ['1 message', 'Up to 3'] },
  { label: 'Abandoned cart recovery', cells: ['—', '✓'] },
  { label: 'Browse abandonment', cells: ['—', '✓'] },
  { label: 'Back-in-stock alerts', cells: ['—', '✓'] },
  { label: 'Price-drop alerts', cells: ['—', '✓'] },
  { label: 'Reminders per automation', cells: ['—', 'Up to 3'] },
  { label: 'CSV export', cells: ['✓', '✓'] },
  { label: 'CSV subscriber import', cells: ['—', '✓'] },
  { label: 'Free trial', cells: ['Not needed', '7 days'] },
  { label: 'Support', cells: ['Guide + email', 'Guide + email'] },
];
