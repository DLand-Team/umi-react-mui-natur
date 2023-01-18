import { buffer, debounceTime, fromEvent, interval } from 'rxjs';
import { filter, map, pairwise } from 'rxjs/operators';
import type { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';

/**
 * when window is active from backstage
 */
export const windowActive = interval(1000).pipe(
	map(() => document.visibilityState),
	pairwise(),
	filter((v) => v[0] === 'hidden' && v[1] === 'visible'),
);

/**
 * create a triple click listener
 * @param ele
 */
export const createTripleClickListener = (ele: HasEventTargetAddRemove<Event>) => {
	const click = fromEvent(ele, 'click');
	return click.pipe(
		buffer(click.pipe(debounceTime(300))),
		filter((v) => v.length > 2),
	);
};
