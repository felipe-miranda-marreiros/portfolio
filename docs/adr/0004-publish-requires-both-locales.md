# Content is Published only when complete in both Locales

Each translatable field is stored per Locale (`en`, `pt-BR`), and the API refuses to Publish an item missing either. A Visitor never sees a half-translated page, so the Portfolio needs no fallback logic. We rejected publishing per Locale because it forces fallback rules into every page and every query.
