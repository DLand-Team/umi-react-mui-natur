

export default {
	state: {
		path: '',
		query: {} as Record<string, any>,
	},
	maps: {},
	actions: {
		updatePath: (path: string) => ({path}),
		updateQuery: (query: Record<string, any>) => ({query}),
	},
};
