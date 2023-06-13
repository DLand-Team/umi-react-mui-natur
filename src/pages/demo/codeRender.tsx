import CodeRender from '@/components/CodeRender';
import { Box } from '@mui/material';

const jsonCode = JSON.stringify(
	{
		code: '200',
		message: null,
		data: [
			{
				date: '2020-01-01',
				name: 'tom',
				address: 'su zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhousu zhou',
			},
			{
				date: '2020-01-02',
				name: 'jerry',
				address: 'su zhou',
			},
		],
	},
	null,
	2,
);

const tsxCode = `
import CodeRender from '@/components/CodeRender';
import { Box } from '@mui/material';

export const CodeRenderDemo = () => {
	return (
		<Box>
			<h1>Code Render</h1>
			<h2>JSON</h2>
			<CodeRender code={jsonCode} language="json" showLineNumber />
			<br />
			<h2>TSX</h2>
			<CodeRender code={tsxCode} language="tsx" showLineNumber />
		</Box>
	);
}; 
`.replaceAll('	', '  '); // replace tab to 2 space

export const CodeRenderDemo = () => {
	return (
		<Box>
			<h1>Code Render</h1>
			<h2>JSON</h2>
			<CodeRender code={jsonCode} language="json" showLineNumber />
			<br />
			<h2>TSX</h2>
			<CodeRender code={tsxCode} language="tsx" showLineNumber />
		</Box>
	);
};
