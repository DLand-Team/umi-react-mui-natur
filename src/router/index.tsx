export default [
  {
    path: '/',
    component: '@/layouts/loginLayout',
    auth: 'login',
    routes: [
      {
        path: '/docs',
        component: 'docs',
        auth: 'login'
      },
    ],
  },

  {
    path: '/login',
    component: 'login',
  },
];
