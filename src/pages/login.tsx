import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { store, useNavigate } from 'umi';
import { Message } from '@/utils/message';
import { useHttp, useInject, useLocation } from '@/utils/hooks';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignInSide() {
	const navigator = useNavigate();

	const [user] = useInject('user');
	// const [dep, setDep] = useState([]);
	const { loading, run } = useHttp(user.actions.login, {
		manual: true,
		debounceTime: 1000,
	});
	// const loading = false;

	// useHttp(() => user.actions.login('xxxx', 'xxx'), {
	// 	debounceTime: 0,
	// 	// single: false,
	// 	deps: [dep],
	// });
	//
	// useEffect(() => {
	// 	setDep([]);
	// }, []);

	const location = useLocation<{ redirect?: string }>();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get('email') as string;
		if (!email) {
			Message.warning('Please Input Email!');
		}
		try {
			const res = await run(email, data.get('password') as string);
			console.log(res);
		} catch (e: any) {
			Message.error(e.message);
			return;
		}
		if (location.query.redirect) {
			navigator(location.query.redirect);
		} else {
			navigator('/');
		}
	};
	// React.useEffect(() => {
	// 	if (user.maps.isLogin) {
	// 		navigator('/')
	// 		return;
	// 	}
	// 	// 登陆页面重置store数据
	// 	store.globalResetStates();
	// }, [user.maps.isLogin, navigator]);

	return (
		<ThemeProvider theme={theme}>
			<Grid container component="main" sx={{ height: '100vh' }}>
				<CssBaseline />
				<Grid
					item
					xs={false}
					sm={4}
					md={7}
					sx={{
						backgroundImage: 'url(https://source.unsplash.com/random)',
						backgroundRepeat: 'no-repeat',
						backgroundColor: (t) =>
							t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				/>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign in
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<FormControlLabel
								control={<Checkbox value="remember" color="primary" />}
								label="Remember me"
							/>
							<LoadingButton
								type="submit"
								fullWidth
								loading={loading}
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</LoadingButton>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="#" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
							<Copyright sx={{ mt: 5 }} />
						</Box>
					</Box>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
