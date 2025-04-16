

export function initCollapsePanels() {

	// Prevent accidental run in editor
	if (document.body.classList.contains('block-editor-page')) return;
	
	const panels = document.querySelectorAll('.tdsc-collapse');

	panels.forEach(panel => {
		const toggle = panel.querySelector('.tdsc-collapse__toggle');
		const content = panel.querySelector('.tdsc-collapse__content');

		if (!toggle || !content) return;

		// Initial open setup
		if (panel.classList.contains('is-open')) {
			content.style.maxHeight = content.scrollHeight + 'px';
		}

		toggle.addEventListener('click', () => {
			const isOpen = panel.classList.contains('is-open');
			const height = content.scrollHeight;
		
			// Use 1ms per pixel, clamped between 200ms and 1000ms
			const duration = Math.min(Math.max(height, 200), 1000);
		
			content.style.transition = `max-height ${duration}ms ease`;
		
			if (isOpen) {
				// Collapse: set current height first
				content.style.maxHeight = height + 'px';
		
				requestAnimationFrame(() => {
					content.style.maxHeight = '0px';
				});
		
				toggle.setAttribute('aria-expanded', 'false');
				panel.classList.remove('is-open');
			} else {
				// Expand: set height directly
				content.style.maxHeight = height + 'px';
				toggle.setAttribute('aria-expanded', 'true');
				panel.classList.add('is-open');
			}
		});		
		
	});
}
