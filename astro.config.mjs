import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.dentisti-inprogress.it',
  base: '/',
  output: 'static',
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !/\/blog\/page\/\d+\/?$/.test(new URL(page).pathname),
    }),
  ],
});
