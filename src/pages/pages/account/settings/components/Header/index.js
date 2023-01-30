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
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';
import MDTypography from '@/components/MDTypography';
import MDAvatar from '@/components/MDAvatar';

// Images
import burceMars from '@/assets/images/bruce-mars.jpg';

function Header() {
	const [visible, setVisible] = useState(true);

	const handleSetVisible = () => setVisible(!visible);

	return (
		<Card id="profile">
			<MDBox p={2}>
				<Grid container spacing={3} alignItems="center">
					<Grid item>
						<MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
					</Grid>
					<Grid item>
						<MDBox height="100%" mt={0.5} lineHeight={1}>
							<MDTypography variant="h5" fontWeight="medium">
								Alex Thompson
							</MDTypography>
							<MDTypography variant="button" color="text" fontWeight="medium">
								CEO / Co-Founder
							</MDTypography>
						</MDBox>
					</Grid>
					<Grid item xs={12} md={6} lg={3} sx={{ ml: 'auto' }}>
						<MDBox
							display="flex"
							justifyContent={{ md: 'flex-end' }}
							alignItems="center"
							lineHeight={1}
						>
							<MDTypography variant="caption" fontWeight="regular">
								Switch to {visible ? 'invisible' : 'visible'}
							</MDTypography>
							<MDBox ml={1}>
								<Switch checked={visible} onChange={handleSetVisible} />
							</MDBox>
						</MDBox>
					</Grid>
				</Grid>
			</MDBox>
		</Card>
	);
}

export default Header;
