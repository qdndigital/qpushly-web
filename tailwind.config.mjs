/**
 * Qpushly — "Polaris Pro" design tokens, same system as the QSortby site.
 * 50% Shopify Polaris · 30% Linear · 20% Apple.
 *
 * The one deliberate difference is the accent: Qpushly's family colour is blue
 * (#2f6fed — matching the `qpushly` preset in the shared guide theme), not
 * QSortby's emerald. Everything else — white ground, near-black primary
 * buttons, Be Vietnam Pro, light borders, minimal shadow, no decorative page gradients —
 * is intentionally identical so the two products read as one family.
 */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  theme: {
    extend: {
      colors: {
        // Brand guidelines v1.0: Paper 60 · Ink 30 · Qpushly blue 10.
        bg: "#FFFFFF",
        "bg-2": "#F6F7FA",
        paper: "#F7F4EE",
        sky: "#F2F6FF",
        surface: "#ffffff",
        ink: "#1E1E1A",
        "ink-2": "#5E5C55",
        muted: "#6E6B63",
        faint: "#9A968C",
        line: "#E7E9EF",
        "line-2": "#D6DAE3",
        // Primary action = Qpushly blue (guideline §11 header sample).
        btn: { DEFAULT: "#2F6FED", hover: "#1E4FBF" },
        blue: {
          DEFAULT: "#2F6FED",
          ink: "#1E4FBF",
          bright: "#4C8DFF",
          soft: "#DCE7FD",
          line: "#B9CEF8",
        },
        down: "#c4392f",
      },
      fontFamily: {
        // Two families: Be Vietnam Pro for everything, JetBrains Mono for the tracked
        // uppercase labels and tabular numerals.
        sans: ["Be Vietnam Pro", "system-ui", "-apple-system", "sans-serif"],
        display: ["Be Vietnam Pro", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        label: ["0.6875rem", { lineHeight: "1", letterSpacing: "0.08em" }],
        stat: ["1.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        h3: ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.018em" }],
        h2: ["clamp(1.75rem, 3.4vw, 2.6rem)", { lineHeight: "1.1", letterSpacing: "-0.028em" }],
        h1: ["clamp(2.2rem, 4.8vw, 3.8rem)", { lineHeight: "1.05", letterSpacing: "-0.034em" }],
        display: ["clamp(2.7rem, 5.6vw, 4.9rem)", { lineHeight: "1.0", letterSpacing: "-0.04em" }],
      },
      letterSpacing: { tight2: "-0.018em", tightest: "-0.034em" },
      maxWidth: { wrap: "1080px", wide: "1200px" },
      borderRadius: { lg2: "0.625rem", xl2: "0.875rem", "2xl2": "1.25rem", "3xl2": "1.75rem" },
      boxShadow: {
        xs: "0 1px 2px rgba(16,24,40,.05)",
        sm: "0 1px 2px rgba(16,24,40,.06), 0 1px 1px rgba(16,24,40,.04)",
        lg: "0 1px 3px rgba(16,24,40,.06), 0 22px 44px -24px rgba(16,24,40,.22)",
        // soft, floating elevation for the hero mockup + bento cards
        float: "0 1px 1px rgba(16,24,40,.04), 0 8px 24px -12px rgba(16,24,40,.18), 0 40px 80px -36px rgba(16,24,40,.22)",
        glow: "0 0 0 1px rgba(47,111,237,.16), 0 18px 50px -20px rgba(47,111,237,.30)",
      },
    },
  },
  plugins: [],
};
