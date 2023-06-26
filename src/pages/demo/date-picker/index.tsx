import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export const DatePickerDemo = () => {
	return (
		<Box>
			<h1>Date Picker demo</h1>
			<p>date picker</p>
			<DatePicker
				value={dayjs().subtract(2, 'day')}
				onChange={(v) => {
					console.log('select', v?.format('YYYY-MM-DD'));
				}}
			/>
		</Box>
	);
};
