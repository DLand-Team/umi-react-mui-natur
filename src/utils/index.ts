import { isEmpty, isObject } from 'lodash';
import type { AllWatchAPI, AllWatchEvent, Maps, State, WatchAPI, WatchEvent } from 'natur';
import type { AnyFun, ITP } from 'natur-immer';

export const isBrowser = typeof window !== 'undefined';

export interface traverseObjectHandler {
	(target: any, arg: { key: string | number | undefined; path: (string | number)[]; parent: any }): void;
}

/**
 * 遍历对象或者数组
 * @param json
 * @param handler
 */
export function traverseObject<T extends any | any[]>(json: T, handler: traverseObjectHandler) {
	const loopFn = ({
		target,
		parent,
		key,
		path = [],
	}: {
		target: any;
		key: string | number | undefined;
		parent: any;
		path: (string | number)[];
	}) => {
		handler(target, { key, path, parent });
		if (Array.isArray(target)) {
			target.forEach((i, index) =>
				loopFn({
					target: i,
					parent: target,
					key: index,
					path: [...path, index],
				}),
			);
		} else if (isObject(target) && !isEmpty(target)) {
			Object.keys(target).forEach((k) => {
				loopFn({
					target: (target as any)[k],
					parent: target,
					key: k,
					path: [...path, k],
				});
			});
		}
	};
	loopFn({
		target: json,
		parent: undefined,
		key: undefined,
		path: [],
	});
}

export const sleep = async (time: number = 0) => await new Promise((resolve) => setTimeout(resolve, time));

type UnionToIntersection<U> = (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown ? R : never;
export type UnionToTuple<T> = UnionToIntersection<T extends any ? () => T : never> extends () => infer ReturnType
	? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
	: [];

type MLP<MA extends AnyFun[]> = MA extends [infer First, ...infer R]
	? [First extends AnyFun ? ReturnType<First> : never, ...MLP<R extends AnyFun[] ? R : []>]
	: [];

type ExcludeLast<T extends any[]> = T extends [...infer R, any] ? R : [];

type MapType<
	S extends State,
	DEPS extends ((s: S) => any)[] = ((s: S) => any)[],
	MF extends (...args: MLP<DEPS>) => any = (...args: MLP<DEPS>) => any,
> = Record<string, [DEPS, MF]>;

export const createModule = <
	S extends State,
	M extends any,
	A extends Record<
		string,
		| ((...args: any[]) => (p: ITP<S, M extends Maps ? M : Maps>) => Partial<S> | void | Promise<Partial<S> | void>)
		| ((...args: any[]) => Partial<S> | void | Promise<Partial<S> | void>)
	>,
	W extends
		| Record<string, (event: WatchEvent<any>, api: WatchAPI<any, any>) => any>
		| ((event: AllWatchEvent, api: AllWatchAPI) => any),
>(m: {
	state: S;
	maps?: M;
	actions: A;
	watch?: W;
}) => {
	type MO = typeof m;
	type MR = Exclude<MO['maps'], undefined> extends never
		? Omit<MO, 'maps'> & { maps: never }
		: Omit<MO, 'maps'> & { maps: Exclude<MO['maps'], undefined> };

	type WR = Exclude<MR['watch'], undefined> extends never
		? Omit<MR, 'watch'>
		: Omit<MR, 'watch'> & { watch: Exclude<MR['watch'], undefined> };
	return m as WR;
};
