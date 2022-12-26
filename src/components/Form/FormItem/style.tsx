import { Box, styled } from "@mui/system";




export const FormItemBox = styled(Box)`
	margin-right: ${({theme}) => theme.spacing(1)};
	margin-bottom: ${({theme}) => theme.spacing(1)};
	.label-box {
		flex: none;
		font-weight: bold;
		word-wrap: break-word;
		white-space: pre-wrap;
		word-break: break-all;
		vertical-align: top;
		margin-right: ${({theme}) => theme.spacing(1)};
		margin-top: ${({theme}) => theme.spacing(1)};
	}
`;

