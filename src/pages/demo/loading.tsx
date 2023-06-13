import { LoadingBox } from '@/components/Loading/box';
import { sleep } from '@/utils';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { useFlatInject } from 'umi';

export const LoadingDemo = () => {
	const [loading] = useFlatInject('loading');
	const [loading2, setLoading2] = useState(false);

	const showLoading = async () => {
		loading.show();
		await sleep(3000);
		loading.hide();
	};
	return (
		<Box>
			<h1>Loading Demo</h1>
			<Box display={'flex'}>
				<Box>
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
						show global loading
					</Button>
				</Box>
				<LoadingBox
					bgcolor={'lightblue'}
					display={'flex'}
					alignItems={'center'}
					justifyContent={'center'}
					width={200}
					height={200}
					ml={50}
					loading={loading2}
				>
					<Button
						onClick={async () => {
							setLoading2(true);
							await sleep(2000);
							setLoading2(false);
						}}
					>
						show loading box
					</Button>
				</LoadingBox>
			</Box>
		</Box>
	);
};
