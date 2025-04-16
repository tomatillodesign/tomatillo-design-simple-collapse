import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { getContrastingTextColor } from '../utils';

export default function save({ attributes }) {
     const {
          panelTitle,
          defaultOpen,
          backgroundColor,
          panelId
     } = attributes;

     // Generate accessible IDs based on the stored unique panelId
     const headingId = `${panelId}-heading`;
     const contentId = `${panelId}-content`;

     return (
          <div
               {...useBlockProps.save({
                    className: `tdsc-collapse${defaultOpen ? ' is-open' : ''}`
               })}
          >
               <button
                    type="button"
                    className="tdsc-collapse__toggle"
                    aria-expanded={defaultOpen}
                    aria-controls={contentId}
                    id={headingId}
                    style={{
                         backgroundColor,
                         color: getContrastingTextColor(backgroundColor)
                    }}
               >
                    <span className="tdsc-collapse__title">
                         <RichText.Content value={panelTitle} />
                    </span>
                    <span
                         className="dashicons dashicons-arrow-down-alt2 tdsc-chevron"
                         aria-hidden="true"
                    ></span>
               </button>

               <div
                    id={contentId}
                    role="region"
                    className="tdsc-collapse__content"
                    aria-labelledby={headingId}
                    style={{
                         maxHeight: defaultOpen ? '1000px' : undefined
                    }}
               >
                    <div className="tdsc-collapse__inner">
                         <InnerBlocks.Content />
                    </div>
               </div>
          </div>
     );
}
