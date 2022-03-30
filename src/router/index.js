import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory();
const WHITE_NAME_LIST = ['Home', 'Login', '404'];

export const constantRoutes = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Dashboard'),
        name: 'Home',
        meta: { title: 'home', icon: 'yiconhomefill', affix: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', name: '404', redirect: '/404', hidden: true }
]



const router = createRouter({
  history: routerHistory,
  routes: constantRoutes
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router