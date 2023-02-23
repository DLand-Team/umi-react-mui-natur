import { cacheMap, createAsyncController } from './../../src/utils/greate-async/asyncController';
import { sleep } from './../../src/utils/index';

test('single', async () => {
	let times = 0;
	const getUserData = createAsyncController(async () => {
		times++;
		await sleep(100);
		return {
			name: 'tom',
			age: 10
		}
	}, {
		single: true,
	});
	
	const queuen = [];
	for(let i = 0; i < 100; i++) {
		// eslint-disable-next-line @typescript-eslint/no-loop-func
		const promiseRes = getUserData();
		queuen.push(promiseRes);
	}
	expect(queuen.length).toBe(100);
	const reslist = await Promise.all(queuen);
	expect([...new Set(reslist)][0]).toBe(reslist[0]);
	expect(times).toBe(1);

});

test('debounce time', async () => {
	let times = 0;
	const getUserData = createAsyncController(async () => {
		times++;
		await sleep(100);
		return {
			name: 'tom',
			age: 10
		}
	}, {
		debounceTime: 90,
	});
	
	const queuen = [];
	for(let i = 0; i < 100; i++) {
		// eslint-disable-next-line @typescript-eslint/no-loop-func
		const promiseRes = getUserData();
		queuen.push(promiseRes);
	}
	expect(queuen.length).toBe(100);
	const reslist = await Promise.all(queuen);
	expect([...new Set(reslist)][0]).toBe(reslist[0]);
	expect(times).toBe(1);

});

test('ttl', async () => {
	let times = 0;
	const getUserData = createAsyncController(async (name?: string) => {
		times++;
		await sleep(100);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		ttl: 310,
	});
	
	const resList = [];
	for(let i = 0; i < 100; i++) {
		resList.push(await getUserData(i % 3 + '' ));
	}
	const uniquedReslist = [...new Set(resList)];
	expect(uniquedReslist.length).toBe(3);
	expect(uniquedReslist.find(i => i.name === '0')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '1')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '2')).not.toBe(null);
	expect(times).toBe(3);
});

test('ttl and debounce', async () => {
	let times = 0;
	const getUserData = createAsyncController(async (name?: string) => {
		times++;
		await sleep(100);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		debounceTime: 50,
		ttl: 160 * 4,
	});
	
	await Promise.all([
		getUserData(0 + '' ),
		getUserData(1 + '' ),
		getUserData(2 + '' ),
	]);
	expect(times).toBe(1);

	getUserData(0 + '' );
	await sleep(160);
	expect(times).toBe(2);


	await getUserData(1 + '' );
	await sleep(160);
	expect(times).toBe(3);

	const resList = [];
	for(let i = 0; i < 100; i++) {
		resList.push(await getUserData(i % 3 + '' ));
	}
	const uniquedReslist = [...new Set(resList)];
	expect(uniquedReslist.length).toBe(3);
	expect(uniquedReslist.find(i => i.name === '0')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '1')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '2')).not.toBe(null);
	expect(times).toBe(3);
});


test('genKeyByParams', async () => {
	let times = 0;
	const getUserData = createAsyncController(async (name?: string) => {
		times++;
		await sleep(100);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		ttl: 310,
		genKeyByParams: ([name]) => name || '[]',
	});
	
	const resList = [];
	for(let i = 0; i < 100; i++) {
		resList.push(await getUserData(i % 3 + '' ));
	}
	expect(cacheMap.get(getUserData)?.get('0')).not.toBe(null);
	expect(cacheMap.get(getUserData)?.get('1')).not.toBe(null);
	expect(cacheMap.get(getUserData)?.get('2')).not.toBe(null);

	const uniquedReslist = [...new Set(resList)];
	expect(uniquedReslist.length).toBe(3);
	expect(uniquedReslist.find(i => i.name === '0')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '1')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '2')).not.toBe(null);
	expect(times).toBe(3);
});


test('clear cache', async () => {
	let times = 0;
	const getUserData = createAsyncController(async (name?: string) => {
		times++;
		await sleep(100);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		ttl: 310,
		genKeyByParams: ([name]) => name || '[]',
	});
	
	await getUserData('0');
	expect(cacheMap.get(getUserData)?.get('0')).not.toBe(null);
	
	getUserData.clearCache('0');
	expect(cacheMap.get(getUserData)?.get('0')).toBe(undefined);

	const resList = [];
	for(let i = 0; i < 100; i++) {
		resList.push(await getUserData(i % 3 + '' ));
	}
	
	expect(cacheMap.get(getUserData)?.get('0')).not.toBe(null);
	expect(cacheMap.get(getUserData)?.get('1')).not.toBe(null);
	expect(cacheMap.get(getUserData)?.get('2')).not.toBe(null);

	const uniquedReslist = [...new Set(resList)];
	expect(uniquedReslist.length).toBe(3);
	expect(uniquedReslist.find(i => i.name === '0')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '1')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '2')).not.toBe(null);
	expect(times).toBe(4);
});


test('clear all cache', async () => {
	let times = 0;
	const getUserData = createAsyncController(async (name?: string) => {
		times++;
		await sleep(100);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		ttl: 310,
		genKeyByParams: ([name]) => name || '[]',
	});
	
	const resList = [];
	for(let i = 0; i < 100; i++) {
		resList.push(await getUserData(i % 3 + '' ));
	}
	getUserData.clearCache();
	expect(cacheMap.get(getUserData)?.get('0')).toBe(undefined);
	expect(cacheMap.get(getUserData)?.get('1')).toBe(undefined);
	expect(cacheMap.get(getUserData)?.get('2')).toBe(undefined);

	const uniquedReslist = [...new Set(resList)];
	expect(uniquedReslist.length).toBe(3);
	expect(uniquedReslist.find(i => i.name === '0')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '1')).not.toBe(null);
	expect(uniquedReslist.find(i => i.name === '2')).not.toBe(null);
	expect(times).toBe(3);
});



test('clear expired cache', async () => {
	const getUserData = createAsyncController(async (name?: string) => {
		await sleep(10);
		return {
			name: name || 'tom',
			age: 10
		}
	}, {
		ttl: 100,
		genKeyByParams: ([name]) => name || '[]',
	});
	await getUserData('x');
	expect(cacheMap.get(getUserData)?.get('x')?.data).toEqual({
		name: 'x',
		age: 10
	});
	await sleep(200);
	await getUserData('y');
	await sleep(20);
	expect(cacheMap.get(getUserData)?.get('x')).toBe(undefined);
	expect(cacheMap.get(getUserData)?.get('y')?.data).toEqual({
		name: 'y',
		age: 10
	});
});