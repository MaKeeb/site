# MaKeeb site: agent instructions

The website for MaKeeb, an on-screen keyboard for Android and iOS: a static landing page (features, screenshots) and the privacy policy, built with Astro and published to GitHub Pages. This file is the single source of instructions for every AI tool: `AGENTS.md` (Codex), `CLAUDE.md`, `CODEX.md`, `GEMINI.md` and `.github/copilot-instructions.md` are symlinks to it. Edit only `.ai/instructions.md`. Skills live in `.ai/skills` and are linked from `.claude/skills`, `.agents/skills` (Codex, Gemini CLI), `.codex/skills` and `.github/skills`; agents live in `.ai/agents`, linked from `.claude/agents` and `.github/agents`.

This is the `MaKeeb/site` repository (GitHub org MaKeeb). Its siblings sit next to it in the workspace: `../app` (the keyboard, `MaKeeb/app`) and `../dicts` (dictionary pack releases, `MaKeeb/dicts`).

## Layout

```
astro.config.mjs        site URL and base path (/site on GitHub Pages)
package.json            scripts; exact versions; allowScripts for esbuild and fsevents
public/                 copied as is: favicon.svg (the app icon, from ../app/docs/brand)
src/
  assets/               app-icon.svg; screens/ (screenshots, optimised at build time)
  layouts/Base.astro    head, header, footer: every page uses it
  pages/                index.astro (landing), privacy.astro (the privacy policy)
  styles/global.css     colour tokens (from the app's KeyboardPalette), light and dark
.github/workflows/      deploy.yml: build and publish to GitHub Pages on every push to main
.ai/                    instructions.md (this file), agents/, skills/, commands/, plans/; local/ is untracked
```

## Content rules

- **Claim only what the app does today.** The feature list mirrors the app's board (`../app/.ai/kanban`, cards in `review/` or `done/`). Never announce a planned feature as shipped, and say plainly that the app isn't in the stores until it is.
- **The privacy page is a legal text.** Every statement must match the app's behaviour (`../app/.ai/instructions.md`, Privacy and Network rules). When the app changes what it stores or sends, change this page in the same step and bump its date.
- **Screenshots carry no personal data:** no real messages, contacts, notification icons or clipboard contents. Crop status bars. Take them from the app's test harness (Try it screen, test text) and keep the originals out of the repo (`src/assets/screens/` holds only the cropped, scaled PNGs, 720 px wide).
- **No AI features in the copy.** MaKeeb's predictions are statistical and on-device; don't describe them as AI.
- **Attribution stays in the footer:** AOSP word lists (Apache 2.0) and the Leipzig Corpora Collection (CC BY 4.0) must be credited wherever the dictionaries are described.
- **Links go through the base path.** Build internal URLs from `import.meta.env.BASE_URL` (see `Base.astro`); a bare `/privacy/` breaks on GitHub Pages.
- **Accessibility:** every image has alt text (decorative ones `alt=""`), text meets 4.5:1 contrast in light and dark, and motion respects `prefers-reduced-motion`.

## Build and test

```
npm ci                 # install exactly the locked versions
npm run dev            # http://localhost:4321/site/
npm run build          # astro check (types) + static build into dist/
npm run preview        # serve dist/ at http://localhost:4321/site/
```

Before calling work done: `npm run build` with 0 errors, then look at the built pages in a browser in light and dark, at desktop and phone widths. Headless Chrome lays out at 500 px at least; check narrower widths in a real browser or device mode.

Deployment: pushing to `main` runs `.github/workflows/deploy.yml`, which publishes to https://makeeb.github.io/site/. Pages must use "GitHub Actions" as its source, and on the free plan the repository must be public.

## Conventions

- Site work is tracked on the app's board (`../app/.ai/kanban`, worked with the `kanban` skill); the website is APP-141. One commit per finished, verified task, its subject starting with the card's ticket (`APP-141: What changed`). No Co-Authored-By or other AI attribution trailers. Push only when asked.
- **This repository is public:** never commit secrets (tokens, keys), real IP addresses or device identifiers, or screenshots with personal data.
- Versions are exact in `package.json` and locked in `package-lock.json`. New packages with install scripts need `npm install-scripts approve <pkg>`.
- Investigation notes, logs and scratch files go under `.ai/local/` (not tracked).

## Skills, agents, plans

- `.ai/skills/site-build-deploy`: building, previewing, the Pages workflow, the base path and a custom domain.
- `.ai/skills/site-content`: writing copy, keeping features and privacy in step with the app, and making screenshots.
- `.ai/agents/site-reviewer.agent.md`: reviews changes for claims the app doesn't back, privacy-page drift, broken base-path links, accessibility and image weight.
- `.ai/plans/roadmap.md`: what the site still needs before launch.
