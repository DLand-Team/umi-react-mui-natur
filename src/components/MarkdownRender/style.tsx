import { css } from '@emotion/css';
import { Box, styled } from '@mui/material';

export const showLineNumberStyle = css`
	.hljs {
		padding-left: 0;
	}
`;

export const MarkdownRenderBox = styled(Box)`
	color: #2c3e50;

	h1 {
		margin-top: -3.5rem;
		margin-bottom: 1rem;
		padding-top: 4.6rem;
		font-size: 2.2rem;
		white-space: normal;
		word-wrap: break-word;
	}
	h2 {
		margin-top: -3.1rem;
		margin-bottom: 0;
		padding-top: 4.6rem;
		padding-bottom: 0.3rem;
		font-size: 1.65rem;
		border-bottom: 1px solid #eaecef;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: 600;
		line-height: 1.25;
	}
	h1:first-of-type + p {
		margin-top: 2rem;
	}
	hr {
		height: 1px;
		background: #eaecef;
		border: none;
	}
	p,
	li {
		color: #2c3e50;
		white-space: normal;
		word-wrap: break-word;
	}
	ol,
	p,
	ul,
	li {
		line-height: 1.7;
	}

	p,
	li {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}

	ol,
	ul {
		padding-left: 1.2em;
	}
	li {
		display: list-item;
		text-align: -webkit-match-parent;
	}
	a {
		color: #3eaf7c;
		font-weight: 500;
	}
	strong {
		font-weight: 600;
	}
	code {
		margin: 0;
		border-radius: 6px;
		font-size: 1rem;
	}
	pre {
		position: relative;
		border-radius: 6px;
	}
	.hljs-ln {
		border-collapse: collapse;
		td {
			padding: 0;
		}
	}

	.hljs-ln-n:before {
		content: attr(data-line-number);
	}

	/* for block of numbers */
	.hljs-ln-numbers {
		position: absolute;
		padding-right: 5px !important;
		padding-right: top;
		color: #858585;
		text-align: center;
		vertical-align: top;
		background-color: inherit;
		border-right: 1px solid rgba(0, 0, 0, 0.66);
		user-select: none;
		& > div {
			width: 50px;
		}

		/* your custom style here */
	}
	.hljs {
		table,
		tbody,
		.hljs-ln {
			background-color: inherit;
			tr {
				// position: relative;
				background-color: inherit;
			}
		}
	}
	/* for block of code */
	.hljs-ln-code {
		padding-left: 65px !important;
	}
`;
