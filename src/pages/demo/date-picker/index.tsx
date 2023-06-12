import { Box } from "@mui/material"

import AuthButton from '@/components/Button';
import { DatePicker } from "@/components/DatePicker";
import dayjs from "dayjs";


export const DatePickerDemo = () => {
	
	return (
		<Box>
			<h1>Date Picker demo</h1>
			<p>date picker</p>
			<DatePicker
				format={'YYYY-MM-DD'}
				value={dayjs()}
			/>
		</Box>
	)
}