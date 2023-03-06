import { ReactComponent as LoadingSvg} from '@/assets/svg/loading.svg';
import { Box, styled, keyframes } from '@mui/material';


const rotate = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;

export const SpiningLoadingSvg = styled(LoadingSvg)`
	animation: ${rotate} 2s linear infinite;
`;

const SpiningLoadingBox = styled(Box)`
	background-color: rgba(255,255,255,0.9);
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
`

export interface LoadingBoxProps {
	children: React.ReactNode;
	loading?: boolean;
	size?: number;
}
export function LoadingBox({ children, loading = false, size = 50 }: LoadingBoxProps) {
	const loadingUI = loading ? (
		<SpiningLoadingBox>
			<SpiningLoadingSvg style={{width: size, height: size}}  />
		</SpiningLoadingBox>
	) : null;
	return (
		<Box position="relative">
			{loadingUI}
			{children}
		</Box>
	);
}
