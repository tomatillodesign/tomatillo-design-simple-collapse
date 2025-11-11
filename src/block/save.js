/**
 * Save component for the Simple Collapse block.
 *
 * Renders the block markup that will be saved to the database and displayed on the frontend.
 * Includes proper ARIA attributes for accessibility, Schema.org markup, and all styling options.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Block attributes.
 * @returns {JSX.Element} The saved block markup.
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { getContrastingTextColor } from '../utils';
import { getIconClass, getIconAnimationClass } from '../icon-utils';

export default function save({ attributes }) {
	const {
		panelTitle,
		defaultOpen,
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

	// Generate accessible IDs based on the stored unique panelId
	const headingId = `${panelId}-heading`;
	const contentId = `${panelId}-content`;

	// Build class names
	const blockProps = useBlockProps.save({
		className: `tdsc-collapse${defaultOpen ? ' is-open' : ''}${customClassName ? ` ${customClassName}` : ''} ${getIconAnimationClass(iconAnimation)}`,
	});

	// Add data attributes for JavaScript functionality
	const dataAttributes = {
		'data-animation-speed': animationSpeed,
		'data-enable-hash-link': enableHashLink ? 'true' : 'false',
		'data-focus-on-open': focusOnOpen ? 'true' : 'false',
		'data-enable-analytics': enableAnalytics ? 'true' : 'false',
		'data-panel-id': panelId,
	};

	// Build inline styles for toggle button
	const defaultBgColor = backgroundColor || 'var(--wp--preset--color--primary, #222222)';
	const defaultTextColor = textColor || '#ffffff';
	
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
	};

	// Build CSS custom properties for hover/active states
	const cssVars = {};
	if (hoverBackgroundColor) cssVars['--tdsc-hover-bg'] = hoverBackgroundColor;
	if (hoverTextColor) cssVars['--tdsc-hover-color'] = hoverTextColor;
	if (activeBackgroundColor) cssVars['--tdsc-active-bg'] = activeBackgroundColor;
	if (activeTextColor) cssVars['--tdsc-active-color'] = activeTextColor;
	if (borderRadius !== '0') cssVars['--tdsc-border-radius'] = borderRadius;
	if (borderWidth !== '0') cssVars['--tdsc-border-width'] = borderWidth;
	if (borderColor) cssVars['--tdsc-border-color'] = borderColor;

	// Build content styles
	const contentStyles = {
		paddingTop: contentPadding?.top || undefined,
		paddingRight: contentPadding?.right || undefined,
		paddingBottom: contentPadding?.bottom || undefined,
		paddingLeft: contentPadding?.left || undefined,
	};

	// Get icon class
	const iconClass = getIconClass(iconType, defaultOpen);
	const toggleClassName = 'tdsc-collapse__toggle';

	// Schema.org markup
	const schemaProps = {};
	if (schemaType === 'faq') {
		schemaProps.itemScope = true;
		schemaProps.itemType = 'https://schema.org/FAQPage';
	} else if (schemaType === 'howto') {
		schemaProps.itemScope = true;
		schemaProps.itemType = 'https://schema.org/HowTo';
	}

	return (
		<div {...blockProps} {...dataAttributes} {...schemaProps} style={cssVars}>
			<button
				type="button"
				className={toggleClassName}
				aria-expanded={defaultOpen}
				aria-controls={contentId}
				id={headingId}
				style={toggleStyles}
			>
				<span className="tdsc-collapse__title" style={{ color: defaultTextColor }}>
					<RichText.Content value={panelTitle} />
				</span>
				<span className={iconClass} aria-hidden="true" style={{ color: defaultTextColor }}></span>
			</button>

			<div
				id={contentId}
				role="region"
				className="tdsc-collapse__content"
				aria-labelledby={headingId}
				style={{
					maxHeight: defaultOpen ? '1000px' : undefined,
					...contentStyles,
				}}
			>
				<div className="tdsc-collapse__inner">
					<InnerBlocks.Content />
				</div>
			</div>

			{/* Schema.org structured data */}
			{schemaType === 'faq' && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify({
							'@context': 'https://schema.org',
							'@type': 'FAQPage',
							mainEntity: {
								'@type': 'Question',
								name: panelTitle || 'Question',
								acceptedAnswer: {
									'@type': 'Answer',
									text: '', // Content would be extracted from InnerBlocks
								},
							},
						}),
					}}
				/>
			)}
		</div>
	);
}
