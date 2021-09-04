import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary, backgroundColor, size, label, color,...props }) => {
	const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
	const styleOne = backgroundColor && color && { background: backgroundColor, color }
	const styleTwo = color && { color }
	const styleThree = backgroundColor && { background: backgroundColor }
	return (
		<button
			type="button"
			className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
			style={styleOne || styleTwo || styleThree }
			{...props}
		>
			{label}
		</button>
	);
};

Button.propTypes = {
	/**
	 * Is this the principal call to action on the page?
	 */
	primary: PropTypes.bool,
	/**
	 * What background color to use
	 */
	backgroundColor: PropTypes.string,
	/**
	 * How large should the button be?
	 */
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	/**
	 * Button contents
	 */
	label: PropTypes.string.isRequired,
	/**
	 * Optional click handler
	 */
	onClick: PropTypes.func,

	color: PropTypes.string,
};

Button.defaultProps = {
	backgroundColor: null,
	primary: false,
	size: 'medium',
	onClick: undefined,
};
