import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()

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
        meta: { title: 'Home', icon: 'yiconhomefill', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: () => import('@/layout'),
    meta: { title: 'Setting', icon: 'yiconsetting1' },
    children: [
      {
        path: 'MenuManager',
        name: 'MenuManager',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'MenuManager' }
      },
      {
        path: 'Test',
        name: 'Test',
        component: () => import('@/views/system/SettingsPage'),
        meta: { title: 'Test' }
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