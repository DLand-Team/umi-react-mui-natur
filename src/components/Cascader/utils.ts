import type { CascaderOptions } from './ts';



export const findOptionList = <V extends any = any>(options: CascaderOptions<V>, value: V[]) => {
	const result = [options];
	if (!value.length) {
		return result;
	}
	const findLoop = (index = 0) => {
		const opts = result[index];
		const val = value[index];
		const nextOptions = opts.find(o => o.value === val)?.children;
		if (nextOptions?.length) {
			result.push(nextOptions);
			findLoop(index + 1);
		}
	}
	findLoop();
	return result;
}


export const findSelectedOptionNodes = <V extends any = any>(options: CascaderOptions<V>, value: V[]) => {
	const result: CascaderOptions<V> = [];
	if (!value.length) {
		return result;
	}
	const findLoop = (opts = options, index = 0) => {
		const val = value[index];
		if (!opts?.length) {
			return;
		}
		const optionTarget = opts.find(o => o.value === val);
		if (optionTarget) {
			result.push(optionTarget);
			findLoop(optionTarget.children, index + 1);
		}
	}
	findLoop();
	return result;
}