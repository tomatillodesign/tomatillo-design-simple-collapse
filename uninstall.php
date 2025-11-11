<?php
/**
 * Uninstall script for Tomatillo Design Simple Collapse plugin.
 *
 * This file is called when the plugin is deleted through WordPress admin.
 * It performs cleanup tasks such as removing options, transients, and cache.
 *
 * @package Tomatillo_Design_Simple_Collapse
 * @since   1.1.0
 */

// If uninstall not called from WordPress, then exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

// Clean up any transients that might have been created.
// Note: This plugin doesn't create any options or transients by default,
// but this provides a template for future cleanup if needed.

// Example cleanup (uncomment if needed in future):
// delete_option( 'tdsc_some_option' );
// delete_transient( 'tdsc_some_transient' );

// Clear any cached data related to this plugin.
// WordPress block editor doesn't typically cache block data, but if you
// add caching in the future, clean it up here.

