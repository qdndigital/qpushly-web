# QPushly — Marketing Website

Public marketing site for the **QPushly** Shopify app (web push notifications).
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

## Design — brand guidelines v1.0

Source of truth: `qpushly/docs/brand/qpushly-brand-guidelines.html`. Paper `#F4F1EA`
ground (60%), Ink `#1E1E1A` (30%), QPushly blue `#2F6FED` as the one accent (10%) —
primary buttons are blue, 10px radius; headings Be Vietnam Pro 600; the logo is the
official horizontal artwork in `Logo.astro`, never retyped; the tagline is
“One tap, always reachable.” with a blue full stop. Support: hello@qdn.vn.
Name in running text: **QPushly** (matches the App Store listing and QSortby's style).

### Previous system — "Polaris Pro · Ink + Blue" (superseded where it conflicts)

50% Shopify Polaris · 30% Linear · 20% Apple. White ground, **near-black primary**
(`#111418` buttons/brand), with **QPushly blue** (`#2f6fed`) reserved for accents,
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
three real QPushly automations (abandoned cart, back in stock, price drop) over a
soft blue glow, with an outcome strip beneath. `AppShot.astro` is a pure-CSS
mockup of the embedded admin dashboard, used in the "inside the app" split and on
`/how-it-works`. Neither is a screenshot — they stay sharp at any width and weigh
nothing.

> **Deliberate non-animation:** the notification cards do *not* fade in one by
> one. An earlier version emptied the stack on load and staggered them back in;
> it read nicely after a second, but it also meant the hero's centrepiece was an
> empty dark panel for every first paint, crawler and link-preview snapshot. See
> the comment in `public/assets/app.js`.

### 2026-11 redesign

Same family tokens (font, ink, blue, borders). New home-page sections live in
`src/styles/v2.css` — plain CSS, so the static prototype that was reviewed and
the Astro build share one file. `NotifCard.astro` is the one notification
component used everywhere (hero, journey, automations page, CTA). Real admin
screens are in `public/assets/screens/`. Banners for the listing, social and ads
are in `brand/` (see `brand/README.md`). The old `PushShade` / bento components
are no longer on `/`; `AppShot` is still used by `/how-it-works`.

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
| `/` | Landing (2026-11 redesign) — hero: storefront invite + phone lock screen; one shopper's week (five notifications); real admin screens; one-minute video; attribution ledger; setup; pricing; FAQ; dark CTA |
| `/automations` | The five automations, one row each, plus what they all share |
| `/how-it-works` | End to end: opt-in → signals → scheduler → reporting, plus data handling |
| `/integrations` | Shopify-native surfaces, browser support, and an honest "not yet" list |
| `/pricing` | Plans + comparison matrix + billing FAQ |
| `/support` | Netlify contact form + what to include in a bug report |
| `/thank-you` | Post-submit page (no-JS form fallback target; `noindex`) |
| `/privacy` | Privacy Policy — required for the App Store listing |
| `/terms` | Terms of Service |

Adding a page? Add it to `public/sitemap.xml` too — the sitemap is hand-maintained.

## Status (2026-11-07)

The app is live on the App Store (published 2026-10-26) and the site now matches
it. Reconciled against the app repo on `main`:

- **Pricing confirmed** — Free + Pro $19 / 30 days, 7-day trial, defined with the
  Billing API in the app's `app/shopify.server.ts`. `PRICING_CONFIRMED = true`,
  so the caveat boxes are gone and the JSON-LD carries `offers`. There is **no
  annual plan** in the app; the listing's $200/yr line must be removed too.
- **"Book a demo" removed** everywhere — the cal.com link never existed. The
  listing's demo store is password-protected, so it is not linked either. The
  secondary CTA is now the one-minute intro video (`/#watch`), the same cut as
  the listing video, on YouTube: https://youtu.be/FgelO6Ejc04 (QDN channel,
  unlisted). It loads click-to-play from youtube-nocookie.com; the chapter list
  starts it at each point.
- **Brand casing is `QPushly`**, matching the App Store listing and the app.
- **OG image** — `public/assets/og.png` (1200×630), wired in `Base.astro`.
- **Copy corrected to shipped behaviour**: soft invite before the browser prompt,
  one-minute scheduler, A/B split test, "Buy it now" attribution, 5% price-drop
  threshold, starter reminders on install. Removed claims the app does not back:
  "recovering the cart stops the remaining reminders", "skips anyone who has
  since added it to the cart", "the message can carry the old and new price",
  and "push lists grow faster than email lists".
- **Privacy Policy** now discloses that cart snapshots are sent for visitors who
  have not subscribed (stored without identity) and the 30-minute checkout-intent
  record. Still **not legally reviewed**.

Open:

- `SUPPORT_EMAIL` is `hello@qdn.vn`; the app's `.env.example` and the listing
  copy draft use `hello@qdn.vn`. Now hello@qdn.vn everywhere.
- No testimonials yet — add attributable ones when they exist.

## Claims discipline

Every page here follows the same three rules as the App Store listing copy:
**no statistics**, **pricing only on the pricing page**, **no outcome guarantees**.
The numbers in the hero's outcome strip and the admin mockup are labelled in the
component source as illustrative figures for a fictional store. Keep it that way —
unverifiable performance claims are a listing rejection, and they read as noise to
merchants who have seen ten push apps make them.
