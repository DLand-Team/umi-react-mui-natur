import { addLineNumbers, hljs } from '@/plugins/highlight';
import { useMemo } from 'react';
import { Pre } from './style';

export interface CodeRenderProps {
	code: string;
	language?: 'json' | 'markdown';
	showLineNumber?: boolean;
	startLineNumber?: number;
}

export default function CodeRender({
	code,
	language,
	showLineNumber = false,
	startLineNumber = 1,
}: CodeRenderProps) {
	const codeHtml = useMemo(() => {
		let res = '';
		if (code) {
			if (language) {
				res = hljs.highlight(code, { language: language }).value;
			} else {
				res = hljs.highlightAuto(code).value;
			}
			if (showLineNumber) {
				res = addLineNumbers(res, {
					startFrom: startLineNumber,
				});
			}
		}
		return { __html: res };
	}, [code, language, showLineNumber, startLineNumber]);
	return (
		<Pre>
			<code
				className={`hljs language-${language}`}
				style={showLineNumber ? { paddingLeft: 0 } : undefined}
				dangerouslySetInnerHTML={codeHtml}
			/>
		</Pre>
	);
}
