/**
 * Pricing — single source of truth for the marketing site.
 *
 * ⚠️  THE FEATURE SPLIT IS REAL AND ENFORCED. THE PRICES ARE STILL PLACEHOLDERS.
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
 * **Prices** — still unknown to this repo. Qpushly bills through Shopify
 * **Managed Pricing**, so the tiers live in the Partner Dashboard;
 * `app/utils/billing.server.ts` only reads the active subscription and links to
 * Shopify's hosted pricing page. Before launch:
 *   1. Read the real plan name, price and trial from the Partner Dashboard.
 *   2. Update the `price` fields below and flip PRICING_CONFIRMED to true.
 *   3. Mirror them in the listing copy (app repo → docs/APP_STORE_LISTING.md)
 *      and the user guide.
 */

/** Set to true once the numbers below have been reconciled with the Partner
 *  Dashboard. While false, /pricing renders a "confirm on the App Store" note
 *  instead of presenting these figures as final. */
export const PRICING_CONFIRMED = false;

/** Shopify's payment trial on the paid plan, before the first charge. */
export const PAYMENT_TRIAL_DAYS = 7;

export interface Plan {
  /** Plan name as shown to merchants — must match the Partner Dashboard exactly. */
  name: string;
  /** Display price, USD/month. */
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
      'Unlimited broadcast campaigns',
      'Welcome notifications',
      'Revenue attribution per send',
      'Subscriber list with device segments',
      'CSV export',
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
      'Up to 3 reminders per automation',
      'CSV import from another provider',
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
  { label: 'Subscriber segments (browser / OS / device)', cells: ['✓', '✓'] },
  { label: 'Impressions & clicks per campaign', cells: ['✓', '✓'] },
  // Not gated on purpose: attribution happens in the orders webhook, which has
  // no cheap way to know the plan, and withholding reporting a merchant already
  // earned is user-hostile. See app/lib/plan-features.ts.
  { label: 'Revenue attribution per send', cells: ['✓', '✓'] },
  { label: 'Welcome notifications', cells: ['✓', '✓'] },
  { label: 'Abandoned cart recovery', cells: ['—', '✓'] },
  { label: 'Browse abandonment', cells: ['—', '✓'] },
  { label: 'Back-in-stock alerts', cells: ['—', '✓'] },
  { label: 'Price-drop alerts', cells: ['—', '✓'] },
  { label: 'Reminders per automation', cells: ['1', '3'] },
  { label: 'CSV export', cells: ['✓', '✓'] },
  { label: 'CSV import from another provider', cells: ['—', '✓'] },
  { label: 'Support', cells: ['Guide', 'Email'] },
];
