<script>
  import { animateLines, createCamera } from "$lib/animation.js";

  /**
   * @typedef {Object} Props
   * @property {string[][]} triples - Array of 3-line rhetorical triples.
   */

  /** @type {Props} */
  const { triples } = $props();

  /** @type {number} */
  let index = $state(0);

  /** @type {boolean} */
  let negative = $state(false);

  /** @type {string[]} */
  let current = $derived(triples[index] ?? []);

  /** @type {HTMLElement | undefined} */
  let container = $state();

  /** @type {HTMLElement[]} */
  let lineEls = $state([]);

  /**
   * Handles a click or keyboard activation on the slide.
   */
  function advance() {
    if (!container) return;

    const cam = createCamera(container, {
      duration: 420,
      rotateX: 3,
      translateZ: -24,
    });
    cam.swoop();

    if (!negative) {
      // First activation: animate current lines out → negative state
      animateLines(lineEls, { direction: "out", duration: 260, stagger: 60 });
      negative = true;
      // After brief delay, animate the negative state in
      setTimeout(() => {
        animateLines(lineEls, { direction: "in", duration: 320, stagger: 70 });
      }, 260);
    } else {
      // Second activation: advance to next triple
      animateLines(lineEls, { direction: "out", duration: 240, stagger: 50 });
      setTimeout(() => {
        index = (index + 1) % triples.length;
        negative = false;
        // Small tick to let Svelte update the DOM before animating in
        setTimeout(() => {
          animateLines(lineEls, {
            direction: "in",
            duration: 360,
            stagger: 80,
          });
        }, 20);
      }, 240);
    }
  }

  /**
   * @param {KeyboardEvent} e
   */
  function handleKeydown(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      advance();
    }
  }
</script>

<div
  class="triple-slide"
  class:negative
  role="button"
  tabindex="0"
  aria-label="Rhetorical triple — click or press Enter to advance"
  bind:this={container}
  onclick={advance}
  onkeydown={handleKeydown}
>
  {#each current as line, i (i)}
    <p class="line" bind:this={lineEls[i]}>
      {line}
    </p>
  {/each}
</div>

<style>
  .triple-slide {
    cursor: pointer;
    user-select: none;
    padding: 2rem 3rem;
    outline: none;
    transform-style: preserve-3d;
    max-width: 42rem;
  }

  .triple-slide:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 6px;
    border-radius: 4px;
  }

  .line {
    margin: 0 0 0.45em;
    font-size: clamp(1.4rem, 3.5vw, 2.4rem);
    font-weight: 600;
    line-height: 1.15;
    opacity: 0;
    will-change: transform, opacity;
  }

  .triple-slide:not(.negative) .line {
    color: var(--color-positive, #1a1a1a);
  }

  .triple-slide.negative .line {
    color: var(--color-negative, #c0392b);
  }
</style>
