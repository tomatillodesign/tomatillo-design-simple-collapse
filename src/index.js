/**
 * Main block registration file.
 *
 * Registers the Simple Collapse block with WordPress and sets up
 * the editor preview functionality.
 *
 * @since 1.0.0
 */
import { registerBlockType } from '@wordpress/blocks';
import edit from './block/edit';
import save from './block/save';
import './block/style.css';
import './block/editor.css';

import metadata from '../block.json';
import { initCollapsePanels } from './collapse';

// Register the block with WordPress
registerBlockType(metadata.name, {
	edit,
	save,
	attributes: metadata.attributes,
});

// Initialize collapse panels in editor preview
window.addEventListener('load', initCollapsePanels);
