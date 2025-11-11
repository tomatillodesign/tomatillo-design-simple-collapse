/**
 * Frontend collapse panel functionality.
 *
 * Handles all interactive features including:
 * - URL hash support for deep linking
 * - Intersection Observer for performance
 * - Focus management
 * - Screen reader announcements
 * - Analytics hooks
 * - Animation speed control
 *
 * @since 1.0.0
 */

/**
 * Check if user prefers reduced motion.
 *
 * @returns {boolean} True if user prefers reduced motion
 */
function prefersReducedMotion() {
	return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get animation duration based on speed setting and content height.
 *
 * @param {HTMLElement} panel The panel element.
 * @param {number} height The content height.
 * @returns {number} Animation duration in milliseconds.
 */
function getAnimationDuration(panel, height) {
	const reducedMotion = prefersReducedMotion();
	if (reducedMotion) {
		return 0;
	}

	const speed = panel.getAttribute('data-animation-speed') || 'normal';
	const speedMap = {
		slow: 600,
		normal: 300,
		fast: 150,
	};

	const baseDuration = speedMap[speed] || speedMap.normal;

	// For dynamic height, use calculated duration but respect speed setting
	if (height > 0) {
		const calculatedDuration = Math.min(Math.max(height, 200), 1000);
		return Math.min(calculatedDuration, baseDuration * 2);
	}

	return baseDuration;
}

/**
 * Announce state change to screen readers.
 *
 * @param {HTMLElement} panel The panel element.
 * @param {boolean} isOpen Whether the panel is now open.
 * @returns {void}
 */
function announceToScreenReader(panel, isOpen) {
	let liveRegion = document.getElementById('tdsc-live-region');
	if (!liveRegion) {
		liveRegion = document.createElement('div');
		liveRegion.id = 'tdsc-live-region';
		liveRegion.className = 'tdsc-live-region';
		liveRegion.setAttribute('role', 'status');
		liveRegion.setAttribute('aria-live', 'polite');
		liveRegion.setAttribute('aria-atomic', 'true');
		document.body.appendChild(liveRegion);
	}

	const toggle = panel.querySelector('.tdsc-collapse__toggle');
	const title = toggle ? toggle.textContent.trim() : 'Panel';
	const message = isOpen
		? `${title} expanded`
		: `${title} collapsed`;

	liveRegion.textContent = message;
}

/**
 * Save panel state to post meta via AJAX.
 *
 * @param {HTMLElement} panel The panel element.
 * @param {boolean} isOpen Whether the panel is open.
 * @returns {void}
 */
function savePanelState(panel, isOpen) {
	const panelId = panel.id || panel.getAttribute('data-panel-id');
	if (!panelId || typeof tdscAjax === 'undefined') {
		return;
	}

	// Update local state
	if (window.tdscPanelStates) {
		window.tdscPanelStates[panelId] = isOpen;
	}

	// Save to server if AJAX is available
	if (tdscAjax.postId && tdscAjax.nonce) {
		fetch(tdscAjax.ajaxurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				action: 'tdsc_save_panel_state',
				nonce: tdscAjax.nonce,
				post_id: tdscAjax.postId,
				panel_id: panelId,
				is_open: isOpen ? '1' : '0',
			}),
		}).catch(() => {
			// Silently fail - state persistence is optional
		});
	}
}

/**
 * Dispatch analytics event if enabled.
 *
 * @param {HTMLElement} panel The panel element.
 * @param {string} action The action (open/close).
 * @returns {void}
 */
function dispatchAnalyticsEvent(panel, action) {
	const enableAnalytics = panel.getAttribute('data-enable-analytics') === 'true';
	if (!enableAnalytics) {
		return;
	}

	const panelId = panel.id || panel.getAttribute('data-panel-id') || 'unknown';
	const event = new CustomEvent('tdsc:panel-toggle', {
		detail: {
			panelId,
			action,
			timestamp: Date.now(),
		},
		bubbles: true,
	});

	document.dispatchEvent(event);

	// Also support Google Analytics if available
	if (typeof gtag !== 'undefined') {
		gtag('event', 'collapse_panel_' + action, {
			panel_id: panelId,
		});
	}
}

/**
 * Toggle panel open/closed state.
 *
 * @param {HTMLElement} panel The panel element.
 * @param {HTMLElement} toggle The toggle button element.
 * @param {HTMLElement} content The content element.
 * @param {boolean} focusOnOpen Whether to focus content when opening.
 * @returns {void}
 */
function togglePanel(panel, toggle, content, focusOnOpen = false) {
	try {
		const isOpen = panel.classList.contains('is-open');
		const height = content.scrollHeight;
		const duration = getAnimationDuration(panel, height);

		if (isOpen) {
			// Collapse
			content.style.transition = duration > 0 ? `max-height ${duration}ms ease` : 'none';
			content.style.maxHeight = height + 'px';

			if (duration === 0) {
				content.style.maxHeight = '0px';
			} else {
				requestAnimationFrame(() => {
					content.style.maxHeight = '0px';
				});
			}

			toggle.setAttribute('aria-expanded', 'false');
			panel.classList.remove('is-open');
			announceToScreenReader(panel, false);
			dispatchAnalyticsEvent(panel, 'close');
			savePanelState(panel, false);
		} else {
			// Expand
			content.style.transition = duration > 0 ? `max-height ${duration}ms ease` : 'none';
			content.style.maxHeight = height + 'px';
			toggle.setAttribute('aria-expanded', 'true');
			panel.classList.add('is-open');
			announceToScreenReader(panel, true);
			dispatchAnalyticsEvent(panel, 'open');
			savePanelState(panel, true);

			// Focus management
			if (focusOnOpen && content) {
				// Focus first focusable element or content itself
				const focusable = content.querySelector(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);
				if (focusable) {
					setTimeout(() => focusable.focus(), duration + 50);
				}
			}
		}
	} catch (error) {
		console.error('Error toggling collapse panel:', error);
	}
}

/**
 * Open panel by ID from URL hash.
 *
 * @param {string} panelId The panel ID to open.
 * @returns {void}
 */
function openPanelFromHash(panelId) {
	if (!panelId) {
		return;
	}

	const panel = document.querySelector(`[id="${panelId}"], [data-panel-id="${panelId}"]`);
	if (!panel) {
		return;
	}

	const toggle = panel.querySelector('.tdsc-collapse__toggle');
	const content = panel.querySelector('.tdsc-collapse__content');

	if (!toggle || !content) {
		return;
	}

	if (!panel.classList.contains('is-open')) {
		const focusOnOpen = panel.getAttribute('data-focus-on-open') === 'true';
		togglePanel(panel, toggle, content, focusOnOpen);

		// Scroll to panel with offset for fixed headers
		setTimeout(() => {
			const rect = panel.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const offset = 100; // Offset for fixed headers
			window.scrollTo({
				top: rect.top + scrollTop - offset,
				behavior: 'smooth',
			});
		}, 100);
	}
}

/**
 * Handle hash changes for deep linking.
 *
 * @returns {void}
 */
function handleHashChange() {
	const hash = window.location.hash.substring(1);
	if (hash) {
		openPanelFromHash(hash);
	}
}

/**
 * Initialize a single panel with all event handlers.
 *
 * @param {HTMLElement} panel The panel element.
 * @returns {void}
 */
function initPanel(panel) {
	const toggle = panel.querySelector('.tdsc-collapse__toggle');
	const content = panel.querySelector('.tdsc-collapse__content');

	if (!toggle || !content) {
		return;
	}

	// Check for saved state from post meta
	const panelId = toggle.id || panel.getAttribute('data-panel-id');
	let shouldBeOpen = panel.classList.contains('is-open');

	// Check saved states if available
	if (window.tdscPanelStates && panelId && window.tdscPanelStates[panelId] !== undefined) {
		shouldBeOpen = window.tdscPanelStates[panelId];
		if (shouldBeOpen && !panel.classList.contains('is-open')) {
			panel.classList.add('is-open');
			toggle.setAttribute('aria-expanded', 'true');
		} else if (!shouldBeOpen && panel.classList.contains('is-open')) {
			panel.classList.remove('is-open');
			toggle.setAttribute('aria-expanded', 'false');
		}
	}

	// Initial open setup
	if (shouldBeOpen) {
		content.style.maxHeight = content.scrollHeight + 'px';
	}

	// Get settings from data attributes
	const focusOnOpen = panel.getAttribute('data-focus-on-open') === 'true';
	const enableHashLink = panel.getAttribute('data-enable-hash-link') !== 'false';

	// Set panel ID for hash linking if enabled
	if (enableHashLink && !panel.id) {
		const panelId = toggle.id || panel.getAttribute('data-panel-id');
		if (panelId) {
			panel.id = panelId.replace('-heading', '');
		}
	}

	// Click handler
	toggle.addEventListener('click', () => {
		togglePanel(panel, toggle, content, focusOnOpen);

		// Update URL hash if enabled
		if (enableHashLink && panel.id) {
			const isOpen = panel.classList.contains('is-open');
			if (isOpen) {
				window.history.pushState(null, '', `#${panel.id}`);
			} else {
				// Remove hash if closing
				if (window.location.hash === `#${panel.id}`) {
					window.history.pushState(null, '', window.location.pathname + window.location.search);
				}
			}
		}
	});

	// Keyboard handler (Enter and Space keys)
	toggle.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			togglePanel(panel, toggle, content, focusOnOpen);
		}
	});
}

/**
 * Initialize collapse panels with Intersection Observer for performance.
 *
 * @returns {void}
 */
export function initCollapsePanels() {
	// Prevent accidental run in editor
	if (document.body.classList.contains('block-editor-page')) {
		return;
	}

	try {
		const panels = document.querySelectorAll('.tdsc-collapse');

		// Check if Intersection Observer is supported
		if ('IntersectionObserver' in window && panels.length > 5) {
			// Use Intersection Observer for better performance with many panels
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							initPanel(entry.target);
							observer.unobserve(entry.target);
						}
					});
				},
				{
					rootMargin: '50px', // Start loading slightly before visible
				}
			);

			panels.forEach((panel) => {
				observer.observe(panel);
			});
		} else {
			// Initialize all panels immediately for small numbers
			panels.forEach((panel) => {
				initPanel(panel);
			});
		}

		// Handle URL hash on page load
		handleHashChange();

		// Listen for hash changes
		window.addEventListener('hashchange', handleHashChange);
	} catch (error) {
		console.error('Error initializing collapse panels:', error);
	}
}
