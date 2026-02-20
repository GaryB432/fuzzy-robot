<script>
	import TripleSlide from '$lib/components/TripleSlide.svelte';
	import { triples } from '$lib/triples.js';
</script>

<main>
	<header>
		<h1>Rhetorical Triples</h1>
		<p class="hint">Click or press <kbd>Enter</kbd> / <kbd>Space</kbd> to advance</p>
	</header>

	<TripleSlide {triples} />
</main>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: #f5f4f0;
		font-family: 'Georgia', 'Times New Roman', serif;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main {
		padding: 2rem;
	}

	header {
		margin-bottom: 2.5rem;
	}

	h1 {
		margin: 0 0 0.3em;
		font-size: clamp(1rem, 2vw, 1.25rem);
		font-weight: 400;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #888;
	}

	.hint {
		margin: 0;
		font-size: 0.85rem;
		color: #aaa;
	}

	kbd {
		font-family: monospace;
		background: #e8e7e3;
		border-radius: 3px;
		padding: 0.1em 0.4em;
		font-size: 0.8em;
	}
</style>
