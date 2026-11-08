# HenHouse Chicken Pricing Calculator

A free, static, mobile-friendly chicken pricing calculator. It runs entirely in the browser; no login, server, database, or paid service is required.

## Publish with GitHub Pages

1. Open your `henhouse-calculator` repository.
2. Select **Add file → Upload files**.
3. Upload `index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `logo.png`, and `henhouse.png` (upload the files themselves, not the ZIP).
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select branch **main** and folder **/(root)**, then click **Save**.
8. Wait a minute or two. GitHub will show your public website URL in the Pages section.

Your URL will look like:
`https://YOUR-GITHUB-USERNAME.github.io/henhouse-calculator/`

## Calculator logic

- Total cost per bird = live purchase price × live weight + other expenses
- Dressed weight = live weight × dressing yield
- Break-even price/kg = total cost per bird ÷ relevant sale weight
- Selling price/kg = break-even price/kg ÷ (1 − desired margin / 100)
- Profit/kg = selling price/kg − break-even price/kg

The desired margin is a percentage of the selling price, not a markup on cost.

## Updating the app

Edit and commit `index.html` in the repository. GitHub Pages republishes the site automatically.
