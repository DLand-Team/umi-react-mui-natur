import { DateRangePicker } from '@/components/DatePicker';
import { Box } from '@mui/material';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';

export const DateRangePickerDemo = () => {
	const [value, setValue] = useState<Dayjs[]>([]);
	return (
		<Box>
			<h1>Date Range Picker demo</h1>
			<DateRangePicker value={value} onChange={setValue} />
		</Box>
	);
};
