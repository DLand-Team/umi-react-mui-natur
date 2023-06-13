import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import type { ReactNode } from 'react';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { defaultTheme } from '@/plugins/mui';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';
import ErrorIcon from '@mui/icons-material/Error';

import styles from './style.module.scss';
import { sleep } from '@/utils';

export interface ConfirmDialogProps {
	title?: ReactNode;
	icon?: ReactNode;
	content?: ReactNode;
	cancelText?: string;
	confirmText?: string;
}

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction="down" ref={ref} {...props} />;
});

function MyDialog({
	title,
	icon,
	content,
	cancelText,
	confirmText,
	cancel,
	confirm,
}: ConfirmDialogProps & Record<'cancel' | 'confirm', () => any>) {
	const [open, setOpen] = useState(true);
	const [isConfirm, setIsConfirm] = useState(false);
	const localCancel = useCallback(async () => {
		setOpen(false);
		setIsConfirm(false);
	}, []);

	const localConfirm = useCallback(async () => {
		setOpen(false);
		setIsConfirm(true);
	}, []);

	return (
		<Dialog
			open={open}
			onClose={localCancel}
			classes={styles}
			TransitionComponent={Transition}
			TransitionProps={useMemo(
				() => ({
					onExited: async () => {
						await sleep();
						if (isConfirm) {
							confirm();
						} else {
							cancel();
						}
					},
				}),
				[cancel, confirm, isConfirm],
			)}
			keepMounted
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{ display: 'flex', alignItems: 'center' }}>
				{ icon || <ErrorIcon color={'warning'} sx={{ mr: 1 }} />}
				{title}
			</DialogTitle>
			<DialogContent>
				{/*<DialogContentText id="alert-dialog-description">{content}</DialogContentText>*/}
				{content}
			</DialogContent>
			<DialogActions sx={{ padding: 2 }}>
				<Button variant={'contained'} onClick={localConfirm}>
					{confirmText}
				</Button>
				<Button variant={'outlined'} onClick={localCancel}>
					{cancelText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export function ConfirmDialog({
	title,
	content,
	cancelText = 'Cancel',
	confirmText = 'Confirm',
}: ConfirmDialogProps) {
	return new Promise<boolean>((resolve, reject) => {
		const ele = document.createElement('div');
		document.body.appendChild(ele);
		const root = ReactDOM.createRoot(ele);

		const cancel = () => {
			root.unmount();
			document.body.removeChild(ele);
			reject(false);
		};
		const confirm = () => {
			root.unmount();
			document.body.removeChild(ele);
			resolve(true);
		};
		root.render(
			<ThemeProvider theme={defaultTheme}>
				<CssBaseline />
				<MyDialog
					confirm={confirm}
					confirmText={confirmText}
					title={title}
					content={content}
					cancelText={cancelText}
					cancel={cancel}
				/>
			</ThemeProvider>,
		);
	});
}
