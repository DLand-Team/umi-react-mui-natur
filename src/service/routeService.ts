import { BaseService } from 'umi';

export default class RouteService extends BaseService {
	syncModuleNames = ['demo'];
	start() {
		this.syncRoutePath();
	}
	syncRoutePath() {
		// 监控模块
		this.watch('route', ({ state }) => {
			if (state?.path) {
				// this.
				this.syncModuleNames.forEach((m) => {
					if (this.store.hasModule(m as any)) {
						this.store.globalSetStates({
							[m]: {
								...this.store.getModule(m as any).state,
								routePath: state.path,
							},
						});
					}
				});
			}
		});
	}
}
