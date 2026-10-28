# The Portfolio and CMS import UI from one shared package; the CSS framework is chosen after the design

Both apps must import their UI from the shared `packages/ui`. This is a plain rule, with no adapter or mapping layer, and it holds whichever CSS framework is chosen. We defer that choice (Tailwind, with or without shadcn/ui, or another) until the Impeccable design shows which components are actually needed, instead of fixing it first and bending the design to fit.
