import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, isSendButton, ...otherProps }) => (
	<button className={`${isGoogleSignIn ? 'google-sign-in' : ''} ${isSendButton ? 'sendButton' : ''} custom-button`} {...otherProps}>
		{children}
	</button>
);

export default CustomButton;
