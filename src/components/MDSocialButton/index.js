/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Custom styles for MDSocialButton
import MDSocialButtonRoot from '@/components/MDSocialButton/MDSocialButtonRoot';

const MDSocialButton = forwardRef(({ color, size, iconOnly, circular, children, ...rest }, ref) => (
	<MDSocialButtonRoot
		{...rest}
		ref={ref}
		variant="contained"
		color="primary"
		size={size}
		ownerState={{ color, size, iconOnly, circular }}
	>
		{children}
	</MDSocialButtonRoot>
));

// Setting default values for the props of MDSocialButton
MDSocialButton.defaultProps = {
	size: 'medium',
	color: 'facebook',
	iconOnly: false,
	circular: false,
};

// Typechecking props for the MDSocialButton
MDSocialButton.propTypes = {
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	color: PropTypes.oneOf([
		'facebook',
		'twitter',
		'instagram',
		'linkedin',
		'pinterest',
		'youtube',
		'github',
		'vimeo',
		'slack',
		'dribbble',
		'reddit',
		'tumblr',
	]),
	iconOnly: PropTypes.bool,
	circular: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default MDSocialButton;
