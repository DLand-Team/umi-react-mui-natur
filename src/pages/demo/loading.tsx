import { sleep } from "@/utils";
import { Box, Button, TextField } from "@mui/material"
import { useFlatInject } from "umi";



export const LoadingDemo = () => {
	const [loading] = useFlatInject('loading', {});

	const showLoading = async () => {
		loading.show();
		await sleep(3000);
		loading.hide();
	};
	return (
		<Box>
			<h1>Loading Demo</h1>
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
		</Box>
	)
}