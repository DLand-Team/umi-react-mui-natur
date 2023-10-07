import type { TooltipProps } from '@mui/material';
import { styled, Tooltip, tooltipClasses } from '@mui/material';

export const TextLimitShowerTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltipPlacementTop}`]: {
		marginBottom: '4px !important',
		marginTop: '4px !important',
	},
}));

export const TooltipText = styled('div')`
	max-width: 500px;
	max-height: 300px;
	word-wrap: break-word;
	word-break: break-word;
	white-space: break-spaces;
	height: 100%;
	overflow-y: auto;
`;

export const TextLimitShowerText = styled('div')`
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const InvisibleText = styled('div')`
	position: absolute;
	top: 0;
	visibility: hidden;
	height: 100%;
	word-break: keep-all;
	white-space: nowrap;
`;
