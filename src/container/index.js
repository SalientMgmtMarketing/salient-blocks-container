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
const {
	registerBlockType,
	createBlock,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
	ColorPalette,
	ContrastChecker,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} = wp.blockEditor;

const {
	Button,
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
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
		__( 'salient' ),
	],
	attributes: {
		paddingTop: {
			type: 'number',
			default: 40,
		},
		paddingBottom: {
			type: 'number',
			default: 40,
		},
		paddingUnits: {
			type: 'string',
			default: 'px',
		},
		minHeight: {
			type: 'number',
		},
		heightUnits: {
			type: 'string',
			default: 'px',
		},
		textAlignment: {
			type: 'string',
			default: 'left',
		},
		verticalAlignment: {
			type: 'string',
			default: 'top',
		},
		backgroundColor: {
			type: 'string',
			default: '#333',
		},
		textColor: {
			type: 'string',
			default: '#FFF',
		},
		textSize: {
			type: 'string',
			default: 'normal',
		},
		backgroundImage: {
			type: 'object',
		},
		bgImagePosition: {
			type: 'string',
		},
		bgFixed: {
			type: 'boolean',
			default: false,
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
		isVideoBg: {
			type: 'boolean',
			default: false,
		},
		bgMediaType: {
			type: 'string',
			default: 'image',
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
			paddingUnits,
			minHeight,
			heightUnits,
			textAlignment,
			verticalAlignment,
			textColor,
			textSize,
			backgroundColor,
			backgroundImage,
			bgFixed,
			bgImagePosition,
			bgMediaType,
			overlayBgColor,
			overlayOpacity,
		} = attributes;

		const TEMPLATE = [ [ 'core/heading' ], [ 'core/paragraph' ] ];

		function onChangeBgImage( newBgImage ) {
			setAttributes( { backgroundImage: newBgImage } );
			setAttributes( { bgMediaType: newBgImage.type } );
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
						></ColorPalette>
						<ContrastChecker
							backgroundColor={ backgroundColor }
							textColor={ textColor }
							isLargeText={ false }
						/>
						<MediaUpload
							value={ backgroundImage }
							onSelect={ onChangeBgImage }
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
							<Fragment>
								<div className="image-preview-wrapper">
									{ backgroundImage.type === 'video' && (
										<video
											className="image-preview"
											autoPlay
											muted
											loop
											src={ backgroundImage.url }
										/>
									) }
									{ backgroundImage.type === 'image' && (
										/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */
										<img
											className="image-preview"
											src={ backgroundImage.url }
											alt={ __( 'preview' ) }
										/>
									) }
								</div>
								<Button
									className="remove-button"
									onClick={ removeBgImage }
								>
									Remove Background Image
								</Button>
							</Fragment>
						) : '' }
						{ backgroundImage ? (
							<Fragment>
								{ bgMediaType === 'image' && (
									<Fragment>
										<ToggleControl
											label="Fixed Background"
											help={ bgFixed ? 'Has fixed background.' : 'No fixed background.' }
											checked={ bgFixed }
											onChange={
												() => setAttributes( { bgFixed: ! bgFixed } )
											}
										/>
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
									</Fragment>
								) }
								<h3>Background Overlay</h3>
								<ColorPalette
									value={ overlayBgColor }
									onChange={ ( newBgColor ) => setAttributes( { overlayBgColor: newBgColor } ) }
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
					<PanelBody title={ __( 'Text' ) } >
						<ColorPalette
							value={ textColor }
							onChange={ ( newTextColor ) => setAttributes( { textColor: newTextColor } ) }
							disableCustomColors={ true }
						></ColorPalette>
						<ContrastChecker
							backgroundColor={ backgroundColor }
							textColor={ textColor }
							isLargeText={ false }
						/>
						<SelectControl
							label="Text Size"
							value={ textSize }
							options={ [
								{ label: 'XS', value: 'xs' },
								{ label: 'Small', value: 'small' },
								{ label: 'Normal', value: 'normal' },
								{ label: 'Large', value: 'large' },
								{ label: 'XL', value: 'xl' },
								{ label: 'XXL', value: 'xxl' },
							] }
							onChange={ ( value ) => {
								setAttributes( { textSize: value } );
							} }
						/>
					</PanelBody>
					<PanelBody
						title={ __( 'Spacing' ) }
					>
						<TextControl
							label="Minimum Height"
							value={ minHeight }
							type="number"
							onChange={ ( value ) => setAttributes( { minHeight: parseInt( value ) } ) }
						/>
						<SelectControl
							label="Height Units"
							value={ heightUnits }
							options={ [
								{ label: 'Pixels', value: 'px' },
								{ label: 'Percent', value: '%' },
								{ label: 'Viewport Height', value: 'vh' },
							] }
							onChange={ ( value ) => {
								setAttributes( { heightUnits: value } );
							} }
						/>
						<SelectControl
							label="Vertical Alignment"
							value={ verticalAlignment }
							options={ [
								{ label: 'Top', value: 'top' },
								{ label: 'Center', value: 'center' },
								{ label: 'Bottom', value: 'bottom' },
							] }
							onChange={ ( value ) => {
								setAttributes( { verticalAlignment: value } );
							} }
						/>
						<RangeControl
							label="Top Padding"
							value={ paddingTop }
							onChange={ ( value ) => {
								setAttributes( { paddingTop: parseInt( value ) } );
							} }
							min={ 0 }
							max={ 200 }
						/>
						<RangeControl
							label="Bottom Padding"
							value={ paddingBottom }
							onChange={ ( value ) => {
								setAttributes( { paddingBottom: parseInt( value ) } );
							} }
							min={ 0 }
							max={ 200 }
						/>
						<SelectControl
							label="Spacing Units"
							value={ paddingUnits }
							options={ [
								{ label: 'Pixels', value: 'px' },
								{ label: 'Percent', value: '%' },
								{ label: 'Viewport Height', value: 'vh' },
							] }
							onChange={ ( value ) => {
								setAttributes( { paddingUnits: value } );
							} }
						/>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={ textAlignment }
						onChange={ ( value ) => setAttributes( { textAlignment: value } ) }
					/>
				</BlockControls>
				<div
					className={ `${ className }${ bgFixed ? ' bg-fixed' : '' }${ verticalAlignment ? ' vertical-align-' + verticalAlignment : '' }${ textSize !== 'normal' ? ' has-' + textSize + '-font-size' : '' }` }
					style={ {
						backgroundImage: `${ backgroundImage && bgMediaType === 'image' ? ( `url( ${ backgroundImage.url } )` ) : ( 'none' ) }`,
						backgroundColor: `${ backgroundColor ? ( backgroundColor ) : ( 'none' ) }`,
						backgroundPosition: `${ bgImagePosition ? bgImagePosition : 'center' }`,
						paddingTop: `${ paddingTop ? ( paddingTop + paddingUnits ) : 0 }`,
						paddingBottom: `${ paddingBottom ? paddingBottom + paddingUnits : 0 }`,
						minHeight: `${ minHeight ? minHeight + heightUnits : 'auto' }`,
						color: textColor,
						textAlign: textAlignment,
					} }
				>
					<div className="wrapper">
						<InnerBlocks
							template={ TEMPLATE }
						/>
					</div>
					{ backgroundImage && (
						<div
							className="color-overlay"
							style={ {
								backgroundColor: `${ overlayBgColor ? overlayBgColor : 'none' }`,
								opacity: `${ overlayOpacity ? ( overlayOpacity / 100 ) : '0' }`,
							} }
						></div>
					) }

					{ bgMediaType === 'video' && backgroundImage && (
						<video
							className="salient-video-background"
							autoPlay
							muted
							loop
							src={ backgroundImage.url }
						/>
					) }
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
			paddingUnits,
			minHeight,
			heightUnits,
			textAlignment,
			verticalAlignment,
			textColor,
			textSize,
			backgroundColor,
			backgroundImage,
			bgImagePosition,
			bgFixed,
			bgMediaType,
			overlayBgColor,
			overlayOpacity,
		} = attributes;

		// Creates a <p class='wp-block-cgb-block-salient-blocks-container'></p>.
		return (
			<div
				className={ `${ bgFixed ? 'bg-fixed ' : '' }${ verticalAlignment ? 'vertical-align-' + verticalAlignment : '' }${ textSize !== 'normal' ? ' has-' + textSize + '-font-size' : '' }` }
				style={ {
					backgroundImage: `${ backgroundImage && bgMediaType === 'image' ? ( `url( ${ backgroundImage.url } )` ) : ( 'none' ) }`,
					backgroundColor: `${ backgroundColor ? ( backgroundColor ) : ( 'none' ) }`,
					backgroundPosition: `${ bgImagePosition ? bgImagePosition : 'center' }`,
					paddingTop: `${ paddingTop ? ( paddingTop + paddingUnits ) : 0 }`,
					paddingBottom: `${ paddingBottom ? paddingBottom + paddingUnits : 0 }`,
					minHeight: `${ minHeight ? minHeight + heightUnits : 'auto' }`,
					color: textColor,
					textAlign: textAlignment,
				} }
			>
				<div className="wrapper">
					<InnerBlocks.Content />
				</div>
				{ backgroundImage ? (
					<div
						className="color-overlay"
						style={ {
							backgroundColor: `${ overlayBgColor ? overlayBgColor : 'none' }`,
							opacity: `${ overlayOpacity ? ( overlayOpacity / 100 ) : '0' }`,
						} }
					></div>
				) : '' }

				{ bgMediaType === 'video' && backgroundImage && (
					<video
						className="salient-video-background"
						autoPlay
						muted
						loop
						src={ backgroundImage.url }
					/>
				) }
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
