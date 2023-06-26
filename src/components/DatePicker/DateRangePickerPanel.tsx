import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Paper } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { getDayListOfMonth, isToday } from './utils';

const weekNameList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((i, index) => ({
	id: index,
	name: i,
}));

export const DateRangePickerPanel = () => {
	const [targetMonth, setTargetMonth] = useState(dayjs());
	const targetNextMonth = useMemo(() => targetMonth.add(1, 'month'), [targetMonth]);

	const dayList = useMemo(() => getDayListOfMonth(targetMonth.year(), targetMonth.month()), [targetMonth]);

	const [value, setValue] = useState(dayjs().add(2, 'day'));

	return (
		<Box component={Paper} width={320} elevation={6} overflow={'hidden'}>
			<Box
				fontWeight={500}
				height={'30px'}
				padding={'0 12px 0 12px'}
				mt={2}
				mb={1}
				fontSize={16}
				display={'flex'}
				alignItems={'center'}
			>
				<Box mr={'auto'}>
					<Box
						component={IconButton}
						p={'8px'}
						onClick={() => {
							setTargetMonth((d) => d.subtract(1, 'M'));
						}}
					>
						<ChevronLeftIcon />
					</Box>
				</Box>

				<Box component={'span'} mr={0.8}>
					{targetMonth.locale('en').format('MMMM')} {targetMonth.format('YYYY')}
				</Box>

				<Box ml={'auto'}>
					<Box
						component={IconButton}
						p={1}
						onClick={() => {
							setTargetMonth((d) => d.add(1, 'M'));
						}}
					>
						<ChevronRightIcon />
					</Box>
				</Box>
			</Box>
			<Box display={'flex'} justifyContent={'center'}>
				{weekNameList.map((i) => (
					<Box
						height={40}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						color={'text.secondary'}
						fontSize={12}
						width={36}
						mx={'2px'}
						key={i.id}
					>
						{i.name}
					</Box>
				))}
			</Box>
			<Box height={'240px'}>
				<Box>
					{dayList.map((week, weekIndex) => (
						<Box display={'flex'} flexWrap={'wrap'} my={'2px'} key={weekIndex} justifyContent={'center'}>
							{week.map((day, dayIndex) => (
								<Box
									component={day ? IconButton : undefined}
									width={36}
									display={'flex'}
									fontSize={12}
									alignItems={'center'}
									mx="2px"
									bgcolor={day?.isSame(value, 'day') ? 'primary.main' : undefined}
									color={day?.isSame(value, 'day') ? '#fff' : 'text.primary'}
									fontWeight={day?.isSame(value, 'day') ? 600 : 400}
									border={isToday(day) ? (theme) => `1px solid ${theme.palette.grey['700']}` : ''}
									justifyContent={'center'}
									height={36}
									key={`${weekIndex}-${dayIndex}`}
								>
									{day ? day.date() : undefined}
								</Box>
							))}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};
