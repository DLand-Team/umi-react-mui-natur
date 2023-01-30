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

function OrderSummary() {
	return (
		<>
			<MDBox mb={2}>
				<MDTypography variant="h6" fontWeight="medium">
					Order Summary
				</MDTypography>
			</MDBox>
			<MDBox display="flex" justifyContent="space-between" mb={0.5}>
				<MDTypography variant="button" fontWeight="regular" color="text">
					Product Price:
				</MDTypography>
				<MDBox ml={1}>
					<MDTypography variant="body2" fontWeight="medium">
						$90
					</MDTypography>
				</MDBox>
			</MDBox>
			<MDBox display="flex" justifyContent="space-between" mb={0.5}>
				<MDTypography variant="button" fontWeight="regular" color="text">
					Delivery:
				</MDTypography>
				<MDBox ml={1}>
					<MDTypography variant="body2" fontWeight="medium">
						$14
					</MDTypography>
				</MDBox>
			</MDBox>
			<MDBox display="flex" justifyContent="space-between" mb={0.5}>
				<MDTypography variant="button" fontWeight="regular" color="text">
					Taxes:
				</MDTypography>
				<MDBox ml={1}>
					<MDTypography variant="body2" fontWeight="medium">
						$1.95
					</MDTypography>
				</MDBox>
			</MDBox>
			<MDBox display="flex" justifyContent="space-between" mt={3}>
				<MDTypography variant="body1" fontWeight="light" color="text">
					Total:
				</MDTypography>
				<MDBox ml={1}>
					<MDTypography variant="body1" fontWeight="medium">
						$1.95
					</MDTypography>
				</MDBox>
			</MDBox>
		</>
	);
}

export default OrderSummary;
