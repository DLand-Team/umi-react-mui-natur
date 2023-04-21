import Button from "@/components/Button"
import { TextField } from "@mui/material"
import './common-usage.style.scss'




export default () => {
	return (
		<div style={{padding: '20px 50px'}}>
			<h1>common usage of general ui framework</h1>
			<Button variant="contained">Contained</Button>
			<br /><br />
			<TextField id="outlined-basic" variant="outlined" />
		</div>
	)
}