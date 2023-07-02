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

type MLP<MA extends readonly AnyFun[]> = MA extends [infer First, ...infer R]
	? [First extends AnyFun ? ReturnType<First> : never, ...MLP<R extends AnyFun[] ? R : []>]
	: [];

type ExcludeLast<T extends any[]> = T extends [...infer R, any] ? R : [];

type MapType<S extends State, MD1 extends (s: S) => any, MD2 extends (s: S) => any> = Record<
	string,
	[MD1, (p1: ReturnType<MD1>) => any] | [MD1, MD2, (p1: ReturnType<MD1>, p2: ReturnType<MD2>) => any]
>;

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

export function createActions<
	S extends State,
	A extends Record<
		string,
		| ((...args: any[]) => (p: ITP<S, Maps>) => Partial<S> | void | Promise<Partial<S> | void>)
		| ((...args: any[]) => Partial<S> | void | Promise<Partial<S> | void>)
	>,
>(state: S, actions: A): A;
export function createActions<
	S extends State,
	M extends Maps,
	A extends Record<
		string,
		| ((...args: any[]) => (p: ITP<S, M extends Maps ? M : Maps>) => Partial<S> | void | Promise<Partial<S> | void>)
		| ((...args: any[]) => Partial<S> | void | Promise<Partial<S> | void>)
	>,
>(state: S, maps: M, actions: A): A;
export function createActions(...args: any[]) {
	return args.at(-1);
}

export function createMapCreator<S extends State>(state: S) {
	function createMap<MD1 extends (s: S) => any, F extends (p1: ReturnType<MD1>) => any>(...m: [MD1, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		F extends (p1: ReturnType<MD1>, p2: ReturnType<MD2>) => any,
	>(...m: [MD1, MD2, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		F extends (p1: ReturnType<MD1>, p2: ReturnType<MD2>, p3: ReturnType<MD3>) => any,
	>(...m: [MD1, MD2, MD3, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		F extends (p1: ReturnType<MD1>, p2: ReturnType<MD2>, p3: ReturnType<MD3>, p4: ReturnType<MD4>) => any,
	>(...m: [MD1, MD2, MD3, MD4, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		MD6 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
			p6: ReturnType<MD6>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, MD6, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		MD6 extends (s: S) => any,
		MD7 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
			p6: ReturnType<MD6>,
			p7: ReturnType<MD7>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, MD6, MD7, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		MD6 extends (s: S) => any,
		MD7 extends (s: S) => any,
		MD8 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
			p6: ReturnType<MD6>,
			p7: ReturnType<MD7>,
			p8: ReturnType<MD8>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, MD6, MD7, MD8, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		MD6 extends (s: S) => any,
		MD7 extends (s: S) => any,
		MD8 extends (s: S) => any,
		MD9 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
			p6: ReturnType<MD6>,
			p7: ReturnType<MD7>,
			p8: ReturnType<MD8>,
			p9: ReturnType<MD8>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, MD6, MD7, MD8, MD9, F]): F;
	function createMap<
		MD1 extends (s: S) => any,
		MD2 extends (s: S) => any,
		MD3 extends (s: S) => any,
		MD4 extends (s: S) => any,
		MD5 extends (s: S) => any,
		MD6 extends (s: S) => any,
		MD7 extends (s: S) => any,
		MD8 extends (s: S) => any,
		MD9 extends (s: S) => any,
		MD10 extends (s: S) => any,
		F extends (
			p1: ReturnType<MD1>,
			p2: ReturnType<MD2>,
			p3: ReturnType<MD3>,
			p4: ReturnType<MD4>,
			p5: ReturnType<MD5>,
			p6: ReturnType<MD6>,
			p7: ReturnType<MD7>,
			p8: ReturnType<MD8>,
			p9: ReturnType<MD8>,
		) => any,
	>(...m: [MD1, MD2, MD3, MD4, MD5, MD6, MD7, MD8, MD9, MD10, F]): F;
	function createMap(...m: any[]) {
		return m;
	}
	return createMap;
}
