import { buffer, debounceTime, from, fromEvent, interval, switchMap } from 'rxjs';
import type { HasEventTargetAddRemove } from 'rxjs/internal/observable/fromEvent';
import { filter, map, mergeMap, pairwise } from 'rxjs/operators';
import { sleep } from '.';

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

export const createSelectListener = (ele: HasEventTargetAddRemove<Event>) => {
	const md = fromEvent(ele, 'mousedown');
	return md.pipe(switchMap(() => fromEvent(ele, 'mousemove').pipe(switchMap(() => fromEvent(ele, 'mouseup')))));
};

/**
 * control concurrent of running promise 
 * @param promiseFunctionList an arrayList of function which return a promise
 * @param callback  callback when every promise finish
 * @param concurrentNumber concurrent number
 * @returns 
 */
export const concurrentPromise = <T extends any>(promiseFunctionList: (() => Promise<T>)[], callback: (v: T) => any, concurrentNumber: number = 3) =>
	from(promiseFunctionList)
		.pipe(mergeMap((v) => from(v()), concurrentNumber))
		.subscribe(callback);
