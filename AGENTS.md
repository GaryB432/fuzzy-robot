# AGENTS.md

> Notes for AI collaborators (and humans who work like them).
> Fill this out as the project evolves.

## Project context

<!-- TODO: describe the project's origin story, goals, and vibe -->

fuzzy-robot is a SvelteKit playground for AI-assisted animation experiments.
The name, tone, and direction were set in an initial GitHub Copilot prompt — details to be added here.

## Tech stack

| Thing      | Version / notes                               |
| ---------- | --------------------------------------------- |
| Framework  | SvelteKit + Svelte 5 (runes)                  |
| Language   | JavaScript with JSDoc types (`jsconfig.json`) |
| Animations | Web Animations API — no runtime deps          |
| Bundler    | Vite                                          |
| Linting    | ESLint + Prettier                             |

## Conventions

- **JSDoc over TypeScript** — the project uses `.js` files with JSDoc annotations, not `.ts`. Keep it that way.
- **No animation runtime dependency** — `src/lib/animation.js` uses only WAAPI. New animations should follow the same pattern unless there's a compelling reason to add a library.
- **Svelte 5 runes** — use `$state`, `$derived`, `$props`, etc. Don't reach for Svelte 4 patterns.
- **Minimal changes** — experiments live alongside each other. Don't refactor old stuff to make new stuff fit.

## Current experiments

- **Rhetorical Triples** (`src/lib/components/TripleSlide.svelte`) — animated three-part phrase slideshow with camera swoop.

## What to add here

- [ ] The original project prompt / brief
- [ ] Design principles (motion philosophy, colour palette intent, etc.)
- [ ] Notes on what experiments are in progress or planned
- [ ] Any deployment / hosting context
