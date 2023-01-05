<?php
/**
 * Plugin Name:       Gutenbergblock Accordion
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            kaniboolotskiy@gmail.com
  *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_gutenbergblock_accordion_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_gutenbergblock_accordion_block_init' );

function style_scripts(){
	wp_enqueue_script('jquery');
	wp_enqueue_script('guten_accordion', plugins_url('src/script.js', __FILE__), '', filemtime(dirname(__FILE__) . '/assets/js/script.js'), true);
}
add_action('wp_enqueue_scripts', 'style_scripts');
