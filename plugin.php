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
