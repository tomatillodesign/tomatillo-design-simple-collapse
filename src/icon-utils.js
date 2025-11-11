/**
 * Icon utility functions for the Simple Collapse block.
 *
 * @since 1.1.0
 */

/**
 * Get the icon class name based on icon type.
 *
 * @param {string} iconType The type of icon (chevron, arrow, plus, minus).
 * @param {boolean} isOpen Whether the panel is open.
 * @returns {string} The icon class name.
 */
export function getIconClass(iconType, isOpen = false) {
	const iconMap = {
		chevron: 'dashicons-arrow-down-alt2',
		arrow: 'dashicons-arrow-down',
		plus: 'dashicons-plus-alt2',
		minus: 'dashicons-minus',
	};

	const baseClass = iconMap[iconType] || iconMap.chevron;
	return `dashicons ${baseClass} tdsc-chevron${isOpen ? ' is-open' : ''}`;
}

/**
 * Get the icon animation class based on animation type.
 *
 * @param {string} animationType The animation type (rotate, flip, fade, none).
 * @returns {string} The animation class.
 */
export function getIconAnimationClass(animationType) {
	return `tdsc-icon-animation-${animationType}`;
}

