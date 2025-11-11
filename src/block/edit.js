/**
 * Edit component for the Simple Collapse block.
 *
 * Handles the block editor interface with comprehensive controls for:
 * - Panel settings
 * - Icon customization
 * - Typography controls
 * - Border and spacing
 * - Color customization (including hover/active states)
 * - Advanced settings (hash links, focus, analytics, schema)
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Block attributes.
 * @param {Function} props.setAttributes Function to update attributes.
 * @param {string} props.clientId Unique block client ID.
 * @returns {JSX.Element} The edit component.
 */
import {
	useBlockProps,
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { useState, useEffect, useRef } from '@wordpress/element';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { getContrastingTextColor } from '../utils';
import { getIconClass, getIconAnimationClass } from '../icon-utils';

export default function Edit({ attributes, setAttributes, clientId }) {
	const {
		panelTitle,
		defaultOpen = false,
		backgroundColor,
		panelId,
		textColor,
		iconType = 'chevron',
		iconAnimation = 'rotate',
		animationSpeed = 'normal',
		fontSize,
		fontWeight = '700',
		lineHeight,
		borderRadius = '0',
		borderWidth = '0',
		borderColor,
		headerPadding,
		contentPadding,
		hoverBackgroundColor,
		hoverTextColor,
		activeBackgroundColor,
		activeTextColor,
		customClassName,
		enableHashLink = true,
		focusOnOpen = false,
		schemaType = 'none',
		enableAnalytics = false,
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

	// Build class names
	const blockProps = useBlockProps({
		className: `tdsc-collapse${isPreviewOpen ? ' is-open' : ''}${customClassName ? ` ${customClassName}` : ''} ${getIconAnimationClass(iconAnimation)}`,
	});

	// Get default colors (CSS variable with fallback)
	const defaultBgColor = backgroundColor || 'var(--wp--preset--color--primary, #222222)';
	const defaultTextColor = textColor || '#ffffff';

	// Build toggle styles
	const toggleStyles = {
		backgroundColor: defaultBgColor,
		color: defaultTextColor,
		fontSize: fontSize || undefined,
		fontWeight: fontWeight || undefined,
		lineHeight: lineHeight || undefined,
		borderRadius: borderRadius !== '0' ? borderRadius : undefined,
		borderWidth: borderWidth !== '0' ? borderWidth : undefined,
		borderColor: borderColor || undefined,
		borderStyle: borderWidth !== '0' ? 'solid' : undefined,
		paddingTop: headerPadding?.top || undefined,
		paddingRight: headerPadding?.right || undefined,
		paddingBottom: headerPadding?.bottom || undefined,
		paddingLeft: headerPadding?.left || undefined,
		cursor: 'pointer',
	};

	const iconClass = getIconClass(iconType, isPreviewOpen);
	const toggleClassName = 'tdsc-collapse__toggle';

	return (
		<div {...blockProps}>
			<InspectorControls>
				{/* Color Settings - Moved to top */}
				<PanelBody title={__('Color Settings', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<PanelColorSettings
						colorSettings={[
							{
								value: backgroundColor,
								onChange: (color) => setAttributes({ backgroundColor: color }),
								label: __('Panel Header Background', 'tomatillo-design-simple-collapse'),
							},
							{
								value: textColor,
								onChange: (color) => setAttributes({ textColor: color }),
								label: __('Text Color', 'tomatillo-design-simple-collapse'),
							},
							{
								value: hoverBackgroundColor,
								onChange: (color) => setAttributes({ hoverBackgroundColor: color }),
								label: __('Hover Background', 'tomatillo-design-simple-collapse'),
							},
							{
								value: hoverTextColor,
								onChange: (color) => setAttributes({ hoverTextColor: color }),
								label: __('Hover Text Color', 'tomatillo-design-simple-collapse'),
							},
							{
								value: activeBackgroundColor,
								onChange: (color) => setAttributes({ activeBackgroundColor: color }),
								label: __('Active Background', 'tomatillo-design-simple-collapse'),
							},
							{
								value: activeTextColor,
								onChange: (color) => setAttributes({ activeTextColor: color }),
								label: __('Active Text Color', 'tomatillo-design-simple-collapse'),
							},
						]}
						enableCustomGradients={true}
						enableGradients={true}
					/>
				</PanelBody>

				{/* Panel Settings */}
				<PanelBody title={__('Panel Settings', 'tomatillo-design-simple-collapse')} initialOpen={true}>
					<ToggleControl
						label={__('Open by default?', 'tomatillo-design-simple-collapse')}
						checked={defaultOpen}
						onChange={(value) => setAttributes({ defaultOpen: value })}
					/>
					<TextControl
						label={__('Custom CSS Class', 'tomatillo-design-simple-collapse')}
						value={customClassName || ''}
						onChange={(value) => setAttributes({ customClassName: value })}
						help={__('Add a custom CSS class for styling', 'tomatillo-design-simple-collapse')}
					/>
				</PanelBody>

				{/* Icon Settings */}
				<PanelBody title={__('Icon Settings', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<SelectControl
						label={__('Icon Type', 'tomatillo-design-simple-collapse')}
						value={iconType}
						options={[
							{ label: __('Chevron', 'tomatillo-design-simple-collapse'), value: 'chevron' },
							{ label: __('Arrow', 'tomatillo-design-simple-collapse'), value: 'arrow' },
							{ label: __('Plus/Minus', 'tomatillo-design-simple-collapse'), value: 'plus' },
						]}
						onChange={(value) => setAttributes({ iconType: value })}
					/>
					<SelectControl
						label={__('Icon Animation', 'tomatillo-design-simple-collapse')}
						value={iconAnimation}
						options={[
							{ label: __('Rotate', 'tomatillo-design-simple-collapse'), value: 'rotate' },
							{ label: __('Flip', 'tomatillo-design-simple-collapse'), value: 'flip' },
							{ label: __('Fade', 'tomatillo-design-simple-collapse'), value: 'fade' },
							{ label: __('None', 'tomatillo-design-simple-collapse'), value: 'none' },
						]}
						onChange={(value) => setAttributes({ iconAnimation: value })}
					/>
				</PanelBody>

				{/* Typography Settings */}
				<PanelBody title={__('Typography', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<SelectControl
						label={__('Font Weight', 'tomatillo-design-simple-collapse')}
						value={fontWeight}
						options={[
							{ label: __('Normal', 'tomatillo-design-simple-collapse'), value: '400' },
							{ label: __('Medium', 'tomatillo-design-simple-collapse'), value: '500' },
							{ label: __('Semi Bold', 'tomatillo-design-simple-collapse'), value: '600' },
							{ label: __('Bold', 'tomatillo-design-simple-collapse'), value: '700' },
						]}
						onChange={(value) => setAttributes({ fontWeight: value })}
					/>
				</PanelBody>

				{/* Border & Spacing */}
				<PanelBody title={__('Border & Spacing', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<TextControl
						label={__('Border Radius', 'tomatillo-design-simple-collapse')}
						value={borderRadius}
						onChange={(value) => setAttributes({ borderRadius: value })}
						help={__('e.g., 4px, 0.5em', 'tomatillo-design-simple-collapse')}
					/>
					<TextControl
						label={__('Border Width', 'tomatillo-design-simple-collapse')}
						value={borderWidth}
						onChange={(value) => setAttributes({ borderWidth: value })}
						help={__('e.g., 1px, 2px', 'tomatillo-design-simple-collapse')}
					/>
					<PanelColorSettings
						title={__('Border Color', 'tomatillo-design-simple-collapse')}
						colorSettings={[
							{
								value: borderColor,
								onChange: (color) => setAttributes({ borderColor: color }),
								label: __('Border Color', 'tomatillo-design-simple-collapse'),
							},
						]}
					/>
				</PanelBody>

				{/* Animation Settings */}
				<PanelBody title={__('Animation', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<SelectControl
						label={__('Animation Speed', 'tomatillo-design-simple-collapse')}
						value={animationSpeed}
						options={[
							{ label: __('Slow', 'tomatillo-design-simple-collapse'), value: 'slow' },
							{ label: __('Normal', 'tomatillo-design-simple-collapse'), value: 'normal' },
							{ label: __('Fast', 'tomatillo-design-simple-collapse'), value: 'fast' },
						]}
						onChange={(value) => setAttributes({ animationSpeed: value })}
					/>
				</PanelBody>

				{/* Advanced Settings */}
				<PanelBody title={__('Advanced', 'tomatillo-design-simple-collapse')} initialOpen={false}>
					<ToggleControl
						label={__('Enable URL Hash Links', 'tomatillo-design-simple-collapse')}
						checked={enableHashLink}
						onChange={(value) => setAttributes({ enableHashLink: value })}
						help={__('Allow opening panels via URL hash (#panel-id)', 'tomatillo-design-simple-collapse')}
					/>
					<ToggleControl
						label={__('Focus Content on Open', 'tomatillo-design-simple-collapse')}
						checked={focusOnOpen}
						onChange={(value) => setAttributes({ focusOnOpen: value })}
						help={__('Move focus to content when panel opens', 'tomatillo-design-simple-collapse')}
					/>
					<SelectControl
						label={__('Schema.org Type', 'tomatillo-design-simple-collapse')}
						value={schemaType}
						options={[
							{ label: __('None', 'tomatillo-design-simple-collapse'), value: 'none' },
							{ label: __('FAQ', 'tomatillo-design-simple-collapse'), value: 'faq' },
							{ label: __('HowTo', 'tomatillo-design-simple-collapse'), value: 'howto' },
						]}
						onChange={(value) => setAttributes({ schemaType: value })}
						help={__('Add structured data for SEO', 'tomatillo-design-simple-collapse')}
					/>
					<ToggleControl
						label={__('Enable Analytics Tracking', 'tomatillo-design-simple-collapse')}
						checked={enableAnalytics}
						onChange={(value) => setAttributes({ enableAnalytics: value })}
						help={__('Track panel open/close events', 'tomatillo-design-simple-collapse')}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Toggle Button */}
			<div
				role="button"
				id={headingId}
				className={toggleClassName}
				style={toggleStyles}
				aria-expanded={!!isPreviewOpen}
				aria-controls={contentId}
				onClick={() => setIsPreviewOpen((prev) => !prev)}
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
				<span className={iconClass} style={{ marginLeft: '0.75em' }} aria-hidden="true"></span>
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
