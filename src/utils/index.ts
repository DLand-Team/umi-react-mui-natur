import { isEmpty, isObject } from 'lodash';
import type { State } from 'natur';
import type { AnyFun } from 'natur-immer';

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
