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
				component: 'home',
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
				path: '/three',
				component: '@/layouts/empty',
				routes: [
					{
						path: 'demo1',
						component: 'three/demo1',
					},
					{
						path: 'demo2',
						component: 'three/demo2',
					},
					{
						path: 'demo3',
						component: 'three/demo3',
					}
				]
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
