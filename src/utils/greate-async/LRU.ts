

export class LRU<K extends any = any, V extends any = any> extends Map<K, V> {
	capacity: number;
	constructor(capacity: number) {
		super();
		this.capacity = capacity;
	}
	get(key: K): V | undefined {
		const res = super.get(key);
		if (res !== undefined) {
			this.delete(key);
			this.set(key, res);
		}
		return res;
	}
	set(key: K, value: V): this {
		this.get(key);
		super.set(key, value);
		if (this.size > this.capacity) {
			const outKey = this.keys().next().value;
			this.delete(outKey);
		}
		return this;
	}
}
