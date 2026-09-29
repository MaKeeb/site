---
name: site-content
description: Write and update the MaKeeb website's copy, feature list, privacy policy and screenshots so they match the app. Use when a feature ships or changes, when the privacy behaviour changes, or when adding or replacing screenshots.
---

# Site content

## Features

`src/pages/index.astro` holds the feature cards (`features`) and the gallery (`screens`).

- A feature appears only once the app's board (`../app/.ai/kanban`) has its card in `review/` or `done/`, and it describes what the app does now. Planned work never goes on the site.
- Keep the grid a multiple of three cards (the desktop grid has three columns); merge related features rather than leave an orphan.
- Voice: plain, concrete, second person ("What you type stays on your phone"). No marketing superlatives and no "AI": predictions and autocorrect are statistical and on-device.

## Privacy policy

`src/pages/privacy.astro` is the policy the store listings will link to.

- Its source of truth is the app: `../app/.ai/instructions.md` (Privacy, Network, iOS Full Access) and the code it describes (learned words storage, clipboard rules, pack downloads).
- When the app changes what it stores, learns or sends, change the page in the same step and bump `updated`.
- It names what leaves the device (dictionary downloads from GitHub: IP address and language) and what doesn't (everything typed).

## Screenshots

Screenshots come from the app's test harness, never from personal use:

- **Android:** the Pixel scripts in `../app/.ai/local/visual-test/fixes-android.py` (Try it screen, test text).
- **iOS:** the simulator UI tests (`../app/makeeb/app/ios/UITests/KeyboardVisualTests.swift`, captures under `../app/.ai/local/visual-test/<date>/`).

Prepare them like this (Pillow):
1. Crop the status bar: 126 px on the Pixel 6 Pro (36 dp × 3.5), 180 px on the iPhone 17 Pro simulator.
2. Scale to 720 px wide and save as PNG in `src/assets/screens/<platform>-<what>.png`.
3. Add them to `screens` in `index.astro` with a caption and the platform; Astro makes 1× and 2× WebP at build time.

Check every capture for personal data (notifications, real text, clipboard contents) before it goes in.
