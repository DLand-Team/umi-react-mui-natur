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

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React context
import { useMaterialUIController } from '@/utils/hooks';

function BillingInformation() {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;

	return (
		<>
			<MDTypography variant="h6" fontWeight="medium">
				Billing Information
			</MDTypography>
			<MDBox
				component="li"
				display="flex"
				justifyContent="space-between"
				alignItems="flex-start"
				bgColor={darkMode ? 'transparent' : 'grey-100'}
				borderRadius="lg"
				p={3}
				mt={2}
			>
				<MDBox width="100%" display="flex" flexDirection="column" lineHeight={1}>
					<MDBox mb={2}>
						<MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
							Oliver Liam
						</MDTypography>
					</MDBox>
					<MDBox mb={1} lineHeight={0}>
						<MDTypography variant="caption" fontWeight="regular" color="text">
							Company Name:&nbsp;&nbsp;&nbsp;
							<MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
								Viking Burrito
							</MDTypography>
						</MDTypography>
					</MDBox>
					<MDBox mb={1} lineHeight={0}>
						<MDTypography variant="caption" fontWeight="regular" color="text">
							Email Address:&nbsp;&nbsp;&nbsp;
							<MDTypography variant="caption" fontWeight="medium">
								oliver@burrito.com
							</MDTypography>
						</MDTypography>
					</MDBox>
					<MDTypography variant="caption" fontWeight="regular" color="text">
						VAT Number:&nbsp;&nbsp;&nbsp;
						<MDTypography variant="caption" fontWeight="medium">
							FRB1235476
						</MDTypography>
					</MDTypography>
				</MDBox>
			</MDBox>
		</>
	);
}

export default BillingInformation;
