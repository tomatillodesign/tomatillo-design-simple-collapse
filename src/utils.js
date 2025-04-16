

/**
 * Returns either black or white text based on the luminance
 * of the background color for accessibility.
 *
 * @param {string} bgColor A 6-digit hex color string (e.g., "#ffffff")
 * @returns {string|undefined} A hex string for contrasting text
 */
export function getContrastingTextColor(bgColor) {
	if (!bgColor || !/^#?[0-9a-fA-F]{6}$/.test(bgColor)) return undefined;

	const hex = bgColor.replace('#', '');

	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	return luminance > 0.5 ? '#000000' : '#ffffff';
}
