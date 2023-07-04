import { DatePicker, DateRangePicker } from '@/components/DatePicker';
import { Box } from '@mui/material';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

export const DatePickerDemo = () => {
	const [value, setValue] = useState<Dayjs[]>([]);
	return (
		<Box>
			<h1>Date Picker demo</h1>
			<h2>date picker</h2>
			<DatePicker
				value={dayjs().subtract(2, 'day')}
				onChange={(v) => {
					console.log('select', v?.format('YYYY-MM-DD'));
				}}
				format="YYYY-MM-DD"
			/>
			<h2>date range picker</h2>
			<DateRangePicker value={value} onChange={setValue} shouldDisableDate={(d) => d.isAfter(dayjs(), 'day')} />
		</Box>
	);
};
