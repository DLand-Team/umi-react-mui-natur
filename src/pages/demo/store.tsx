import { Box, TextField } from "@mui/material"
import { useFlatInject } from "umi"




export const NaturStoreDemo = () => {
	const [{ naturStore, updateNaturStoreText }] = useFlatInject('demo')
	return (
		<Box>
			<h1>natur store demo</h1>

			<TextField value={naturStore.text} onChange={e => {
				updateNaturStoreText(e.target.value)
			}} />
			<br />
			<ul>
				<li>demo store code locate in <code>/store/demo.ts</code> directory</li>
				<li>you can install redux devtool extention in chrome to view the state</li>
			</ul>
			
			<br />

		</Box>
	)
}