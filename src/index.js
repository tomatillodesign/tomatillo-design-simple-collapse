import { registerBlockType } from '@wordpress/blocks';
import edit from './block/edit';
import save from './block/save';
import './block/style.css';
import './block/editor.css';

import metadata from '../block.json';
import { initCollapsePanels } from './collapse';

registerBlockType(metadata.name, {
	edit,
	save,
	attributes: metadata.attributes,
});

// Editor preview (optional)
window.addEventListener('load', initCollapsePanels);
