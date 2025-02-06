// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
  },

  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  output: "server",

  vite: {
    define: {
      "process.env": process.env,
    },

    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : {},
    },

    plugins: [tailwindcss()],
  },
});
