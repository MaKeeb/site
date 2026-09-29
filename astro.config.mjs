// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves an organisation's project repository under its name:
// https://makeeb.github.io/site/. With a custom domain, drop `base` and set `site` to it.
export default defineConfig({
  site: 'https://makeeb.github.io',
  base: '/site',
});
