import { sleep } from '@/utils';
import { Box, Button, TextField } from '@mui/material';
import { inject } from 'umi';

const injector = inject('loading', 'toast', 'demo');

const DemoPage = ({ loading, toast, demo }: typeof injector.type) => {
	const showLoading = async () => {
		loading.actions.show();
		await sleep(3000);
		loading.actions.hide();
	};
	const showToast = (type: 'error' | 'info' | 'success' | 'warning') => () => {
		toast.actions[type](demo.state.toastText);
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
				label="toast text"
				name="toast"
				value={demo.state.toastText}
				onChange={(e) => demo.actions.updateToastText(e.target.value)}
			/>
			<br />
			<Box mr={1} component='span'>
				<Button variant="contained" color="error" onClick={showToast('error')}>
					show error toast
				</Button>
			</Box>
			<Box mr={1} component='span'>
				<Button variant="contained" color="info" onClick={showToast('info')}>
					show info toast
				</Button>
			</Box>
			<Box mr={1} component='span'>
				<Button variant="contained" color="success" onClick={showToast('success')}>
					show success toast
				</Button>
			</Box>
			<Box mr={1} component='span'>
				<Button variant="contained" color="warning" onClick={showToast('warning')}>
					show warning toast
				</Button>
			</Box>
		</div>
	);
};
export default injector(DemoPage);
