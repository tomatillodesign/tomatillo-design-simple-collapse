<?php
/**
 * Plugin Name:       Tomatillo Design ~ Simple Collapse
 * Description:       Adds a custom Gutenberg block with collapsible panels and smooth animations.
 * Version:           1.1.0
 * Author:            Chris Liu-Beers
 * Author URI:        http://www.tomatillodesign.com
 * Text Domain:       tomatillo-design-simple-collapse
 * Requires at least: 6.0
 * Requires PHP:      8.2
 *
 * @package Tomatillo_Design_Simple_Collapse
 * @since   1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Plugin version constant.
 *
 * @since 1.1.0
 */
define( 'TDSC_VERSION', '1.1.0' );

/**
 * Register the Simple Collapse block.
 *
 * @since 1.0.0
 * @return void
 */
function tomatillo_design_simple_collapse_register_block(): void {
	$block_json_path = __DIR__ . '/block.json';
	
	if ( ! file_exists( $block_json_path ) ) {
		return;
	}
	
	register_block_type( $block_json_path );
}
add_action( 'init', 'tomatillo_design_simple_collapse_register_block' );

/**
 * Register block patterns.
 *
 * @since 1.1.0
 * @return void
 */
function tomatillo_design_simple_collapse_register_patterns(): void {
	if ( ! function_exists( 'register_block_pattern' ) ) {
		return;
	}

	require_once plugin_dir_path( __FILE__ ) . 'patterns.php';
}
add_action( 'init', 'tomatillo_design_simple_collapse_register_patterns' );

/**
 * Enqueue frontend assets only when the block is present on the page.
 *
 * @since 1.0.0
 * @return void
 */
function tomatillo_design_simple_collapse_enqueue_frontend_assets(): void {
	// Only load on the front-end (not in editor)
	if ( is_admin() ) {
		return;
	}

	// Only enqueue if the block is present on the page
	if ( ! has_block( 'tomatillo-design/simple-collapse' ) ) {
		return;
	}

	$script_path = plugin_dir_path( __FILE__ ) . 'build/frontend.js';
	$script_url  = plugins_url( 'build/frontend.js', __FILE__ );
	
	// Get file modification time for cache busting, with fallback
	$version = file_exists( $script_path ) ? filemtime( $script_path ) : TDSC_VERSION;

	wp_enqueue_script(
		'tdsc-frontend-collapse',
		$script_url,
		array(),
		$version,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'tomatillo_design_simple_collapse_enqueue_frontend_assets' );

/**
 * Enqueue Dashicons only when the block is present on the page.
 *
 * @since 1.0.0
 * @return void
 */
function tomatillo_design_simple_collapse_enqueue_dashicons(): void {
	// Only load on the front-end (not in editor)
	if ( is_admin() ) {
		return;
	}

	// Only enqueue if the block is present on the page
	if ( ! has_block( 'tomatillo-design/simple-collapse' ) ) {
		return;
	}

	wp_enqueue_style( 'dashicons' );
}
add_action( 'wp_enqueue_scripts', 'tomatillo_design_simple_collapse_enqueue_dashicons' );

/**
 * Add inline script for panel state persistence.
 *
 * @since 1.1.0
 * @return void
 */
function tomatillo_design_simple_collapse_add_state_persistence(): void {
	if ( is_admin() || ! has_block( 'tomatillo-design/simple-collapse' ) ) {
		return;
	}

	$post_id = get_the_ID();
	if ( ! $post_id ) {
		return;
	}

	// Get saved panel states from post meta
	$saved_states = get_post_meta( $post_id, '_tdsc_panel_states', true );
	if ( ! is_array( $saved_states ) ) {
		$saved_states = array();
	}

	$ajax_data = array(
		'ajaxurl' => admin_url( 'admin-ajax.php' ),
		'postId'  => $post_id,
		'nonce'   => wp_create_nonce( 'tdsc-save-state' ),
	);

	wp_add_inline_script(
		'tdsc-frontend-collapse',
		'window.tdscPanelStates = ' . wp_json_encode( $saved_states ) . ';' .
		'var tdscAjax = ' . wp_json_encode( $ajax_data ) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'tomatillo_design_simple_collapse_add_state_persistence', 20 );

/**
 * Handle AJAX request to save panel state.
 *
 * @since 1.1.0
 * @return void
 */
function tomatillo_design_simple_collapse_save_panel_state(): void {
	check_ajax_referer( 'tdsc-save-state', 'nonce' );

	$post_id = isset( $_POST['post_id'] ) ? intval( $_POST['post_id'] ) : 0;
	$panel_id = isset( $_POST['panel_id'] ) ? sanitize_text_field( $_POST['panel_id'] ) : '';
	$is_open = isset( $_POST['is_open'] ) ? filter_var( $_POST['is_open'], FILTER_VALIDATE_BOOLEAN ) : false;

	if ( ! $post_id || ! $panel_id ) {
		wp_send_json_error( array( 'message' => __( 'Invalid request.', 'tomatillo-design-simple-collapse' ) ) );
	}

	// Get existing states
	$states = get_post_meta( $post_id, '_tdsc_panel_states', true );
	if ( ! is_array( $states ) ) {
		$states = array();
	}

	// Update state
	$states[ $panel_id ] = $is_open;

	// Save back to post meta
	update_post_meta( $post_id, '_tdsc_panel_states', $states );

	wp_send_json_success( array( 'message' => __( 'State saved.', 'tomatillo-design-simple-collapse' ) ) );
}
add_action( 'wp_ajax_tdsc_save_panel_state', 'tomatillo_design_simple_collapse_save_panel_state' );
add_action( 'wp_ajax_nopriv_tdsc_save_panel_state', 'tomatillo_design_simple_collapse_save_panel_state' );
