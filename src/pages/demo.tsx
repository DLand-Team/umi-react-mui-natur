import Button from '@/components/Button';
import { sleep } from '@/utils';
import { useInject } from '@/utils/hooks';
import { Box, TextField } from '@mui/material';

const DemoPage = () => {
	const [loading] = useInject('loading', {});
	const [demo] = useInject('demo', { state: [(s) => s.text.message] });
	const [message] = useInject('message', {});

	const showLoading = async () => {
		loading.actions.show();
		await sleep(3000);
		loading.actions.hide();
	};
	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		message.actions[type](demo.state.text.message);
	};

	return (
		<div>
			<TextField
				margin="normal"
				label="loading text"
				name="loading"
				value={loading.state.loadingText}
				onChange={(e) => {
					loading.actions.changeLoadingText(e.target.value);
				}}
			/>
			<br />
			<Button variant="contained" color="info" onClick={showLoading}>
				show loading
			</Button>
			<br />
			<TextField
				margin="normal"
				label="demo message text"
				name="demo message"
				value={demo.state.text.message}
				onChange={(e) => demo.actions.updateMessageText(e.target.value)}
			/>
			<TextField
				margin="normal"
				label="demo loading text"
				name="demo loading"
				value={demo.state.text.loading}
				onChange={(e) => demo.actions.updateLoadingText(e.target.value)}
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
			<Box mr={1} component="span">
				<Button variant="contained" color="warning" auth="aaa" onClick={showToast('warning')}>
					auth btn
				</Button>
			</Box>
		</div>
	);
};
export default DemoPage;
