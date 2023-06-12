import { LRU } from "great-async/dist/LRU";




test('normal', () => {
	const cmd = [
		["LRU","set","set","get","set","get","set","get","get","get"],
		[[2],[1,0],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]
	] as const;
	const res: any[] = [];
	let handler: LRU<any, any> | null = null;
	
	cmd[0].forEach((fnName, index) => {
		if (fnName === 'LRU') {
			res.push(handler = new LRU(cmd[1][index][0] as number));
		} else {
			// @ts-ignore
			res.push(handler?.[fnName](...cmd[1][index]))
		}
	});
	const answer = [null,null,null,0,null,undefined,null,undefined,3,4];
	expect(res.map(i => i === handler ? null : i)).toEqual(answer);
})

