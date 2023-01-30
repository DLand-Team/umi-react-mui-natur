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

import { forwardRef, createContext, useContext, useMemo } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Custom styles for MDPagination
import MDPaginationItemRoot from '@/components/MDPagination/MDPaginationItemRoot';

// The Pagination main context
const Context = createContext();

const MDPagination = forwardRef(
	({ item, variant, color, size, active, children, ...rest }, ref) => {
		const context = item ? useContext(Context) : null;
		const paginationSize = context ? context.size : null;

		const contextValue = useMemo(() => ({ variant, color, size }), []);

		return (
			<Context.Provider value={contextValue}>
				{item ? (
					<MDPaginationItemRoot
						{...rest}
						ref={ref}
						variant={active ? context.variant : 'outlined'}
						color={active ? context.color : 'secondary'}
						iconOnly
						circular
						ownerState={{ variant, active, paginationSize }}
					>
						{children}
					</MDPaginationItemRoot>
				) : (
					<MDBox
						display="flex"
						justifyContent="flex-end"
						alignItems="center"
						sx={{ listStyle: 'none' }}
					>
						{children}
					</MDBox>
				)}
			</Context.Provider>
		);
	},
);

// Setting default values for the props of MDPagination
MDPagination.defaultProps = {
	item: false,
	variant: 'gradient',
	color: 'info',
	size: 'medium',
	active: false,
};

// Typechecking props for the MDPagination
MDPagination.propTypes = {
	item: PropTypes.bool,
	variant: PropTypes.oneOf(['gradient', 'contained']),
	color: PropTypes.oneOf([
		'white',
		'primary',
		'secondary',
		'info',
		'success',
		'warning',
		'error',
		'light',
		'dark',
	]),
	size: PropTypes.oneOf(['small', 'medium', 'large']),
	active: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default MDPagination;
