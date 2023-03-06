import Button from '@/components/Button';
import { sleep } from '@/utils';
import { Box, TextField } from '@mui/material';
import { useFlatInject } from 'umi';

const DemoPage = () => {
	const [loading] = useFlatInject('loading', {});
	const [demo] = useFlatInject('demo', { state: [(s) => s.text.message] });
	const [message] = useFlatInject('message', {});

	const showLoading = async () => {
		loading.show();
		await sleep(3000);
		loading.hide();
	};
	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		message[type](demo.text.message);
	};

	return (
		<div>
			<TextField
				margin="normal"
				label="loading text"
				name="loading"
				value={loading.loadingText}
				onChange={(e) => {
					loading.changeLoadingText(e.target.value);
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
				value={demo.text.message}
				onChange={(e) => demo.updateMessageText(e.target.value)}
			/>
			<TextField
				margin="normal"
				label="demo loading text"
				name="demo loading"
				value={demo.text.loading}
				onChange={(e) => demo.updateLoadingText(e.target.value)}
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
