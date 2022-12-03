import { BaseService } from "umi";


export default class DemoService extends BaseService {
	start() {
		// 监控模块
		this.watch('toast', (args) => {
			console.log(args);
			// 异步执行模块action，参数同store.dispatch
			// this.dispatch
		})
	}
}