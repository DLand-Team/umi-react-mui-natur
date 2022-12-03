export default [
  {
    path: '/',
    component: '@/layouts/loginLayout',
    routes: [
      {
        path: '/',
        redirect: '/home'
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
        path: '/docs',
        component: 'docs',
        meta: {
          auth: 'aaa',
        }
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
