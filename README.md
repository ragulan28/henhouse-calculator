<p align="center">
  <img src="logo.png" alt="HenHouse Logo" width="120" height="120">
</p>

<h1 align="center">HenHouse Chicken Pricing Calculator</h1>

<p align="center">
  A fast, accurate, mobile-friendly live vs. dressed chicken pricing calculator built for poultry farmers, butchers, retailers, and distributors in Sri Lanka.
</p>

<p align="center">
  <a href="https://ragulan28.github.io/henhouse-calculator/"><strong>🌐 View Live Calculator</strong></a>
</p>

---

## 🚀 Overview

**HenHouse Chicken Pricing Calculator** runs 100% in the browser. It requires no login, no server, and no database, and works offline as an installable Progressive Web App (PWA).

Users can enter live bird purchase prices, operating expenses, live chicken weights, dressing yield percentages, and desired profit margins to instantly compare break-even costs, selling prices, and profits between live and dressed chicken.

---

## ✨ Features

- **🇱🇰 Trilingual Sri Lankan Support**: Full native support for English, Sinhala (සිංහල), and Tamil (தமிழ்) with authentic poultry market terminology and Sri Lankan currency formatting (`Rs.` / `රු.` / `ரூ.`).
- **⚡ Instant Real-Time Calculations**: Calculates break-even prices, selling prices, and profit margins on every keystroke.
- **⚖️ Live vs. Dressed Comparison**: Side-by-side comparison of profit per kilogram and selling price difference.
- **📋 One-Click Copy**: Copies formatted calculation summaries directly to clipboard, formatted for instant sharing via WhatsApp or SMS in the selected language.
- **📱 PWA & 100% Offline Support**: Installable directly to mobile home screens (iOS & Android) with local caching via Service Worker.
- **🎨 Brand-Aligned Design**: Warm barnwood espresso and golden amber color theme crafted from the official HenHouse emblem.
- **💬 Direct Business Integration**: Seamless WhatsApp (`0777 649 544`) and Facebook (`facebook.com/henhouse.lk`) connectivity.

---

## 🧮 Calculator Logic & Formulas

The desired profit margin is calculated as a **percentage of the selling price** (standard commercial margin), rather than a simple markup on cost:

| Metric | Formula |
| :--- | :--- |
| **Total Cost / Bird** | $\text{Cost} = (\text{Purchase Price/kg} \times \text{Live Weight}) + \text{Expenses/bird}$ |
| **Expected Dressed Weight** | $\text{Dressed Weight} = \text{Live Weight} \times \left(\frac{\text{Dressing Yield \%}}{100}\right)$ |
| **Break-Even Price (Live)** | $\text{Live BE} = \frac{\text{Total Cost}}{\text{Live Weight}}$ |
| **Break-Even Price (Dressed)** | $\text{Dressed BE} = \frac{\text{Total Cost}}{\text{Dressed Weight}}$ |
| **Selling Price / kg** | $\text{Selling Price} = \frac{\text{Break-Even Price}}{1 - \left(\frac{\text{Margin \%}}{100}\right)}$ |
| **Profit / kg** | $\text{Profit} = \text{Selling Price} - \text{Break-Even Price}$ |
| **Price Difference / kg** | $\text{Difference} = \text{Dressed Selling Price} - \text{Live Selling Price}$ |

---

## 🌐 Deployment via GitHub Pages

This repository is pre-configured to deploy directly to GitHub Pages from the `main` branch:

1. Open **[Settings → Pages](https://github.com/ragulan28/henhouse-calculator/settings/pages)** in this repository.
2. Under **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/(root)`
3. Click **Save**.
4. Your website will be live at:
   **[https://ragulan28.github.io/henhouse-calculator/](https://ragulan28.github.io/henhouse-calculator/)**

---

## 📁 Repository Structure

```
henhouse-calculator/
├── index.html              # Core application, responsive UI & calculator logic
├── manifest.webmanifest    # PWA configuration and app icons
├── sw.js                   # Service Worker for offline caching
├── henhouse.png            # Master high-resolution brand emblem (3840×3840)
├── logo.png                # Optimized header logo (256×256)
├── favicon.ico             # Desktop browser favicon (16/32/48 multi-size)
├── favicon.png             # 32×32 PNG favicon
├── icon.svg                # Scalable SVG wrapper icon
├── apple-touch-icon.png    # 180×180 iOS home screen icon
├── icon-192.png            # 192×192 Android PWA icon
├── icon-512.png            # 512×512 Android PWA splash/maskable icon
├── docs/
│   ├── BRANDING_AND_ICONS.md # Technical documentation for design & branding
│   └── LOCALIZATION.md       # Trilingual (EN, SI, TA) architecture & terminology
└── README.md               # Project documentation
```

---

## 📞 Connect with HenHouse

- **WhatsApp**: [+94 77 764 9544](https://wa.me/94777649544) (`0777 649 544`)
- **Facebook**: [facebook.com/henhouse.lk](https://www.facebook.com/henhouse.lk)
- **Repository**: [github.com/ragulan28/henhouse-calculator](https://github.com/ragulan28/henhouse-calculator)
