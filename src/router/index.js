import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory()

export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/Dashboard'),
        name: 'home',
        meta: { title: 'home', icon: 'yiconhomefill', affix: true }
      }
    ]
  },
  {
    path: '/setting',
    component: () => import('@/layout'),
    meta: { title: 'setting', icon: 'yiconsetting1' },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'profile' }
      },
      {
        path: 'rtyui',
        name: 'rtyui',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'MenuManager' }
      },
      {
        path: 'sdfgh',
        name: 'sdfgh',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'MenuManager' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  { path: '*', redirect: '/404', hidden: true }
]



const router = createRouter({
  history: routerHistory,
  routes: constantRoutes
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router