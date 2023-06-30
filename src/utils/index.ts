import { isEmpty, isObject } from 'lodash';
import type { AllWatchAPI, AllWatchEvent, State, WatchAPI, WatchEvent } from 'natur';
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

export const createModule = <
	S extends State,
	MI extends [...[...args: ((s: S) => any)[]], (...args: MLP<ExcludeLast<MI>>) => any],
	MDO extends Record<string, ((s: S) => any)[]>,
	M extends {
		[K in keyof MDO]: [...MDO[K], (...args: MLP<MDO[K]>) => any];
	},
	A extends Record<
		string,
		| ((...args: any[]) => (p: ITP<S, M>) => Partial<S> | void | Promise<Partial<S> | void>)
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
}) => m;

const m = createModule({
	state: {
		pageInfo: {
			pageSize: 10,
			pageNum: 1,
		},
		tableData: [] as { name: string }[],
	},
	// maps: {
	// 	m1: [(s) => s.pageInfo.pageSize, (s) => s.tableData[0], (p1) => p1 + 1],
	// 	m2: [(s) => s.tableData[0], (p1) => p1 + 1],
	// },
	actions: {
		a1: (p1: string) => {
			console.log(p1);
		},
		a2:
			(p2: string) =>
			async ({ setState }) => {
				setState({});
				return {
					pageInfo: {
						pageNum: 1,
						pageSize: 2,
					},
				};
			},
	},
});
