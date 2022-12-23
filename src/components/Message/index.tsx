import { useInject } from '@/utils/hooks';
import type { SnackbarOrigin} from '@mui/material';
import { Snackbar, Box, Slide, Alert } from '@mui/material';


const mt50 = {
	marginTop: 50,
};
const alertStyle = {
	marginTop: 20,
};

const position: SnackbarOrigin = {
	vertical: 'top',
	horizontal: 'center',
};

function Toast() {
	const [message] = useInject('message')
	return (
		<Snackbar
			anchorOrigin={position}
			style={mt50}
			open={message.state.length !== 0}
		>
			<Box
				flexDirection='column'
			>
				{
					message.state.map(ti => (
						<Slide key={ti.id} direction="down" in={ti.show} mountOnEnter unmountOnExit>
							<Alert style={alertStyle} variant="filled" severity={ti.type}>{ti.text}</Alert>
						</Slide>
					))
				}
			</Box>
		</Snackbar>
	);
}

export default Toast;
