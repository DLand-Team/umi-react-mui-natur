import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Divider, IconButton, Paper } from '@mui/material';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { StyledDateItemButton, StyledDateItemButtonBox } from './style';
import { getDayListOfMonth, isSameDay, isToday } from './utils';

const weekNameList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((i, index) => ({
	id: index,
	name: i,
}));

interface DatePickerPanelProps {
	value?: Dayjs;
	date: Dayjs;
	onChange: (v: Dayjs) => any;
	onDateChange: (v: Dayjs) => any;
	start?: boolean;
	hoverDate?: Dayjs;
	value2?: Dayjs;
	onHoverValueChange?: (v?: Dayjs) => any;
}

const DatePickerPanel = ({
	value,
	onChange,
	date,
	onDateChange,
	start = true,
	hoverDate,
	value2,
	onHoverValueChange,
}: DatePickerPanelProps) => {
	const showNext = !start;
	const showPrev = start;

	const hoverValueIsBigger = !!hoverDate?.isAfter(value, 'day');
	const value2IsBigger = !!value2?.isAfter(value, 'day');
	const minSelectDate = value2IsBigger ? value : value2;
	const maxSelectDate = value2IsBigger ? value2 : value;

	const isInSelect = (d: Dayjs) => {
		if (!value2) {
			return false;
		}
		return (
			d.isBetween(minSelectDate, maxSelectDate, 'day') ||
			d.isSame(minSelectDate, 'day') ||
			d.isSame(maxSelectDate, 'day')
		);
	};

	const dayList = useMemo(() => getDayListOfMonth(date.year(), date.month()), [date]);
	return (
		<Box width={320} overflow={'hidden'}>
			<Box
				fontWeight={500}
				height={'30px'}
				padding={'0 12px 0 12px'}
				mt={2}
				mb={1}
				fontSize={16}
				display={'flex'}
				alignItems={'center'}
				position={'relative'}
			>
				{showPrev && (
					<Box>
						<Box
							component={IconButton}
							p={'8px'}
							onClick={() => {
								onDateChange(date.subtract(1, 'M'));
							}}
						>
							<ChevronLeftIcon />
						</Box>
					</Box>
				)}

				<Box component={'span'} mr={0.8} flex={1} textAlign={'center'}>
					{date.locale('en').format('MMMM')} {date.format('YYYY')}
				</Box>

				{showNext && (
					<Box>
						<Box
							component={IconButton}
							p={1}
							onClick={() => {
								onDateChange(date.add(1, 'M'));
							}}
						>
							<ChevronRightIcon />
						</Box>
					</Box>
				)}
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
			<Box height={'264px'}>
				<Box>
					{dayList.map((week, weekIndex) => (
						<Box display={'flex'} flexWrap={'wrap'} my={'2px'} key={weekIndex} justifyContent={'center'}>
							{week.map((day, dayIndex) => (
								<StyledDateItemButtonBox
									isFirst={dayIndex === 0 || !week[dayIndex - 1] || isSameDay(minSelectDate, day)}
									isInSelect={!!day && isInSelect(day)}
									isLast={dayIndex === week.length - 1 || !week[dayIndex + 1] || isSameDay(maxSelectDate, day)}
									key={`${weekIndex}-${dayIndex}`}
								>
									<Box>
										{day && (
											<StyledDateItemButton
												onClick={() => {
													if (day) {
														onChange(day.clone());
													}
												}}
												isInSelect={!!day && isInSelect(day)}
												isHover={isSameDay(hoverDate, day)}
												onMouseOver={() => onHoverValueChange?.(day.clone())}
												onMouseLeave={() => onHoverValueChange?.()}
												selected={isSameDay(day, value)}
												isToday={isToday(day)}
												key={`${weekIndex}-${dayIndex}`}
											>
												{day ? day.date() : undefined}
											</StyledDateItemButton>
										)}
									</Box>
								</StyledDateItemButtonBox>
							))}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export const DateRangePickerPanel = () => {
	const [targetMonth, setTargetMonth] = useState(dayjs());
	const [hoverDate, setHoverDate] = useState<Dayjs | undefined>(dayjs());
	const targetNextMonth = useMemo(() => targetMonth.add(1, 'month'), [targetMonth]);
	const [value, setValue] = useState<Dayjs[]>([]);

	return (
		<Box component={Paper} width={320 * 2 + 1} elevation={6} overflow={'hidden'} display={'flex'}>
			<DatePickerPanel
				start
				date={targetMonth}
				onDateChange={setTargetMonth}
				value={value[0]}
				onChange={(value1) => setValue((nowValue) => [value1, nowValue[1]])}
				hoverDate={hoverDate}
				value2={value[1]}
				onHoverValueChange={setHoverDate}
			/>
			<Divider orientation="vertical" flexItem />
			<DatePickerPanel
				start={false}
				date={targetNextMonth}
				value2={value[0]}
				onDateChange={(d) => setTargetMonth(d.subtract(1, 'month'))}
				value={value[1]}
				onChange={(value2) => setValue((nowValue) => [nowValue[0], value2])}
				hoverDate={hoverDate}
				onHoverValueChange={setHoverDate}
			/>
		</Box>
	);
};
