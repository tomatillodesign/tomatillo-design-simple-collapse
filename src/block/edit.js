import {
	useBlockProps,
	RichText,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';
import { useState, useEffect, useRef } from '@wordpress/element';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { PanelColorSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { getContrastingTextColor } from '../utils';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		 panelTitle,
		 defaultOpen,
		 backgroundColor,
		 panelId
	} = attributes;

	const titleRef = useRef(null);
	const [isPreviewOpen, setIsPreviewOpen] = useState(null);

	// Initialize preview open state once
	useEffect(() => {
		 if (isPreviewOpen === null) {
			  setIsPreviewOpen(defaultOpen);
		 }
	}, [defaultOpen, isPreviewOpen]);

	// Generate a persistent panelId using the WP-provided clientId
	useEffect(() => {
		 if (!panelId) {
			  setAttributes({ panelId: `tdsc-${clientId}` });
		 }
	}, [panelId, clientId, setAttributes]);

	// Auto-focus the title field on block insertion
	useEffect(() => {
		 if (titleRef.current) {
			  titleRef.current.focus();
		 }
	}, []);

	const headingId = `${panelId}-heading`;
	const contentId = `${panelId}-content`;

	return (
		 <div
			  {...useBlockProps({
				   className: `tdsc-collapse${isPreviewOpen ? ' is-open' : ''}`
			  })}
		 >
			  <InspectorControls>
				   <PanelColorSettings
						title={__('Color Settings', 'tomatillo-design-simple-collapse')}
						initialOpen={true}
						colorSettings={[
							 {
								  value: backgroundColor,
								  onChange: (color) => setAttributes({ backgroundColor: color }),
								  label: __('Panel Header Background', 'tomatillo-design-simple-collapse'),
							 }
						]}
						enableCustomGradients={true}
						enableGradients={true}
				   >
						<PanelBody title={__('Panel Settings', 'tomatillo-design-simple-collapse')} initialOpen={true}>
							 <ToggleControl
								  label={__('Open by default?', 'tomatillo-design-simple-collapse')}
								  checked={defaultOpen}
								  onChange={(value) => setAttributes({ defaultOpen: value })}
							 />
						</PanelBody>
				   </PanelColorSettings>
			  </InspectorControls>

			  {/* Toggle Button */}
			  <div
					role="button"
					id={headingId}
					className="tdsc-collapse__toggle"
					style={{
						backgroundColor,
						color: getContrastingTextColor(backgroundColor),
						cursor: 'pointer'
					}}
					aria-expanded={!!isPreviewOpen}
					aria-controls={contentId}
					onClick={() => setIsPreviewOpen(prev => !prev)}
				>

				   <RichText
						tagName="span"
						ref={titleRef}
						value={panelTitle}
						onChange={(value) => setAttributes({ panelTitle: value })}
						placeholder={__('Click to add panel title…', 'tomatillo-design-simple-collapse')}
						className="tdsc-collapse__title"
						allowedFormats={[]}
						style={{ flexGrow: 1 }}
				   />
				   <span
						className={`dashicons dashicons-arrow-down-alt2 tdsc-chevron${isPreviewOpen ? ' is-open' : ''}`}
						style={{ marginLeft: '0.75em' }}
						aria-hidden="true"
				   ></span>
			  </div>

			  {/* Collapsible Panel Content */}
			  <div
				   id={contentId}
				   role="region"
				   className="tdsc-collapse__content"
				   aria-labelledby={headingId}
			  >
				   <div className="tdsc-collapse__inner">
						<InnerBlocks />
				   </div>
			  </div>
		 </div>
	);
}
