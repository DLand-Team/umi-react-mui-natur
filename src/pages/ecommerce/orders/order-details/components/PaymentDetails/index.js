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

// @mui material components
import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

// Otis Admin PRO React base styles
import borders from '@/assets/theme/base/borders';

// Images
import masterCardLogo from '@/assets/images/logos/mastercard.png';

function PaymentDetails() {
	const { borderWidth, borderColor } = borders;

	return (
		<>
			<MDTypography variant="h6" fontWeight="medium">
				Payment details
			</MDTypography>
			<MDBox
				border={`${borderWidth[1]} solid ${borderColor}`}
				borderRadius="lg"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				p={3}
				mt={2}
			>
				<MDBox component="img" src={masterCardLogo} alt="master card" width="10%" mr={2} />
				<MDTypography variant="h6" fontWeight="medium">
					****&nbsp;&nbsp;****&nbsp;&nbsp;****&nbsp;&nbsp;7852
				</MDTypography>
				<MDBox ml="auto" lineHeight={0}>
					<Tooltip title="We do not store card details" placement="bottom">
						<MDButton variant="outlined" color="secondary" size="small" iconOnly circular>
							<Icon sx={{ cursor: 'pointer' }}>priority_high</Icon>
						</MDButton>
					</Tooltip>
				</MDBox>
			</MDBox>
		</>
	);
}

export default PaymentDetails;
