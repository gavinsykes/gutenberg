/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import {
	AlignmentToolbar,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

const name = 'core/paragraph';

class ParagraphEdit extends Component {
	constructor( props ) {
		super( props );
		this.onReplace = this.onReplace.bind( this );
	}

	onReplace( blocks ) {
		const { attributes, onReplace } = this.props;
		onReplace(
			blocks.map( ( block, index ) =>
				index === 0 && block.name === name
					? {
							...block,
							attributes: {
								...attributes,
								...block.attributes,
							},
					  }
					: block
			)
		);
	}

	render() {
		const {
			attributes,
			setAttributes,
			mergeBlocks,
			onReplace,
			style,
		} = this.props;

		const { align, content, placeholder } = attributes;

		return (
			<View>
				<BlockControls>
					<AlignmentToolbar
						isCollapsed={ false }
						value={ align }
						onChange={ ( nextAlign ) => {
							setAttributes( { align: nextAlign } );
						} }
					/>
				</BlockControls>
				<RichText
					identifier="content"
					tagName="p"
					value={ content }
					deleteEnter={ true }
					style={ style }
					onChange={ ( nextContent ) => {
						setAttributes( {
							content: nextContent,
						} );
					} }
					onSplit={ ( value ) => {
						if ( ! value ) {
							return createBlock( name );
						}

						return createBlock( name, {
							...attributes,
							content: value,
						} );
					} }
					onMerge={ mergeBlocks }
					onReplace={ onReplace }
					onRemove={ onReplace ? () => onReplace( [] ) : undefined }
					placeholder={ placeholder || __( 'Start writing…' ) }
					textAlign={ align }
				/>
			</View>
		);
	}
}

export default ParagraphEdit;
