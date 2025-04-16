<?php
/**
 * Plugin Name:       Tomatillo Design Simple Collapse
 * Description:       Adds a custom Gutenberg block with collapsible panels and smooth animations.
 * Version:           1.0.0
 * Author:            Chris Liu-Beers
 * Author URI:        http://www.tomatillodesign.com
 * Text Domain:       tomatillo-design-simple-collapse
 * Requires at least: 6.0
 * Requires PHP:      7.4
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function tomatillo_design_simple_collapse_register_block() {
    register_block_type( __DIR__ . '/block.json' );
}
add_action( 'init', 'tomatillo_design_simple_collapse_register_block' );

function tomatillo_design_simple_collapse_enqueue_frontend_assets() {
    // Only load on the front-end (not in editor)
    if ( is_admin() ) {
        return;
    }

    wp_enqueue_script(
        'tdsc-frontend-collapse',
        plugins_url( 'build/frontend.js', __FILE__ ),
        [],
        filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' ),
        true
    );
}
add_action( 'wp_enqueue_scripts', 'tomatillo_design_simple_collapse_enqueue_frontend_assets' );


add_action( 'wp_enqueue_scripts', 'tdsc_enqueue_dashicons' );
function tdsc_enqueue_dashicons() {
    wp_enqueue_style( 'dashicons' );
}
