import { http } from '@/http';

const state = {
	name: '',
	authList: ['aaa'] as string[],
	userId: '',
	token: '',
};

type State = typeof state;
/**
 * 此模块已经配置了持久化，配置位于config/config.ts中的natur.persist
 */
const store = {
	state: {
		name: '',
		userId: '',
		token: '',
		authList: ['aaa'] as string[],
	},
	maps: {
		isLogin: [
			'userId',
			'token',
			(userId: State['userId'], token: State['token']) => {
				return !!userId && !!token;
			},
		],
		hasAuth: [
			'authList',
			(authList: string[]) => (auth: string | undefined) => {
				if (auth === undefined) {
					return true;
				}
				return authList.includes(auth);
			},
		],
	},
	actions: {
		updateName: (name: string) => ({ name }),
		login: async (username: string, password: string) => {
			// const res = await http.post<{ token: string; userId: string }>('/login', {
			// 	username,
			// 	password,
			// });
			// return {
			// 	userId: res.data.token,
			// 	token: res.data.userId,
			// 	name: username,
			// };
			return {
				userId: 'userId',
				token: 'token',
				name: username,
			};
		},
	},
};

export default store;
