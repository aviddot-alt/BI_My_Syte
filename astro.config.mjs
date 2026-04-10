import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bi-by-deutsch.netlify.app',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
