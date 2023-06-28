import CloseIcon from '@mui/icons-material/Close';
import type { SlideProps } from '@mui/material';
import { Alert, Box, IconButton, Slide, Snackbar } from '@mui/material';
import { useEffect, useRef } from 'react';
import { useFlatInject } from 'umi';
import { useImmer } from 'use-immer';

function TransitionUp(props: SlideProps) {
	return <Slide {...props} direction="up" mountOnEnter unmountOnExit />;
}

function TransitionDown(props: SlideProps) {
	return <Slide {...props} direction="down" mountOnEnter unmountOnExit />;
}

function Message() {
	const [{ messageList, remove, hide, messagePosition }] = useFlatInject('message');

	const refList = useRef<
		{
			elem: HTMLDivElement;
			id: string;
			index: number;
			position: 'top' | 'bottom';
		}[]
	>([]);

	const [offsetState, setOffsetState] = useImmer<Record<string, number>>({});

	useEffect(() => {
		const newOffsetState: Record<string, number> = {};

		const finalEleList = refList.current
			.slice()
			.filter((i) => {
				if (!i.elem) {
					return false;
				}
				const targetMsg = messageList.find((i1) => i1.id === i.id);
				if (!targetMsg) {
					return false;
				}
				if (!targetMsg.show) {
					return false;
				}
				return true;
			})
			.sort((a, b) => a.index - b.index);

		refList.current = finalEleList;
		finalEleList
			.filter((i) => i.position === 'top')
			.reduce((offsetHeight, i) => {
				newOffsetState[i.id] = offsetHeight;
				const rect = i.elem?.getBoundingClientRect?.();
				const bottom = rect?.bottom;
				if (bottom) {
					return rect.height + offsetHeight + 20;
				}
				return offsetHeight;
			}, 0);
		finalEleList
			.filter((i) => i.position === 'bottom')
			.reduce((offsetHeight, i) => {
				newOffsetState[i.id] = offsetHeight;
				const rect = i.elem?.getBoundingClientRect?.();
				const bottom = rect?.bottom;
				if (bottom) {
					return rect.height + offsetHeight + 20;
				}
				return offsetHeight;
			}, 0);
		setOffsetState(newOffsetState);
	}, [messageList, messagePosition.vertical, setOffsetState]);

	function calcOffsetStyle(id: string) {
		if (messagePosition.vertical === 'top') {
			return {
				marginTop: `${offsetState[id]}px` || 0,
				transition: 'margin 0.3s',
			};
		}
		return {
			marginBottom: `${offsetState[id]}px` || 0,
			// transform: `translateY(-${offsetState[id] || 0}px)`,
			transition: 'margin 0.3s',
		};
	}

	return messageList.map((i, idx) =>
		i.type !== 'dark' ? (
			<Snackbar
				ref={(node: HTMLDivElement) => {
					if (!refList.current.find((i1) => i1.id === i.id)) {
						refList.current.push({
							elem: node,
							id: i.id,
							index: idx,
							position: i.position.vertical,
						});
					}
				}}
				sx={calcOffsetStyle(i.id)}
				TransitionComponent={i.position.vertical === 'top' ? TransitionDown : TransitionUp}
				key={i.id}
				anchorOrigin={i.position}
				TransitionProps={{
					onExited: () => remove(i.id),
				}}
				onClose={(_, reason) => {
					if (reason === 'clickaway') {
						return;
					}
					hide(i.id);
				}}
				autoHideDuration={i.duration === -1 ? undefined : i.duration}
				open={i.show}
			>
				<Alert severity={i.type} onClose={i.duration === -1 ? () => hide(i.id) : undefined}>
					{i.text}
				</Alert>
			</Snackbar>
		) : (
			<Snackbar
				ref={(node: HTMLDivElement) => {
					if (!refList.current.find((i1) => i1.id === i.id)) {
						refList.current.push({
							elem: node,
							id: i.id,
							index: idx,
							position: i.position.vertical,
						});
					}
				}}
				sx={calcOffsetStyle(i.id)}
				TransitionComponent={i.position.vertical === 'top' ? TransitionDown : TransitionUp}
				key={i.id}
				TransitionProps={{
					onExited: () => remove(i.id),
				}}
				onClose={(_, reason) => {
					if (reason === 'clickaway') {
						return;
					}
					hide(i.id);
				}}
				action={
					i.duration === -1 ? (
						<Box component={IconButton} onClick={() => hide(i.id)}>
							<CloseIcon sx={{ width: 14, height: 14 }} />
						</Box>
					) : undefined
				}
				autoHideDuration={i.duration === -1 ? undefined : i.duration}
				anchorOrigin={i.position}
				open={i.show}
				message={i.text}
			/>
		),
	);
}

export default Message;
