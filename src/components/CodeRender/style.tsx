import { styled } from '@mui/material';

export const CodeStyle = styled('code')``;


export const Pre = styled('pre')`
	table, tbody, tr, td {
		background-color: inherit;
	}
	.hljs-ln {
		border-collapse: collapse;
	}

	.hljs-ln td {
		
	}
	.hljs-ln-n:before {
		content: attr(data-line-number);
		color: rgb(101, 103, 108);
	}
	.hljs-ln-numbers {
		position: sticky;
		left: 0;
		box-sizing: border-box;
	}
	.hljs-ln-n {
		padding:0 10px 0 20px;
		border-right: 1px solid rgb(16, 17, 19);
	}
	.hljs-ln-code {
		padding-left: 10px;
	}
	code {
		margin: 0;
		border-radius: 6px;
	}
	position: relative;
	border-radius: 6px;
	margin: 0;
	height: auto;
`;
