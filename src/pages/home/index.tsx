import React, { useEffect, useState } from 'react';
import Arrow from './Arrow';


const useMousePosition = () => {
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});
	useEffect(() => {
		const eventListner = (event: MouseEvent) => {
			setPosition({
				x: event.clientX,
				y: event.clientY,
			});
		}
		document.addEventListener('mousemove', eventListner);
		return () => document.removeEventListener('mousemove', eventListner);
	}, []);
	return position;
}

const Home: React.FC = () => {

	// const {x, y} = useMousePosition();

	return (
		<>
			<Arrow
				startX={window.innerWidth / 2}
				startY={window.innerHeight / 2}
				endX={window.innerWidth / 2 + 100}
				endY={window.innerHeight / 2}
				arrowSize={4}
				svgWidth={window.innerWidth}
				svgHeight={window.innerHeight}
				onLineClick={(e) => console.log('click line.', e)}
			/>
		</>
	);
};

export default Home;
