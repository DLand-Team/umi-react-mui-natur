import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';


export default () => {

	const canvas = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!canvas.current) {
			return;
		}
		const sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
		const render = new THREE.WebGLRenderer({canvas: canvas.current});
		render.setSize(sizes.width, sizes.height);
		render.setPixelRatio(window.devicePixelRatio);


		const scene = new THREE.Scene();

		const camera = new THREE.PerspectiveCamera(
			65,
			sizes.width / sizes.height,
			0.1,
			1000,
		);

	}, []);

	return (
		<Box width="100%" height="100%">
			<canvas width={window.innerWidth} height={window.innerHeight} ref={canvas} />
		</Box>
	);
};
