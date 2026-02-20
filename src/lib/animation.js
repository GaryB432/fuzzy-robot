/**
 * Animation layer for TripleSlide.
 *
 * Provides:
 *   - Scene: minimal DOM-based container
 *   - Camera: CSS 3D perspective wrapper
 *   - animateLines: per-line stagger transform animation
 *   - cadenceEasing: custom easing curve tuned for "triple rhetoric"
 *
 * Uses the Web Animations API only.
 * Does not depend on Svelte internals.
 * Replaceable with GSAP or THREE.js without API changes.
 */

/**
 * Cadence easing tailored for triple rhetoric:
 *   1. Decisive opening  – fast entry
 *   2. Lift / tension    – slight micro-overshoot
 *   3. Resolution        – smooth settle
 *
 * Returns a CSS linear() easing string usable by WAAPI.
 *
 * @returns {string}
 */
export function cadenceEasing() {
	// linear() lets us define arbitrary keyframe values at % positions.
	// Values > 1 create the micro-overshoot.
	return 'linear(0, 0.06 8%, 0.54 30%, 1.02 60%, 0.99 75%, 1)';
}

/**
 * @typedef {Object} SceneOptions
 * @property {string} [perspective='800px'] - CSS perspective distance.
 */

/**
 * Wraps a DOM element as an animation Scene.
 *
 * @param {HTMLElement} el
 * @param {SceneOptions} [options]
 * @returns {{ el: HTMLElement, destroy: () => void }}
 */
export function createScene(el, options = {}) {
	const perspective = options.perspective ?? '800px';
	el.style.perspective = perspective;
	el.style.perspectiveOrigin = '50% 40%';

	return {
		el,
		destroy() {
			el.style.perspective = '';
			el.style.perspectiveOrigin = '';
		}
	};
}

/**
 * @typedef {Object} CameraOptions
 * @property {number} [duration=400]   - Animation duration in ms.
 * @property {number} [rotateX=4]      - Degrees to tilt on swoop in.
 * @property {number} [rotateY=0]      - Degrees to yaw on swoop in.
 * @property {number} [translateZ=-30] - Depth offset during swoop.
 */

/**
 * Creates a Camera abstraction over a DOM element using CSS 3D transforms.
 *
 * @param {HTMLElement} el
 * @param {CameraOptions} [options]
 * @returns {{ swoop: () => Animation }}
 */
export function createCamera(el, options = {}) {
	const duration = options.duration ?? 400;
	const rotateX = options.rotateX ?? 4;
	const rotateY = options.rotateY ?? 0;
	const translateZ = options.translateZ ?? -30;

	el.style.transformStyle = 'preserve-3d';

	return {
		/**
		 * Performs a subtle camera swoop: tilts in, then resolves to neutral.
		 *
		 * @returns {Animation}
		 */
		swoop() {
			return el.animate(
				[
					{ transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)' },
					{
						transform: `translate3d(0,0,${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
					},
					{ transform: 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg)' }
				],
				{
					duration,
					easing: cadenceEasing(),
					fill: 'none'
				}
			);
		}
	};
}

/**
 * @typedef {Object} LineAnimationOptions
 * @property {number} [duration=380]   - Per-line animation duration in ms.
 * @property {number} [stagger=80]     - Delay between lines in ms.
 * @property {'in'|'out'} [direction='in'] - Animate in or out.
 */

/**
 * Animates an array of line elements with stagger timing and cadence easing.
 *
 * Each line slides + fades in (or out) from a subtle vertical offset.
 *
 * @param {HTMLElement[]} lines
 * @param {LineAnimationOptions} [options]
 * @returns {Animation[]}
 */
export function animateLines(lines, options = {}) {
	const duration = options.duration ?? 380;
	const stagger = options.stagger ?? 80;
	const direction = options.direction ?? 'in';

	const fromFrame =
		direction === 'in'
			? { opacity: 0, transform: 'translateY(12px)' }
			: { opacity: 1, transform: 'translateY(0)' };

	const toFrame =
		direction === 'in'
			? { opacity: 1, transform: 'translateY(0)' }
			: { opacity: 0, transform: 'translateY(-12px)' };

	return lines.map((line, i) =>
		line.animate([fromFrame, toFrame], {
			duration,
			delay: i * stagger,
			easing: cadenceEasing(),
			fill: 'forwards'
		})
	);
}

/**
 * @typedef {Object} TransformOptions
 * @property {number} [x=0]
 * @property {number} [y=0]
 * @property {number} [z=0]
 * @property {number} [rotateX=0]
 * @property {number} [rotateY=0]
 * @property {number} [rotateZ=0]
 * @property {number} [scale=1]
 * @property {number} [duration=350]
 * @property {number} [delay=0]
 */

/**
 * Animates a single element to the specified transform values.
 *
 * @param {HTMLElement} el
 * @param {TransformOptions} [to]
 * @param {TransformOptions} [from]
 * @returns {Animation}
 */
export function animateTransform(el, to = {}, from = {}) {
	const makeFrame = (/** @type {TransformOptions} */ opts) => ({
		transform: [
			`translate3d(${opts.x ?? 0}px, ${opts.y ?? 0}px, ${opts.z ?? 0}px)`,
			`rotateX(${opts.rotateX ?? 0}deg)`,
			`rotateY(${opts.rotateY ?? 0}deg)`,
			`rotateZ(${opts.rotateZ ?? 0}deg)`,
			`scale(${opts.scale ?? 1})`
		].join(' ')
	});

	const duration = to.duration ?? 350;
	const delay = to.delay ?? 0;

	return el.animate([makeFrame(from), makeFrame(to)], {
		duration,
		delay,
		easing: cadenceEasing(),
		fill: 'forwards'
	});
}
