<?php
/**
 * Plugin Name: Salient Blocks: Container
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: salient-blocks-container — is a Gutenberg plugin created via create-guten-block.
 * Author: Paul Stonier
 * Author URI: https://www.salient.com/
 * Version: 1.0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

// Add Custom Block Category.
add_filter(
	'block_categories',
	function ( $categories, $post ) {

		$new_categories = array_merge(
			$categories,
			array(
				array(
					'slug'  => 'salient',
					'title' => __( 'Salient Custom Blocks', 'salient-blocks' ),
					'icon'  => '',
				),
			)
		);

		$filtered_categories = array_unique( $new_categories, SORT_REGULAR );

		return $filtered_categories;

	},
	10,
	2
);
