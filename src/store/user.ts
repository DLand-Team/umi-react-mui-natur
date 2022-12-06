
/**
 * 此模块已经配置了持久化，配置位于config/config.ts中的natur.persist
 */
const store = {
	state: {
		name: '',
		authList: ['aaa'] as string[],
	},
	maps: {
		isLogin: ['name', (name: string) => !!name],
		hasAuth: ['authList', (authList: string[]) => (auth: string | undefined) => {
			if (auth === undefined) {
				return true;
			}
			return authList.includes(auth);
		}],
	},
	actions: {
		updateName: (name: string) => ({name}),
	},
};



export default store;
