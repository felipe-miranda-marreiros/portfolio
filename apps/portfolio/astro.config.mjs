import { defineConfig } from "astro/config";

export default defineConfig({
  i18n: {
    locales: ["en", { path: "pt-br", codes: ["pt-BR"] }],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: true },
  },
});
