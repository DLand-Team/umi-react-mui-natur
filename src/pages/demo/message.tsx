import type { SnackbarOrigin } from '@mui/material';
import { Box, Button, TextField } from '@mui/material';
import { useFlatInject } from 'umi';

const positionList: SnackbarOrigin[] = [
	{
		vertical: 'top',
		horizontal: 'left',
	},
	{
		vertical: 'top',
		horizontal: 'center',
	},
	{
		vertical: 'top',
		horizontal: 'right',
	},
	{
		vertical: 'bottom',
		horizontal: 'left',
	},
	{
		vertical: 'bottom',
		horizontal: 'center',
	},
	{
		vertical: 'bottom',
		horizontal: 'right',
	},
];

function genRandomPosition() {
	const index = Math.floor(Math.random() * 6);
	return positionList[index];
}

export const MessageDemo = () => {
	const [demo] = useFlatInject('demo', { state: [(s) => s.text.message] });
	const [message] = useFlatInject('message', {});

	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		message[type](demo.text.message, 3000, genRandomPosition());
	};
	return (
		<Box>
			<h1>Message Demo</h1>
			<TextField
				margin="normal"
				label="demo message text"
				name="demo message"
				value={demo.text.message}
				onChange={(e) => demo.updateMessageText(e.target.value)}
			/>
			<br />
			<Box mr={1} component="span">
				<Button variant="contained" color="error" onClick={showToast('error')}>
					show error message
				</Button>
			</Box>
			<Box mr={1} component="span">
				<Button variant="contained" color="info" onClick={showToast('info')}>
					show info message
				</Button>
			</Box>
			<Box mr={1} component="span">
				<Button variant="contained" color="success" onClick={showToast('success')}>
					show success message
				</Button>
			</Box>
			<Box mr={1} component="span">
				<Button variant="contained" color="warning" onClick={showToast('warning')}>
					show warning message
				</Button>
			</Box>
		</Box>
	);
};
