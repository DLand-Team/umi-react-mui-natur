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
import Card from '@mui/material/Card';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';

// Otis Admin PRO React example components
import DashboardLayout from '@/components/LayoutContainers/DashboardLayout';
import DashboardNavbar from '@/components/Navbars/DashboardNavbar';
import Footer from '@/components/Footer';
import DataTable from '@/components/Tables/DataTable';

// Data
import dataTableData from 'layouts/applications/data-tables/data/dataTableData';

function DataTables() {
	return (
		<DashboardLayout>
			<DashboardNavbar />
			<MDBox pt={6} pb={3}>
				<MDBox mb={3}>
					<Card>
						<MDBox p={3} lineHeight={1}>
							<MDTypography variant="h5" fontWeight="medium">
								Datatable Simple
							</MDTypography>
							<MDTypography variant="button" color="text">
								A lightweight, extendable, dependency-free javascript HTML table plugin.
							</MDTypography>
						</MDBox>
						<DataTable table={dataTableData} />
					</Card>
				</MDBox>
				<Card>
					<MDBox p={3} lineHeight={1}>
						<MDTypography variant="h5" fontWeight="medium">
							Datatable Search
						</MDTypography>
						<MDTypography variant="button" color="text">
							A lightweight, extendable, dependency-free javascript HTML table plugin.
						</MDTypography>
					</MDBox>
					<DataTable table={dataTableData} canSearch />
				</Card>
			</MDBox>
			<Footer />
		</DashboardLayout>
	);
}

export default DataTables;
