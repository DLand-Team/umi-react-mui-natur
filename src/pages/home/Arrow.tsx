import React, { useId } from 'react';

type ArrowProps = {
	svgWidth?: number;
	svgHeight?: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
	arrowSize?: number;
	onLineClick?: (event: React.MouseEvent<SVGPathElement>) => any;
};

const Arrow: React.FC<ArrowProps> = ({
	startX,
	startY,
	endX,
	endY,
	arrowSize = 10,
	svgHeight = 1500,
	svgWidth = 1500,
	onLineClick,
}) => {
	const pathString = `M${startX} ${startY} C${startX} ${(startY + endY) / 2}, ${endX} ${
		(startY + endY) / 2
	}, ${endX} ${endY}`;
	const arrowPathString = `M0,0 L0,${arrowSize} L${arrowSize},${arrowSize / 2} z`;

	const markerId = useId();

	return (
		<svg width={svgWidth} height={svgHeight}>
			<path
				d={pathString}
				stroke="black"
				strokeWidth="4"
				fill="none"
				markerMid={`url(#${markerId})`}
				markerEnd={`url(#${markerId})`}
				onClick={onLineClick}
				cursor={'pointer'}
			/>
			<marker
				markerWidth={arrowSize}
				markerHeight={arrowSize}
				refX={0}
				id={markerId}
				refY={arrowSize / 2}
				orient={'auto'}
			>
				<path d={arrowPathString} />
			</marker>
		</svg>
	);
};

export default Arrow;
