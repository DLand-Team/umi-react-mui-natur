import { Box, styled } from '@mui/material';

export const FormItemBox = styled(Box)`
	margin-right: ${({ theme }) => theme.spacing(1)};
	margin-bottom: ${({ theme }) => theme.spacing(1)};
	.label-box {
		flex: none;
		margin-top: ${({ theme }) => theme.spacing(0.5)};
		margin-right: ${({ theme }) => theme.spacing(1)};
		font-weight: bold;
		white-space: pre-wrap;
		vertical-align: top;
		word-wrap: break-word;
		word-break: break-all;
	}
`;
