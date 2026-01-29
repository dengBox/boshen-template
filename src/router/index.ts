import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import routes from './routes';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;

// router.beforeEach((to, from, next) => {
//   // 做鉴权以及token写入
//   const token = to.query.token
//   if (token && token !== 'undefined') {
//     save('token', token)
//   }
//   next();
// });
