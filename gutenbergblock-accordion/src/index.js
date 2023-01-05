/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import './style.scss';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */

import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	edit: ( props ) => {
		const {
			attributes: { info = [] },
			setAttributes,
			className,
		} = props;

		const infoList = ( value ) => {
			return value
				.sort( ( a, b ) => a.index - b.index )
				.map( ( infoItem ) => {
					return (
						<div className="info-item">
							<div className="info-item-wrapper">
								<Button
									className="remove-item"
									onClick={ () => {
										const newInfo = info
											.filter(
												( item ) =>
													item.index != infoItem.index
											)
											.map( ( i ) => {
												if (
													i.index > infoItem.index
												) {
													i.index -= 1;
												}
												return i;
											} );
										setAttributes( { info: newInfo } );
									} }
								>
									<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path class="guten_svg_close" fill-rule="evenodd" clip-rule="evenodd" d="M11.6569 1.75744L10.2426 0.343227L6 4.58587L1.75736 0.343226L0.343146 1.75744L4.58579 6.00008L0.343146 10.2427L1.75736 11.6569L6 7.41429L10.2426 11.6569L11.6569 10.2427L7.41421 6.00008L11.6569 1.75744Z" fill="white"/>
									</svg>
								</Button>
								<div className="info-item-number">
									{ infoItem.index < 10 ? '0' + infoItem.index : infoItem.index }
								</div>
								<div className="info-item-content">
									<RichText
										tagName="div"
										className="info-item-title"
										placeholder="Enter the title here"
										value={ infoItem.title }

										onChange={ ( title ) => {
											const newObject = Object.assign(
												{},
												infoItem,
												{
													title: title,
												}
											);
											setAttributes( {
												info: [
													...info.filter(
														( item ) =>
															item.index !=
															infoItem.index
													),
													newObject,
												],
											} );
										} }
									/>
									<RichText
										tagName="div"
										className="info-item-description"
										placeholder="Enter description"
										value={ infoItem.description }

										onChange={ ( description ) => {
											const newObject = Object.assign(
												{},
												infoItem,
												{
													description: description,
												}
											);
											setAttributes( {
												info: [
													...info.filter(
														( item ) =>
															item.index !=
															infoItem.index
													),
													newObject,
												],
											} );
										} }
									/>
								</div>
							</div>
						</div>
					);
				} );
		};

		return (
			<div className={ className }>
				<div className="info-wrap">{ infoList( info ) }</div>
				<Button
					onClick={ ( title ) => {
						setAttributes( {
							info: [
								...info,
								{
									index: info.length,
									title: '',
									description: '',
								},
							],
						} );
					} }
				>
					Add Item
				</Button>
			</div>
		);
	},

	// save function
	save: ( props ) => {

		const info = props.attributes.info;
		const displayInfoList = ( value ) => {
			return value.map( ( infoItem ) => {
				return (
					<div className="info-item">
						<div className="info-item-wrapper">
							<div className="info-item-button"></div>
							<div className="info-item-number">
								{ infoItem.index < 10 ? '0' + infoItem.index : infoItem.index }
							</div>
							<div className="info-item-content">
								<RichText.Content
									tagName="div"
									className="info-item-title"
									value={ infoItem.title }
								/>
								<RichText.Content
									tagName="div"
									className="info-item-description_site"
									value={ infoItem.description }
								/>
							</div>
						</div>
					</div>
				);
			} );
		};

		return (
			<div className={ props.className }>
				<div className="info-wrap">{ displayInfoList( info ) }</div>
			</div>
		);
	},
} );
