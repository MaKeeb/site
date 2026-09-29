---
name: site-build-deploy
description: Build, preview and publish the MaKeeb website: Astro commands, the GitHub Pages workflow, the /site base path, custom domains, Node and npm install-script approvals. Use when the site won't build, links 404 on Pages, or deployment fails.
---

# Build and deploy the site

## Commands

```
npm ci                 # exact locked versions (Node 22.12+; CI uses Node 24)
npm run dev            # dev server with reload: http://localhost:4321/site/
npm run build          # `astro check` (TypeScript, 0 errors required) then `astro build` → dist/
npm run preview        # serve dist/ as Pages would: http://localhost:4321/site/
```

## Base path

GitHub Pages serves an organisation's project repository under its name: https://makeeb.github.io/site/. `astro.config.mjs` sets `site` and `base: '/site'`.

- Build every internal link from `import.meta.env.BASE_URL` (trim its trailing slash, as `src/layouts/Base.astro` does). A bare `/privacy/` works in dev only by accident and 404s on Pages.
- Files in `public/` are served under the base too: `${base}/favicon.svg`.
- Images imported from `src/assets` get base-aware URLs automatically.

**Custom domain:** add `public/CNAME` with the domain, set `site` to `https://<domain>` and remove `base`, then set the domain in Settings → Pages. Update the links in the app (`../app`) that point at the site.

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main` (and by hand: Actions → Deploy to GitHub Pages → Run workflow). It builds with Node 24 and publishes the `dist/` artifact with `actions/deploy-pages`. Nothing is committed to a `gh-pages` branch.

One-time setup, as a repository admin:

```
gh api -X POST repos/MaKeeb/site/pages -f build_type=workflow   # or Settings → Pages → Source: GitHub Actions
```

On GitHub's free plan Pages only works for public repositories, so `MaKeeb/site` stays public: made private, that call and the deploy job fail with a plan error.

## Dependencies

- Versions are exact (`npm install --save-exact`); `package-lock.json` is committed.
- npm 11 blocks install scripts until approved: `npm install-scripts ls`, then `npm install-scripts approve <pkg>`; the approvals land in `package.json` (`allowScripts`). esbuild and fsevents are approved.
- Upgrading Astro: read its upgrade guide, bump `astro` and `@astrojs/markdown-remark` together, run `npm run build`, and look at both pages.

## Checking the result

Look at the built site (`npm run preview`) in light and dark, at desktop width and at 390 px. Headless Chrome can take quick captures, but it lays out at 500 px at least:

```
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --window-size=1280,3000 --screenshot=.ai/local/site.png http://localhost:4321/site/
# light scheme: add --blink-settings=preferredColorScheme=1
```
