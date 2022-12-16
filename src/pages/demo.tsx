import Button from '@/components/Button';
import { sleep } from '@/utils';
import { useNatur } from '@/utils/hooks';
import { Box, TextField } from '@mui/material';
import { inject } from 'umi';

const injector = inject('loading', 'demo');

const DemoPage = ({ loading, demo }: typeof injector.type) => {
	const showLoading = async () => {
		loading.actions.show();
		await sleep(3000);
		loading.actions.hide();
	};
	const message = useNatur('message');
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
				onChange={(e) => loading.actions.changeLoadingText(e.target.value)}
			/>
			<br />
			<Button variant="contained" color="info" onClick={showLoading}>
				show loading
			</Button>
			<br />
			<TextField
				margin="normal"
				label="message text"
				name="message"
				value={demo.state.text.message}
				onChange={(e) => demo.actions.updateToastText(e.target.value)}
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
				<Button variant="contained" color="warning" auth='aaa' onClick={showToast('warning')}>
					auth btn
				</Button>
			</Box>
		</div>
	);
};
export default injector(DemoPage);
