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

import { useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDButton from '@/components/MDButton';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import DataTable from '@/components/Tables/DataTable';

// Data
import dataTableData from 'layouts/ecommerce/orders/order-list/data/dataTableData';

function OrderList() {
	const [menu, setMenu] = useState(null);

	const openMenu = (event) => setMenu(event.currentTarget);
	const closeMenu = () => setMenu(null);

	const renderMenu = (
		<Menu
			anchorEl={menu}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
			transformOrigin={{ vertical: 'top', horizontal: 'left' }}
			open={Boolean(menu)}
			onClose={closeMenu}
			keepMounted
		>
			<MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
			<MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
			<MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
			<Divider sx={{ margin: '0.5rem 0' }} />
			<MenuItem onClick={closeMenu}>
				<MDTypography variant="button" color="error" fontWeight="regular">
					Remove Filter
				</MDTypography>
			</MenuItem>
		</Menu>
	);

	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox my={3}>
				<MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
					<MDButton variant="gradient" color="info">
						new order
					</MDButton>
					<MDBox display="flex">
						<MDButton variant={menu ? 'contained' : 'outlined'} color="dark" onClick={openMenu}>
							filters&nbsp;
							<Icon>keyboard_arrow_down</Icon>
						</MDButton>
						{renderMenu}
						<MDBox ml={1}>
							<MDButton variant="outlined" color="dark">
								<Icon>description</Icon>
								&nbsp;export csv
							</MDButton>
						</MDBox>
					</MDBox>
				</MDBox>
				<Card>
					<DataTable table={dataTableData} entriesPerPage={false} canSearch />
				</Card>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default OrderList;
