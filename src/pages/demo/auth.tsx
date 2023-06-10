import { Box } from "@mui/material"

import AuthButton from '@/components/Button';
import { useFlatInject } from "umi";


export const AuthDemo = () => {
	
	const [{hasAuth}] = useFlatInject('user');

	return (
		<Box>
			<h1>Auth demo</h1>

			<p>Auth config is authList state in user store</p>
			<AuthButton auth="aaa" variant="contained">aaa button</AuthButton>
			<AuthButton auth="b">b button</AuthButton>

			{ hasAuth('aaa') && <div>has auth aaa</div> }
			{ hasAuth('b') && <div>has auth b</div> }
		</Box>
	)
}