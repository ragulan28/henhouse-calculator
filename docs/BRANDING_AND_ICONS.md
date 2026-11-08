# HenHouse Branding & Icons Documentation

## Purpose

Integrate the official HenHouse emblem logo (`henhouse.png`) into the header and generate standard multi-resolution web/PWA icons (favicons, Apple touch icon, and manifest icons) for full cross-browser and mobile device support.

## Architecture

- **Source Asset**: `henhouse.png` (3840×3840 RGBA master image with transparent alpha background).
- **Header Logo**: `logo.png` (256×256 RGBA optimized, 56 KB) rendered at 44×44 CSS pixels via `<img class="brand-logo">`, with an `onerror` fallback to `henhouse.png`.
- **Favicons & Browser Icons**:
  - `favicon.ico`: Standard multi-size ICO (16×16, 32×32, 48×48) for desktop browsers and legacy clients.
  - `favicon.png`: 32×32 standalone PNG.
  - `icon.svg`: Scalable SVG wrapper embedding the 512×512 PNG, maintaining backwards compatibility with SVG favicon declarations.
  - `apple-touch-icon.png`: 180×180 PNG for iOS home screen bookmarks.
- **PWA Manifest Icons**:
  - `icon-192.png`: 192×192 PNG for Android application launch screens.
  - `icon-512.png`: 512×512 PNG for high-DPI splash screens and maskable app icons.
- **Service Worker (`sw.js`)**: Updated cache name to `henhouse-calculator-v2` and pre-caches the optimized assets for 100% offline functionality.

## Data Flow

1. User loads `index.html`.
2. Browser reads favicon `<link>` tags (`favicon.ico`, `icon.svg`, `apple-touch-icon.png`) and displays tab icon.
3. Browser loads `<img class="brand-logo" src="./logo.png">` within the `.brand` flex header container.
4. If installed as a PWA, `manifest.webmanifest` provides `icon-192.png`, `icon-512.png`, and `icon.svg`.
5. `sw.js` caches all assets in the CacheStorage API during the `install` phase.

## API Changes

None (purely static client-side web application).

## Database Changes

None.

## New Components / Assets

- Assets generated: `favicon.ico`, `favicon.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `icon.svg`, `logo.png`.
- Master asset preserved: `henhouse.png`.

## Configuration

- Updated `manifest.webmanifest` icon declarations.
- Incremented `CACHE_NAME` in `sw.js` to `henhouse-calculator-v2`.

## Feature Flags & Permissions

None.

## Limitations

- Source image is a raster PNG; while downscaling to 256px and 512px produces sharp raster icons, vector paths are not extracted.

## Future Improvements

- If an Adobe Illustrator or Figma SVG vector export becomes available, it can replace `icon.svg` for infinite resolution scalability.
