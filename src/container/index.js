/**
 * BLOCK: salient-blocks-container
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	RichText,
	AlignmentToolbar,
	MediaUpload,
	BlockControls,
	InspectorControls,
	ColorPalette,
	URLInput,
	getColorObjectByColorValue,
	ContrastChecker,
	InnerBlocks,
} = wp.blockEditor;
const {
	Button,
	PanelBody,
	PanelRow,
	SelectControl,
	RangeControl,
} = wp.components;
const { Fragment } = wp.element;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'salient/block-salient-container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Container' ), // Block title.
	icon: 'archive', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'salient', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'container' ),
		__( 'box' ),
		__( 'grist' ),
	],
	attributes: {
		paddingTop: {
			type: 'number',
			default: 10,
		},
		paddingBottom: {
			type: 'number',
			default: 10,
		},
		backgroundColor: {
			type: 'string',
			default: '#333',
		},
		textColor: {
			type: 'string',
			default: '#FFF',
		},
		backgroundImage: {
			type: 'string',
		},
		bgImagePosition: {
			type: 'string',
		},
		align: {
			type: 'string',
			default: 'full',
		},
		overlayOpacity: {
			type: 'number',
			default: 50,
		},
		overlayBgColor: { 
			type: 'string',
			default: '#333',
		},
	},
	supports: {
		align: [ 'full', 'wide', 'center' ],
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit( { attributes, className, setAttributes } ) {
		const {
			paddingTop,
			paddingBottom,
			textColor,
			backgroundColor,
			backgroundImage,
			bgImagePosition,
			overlayBgColor,
			overlayOpacity,
		} = attributes;

		const TEMPLATE = [ [ 'core/heading' ], [ 'core/paragraph' ] ];

		function onChangeBgImage( newBgImage ) {
			console.log( newBgImage );
			setAttributes( { backgroundImage: newBgImage } );
		}
		function removeBgImage( ) {
			setAttributes( { backgroundImage: '' } );
		}

		// Creates a <p class='wp-block-cgb-block-salient-blocks-container'></p>.
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Background' ) }>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( newBgColor ) => setAttributes( { backgroundColor: newBgColor } ) }
							disableCustomColors={ true }
						></ColorPalette>
						<MediaUpload
							value={ backgroundImage }
							onSelect={ ( newBgImage ) => setAttributes( { backgroundImage: newBgImage } ) }
							render={ ( { open } ) => (
								<Button
									className="add-button"
									onClick={ open }
								>
									{ backgroundImage ? ( 'Change Background Image' ) : ( 'Add Background Image' ) }
								</Button>
							) }
						/>
						{ backgroundImage ? (
							<Button
								className="remove-button"
								onClick={ removeBgImage }
							>
								Remove Background Image
							</Button>
						) : '' }
						{ backgroundImage ? (
							<Fragment>
								<SelectControl
									label="Background Image Position"
									value={ bgImagePosition }
									options={ [
										{ label: 'Centered', value: 'center' },
										{ label: 'Center Top', value: 'center top' },
										{ label: 'Center Bottom', value: 'center bottom' },
										{ label: 'Left Top', value: 'left top' },
										{ label: 'Left Center', value: 'left center' },
										{ label: 'Left Bottom', value: 'left bottom' },
										{ label: 'Right Top', value: 'right top' },
										{ label: 'Right Center', value: 'right center' },
										{ label: 'Right Bottom', value: 'right bottom' },
									] }
									onChange={ ( value ) => {
										setAttributes( { bgImagePosition: value } );
									} }
								/>
								<h3>Background Overlay</h3>
								<ColorPalette
									value={ overlayBgColor }
									onChange={ ( newBgColor ) => setAttributes( { overlayBgColor : newBgColor } ) }
									disableCustomColors={ true }
								></ColorPalette>
								<RangeControl
									label="Opacity"
									value={ overlayOpacity }
									onChange={ ( value ) => {
										setAttributes( { overlayOpacity: value } );
									} }
									min={ 0 }
									max={ 100 }
								/>
							</Fragment>
						) : '' }
						
					</PanelBody>
					<PanelBody
						title={ __( 'Spacing' ) }
					>
						<RangeControl
							label="Top Padding"
							value={ paddingTop }
							onChange={ ( value ) => {
								setAttributes( { paddingTop: value } );
							} }
							min={ 0 }
							max={ 1000 }
						/>
						<RangeControl
							label="Bottom Padding"
							value={ paddingBottom }
							onChange={ ( value ) => {
								setAttributes( { paddingBottom: value } );
							} }
							min={ 0 }
							max={ 1000 }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Text' ) } >
						<ColorPalette
							value={ textColor }
							onChange={ ( newTextColor ) => setAttributes( { textColor: newTextColor } ) }
							disableCustomColors={ true }
						></ColorPalette>
					</PanelBody>
				</InspectorControls>
				<div
					className={ className }
					style={ {
						backgroundImage: `${ backgroundImage ? ( `url( ${ backgroundImage.url } )` ) : ( 'none' ) }`,
						backgroundColor: `${ backgroundColor ? ( backgroundColor ) : ( 'none' ) }`,
						backgroundPosition: `${ bgImagePosition ? bgImagePosition : 'center' }`,
						paddingTop: `${ paddingTop ? ( paddingTop + 'px' ): 0 }`,
						paddingBottom: `${ paddingBottom ? paddingBottom + 'px' : 0 }`,
						color: textColor,
					} }
				>
					<div className="wrapper">
						<InnerBlocks
							template={ TEMPLATE }
						/>
					</div>
					{ backgroundImage ? (
						<div
							className="color-overlay"
							style={ {
								backgroundColor: `${ overlayBgColor ? overlayBgColor  : 'none' }`,
								opacity: `${ overlayOpacity ? ( overlayOpacity / 100 ) : '0' }`,
							} }
						></div>
					) : '' }

					
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save( { attributes, className } ) {
		const {
			paddingTop,
			paddingBottom,
			textColor,
			backgroundColor,
			backgroundImage,
			bgImagePosition,
			overlayBgColor,
			overlayOpacity,
		} = attributes;

		// Creates a <p class='wp-block-cgb-block-salient-blocks-container'></p>.
		return (
			<div
				className={ className }
				style={ {
					backgroundImage: `${ backgroundImage ? ( `url( ${ backgroundImage.url } )` ) : ( 'none' ) }`,
					backgroundColor: `${ backgroundColor ? ( backgroundColor ) : ( 'none' ) }`,
					backgroundPosition: `${ bgImagePosition ? bgImagePosition : 'center' }`,
					paddingTop: `${ paddingTop ? ( paddingTop + 'px' ): 0 }`,
					paddingBottom: `${ paddingBottom ? paddingBottom + 'px' : 0 }`,
					color: textColor,
				} }
			>
				<div className="wrapper">
					<InnerBlocks.Content />
				</div>
				{ backgroundImage ? (
					<div
						className="color-overlay"
						style={ {
							backgroundColor: `${ overlayBgColor ? overlayBgColor  : 'none' }`,
							opacity: `${ overlayOpacity ? ( overlayOpacity / 100 ) : '0' }`,
						} }
					></div>
				) : '' }
			</div>
		);
	},
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'ugb/container' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'salient/block-salient-container', attributes, innerBlocks );
				},
			},
		],
	},
} );
