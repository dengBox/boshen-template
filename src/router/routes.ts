export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/IndexView.vue'),
    children: [
      {
        path: 'home',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          title: 'pageTitle.home',
          keepAlive: false,
        },
      },
      // {
      //   // 代仓呆滞临期
      //   path: 'proxyWarehouseStagnantDeadline',
      //   component: () => import('@/views/dullApproachingPeriod/ProxyWarehouseStagnantDeadline.vue'),
      //   meta: {
      //     title: 'pageTitle.proxyWarehouseStagnantDeadline',
      //   },
      // }
    ],
  },
  // 匹配不到重定向会主页
  {
    // 找不到路由重定向到404页面
    path: '/:pathMatch(.*)',
    redirect: '/home',
  },
];

export default routes;
