# HenHouse Trilingual Localization (Sri Lanka)

## Purpose

Provide full, authentic trilingual support for Sri Lanka's three official languages:

1. **English (`en`)**
2. **Sinhala (`si` / සිංහල)**
3. **Tamil (`ta` / தமிழ்)**

The vocabulary and phrasing reflect everyday commercial terminology used by Sri Lankan poultry farmers, wholesale broiler distributors, meat shops, butchers, and retail consumers.

---

## Architecture

- **Modular Architecture**: String tables housed in [js/i18n.js](file:///home/ragulan/work/henhouse/henhouse-calculator/js/i18n.js) and consumed by [js/app.js](file:///home/ragulan/work/henhouse/henhouse-calculator/js/app.js) with zero external libraries, ensuring instant loading and 100% offline PWA compatibility.
- **Client-Side Dictionary (`I18N`)**: Complete string tables for `en`, `si`, and `ta` covering all labels, units, input hints, result metrics, buttons, error messages, and clipboard export templates.
- **Declarative Markup Binding (`data-i18n`)**: DOM elements declare translatable keys via `data-i18n="<key>"`, allowing instantaneous language swaps without page reloading.
- **Reactive UI & Dynamic Currency/Units**:
  - Currency prefixes: `Rs. ` (English), `රු. ` (Sinhala), `ரூ. ` (Tamil).
  - Weight units: `kg` / `කි.ග්‍රෑ.` / `கிலோ`.
  - Bird units: `bird` / `කුකුලෙකුට` / `கோழி ஒன்றுக்கு`.
  - Sri Lankan number formatting (`value.toLocaleString("en-LK", ...)`).
- **Persistent User Choice**:
  - Saved in `localStorage.getItem("henhouse_lang")`.
  - Falls back to browser language detection (`navigator.language`) if no preference is saved.
- **Sri Lankan Font Stack**:
  - Enhanced `font-family` with native font support for Sinhala and Tamil:
    `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Sinhala", "Noto Sans Tamil", "Iskoola Pota", "Nirmala UI", sans-serif;`

---

## Data Flow

1. **Initialization**:
   - `localStorage.getItem("henhouse_lang")` is checked.
   - If not set, checks `navigator.language` (`si` → Sinhala, `ta` → Tamil, else `en`).
   - Invokes `setLanguage(lang)`.
2. **Language Change**:
   - Updates `document.documentElement.lang` and `document.title`.
   - Iterates through all `[data-i18n]` elements and updates `textContent`.
   - Updates `.lang-btn` active classes and `aria-pressed` states.
   - Saves selection to `localStorage`.
   - Triggers `calculate()` to refresh rendered prices, currency symbols, and weight units.
3. **Clipboard Copy**:
   - Reads the active language dictionary (`I18N[currentLang]`).
   - Copies a cleanly localized summary ready for WhatsApp or SMS sharing.

---

## Sri Lankan Terminology Mapping

| Metric / Term               | English                                | Sinhala (සිංහල)                 | Tamil (தமிழ்)                    |
| :-------------------------- | :------------------------------------- | :------------------------------ | :------------------------------- |
| **App Title**               | HenHouse \| Chicken Pricing Calculator | HenHouse \| කුකුල් මස් මිල ගණනය | HenHouse \| கோழி விலை கணிப்பான்  |
| **Tagline**                 | Chicken Pricing Calculator             | කුකුල් මස් මිල ගණනය කිරීම       | கோழி இறைச்சி விலை கணிப்பான்      |
| **Live Chicken**            | Live chicken                           | සජීවී කුකුල් මස්                | உயிருள்ள கோழி                    |
| **Dressed Chicken**         | Dressed chicken                        | පිරිසිදු කළ කුකුල් මස්          | சுத்தம் செய்த கோழி               |
| **Live Purchase Price**     | Live chicken purchase price            | සජීවී කුකුළන් මිලදී ගැනීමේ මිල  | உயிருள்ள கோழி கொள்முதல் விலை     |
| **Profit Margin**           | Desired profit margin                  | බලාපොරොත්තු වන ලාභ ප්‍රතිශතය    | எதிர்பார்க்கும் இலாப விகிதம்     |
| **Other Expenses**          | Other expenses                         | වෙනත් වියදම්                    | ஏனைய செலவுகள்                    |
| **Live Chicken Weight**     | Live chicken weight                    | සජීවී කුකුළාගේ බර               | உயிருள்ள கோழியின் எடை            |
| **Dressing Yield**          | Dressing yield                         | මස් අස්වැන්න (Dressing Yield)   | இறைச்சி விகிதம் (Dressing Yield) |
| **Break-Even Price**        | Break-even price/kg                    | පාඩු නොවන මිල / කි.ග්‍රෑ.       | சமநிலை விலை / கிலோ               |
| **Selling Price**           | Selling price/kg                       | විකුණුම් මිල / කි.ග්‍රෑ.        | விற்பனை விலை / கிலோ              |
| **Profit**                  | Profit/kg                              | ලාභය / කි.ග්‍රෑ.                | இலாபம் / கிலோ                    |
| **Expected Dressed Weight** | Expected dressed weight                | ලැබෙන පිරිසිදු මස් බර           | கிடைக்கும் இறைச்சி எடை           |
| **Currency Prefix**         | `Rs. `                                 | `රු. `                          | `ரூ. `                           |
| **Weight Suffix**           | ` kg`                                  | ` කි.ග්‍රෑ.`                    | ` கிலோ`                          |
| **Copy Button**             | Copy calculation                       | ගණනය පිටපත් කරන්න               | கணக்கீட்டை நகலெடு                |
| **Copied Toast**            | Copied!                                | පිටපත් කෙරිණි!                  | நகலெடுக்கப்பட்டது!               |
| **Reset Button**            | Reset                                  | යළි සකසන්න                      | மீட்டமை                          |

---

## Components

- **`.lang-switch`**: Segmented pill group in the header with buttons for `English`, `සිංහල`, and `தமிழ்`.
- **`.lang-btn`**: Accessible buttons with `aria-pressed="true|false"` and keyboard navigation support.
- **Service Worker (`sw.js`)**: Incremented cache to `henhouse-calculator-v6`.
