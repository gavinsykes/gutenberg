/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { ExternalLink, Button } from '@wordpress/components';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';

function LinkViewerUrl( { url, urlLabel, className } ) {
	const linkClassName = classnames(
		className,
		'block-editor-url-popover__link-viewer-url'
	);

	if ( ! url ) {
		return <span className={ linkClassName }></span>;
	}

	return (
		<ExternalLink className={ linkClassName } href={ url }>
			{ urlLabel || filterURLForDisplay( safeDecodeURI( url ) ) }
		</ExternalLink>
	);
}

export default function LinkViewer( {
	className,
	linkClassName,
	onEditLinkClick,
	url,
	urlLabel,
	iconButton = true,
	...props
} ) {
	return (
		<div
			className={ classnames(
				'block-editor-url-popover__link-viewer',
				className
			) }
			{ ...props }
		>
			<LinkViewerUrl
				url={ url }
				urlLabel={ urlLabel }
				className={ linkClassName }
			/>
			{ onEditLinkClick && (
				<Button
					icon={ iconButton ? 'edit' : false }
					isSecondary={ iconButton ? false : true }
					onClick={ onEditLinkClick }
					className="block-editor-link-control__search-item-action block-editor-link-control__search-item-action--edit"
				>
					{ iconButton ? '' : __( 'Edit' ) }
				</Button>
			) }
		</div>
	);
}
