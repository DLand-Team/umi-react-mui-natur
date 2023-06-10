import type { BoxProps} from "@mui/material";
import ReactMarkdown from 'react-markdown';
import Code, { CodeWithLineNumber } from "./Code";
import { MarkdownRenderBox, showLineNumberStyle } from "./style";
import classnames from 'classnames';
import { useMemo } from "react";



export interface MarkdownRenderProps extends BoxProps {
    children?: string;
    text?: string;
    showLineNumber?: boolean;
}

const MarkdownRender = ({children, text, showLineNumber = false, className, ...boxProps}: MarkdownRenderProps) => {
    const finalCls = classnames(className, {
        [showLineNumberStyle]: showLineNumber
    });
    const components = useMemo(() => ({code: showLineNumber ? CodeWithLineNumber : Code}), [showLineNumber]);

    return (
        <MarkdownRenderBox className={finalCls} {...boxProps}>
            <ReactMarkdown components={components}>
                {children || text || ''}
            </ReactMarkdown>
        </MarkdownRenderBox>
    )
}


export default MarkdownRender;