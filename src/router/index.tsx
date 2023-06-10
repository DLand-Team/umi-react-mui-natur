export default [
	{
		path: '/',
		component: '@/layouts/loginLayout',
		routes: [
			{
				path: '/',
				redirect: '/home',
			},
			{
				path: '/home',
				component: 'demo',
			},
			{
				path: '/demo',
				component: 'demo',
			},
			{
				path: '/table',
				component: 'table',
			},
			{
				path: '/table-store',
				component: 'table-store',
			},
			{
				path: '/form',
				component: 'form',
			},
			{
				path: '/docs',
				component: 'docs',
				meta: {
					auth: 'aaa',
				},
			},
		],
	},
	{
		path: '/login',
		component: 'login',
	},
	{
		path: '/register',
		component: 'register',
	},
];
