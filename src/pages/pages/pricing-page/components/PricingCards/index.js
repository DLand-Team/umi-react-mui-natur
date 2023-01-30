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

// @mui material components
import Grid from '@mui/material/Grid';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Otis Admin PRO React example components
import DefaultPricingCard from '@/components/Cards/PricingCards/DefaultPricingCard';

// Otis Admin PRO React context
import { useMaterialUIController } from '@/utils/hooks';

function PricingCards({ prices }) {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;
	const [starter, premium, enterprise] = prices;
	return (
		<MDBox position="relative" zIndex={10} mt={8} px={{ xs: 1, sm: 0 }}>
			<Grid container spacing={3} justifyContent="center">
				<Grid item xs={12} lg={4}>
					<DefaultPricingCard
						color={darkMode ? 'dark' : 'white'}
						badge={{ color: darkMode ? 'warning' : 'light', label: 'starter' }}
						price={{ currency: '$', value: starter, type: 'mo' }}
						specifications={[
							{ label: '2 team members', includes: true },
							{ label: '20GB Cloud storage', includes: true },
							{ label: 'Integration help', includes: false },
							{ label: 'Sketch Files', includes: false },
							{ label: 'API Access', includes: false },
							{ label: 'Complete documentation', includes: false },
						]}
						action={{
							type: 'internal',
							route: '/',
							color: darkMode ? 'warning' : 'dark',
							label: 'join',
						}}
						shadow={darkMode}
					/>
				</Grid>
				<Grid item xs={12} lg={4}>
					<DefaultPricingCard
						color="dark"
						badge={{ color: 'info', label: 'premium' }}
						price={{ currency: '$', value: premium, type: 'mo' }}
						specifications={[
							{ label: '10 team members', includes: true },
							{ label: '40GB Cloud storage', includes: true },
							{ label: 'Integration help', includes: true },
							{ label: 'Sketch Files', includes: true },
							{ label: 'API Access', includes: false },
							{ label: 'Complete documentation', includes: false },
						]}
						action={{
							type: 'internal',
							route: '/',
							color: 'info',
							label: 'try premium',
						}}
					/>
				</Grid>
				<Grid item xs={12} lg={4}>
					<DefaultPricingCard
						color={darkMode ? 'dark' : 'white'}
						badge={{ color: darkMode ? 'warning' : 'light', label: 'enterprise' }}
						price={{ currency: '$', value: enterprise, type: 'mo' }}
						specifications={[
							{ label: 'Unlimited team members', includes: true },
							{ label: '100GB Cloud storage', includes: true },
							{ label: 'Integration help', includes: true },
							{ label: 'Sketch Files', includes: true },
							{ label: 'API Access', includes: true },
							{ label: 'Complete documentation', includes: true },
						]}
						action={{
							type: 'internal',
							route: '/',
							color: darkMode ? 'warning' : 'dark',
							label: 'join',
						}}
						shadow={darkMode}
					/>
				</Grid>
			</Grid>
		</MDBox>
	);
}

// Typechecking props for the PricingCards
PricingCards.propTypes = {
	prices: PropTypes.instanceOf(Array).isRequired,
};

export default PricingCards;
