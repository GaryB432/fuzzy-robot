# fuzzy-robot 🤖✨

A playground where AI and animations hang out and make cool things together.

No grand roadmap. No production SLAs. Just a SvelteKit sandbox for experimenting with motion, rhetoric, and whatever weird idea shows up next.

## What's in here?

### Rhetorical Triples

The first resident experiment. Classic three-part phrases — "veni, vidi, vici" style — animated with a subtle 3D camera swoop and staggered line reveals.

Click (or hit `Enter` / `Space`) to cycle through them. Each triple flips between a positive and a negative color state before advancing. It's weirdly satisfying.

The animation layer (`src/lib/animation.js`) is intentionally dependency-free — pure [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API). The comments call out exactly where you'd drop in GSAP or THREE.js if you wanted to go bigger.

## Spirit & Scope

- **Playground first.** Things will be half-finished, experimental, or just vibes.
- **AI-assisted.** Copilot, Claude, whatever — AI is a first-class collaborator here, not a dirty secret.
- **Animations matter.** Motion is the point, not an afterthought. Timing, easing, and cadence are worth caring about.
- **Svelte 5 / SvelteKit.** Runes and all. If the framework ships something new and interesting, we'll probably poke it.

## Running locally

```sh
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and poke around.

## Other useful commands

```sh
npm run build      # production build
npm run preview    # preview the build
npm run check      # svelte-check type checking
npm run lint       # prettier + eslint
npm run format     # auto-format everything
```

## Contributing / Collaborating

See [`AGENTS.md`](./AGENTS.md) for notes aimed at AI collaborators (and humans who think like them).
