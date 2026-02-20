# AGENTS.md

> Notes for AI collaborators (and humans who work like them).
> Fill this out as the project evolves.

## Project context

fuzzy-robot is a SvelteKit playground for AI-assisted animation experiments.

The name, tone, and direction were set in an initial GitHub Copilot prompt — in that spirit I am contributing to it by issuing `imperative prompts` and making the minimum of technical decisions. Just because I have time to play with `LLMs`, `extensions` and how I would have coded had I not been born so long ago.

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

- Use Svelte 5 runes
- `svelte-auto-adapter` because it is not deployed and runs only locally ATM
- Use `$props()`, `$state()`, `$derived()`
- Do NOT use `$:` reactive labels
- Do NOT use deprecated `on:` event directives
- Must be keyboard accessible
- Must pass a11y lint rules

## Current experiments

- **Rhetorical Triples** (`src/lib/components/TripleSlide.svelte`) — animated three-part phrase slideshow with camera swoop.

## Future Experiments

- **General SVG Shape animation with paths** (TBD)

# Core Stack

- Latest SvelteKit
- Svelte 5 runes mode (no legacy reactivity)
- JavaScript only (no TypeScript)
- JSDoc for type safety in `.js` files `@js-hint` locally if not already global. Use `svelte-check` to ensure type usage.
- Web Animations API (no GSAP initially)
- ESLint + Prettier default recommended configs
- Accessibility lint rules enabled

# Architectural Requirements

## 1. Animation Layer

`src/lib/animation.js`provides

- A minimal Scene abstraction (DOM-based)
- A Camera abstraction using CSS 3D + perspective
- A transform animation helper
- A cadence-based easing curve tuned for “triple rhetoric”

The animation system must:

- Use Web Animations API
- Support position / rotation / scale
- Support per-line stagger timing
- Be easily replaceable later with GSAP or THREE
- Not depend on Svelte internals

## 2. TripleSlide Component

Create:

src/lib/components/TripleSlide.svelte

Rules:

Behavior:

- Accept `triples` prop
- Display 3-line rhetorical triples
- First click: animate from positive → negative
- Second click: advance to next triple
- Loop indefinitely
- Animate lines with stagger + cadence
- Subtle camera swoop between state changes

## 3. Animation Philosophy

The triple has literary weight.

Animation must reflect:

1. Decisive opening
2. Lift or tension
3. Resolution

Use timing, easing, and micro-overshoot to express cadence.

Avoid gimmicks.
Prioritize rhetorical impact over spectacle.

## 4. Accessibility

Clickable containers must:

- Use proper roles
- Support Enter + Space
- Avoid deprecated syntax

No lint warnings permitted.

## 5. Deliverables

The repository must include:

- Working SvelteKit app
- Example triples data
- Demo page using TripleSlide
- Clean folder structure
- No unused CSS
- No TypeScript
