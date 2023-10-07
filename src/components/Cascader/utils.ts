import type { CascaderOptions } from './ts';

export const findOptionList = <V extends any = any>(options: CascaderOptions<V>, value: V[]) => {
	const result = [options];
	if (!value.length) {
		return result;
	}
	const findLoop = (index = 0) => {
		const opts = result[index];
		const val = value[index];
		const nextOptions = opts.find((o) => o.value === val)?.children;
		if (nextOptions?.length) {
			result.push(nextOptions);
			findLoop(index + 1);
		}
	};
	findLoop();
	return result;
};

export const findSelectedOptionNodes = <V extends any = any>(
	options: CascaderOptions<V>,
	value?: V[],
): CascaderOptions<V> => {
	const result: CascaderOptions<V> = [];
	if (!value?.length) {
		return result;
	}
	const findLoop = (opts = options, index = 0) => {
		const val = value[index];
		if (!opts?.length) {
			return;
		}
		const optionTarget = opts.find((o) => o.value === val);
		if (optionTarget) {
			result.push(optionTarget);
			findLoop(optionTarget.children, index + 1);
		}
	};
	findLoop();
	return result;
};

export const findMultipleSelectedOptionNodes = <V extends any = any>(options: CascaderOptions<V>, value?: V[][]) => {
	const result: CascaderOptions<V>[] = [];
	if (!value?.length) {
		return result;
	}
	return value.map((v) => findSelectedOptionNodes(options, v));
};

export const findNodePathByNode = <V extends any = any>(
	options: CascaderOptions<V>,
	node: CascaderOptions<V>[number],
) => {
	const nodePath: CascaderOptions<V> = [];
	const find = (arr: CascaderOptions<V>): CascaderOptions<V>[number] | undefined => {
		for (let i = 0; i < arr.length; i++) {
			const o = arr[i];
			if (o.value === node.value) {
				nodePath.unshift(o);
				return o;
			}
			if (Array.isArray(o.children)) {
				const res = find(o.children);
				if (res) {
					nodePath.unshift(o);
					return res;
				}
			}
		}
	};
	find(options);
	return nodePath;
};

const uniqArray = <V extends any>(a: V[]) => [...new Set(a)];

export const doseIntersect = <V extends any = any>(value: V[][] | undefined, valueItem: V[]) => {
	if (!value) {
		return {
			contain: false,
			containIndexs: [],
			have: false,
			haveIndexs: [],
			belong: false,
			belongIndexs: [],
		};
	}
	let containIndexs: number[] = [];
	let haveIndexs: number[] = [];
	let belongIndexs: number[] = [];

	const judge = (index: number = 0, source: V[][] = value): void => {
		if (!valueItem?.length) {
			return;
		}
		if (index === valueItem.length) {
			return;
		}

		const res = source.filter((i) => {
			const isEq = i[index] === valueItem[index];

			if (index > i.length - 1 && valueItem.length - 1 >= index) {
				belongIndexs.push(value.findIndex((i1) => i === i1));
			}

			if (isEq && index === i.length - 1 && index === valueItem.length - 1) {
				haveIndexs.push(value.findIndex((i1) => i === i1));
			}
			if (isEq && index < i.length - 1 && index === valueItem.length - 1) {
				containIndexs.push(value.findIndex((i1) => i === i1));
			}

			return isEq;
		});
		if (res.length === 0) {
			return;
		}
		return judge(index + 1, res);
	};
	judge();

	containIndexs = uniqArray(containIndexs.filter((i) => i !== undefined));
	haveIndexs = uniqArray(haveIndexs.filter((i) => i !== undefined));
	belongIndexs = uniqArray(belongIndexs.filter((i) => i !== undefined));
	return {
		contain: containIndexs.length > 0,
		containIndexs,
		have: haveIndexs.length > 0,
		haveIndexs,
		belong: belongIndexs.length > 0,
		belongIndexs,
	};
};

export const findAllChildren = <V extends any = any>(
	options: CascaderOptions<V>,
	option: CascaderOptions<V>[number],
) => {
	const res: CascaderOptions<V>[] = [];

	const newSelectedNodePath = findNodePathByNode(options, option);

	function find(node: CascaderOptions<V>[number], base: CascaderOptions<V> = []) {
		if (!node.disabled && !node.children?.length) {
			res.push([...base, node]);
		}
		node.children?.forEach((i) => {
			if (!i.disabled) {
				find(i, [...base, node]);
			}
		});
	}
	find(option, newSelectedNodePath.slice(0, newSelectedNodePath.length - 1));
	return res;
};

export const findAllChildrenWithoutPath = <V extends any = any>(option: CascaderOptions<V>[number]) => {
	const res: CascaderOptions<V> = [];

	function find(node: CascaderOptions<V>[number]) {
		if (!node.disabled && !node.children?.length) {
			res.push(node);
		}
		node.children?.forEach((i) => {
			if (!i.disabled) {
				find(i);
			}
		});
	}
	find(option);
	return res;
};

export const selectStatus = <V extends any = any>(
	selectedOptions: CascaderOptions<V>[],
	node: CascaderOptions<V>[number],
) => {
	const flatSelectedOptions = selectedOptions.flat(1);
	const map = new Map<V, true>();
	flatSelectedOptions.map((i) => {
		map.set(i.value, true);
	});
	if (!node.children?.length) {
		return map.has(node.value) ? 2 : 0;
	} else {
		const allChildren = findAllChildrenWithoutPath(node);
		const allSelected = allChildren.every((i) => map.has(i.value));
		const someSelected = allChildren.some((i) => map.has(i.value));
		if (allSelected) {
			return 2;
		}
		if (someSelected) {
			return 1;
		} else {
			return 0;
		}
	}
};
