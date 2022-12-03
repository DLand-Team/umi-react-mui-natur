
/**
 * 此模块已经配置了持久化，配置位于coonfig/config.ts中的natur.persist
 */
const store = {
	state: {
		name: '',
		authList: [] as string[],
	},
	maps: {
		isLogin: ['name', (name: string) => !!name],
		hasAuth: ['authList', (authConfig: string[]) => (auth: string) => {
			if (auth === undefined) {
				return true;
			}
			return authConfig.includes(auth);
		}],
	},
	actions: {
		updateName: (name: string) => ({name}),
	},
};



export default store;
