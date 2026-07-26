# Next.js PageSpeed Optimization Directives

## Copy — Adversarial Check: Assert vs. Demonstrate

Before writing any number, count, or trust/quality claim into user-facing copy on this site (CV text, section headers, marketing blurbs), run the Bayesian-signal test: would this exact wording show up whether the underlying claim is true/meaningful or false/decorative? If P(this phrasing | true) ≈ P(this phrasing | false), the signal is null — it does no evidential work, cut it.

- **Decorative numbers** — a count that could be swapped for a different nearby value with no change to what the reader concludes. Examples caught in practice: "Sept histoires" (a count promoted to a headline), "quinze Looms classés par thème", "une quarantaine de fonctionnalités", "22 participants".
- **Unfalsifiable trust-claims** — a bare assertion of a virtue (accuracy, honesty, rigor) that a fabricated version of the text would state identically. Example caught: "Les chiffres sont réels." — if the numbers weren't real, the sentence would read exactly the same, so it proves nothing. Prefer describing the actual checkable mechanism instead (e.g. "je ne retiens un résultat que quand deux sources concordent").
- **Genuine impact numbers** — keep these. "14 500 tentatives de scam mitigées", "8,3/10 contre 6,2 avant", "28 j-h rendus au support" are results, not inventory counts or unverifiable reassurance.

Do not add a number or a trust-claim just to sound precise or rigorous — precision is not the same as relevance, and asserting a quality is not the same as demonstrating it. Run this check before presenting any new or edited copy as finished; flag borderline cases instead of silently deciding.

## Copy — Don't Over-Disclose Employer Metrics

When copy cites HomeExchange's internal business metrics (account counts, volumes, revenue), round to vague magnitude ("plusieurs millions") instead of the precise figure ("5 millions") unless the company has already made that exact number public. This is a personal portfolio, not the first public source for someone else's business data.

This is separate from the assert-vs-demonstrate check above: a scale number can be real and non-decorative and still fail the test if it's just stated as a floating credential. Always attach the actual stake — why the scale matters for the story being told — rather than leaving the number to stand alone.

## Hydration — Zero Mismatch

- NEVER call `new Date()`, `Math.random()`, or any non-deterministic function in the render path of client components. Static pages are built once at deploy time — the client will hydrate with a different value days later.
- NEVER read `localStorage`, `sessionStorage`, `window.location`, or `navigator` inside `useState()` initializers. Always initialize with a static default and hydrate in `useEffect`.
- If a component must differ between server and client, use a `mounted` state pattern:
  ```js
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <ServerFallback />
  ```

## Third-Party Scripts — Defer Everything

- NEVER import analytics (PostHog, GA, Segment) at the top level or in `layout.js`.
- Always defer third-party scripts to after page load using `requestIdleCallback` or `setTimeout` (5s+).
- Disable heavy features by default: session recording, heatmaps, autocapture. Enable only what you need.
- Use dynamic `import()` for analytics so the bundle isn't included in the critical path.
- Example pattern:
  ```js
  window.addEventListener('load', () => {
    requestIdleCallback(() => import('posthog-js').then(...), { timeout: 8000 })
  })
  ```

## CSS — No Render Blocking

- Prefer Tailwind utility classes (already inlined by Next.js) over external CSS files.
- Keep `globals.css` minimal — only Tailwind directives, CSS variables, and print styles.
- Never import large CSS libraries synchronously. Use `next/dynamic` with `ssr: false` only for heavy below-the-fold UI widgets, never for above-the-fold content.

## JavaScript — Minimize Bundle

- Do NOT use `dynamic(() => import(...), { ssr: false })` for above-the-fold components — it causes a full re-layout (Style & Layout doubles).
- Use `dynamic()` with `ssr: false` only for truly optional, below-the-fold, interaction-triggered components (modals, editors, etc.).
- Audit dependencies regularly with `npx depcheck` and `npx next-bundle-analyzer`.
- Avoid polyfill-heavy libraries. Target modern browsers only.

## Security Headers — Required in `next.config.mjs`

Always add these headers in `next.config.mjs` `headers()`:

```js
async headers() {
  return [{
    source: '/(.*)',
    headers: [
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
      },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    ],
  }]
}
```

- Whitelist third-party script/connect origins in CSP as needed.
- Do NOT add `require-trusted-types-for 'script'` — Next.js/Turbopack does not support Trusted Types.
- NEVER have two next config files (`next.config.js` AND `next.config.mjs`) — only use one. The `.js` file takes priority and silently overrides `.mjs`.

## SEO — Always Present

- Every page must have `metadata` export with `title`, `description`, and `openGraph`.
- Root layout must set `<html lang="xx">`.
- Use semantic HTML: `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- Add Schema.org structured data (`itemScope`, `itemType`, `itemProp`) where relevant.

## Images

- Always use `next/image` — never raw `<img>` tags.
- Set explicit `width` and `height` to prevent CLS.
- Use `priority` prop only for the LCP image (above the fold).

## Fonts

- Use `next/font` to self-host fonts — eliminates external font requests and FOIT/FOUT.
- Never load fonts from Google Fonts CDN directly.

## Performance Targets

- Performance: 95+
- Accessibility: 100
- Best Practices: 96+ (100 not possible with Trusted Types limitation)
- SEO: 100
- TBT: < 200ms
- CLS: 0
