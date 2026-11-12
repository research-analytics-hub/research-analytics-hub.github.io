// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // The organization's root GitHub Pages address. If the site moves to a custom
  // domain, change this and add a public/CNAME file.
  site: "https://research-analytics-hub.github.io",
  integrations: [sitemap()],
});
