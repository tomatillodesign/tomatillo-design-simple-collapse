/**
 * Frontend initialization script.
 *
 * Initializes collapse panel functionality when the page loads.
 * This script is only loaded on pages that contain the Simple Collapse block.
 *
 * @since 1.0.0
 */
import { initCollapsePanels } from './collapse';

// Initialize collapse panels when DOM is ready
window.addEventListener('load', initCollapsePanels);
