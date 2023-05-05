import { ReactComponent as LoadingSvg } from '@/assets/svg/loading.svg';
import type { BoxProps, Theme } from '@mui/material';
import { Box, CircularProgress, Fade, keyframes, styled } from '@mui/material';
import type { BoxTypeMap } from '@mui/system';
import type { OverridableComponent } from '@mui/types';
import { forwardRef, useState } from 'react';

const rotate = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;

export const SpiningLoadingSvg = styled(LoadingSvg)`
	animation: ${rotate} 2s linear infinite;
`;

const SpiningLoadingBox = styled(Box)`
	background-color: rgba(255, 255, 255, 0.9);
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export interface LoadingBoxBaseProps {
	children: React.ReactNode;
	loading?: boolean;
	size?: number;
	loadingZIndex?: number;
}

export interface LoadingBoxProps extends Omit<BoxProps, 'children'>, LoadingBoxBaseProps {}

export const LoadingBox = forwardRef<HTMLDivElement, LoadingBoxProps>(
	({ children, loading = false, size = 50, loadingZIndex = 1, ...props }: LoadingBoxProps, ref) => {
		const [fadeEnd, setFadeEnd] = useState(false);

		const loadingUI = (
			<Fade in={loading} onExited={() => setFadeEnd(true)}>
				<SpiningLoadingBox zIndex={loadingZIndex}>
					<CircularProgress thickness={3} size={size} />
					{/* <SpiningLoadingSvg style={{ width: size, height: size }} /> */}
				</SpiningLoadingBox>
			</Fade>
		);
		return (
			<Box position="relative" ref={ref} {...props}>
				{fadeEnd && !loading ? null : loadingUI}
				{children}
			</Box>
		);
	},
) as OverridableComponent<BoxTypeMap<LoadingBoxBaseProps, 'div', Theme>>;

export function LoadingOverlay() {
	return (
		<LoadingBox loading width={'100%'} height="100%">
			{null}
		</LoadingBox>
	);
}
