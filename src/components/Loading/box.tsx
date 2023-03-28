import { ReactComponent as LoadingSvg } from '@/assets/svg/loading.svg';
import type { BoxProps} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Box, Fade, keyframes, styled } from '@mui/material';

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

export interface LoadingBoxProps extends BoxProps {
	children: React.ReactNode;
	loading?: boolean;
	size?: number;
	loadingZIndex?: number;
}

export function LoadingBox({
	children,
	loading = false,
	size = 50,
	loadingZIndex = 1,
	...props
}: LoadingBoxProps) {
	const loadingUI = (
		<Fade in={loading}>
			<SpiningLoadingBox zIndex={loadingZIndex}>
				<CircularProgress thickness={3} size={size} />
				{/* <SpiningLoadingSvg style={{ width: size, height: size }} /> */}
			</SpiningLoadingBox>
		</Fade>
	);
	return (
		<Box position="relative" {...props}>
			{loadingUI}
			{children}
		</Box>
	);
}

export function LoadingOverlay() {
	return (
		<LoadingBox loading width={'100%'} height="100%">
			{null}
		</LoadingBox>
	);
}
