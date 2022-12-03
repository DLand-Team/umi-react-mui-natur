

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
		updateName: (event: any) => ({name: event?.target?.value || ''}),
	},
};



export default store;
