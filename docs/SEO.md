# HenHouse Search Engine Optimization (SEO) & Social Graph

## Purpose

Maximize discoverability, search ranking, and social sharing click-through rates (CTR) on Google, Bing, Facebook, WhatsApp, Twitter/X, and LinkedIn for chicken pricing in Sri Lanka across English, Sinhala (සිංහල), and Tamil (தமிழ்).

---

## Architecture

1. **Meta & Semantic Directives**:
   - `description`: Actionable, keyword-dense summary emphasizing Sri Lankan live vs. dressed chicken pricing.
   - `keywords`: Targeted keywords in English, Sinhala, and Tamil (`chicken price sri lanka`, `henhouse`, `live chicken price`, `dressed chicken price`, `කුකුල් මස් මිල`, `කිකිළි මිල`, `கோழி இறைச்சி விலை`, `broiler farming`).
   - `canonical`: Hardcoded to `https://ragulan28.github.io/henhouse-calculator/` to prevent duplicate content indexing.
   - `robots`: Directed indexing (`index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`).
   - `hreflang`: Language alternate references for `x-default`, `en`, `si`, and `ta`.
   - `geo`: Regional geo-targeting for Sri Lanka (`geo.region: LK`, `geo.placename: Sri Lanka`).

2. **Open Graph & Twitter Cards**:
   - `og:image`: High-resolution 1200×630 `og-image.png` featuring the HenHouse golden emblem, brand typography, and feature pills.
   - `og:locale` + `og:locale:alternate`: Signals multilingual availability (`en_LK`, `si_LK`, `ta_LK`).
   - `twitter:card`: `summary_large_image` for large image preview cards on Twitter/X.

3. **Schema.org Structured Data (JSON-LD)**:
   - `@graph` linking:
     - `WebApplication`: Software category (`BusinessApplication`), operating systems, and trilingual capabilities.
     - `LocalBusiness`: HenHouse contact number (`+94777649544`), Sri Lankan address country (`LK`), and official Facebook profile.
     - `FAQPage`: Rich Q&A schema enabling Google Search rich expandable snippet boxes directly in search engine result pages (SERPs).

4. **Crawler Assets**:
   - `robots.txt`: Directs all user agents and specifies sitemap location.
   - `sitemap.xml`: Standard XML sitemap with `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`, and `xhtml:link` multilingual alternates.

5. **Semantic On-Page Content (FAQ Section)**:
   - Accessible `<details>` / `<summary>` accordion answering the four most common Sri Lankan poultry pricing queries.
   - Search engines can crawl the text naturally; fully synchronized with the trilingual dictionary (`I18N`).

---

## Data Flow

1. Search engine spiders (Googlebot, Bingbot) request `/robots.txt` and discover `/sitemap.xml`.
2. Spider parses [index.html](file:///home/ragulan/work/henhouse/henhouse-calculator/index.html), reads JSON-LD `@graph`, and indexes rich snippets (FAQ accordion and WebApplication metadata).
3. When users share the URL via WhatsApp, Facebook, iMessage, or Twitter/X, the social platform fetches `og-image.png` (1200×630) and displays a branded preview card.

---

## Configuration & Assets

- `og-image.png`: 1200×630 RGB PNG (137 KB), pre-cached in `sw.js`.
- `robots.txt`: Root search crawler permissions.
- `sitemap.xml`: XML sitemap with trilingual hreflang alternates.
- `sw.js`: Service Worker cache incremented to `henhouse-calculator-v7`.

