import { Button, Box, TextField } from '@mui/material';
import { useFlatInject } from 'umi';


export const MessageDemo = () => {
	const [demo] = useFlatInject('demo', { state: [(s) => s.text.message] });
	const [message] = useFlatInject('message', {});

	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		message[type](demo.text.message);
	};
	return (
		<Box>
			<h1>Message Demo</h1>
			<TextField margin="normal" label="demo message text" name="demo message" value={demo.text.message} onChange={(e) => demo.updateMessageText(e.target.value)} />
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