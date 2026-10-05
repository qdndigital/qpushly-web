# Qpushly — Marketing Website

Public marketing site for the **Qpushly** Shopify app (web push notifications).
Built with **Astro + Tailwind**, deploys as static HTML to **Netlify**, and uses
**Netlify Forms** for the support contact form.

This folder is standalone — it is **not** part of the qpushly app repo and has its
own `package.json`. Same structure, stack and design system as
[`qsortby-web`](../qsortby-web), so anything you learn in one applies to the other.

## Stack

- [Astro](https://astro.build) 4 — static output, zero client framework
- Tailwind CSS 3 (design tokens in `tailwind.config.mjs`)
- Self-hosted fonts in `public/fonts/`: **Be Vietnam Pro** (UI + display, latin + vietnamese — the brand font), **JetBrains Mono** (labels + numerals)
- Netlify Forms (the `support` form on `/support`)
- One 3 kB client script (`public/assets/app.js`): sticky-header border, mobile nav, reveal-on-scroll

## Design — "Polaris Pro · Ink + Blue"

50% Shopify Polaris · 30% Linear · 20% Apple. White ground, **near-black primary**
(`#111418` buttons/brand), with **Qpushly blue** (`#2f6fed`) reserved for accents,
links and live data. Be Vietnam Pro, light borders, minimal shadow, no decorative page
gradients, quiet/quick motion.

The blue is not arbitrary: it is the `qpushly` entry in the shared QDN-family
theme (`qsortby-user-guide/src/config.ts` → `PRESETS`). The logo is the real
brand symbol from the app's brand kit (`qpushly/public/brand/`), inlined in
`Logo.astro`; `public/favicon.svg` is the brand app icon.

**If you change the accent, change it in all three places** —
`tailwind.config.mjs`, `src/styles/global.css` (`:root`), and the guide's preset —
or the app family stops looking like a family.

The hero centrepiece is `PushShade.astro`: a dark OS notification shade holding
three real Qpushly automations (abandoned cart, back in stock, price drop) over a
soft blue glow, with an outcome strip beneath. `AppShot.astro` is a pure-CSS
mockup of the embedded admin dashboard, used in the "inside the app" split and on
`/how-it-works`. Neither is a screenshot — they stay sharp at any width and weigh
nothing.

> **Deliberate non-animation:** the notification cards do *not* fade in one by
> one. An earlier version emptied the stack on load and staggered them back in;
> it read nicely after a second, but it also meant the hero's centrepiece was an
> empty dark panel for every first paint, crawler and link-preview snapshot. See
> the comment in `public/assets/app.js`.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Deploy to Netlify

1. New site → connect this repo.
2. Build command `npm run build`, publish directory `dist` (both already set in `netlify.toml`).
3. Deploy. Netlify auto-detects the static `support` form on `/support`; submissions appear under **Forms**. Configure email/Slack notifications there.
4. Point `qpushly.com` at the site, and add `guide.qpushly.com` for the separate [qpushly-user-guide](../qpushly-user-guide) site.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero w/ notification shade, trust bar, problem/solution, admin mockup, feature bento, setup steps, pricing teaser, FAQ, CTA |
| `/automations` | The five automations, one row each, plus what they all share |
| `/how-it-works` | End to end: opt-in → signals → scheduler → reporting, plus data handling |
| `/integrations` | Shopify-native surfaces, browser support, and an honest "not yet" list |
| `/pricing` | Plans + comparison matrix + billing FAQ |
| `/support` | Netlify contact form + what to include in a bug report |
| `/thank-you` | Post-submit page (no-JS form fallback target; `noindex`) |
| `/privacy` | Privacy Policy — required for the App Store listing |
| `/terms` | Terms of Service |

Adding a page? Add it to `public/sitemap.xml` too — the sitemap is hand-maintained.

## ⚠️ Before publishing

### 1. Pricing is a placeholder — this one is a blocker

`src/plans.ts` ships **invented numbers** and says so at the top of the file.
Qpushly bills through Shopify **Managed Pricing**, which means the real plans live
in the Partner Dashboard, not in any repo. Worse, the app currently **gates
nothing** on plan — `hasPaidPlan` only drives an upsell banner (see P0-4 in the
app repo's `docs/APP_STORE_SUBMISSION.md`), so the Free-vs-Pro split here is a
*proposal*, not a description of shipped behaviour.

Before launch:

1. Read the real plan names, prices and trial from the Partner Dashboard.
2. Make the app actually enforce whatever limits you advertise.
3. Update `PLANS` + `MATRIX` in `src/plans.ts`, then flip `PRICING_CONFIRMED` to
   `true` — that removes the caveat boxes on `/` and `/pricing` and re-enables the
   `offers` block in the JSON-LD.
4. Mirror the same numbers into the listing copy (`docs/APP_STORE_LISTING.md` in
   the app repo) and the user guide.

A listing price that differs from what Shopify charges is an automatic rejection.

### 2. Other placeholders

- **`src/consts.ts`** → `APP_STORE_URL` points at `apps.shopify.com/qpushly`, which
  404s until the app is published. `DEMO_URL` (`cal.com/qpushly/demo`) is not a real
  booking link — every "Book a demo" button 404s until you replace it. Those are all
  *secondary* CTAs (primary is install), so the funnel works meanwhile.
- **Domain** → `astro.config.mjs` `site`, plus the `qpushly.com` references in
  `public/sitemap.xml`, `public/robots.txt` and the JSON-LD in `src/layouts/Base.astro`.
- **`SUPPORT_EMAIL`** → `hello@qdn.vn`; confirm the inbox exists and is monitored.
- **Privacy Policy and Terms** are written to be *factually accurate* about what the
  app stores (derived from `prisma/schema.prisma`) but they are **not legally
  reviewed**. Have a lawyer read both before submitting, and re-read the privacy page
  whenever the schema changes.
- **No OG share image.** The Twitter card is `summary`. Add `public/assets/og.png`
  (1200×630) and wire `og:image` in `Base.astro` if you want rich link previews.
- **No testimonials anywhere on the site.** That is on purpose — there are no real
  merchant quotes yet, and illustrative ones are worse than none. Add them when you
  have attributable ones.

### 3. Claims discipline

Every page here follows the same three rules as the App Store listing copy:
**no statistics**, **pricing only on the pricing page**, **no outcome guarantees**.
The numbers in the hero's outcome strip and the admin mockup are labelled in the
component source as illustrative figures for a fictional store. Keep it that way —
unverifiable performance claims are a listing rejection, and they read as noise to
merchants who have seen ten push apps make them.
