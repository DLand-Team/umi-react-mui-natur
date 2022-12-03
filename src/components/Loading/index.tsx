import { Dialog, Zoom, Box, CircularProgress } from '@mui/material';
import { inject } from 'umi';

import styles from './style.scss';

const paperProps = {
	elevation: 10,
};

const injector = inject(['loading', {
	state: ['loadingText'],
	maps: ['showLoading']
}]);


const Loading = ({loading}: typeof injector.type) => (
	<Dialog
		open={loading.maps.showLoading}
		classes={styles}
		PaperProps={paperProps}
		TransitionComponent={Zoom}
	>
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width={130}
			height={130}
			borderRadius={5}
			bgcolor='rgba(0,0,0,0.5)'
		>
			<CircularProgress thickness={3} size={50} />
			<Box
				fontSize={16}
				mt={2}
				color='primary.contrastText'
			>
				{loading.state.loadingText}
			</Box>
		</Box>
	</Dialog>
);
export default injector(Loading);
