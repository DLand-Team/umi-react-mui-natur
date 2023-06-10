import { addLineNumbers, hljs } from '@/plugins/highlight';
import { Box } from '@mui/material';
import type { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react';
import CodeRender from '../CodeRender';


const CodeHOC: (o: {showLineNumber: boolean}) => CodeComponent = ({showLineNumber}) => (props: CodeProps) => {
    let {className = ''} = props;
    let codeStr = '';
    if (className === 'language-json') {
        codeStr = hljs.highlight(props.children[0] as string, {language: 'json'}).value;
        if (showLineNumber) {
            codeStr = addLineNumbers(codeStr);
        }
        className += ' hljs';
    } else if(className) {
        codeStr = hljs.highlightAuto((props.children[0] as string)?.trim()).value;
				if (showLineNumber) {
					codeStr = addLineNumbers(codeStr);
				}
        className += ' hljs'
    } else {
        codeStr = props.children[0] as string;
    }
    return (
        <Box component='code' className={className} dangerouslySetInnerHTML={{__html: codeStr}} />
    );
}

const Code: CodeComponent = CodeHOC({showLineNumber: false});
export const CodeWithLineNumber: CodeComponent = CodeHOC({showLineNumber: true});

export default Code;