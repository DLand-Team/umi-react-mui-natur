import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { range } from 'lodash';

export function getDayListOfMonth(year?: number, month?: number) {
	let targetMonth = dayjs();
	targetMonth = targetMonth.year(year || targetMonth.year());
	targetMonth = targetMonth.month(month || targetMonth.month());

	const thisMonthDayList: (null | Dayjs)[] = range(1, targetMonth.daysInMonth() + 1).map((i) =>
		targetMonth.clone().date(i),
	);
	thisMonthDayList.unshift(...range(0, thisMonthDayList[0]?.day()).map(() => null));
	const res: (null | Dayjs)[][] = [];
	thisMonthDayList.map((i, index) => {
		if (!Array.isArray(res[Math.floor(index / 7)])) {
			res[Math.floor(index / 7)] = [];
		}
		res[Math.floor(index / 7)].push(i);
	});
	const lastWeek = res.at(-1);
	if (lastWeek) {
		const needFillLen = 7 - lastWeek.length;
		lastWeek.push(...new Array(needFillLen).fill(null));
	}

	return res;
}

export const isToday = (d?: Dayjs | null) => !!d?.isSame(dayjs(), 'day');
export const isSameDay = (a?: Dayjs | null, b?: Dayjs | null) => !!a?.isSame(b, 'day');

export const sortDayjsList = (dayList: Dayjs[] = []) => dayList.slice().sort((a, b) => a.valueOf() - b.valueOf());
