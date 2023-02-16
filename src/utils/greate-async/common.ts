import type { DependencyList } from 'react';

export type PromiseFunction = (...args: any) => Promise<any>;
export type PickPromiseType<P extends (...arg: any) => Promise<any>> = P extends (...arg: any) => Promise<infer V>
	? V
	: never;

export const shallowEqual = (arr1: DependencyList, arr2: DependencyList) => {
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
		return false;
	}
	if (arr1.length !== arr2.length) {
		return false;
	}
	return arr1.every((a1, index) => a1 === arr2[index]);
};

export type AnyFn = (...args: any) => any;


export class FalsyValue {
	v: any;
	constructor(v: any) {
		this.v = v;
	}
	getValue() {
		return this.v;
	}
}