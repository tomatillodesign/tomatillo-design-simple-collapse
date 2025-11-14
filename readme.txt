=== Tomatillo Design Simple Collapse ===
Contributors: tomatillodesign
Tags: collapsible panel, accordion, content toggle, accessibility, gutenberg block
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 8.2
Stable tag: 1.1.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A lightweight, accessible Gutenberg block that adds collapsible content panels — perfect for toggled sections, FAQs, and more.

== Description ==

**Tomatillo Design Simple Collapse** adds an elegant and accessible collapsible panel block to the WordPress Block Editor.

Designed to match your theme out-of-the-box, this block allows editors to easily create expandable content areas with a title and any nested Gutenberg blocks inside. The plugin includes smooth animations, keyboard accessibility, ARIA roles, and a custom color picker — all in a highly performant package.

Built for flexibility and best practices, with no jQuery or bulky frameworks.

=== Features ===

- ✨ Custom collapsible panel block for the Block Editor
- 🎨 Customizable background color and WP color picker/gradient support
- 💻 Fully keyboard-accessible with ARIA and WCAG 2.1 AA compliance
- 📱 Smooth expand/collapse animations
- 🧩 Allows all Gutenberg blocks inside
- ⚡ Lightweight and fast — no jQuery, no dependencies
- 🛠 Frontend + Editor parity (what you see is what you get)
- 🧠 Automatically focuses on the panel title when inserted
- 🧼 Includes smart logic to prevent layout flickering in the editor

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/` or install via the Plugins screen in WordPress.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. In the Block Editor, search for “Simple Collapse” or find it under “Layout” blocks.
4. Add a title and any content blocks inside the collapsible panel.

== Frequently Asked Questions ==

= Can I add other blocks inside the panel? =
Yes! The panel supports all native and custom Gutenberg blocks inside the collapsible area.

= Is it accessible? =
Absolutely. The block uses semantic markup (`<button>`, `role="region"`, `aria-expanded`, `aria-controls`, `aria-labelledby`) and is WCAG 2.1 AA compliant out of the box.

= Can I have multiple panels on a page? =
Yes, you can add as many as you'd like. Each panel has a unique ID to prevent conflicts.

= Will it match my theme? =
Yes. The block uses minimal styling so it integrates visually with most WordPress themes. You can override styles via your theme or add custom CSS.

== Screenshots ==

1. The block in the editor with a customizable title and content area.
2. A live example of the collapsible panel on the frontend.

== Changelog ==

= 1.1.1 =
* Fixed: Improved spacing between stacked accordion items
* Fixed: Removed excessive bottom padding from content area
* Fixed: Added proper margin when items are expanded

= 1.1.0 =
* Performance: Assets now only load when block is present on page
* Accessibility: Added keyboard event handling (Enter/Space keys)
* Accessibility: Added prefers-reduced-motion support
* Code quality: Replaced deprecated substr() with slice()
* Code quality: Added error handling and PHPDoc comments
* Code quality: Consistent function naming
* Compatibility: Updated PHP requirement to 8.2+

= 1.0.0 =
* Initial release.
* Accessible, animated, editor-friendly collapsible panel block.

== Upgrade Notice ==

= 1.1.1 =
Spacing improvements for better visual hierarchy when accordion items are stacked.

= 1.1.0 =
Performance and accessibility improvements. Requires PHP 8.2 or higher.

= 1.0.0 =
First stable release — now ready for production use.

== License ==

This plugin is licensed under the [GNU General Public License v2.0 or later](https://www.gnu.org/licenses/gpl-2.0.html).
