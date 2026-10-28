# Loading

Demo: `/patterns/#p-loading` (`bun run dev:ui`). Components: [skeleton](../components/skeleton.md), [button](../components/button.md) loading state, [image upload](../components/upload.md) progress.

## Which indicator

| Situation | Indicator | Why |
| --- | --- | --- |
| Content whose shape is known (a page, a list, an entry) | Skeletons of the same size as the loaded component | The layout doesn't move when content arrives |
| An action the Owner started (save, publish, delete) | The button's loading state: spinner plus a label in progress ("Publishing…") | Feedback stays where the action was taken |
| A transfer with measurable size (an upload) | A `<progress>` bar | The Owner can judge how long it takes |
| Anything under about 200ms | Nothing | Skeletons fade in only after `--duration-skeleton-delay`, so fast loads never flash |

Never a full-page spinner, and never a skeleton for an action.

## Rules

- **Shape match.** Every data-driven component documents its skeleton, built from the three primitives at the loaded component's sizes ([introduction](../components/intro.md), [experience entry](../components/entry.md), [work band](../components/work-band.md), [content list](../components/content-list.md), [avatar](../components/avatar.md)).
- **What renders immediately.** Frames and fixed labels (site header, app shell, section labels, buttons) render at once; only Content-dependent parts wait.
- **Announce once.** The loading region gets `aria-busy="true"`; a polite status says "Loading experience" when it starts and "Experience loaded" when it ends, then nothing.
- **Reduced motion.** Skeletons are static blocks; spinners stop; the label still says what's happening.
- **Failure.** A load that fails swaps the skeletons for the [error](error.md) pattern, never an endless skeleton. After about 10 seconds without an answer, show the error with a retry.

## Optimistic updates

Not used in v1. The API owns every invariant ([ADR 0001](../../adr/0001-api-owns-content-and-invariants.md)), including "Published only when complete in both Locales", so the CMS can't know a save or publish will succeed until the API says so. Showing success early would sometimes have to be taken back. Saves show the button's loading state, then a [toast](../components/toast.md).

## The Portfolio

The Portfolio renders Content on the server, so Visitors normally never see a skeleton. Skeletons cover client-side updates (switching Locale without a full reload, if the build adds it) and slow images: the portrait reserves its circle so nothing shifts when it loads.
