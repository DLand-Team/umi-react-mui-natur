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

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

function TableCell({ width, align, padding, noBorder, children }) {
	return (
		<MDBox
			component="th"
			width={width}
			pt={padding[0]}
			pr={padding[1]}
			pb={padding[2]}
			pl={padding[3]}
			textAlign={align}
			sx={{
				border: ({ borders: { borderWidth }, palette: { light } }) =>
					noBorder ? 0 : `${borderWidth[1]} solid ${light.main}`,
			}}
		>
			<MDTypography component="div" variant="body2" color="text">
				{children}
			</MDTypography>
		</MDBox>
	);
}

// Setting default values for the props of TableCell
TableCell.defaultProps = {
	width: 'auto',
	align: 'left',
	padding: [],
	noBorder: false,
};

// Typechecking props for TableCell
TableCell.propTypes = {
	width: PropTypes.string,
	children: PropTypes.node.isRequired,
	align: PropTypes.string,
	padding: PropTypes.instanceOf(Array),
	noBorder: PropTypes.bool,
};

export default TableCell;
