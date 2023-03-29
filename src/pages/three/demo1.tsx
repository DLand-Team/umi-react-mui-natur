import nikeShoe from '@/assets/nike_air_zoom_pegasus_36-transformed.glb';
import { ContactShadows, Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { useStore } from './demo1-store';

function Box(props) {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef();
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current.rotation.x += delta));
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}
		>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
}

function Selector({ children }: { children: ReactNode }) {
	const ref = useRef<any>();
	const store = useStore();
	useFrame(({ viewport, camera, pointer }, delta) => {
		const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 3]);
		easing.damp3(
			ref.current.position,
			[(pointer.x * width) / 2, (pointer.y * height) / 2, 3],
			store.open ? 0 : 0.1,
			delta,
		);
		easing.damp3(ref.current.scale, store.open ? 4 : 0.01, store.open ? 0.5 : 0.2, delta);
		easing.dampC(ref.current.material.color, store.open ? '#f0f0f0' : '#ccc', 0.1, delta);
	});
	return (
		<>
			<mesh ref={ref}>
				<circleGeometry args={[1, 64, 64]} />
				<MeshTransmissionMaterial
					samples={16}
					resolution={512}
					anisotropy={1}
					thickness={0.1}
					roughness={0.4}
					toneMapped={true}
					distortionScale={1}
					temporalDistortion={1}
				/>
			</mesh>
			<group
				onPointerOver={() => (store.open = true)}
				onPointerOut={() => (store.open = false)}
				onPointerDown={() => (store.open = true)}
				onPointerUp={() => (store.open = false)}
			>
				{children}
			</group>
		</>
	);
}

function Shoe(props: any) {
	const ref = useRef<any>();
	const { nodes, materials } = useGLTF(nikeShoe);
	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		ref.current.rotation.set(Math.cos(t / 4) / 8, Math.sin(t / 3) / 4, 0.15 + Math.sin(t / 2) / 8);
		ref.current.position.y = (0.5 + Math.cos(t / 2)) / 7;
	});
	return (
		<group ref={ref}>
			<mesh
				receiveShadow
				castShadow
				geometry={nodes.defaultMaterial.geometry}
				material={materials.NikeShoe}
				{...props}
			/>
		</group>
	);
}

useGLTF.preload(nikeShoe);

export default () => {
	return (
		<Canvas
			eventSource={document.getElementById('root')!}
			eventPrefix="client"
			camera={{ position: [0, 0, 4], fov: 40 }}
		>
			<ambientLight intensity={0.7} />
			<spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, -5]} castShadow />
			<Environment preset="city" background blur={1} />
			<ContactShadows
				resolution={512}
				position={[0, -0.8, 0]}
				opacity={1}
				scale={10}
				blur={2}
				far={0.8}
			/>
			<Selector>
				<Shoe rotation={[0.3, Math.PI / 1.6, 0]} />
			</Selector>
		</Canvas>
	);
};
