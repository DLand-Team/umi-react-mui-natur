import type { BoxProps, TooltipProps } from '@mui/material';
import { Box } from '@mui/material';
import { useRef, useState } from 'react';
import { InvisibleText, TextLimitShowerText, TextLimitShowerTooltip, TooltipText } from './style';

export interface TextLimitShowerProps extends BoxProps {
	text: string;
	native?: boolean;
	TooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
}

export default function TextLimitShower(props: TextLimitShowerProps) {
	const [isOver, setIsOver] = useState(false);
	const { text, native, TooltipProps, ...boxProps } = props;

	const wrapperRef = useRef<HTMLDivElement>();
	const hiddenTextDOMRef = useRef<HTMLDivElement>(null);
	const calcIsOverflow = () => {
		if (!wrapperRef.current) {
			return;
		}
		const containerDOM = wrapperRef.current;
		const textDOM = hiddenTextDOMRef.current;
		if (containerDOM && textDOM) {
			if (textDOM.getBoundingClientRect().width > containerDOM.getBoundingClientRect().width) {
				setIsOver(true);
			} else {
				setIsOver(false);
			}
		}
	};

	return (
		<Box ref={wrapperRef} display={'flex'} position={'relative'} onMouseOver={calcIsOverflow} {...boxProps}>
			{!native ? (
				<>
					{isOver ? (
						<TextLimitShowerTooltip
							placement="top-start"
							arrow
							{...TooltipProps}
							title={
								<TooltipText
									onClick={(e) => {
										e.stopPropagation();
									}}
								>
									{text}
								</TooltipText>
							}
						>
							<TextLimitShowerText>{text}</TextLimitShowerText>
						</TextLimitShowerTooltip>
					) : (
						<TextLimitShowerText>{text}</TextLimitShowerText>
					)}
				</>
			) : (
				<>
					{isOver ? (
						<TextLimitShowerText title={text}>{text}</TextLimitShowerText>
					) : (
						<TextLimitShowerText>{text}</TextLimitShowerText>
					)}
				</>
			)}
			<InvisibleText ref={hiddenTextDOMRef}>{text}</InvisibleText>
		</Box>
	);
}
