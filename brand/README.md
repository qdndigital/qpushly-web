# QPushly brand kit — banners (2026-11, brand guidelines v1.0)

Built to the brand guidelines (app repo → `docs/brand/qpushly-brand-guidelines.html`):
Paper `#F4F1EA` ground, Ink `#1E1E1A`, QPushly blue `#2F6FED` as the one accent,
Be Vietnam Pro 600 headings, the official horizontal logo (never retyped), and the
tagline “One tap, always reachable.” with its full stop in brand blue. The store in
every image ("Northline Supply") is fictional; no figures are performance claims.

| Folder | File | Size | Where it goes |
|---|---|---|---|
| listing/ | app-icon-1200x1200.png | 1200×1200 | App Store app icon (new: deep blue #1B3FA8, notification bubble) |
| listing/ | promo-1600x900.png | 1600×900 | App Store listing — feature image |
| listing/ | 01-opt-in … 05-setup.png | 1600×900 | App Store screenshots, in this order (02–05 are real app UI) |
| social/ | og-1200x630.png | 1200×630 | Link previews (also `public/assets/og.png`) |
| social/ | facebook-cover-1640x624.png | 1640×624 | Facebook page cover (2× of 820×312; keep text in the middle 1320px) |
| social/ | linkedin-cover-1128x191.png | 1128×191 | LinkedIn company page cover (left 300px sits under the logo) |
| social/ | x-header-1500x500.png | 1500×500 | X / Twitter header (left ~500px sits under the avatar) |
| ads/ | ad-1080x1080-reach.png, ad-1080x1080-cart.png | 1080×1080 | Meta feed, LinkedIn |
| ads/ | ad-1200x628.png | 1200×628 | Meta link ad, LinkedIn single image, Google display |
| ads/ | ad-1080x1920-story.png | 1080×1920 | Stories / Reels |

Rebuild: edit `src/gen_banners.py`, then `python3 gen_banners.py && node shoot_b.js`
(needs Playwright, the site fonts in `fonts/`, `v2.css` and `assets/screens/`).

Alt text for the listing screenshots:
1. Shoppers opt in from a branded invite on your storefront — no email, no phone
2. Create a campaign with image, link and audience, send now or schedule, A/B test
3. Up to three timed reminders per automation, each with its own copy
4. Subscriber growth, browser and device segments, CSV import and export
5. A five-step setup checklist from install to your first notification
