/* eslint-disable @typescript-eslint/no-unused-expressions */
import type { State } from 'natur';

const supportProxy = typeof Proxy !== undefined;

function isPlainObject<R extends object = object>(obj: any): obj is R {
	if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
		return false;
	}

	const proto = Object.getPrototypeOf(obj);
	if (proto === null) {
		return true;
	}

	let baseProto = proto;
	while (Object.getPrototypeOf(baseProto) !== null) {
		baseProto = Object.getPrototypeOf(baseProto);
	}

	return proto === baseProto;
}

type WithO<O> = O & {
	$originalData?: O;
	$isP?: true;
};

const createProxy = <O extends object>({
	obj,
	pathHandler,
	removeFather,
}: {
	obj: O;
	pathHandler: (t: O, p: (string | symbol)[], receiver: unknown) => any;
	removeFather?: (p: string[]) => any;
}): WithO<O> => {
	const po: WithO<O> = new Proxy(obj, {
		get(target, path, receiver): any {
			const result = pathHandler(target, [path], receiver);
			if (isPlainObject<O>(result)) {
				return createProxy({
					obj: result,
					pathHandler: (rt, rp) => {
						if (typeof path === 'string') {
							removeFather?.([path]);
						}
						return pathHandler(rt, [path, ...rp], receiver);
					},
					removeFather: (p) => {
						if (typeof path === 'string') {
							removeFather?.([path, ...p]);
						}
					},
				});
			}
			return result;
		},
	});
	return po;
};

export const runFn = <S extends State, F extends (s: S) => any>(state: S, fn: F) => {
	if (typeof state !== 'object' || !state) {
		return {
			result: fn(state),
			deps: [],
		};
	}
	const deps: string[] = [];

	const proxyState = createProxy({
		obj: state,
		pathHandler: (t, p, r) => {
			if (p.every((i) => typeof i !== 'symbol')) {
				const newP = (p as string[]).join('.');
				if (deps.indexOf(newP) === -1) {
					deps.push((p as string[]).join('.'));
				}
			}
			return Reflect.get(t, p.at(-1)!, r);
		},
		removeFather: (p) => {
			// const sp = p.join('.');
			// deps = deps.filter((i) => i !== sp);
		},
	});
	const result = fn(proxyState);
	return {
		result,
		deps,
	};
};

const state = {
	name: 'tom',
	data: {
		age: 18,
		age2: 19,
		sonData: {
			sex: 'male',
			height: 1.7,
			sonSonData: {
				ss1: 1,
				ss2: 3,
				ss3: [
					{
						d: 1,
					},
				],
				ss4: [1, 2, 3],
			},
		},
	},
	todo: [
		{
			id: 1,
			name: 'pay card',
		},
	],
	m: new Map([
		[1, 1],
		[2, 2],
	]),
};

const result = runFn(state, (s) => {
	console.log('1111');
	s.name;
	s.data.age;
	s.data.sonData.height;
	// Object.keys(s.data.sonData.sonSonData).forEach((k) => {
	// 	console.log(k);
	// 	// @ts-ignore
	// 	console.log(s.data.sonData.sonSonData[k]);
	// });
	s.data.sonData.sonSonData.ss1;
	s.data.sonData.sonSonData.ss3[0].d;
	s.data.sonData.sonSonData.ss4[0];
	s.data.sonData.sonSonData.ss4[1];
	s.data.sonData.sonSonData.ss4[2];
	s.todo[0].id;
	s.todo[0].name;
	s.m.get(1);
	return s.data;
});
console.log('result: ', result);

// const sp = new Proxy(state, {
// 	get(t, p, r) {
// 		console.log('sp:', p);
// 		return Reflect.get(t, p, r);
// 	},
// });

// sp.name;
