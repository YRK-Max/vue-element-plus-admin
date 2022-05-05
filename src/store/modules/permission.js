/* eslint-disable no-unused-vars */
import { getPermissionsByUser } from '@/api/user'
import router, { constantRoutes } from '@/router'

export const permission = {
  namespaced: true,
  state: () => ({
    routes: []
  }),
  mutations: {
    SET_ROUTES(state, routes) {
      state.routes = routes
    }
  },
  actions: {
    async generateRoutes(context, roles) {
      // 根据角色从后端获取对应的路由列表
      const routes = await getPermissionsByUser({ roles: roles })
      // 404 对应路由必须放在路由表的最下面，所以需要在获取动态路由后添加
      // ‘/:pathMatch(.*)’ vue3中无法直接使用*号
      routes.push({ path: '/:pathMatch(.*)', redirect: '/404', hidden: true })
      handleRoutes(routes)
      context.commit('SET_ROUTES', constantRoutes.concat(...routes))
    }
  },
  getters: {

  }
}

// 动态添加路由
function handleRoutes(routes) {
  // 处理后端返回的路由表，将所有component变更为相应的具体组件实例
  routes.forEach(r => {
    const routeStructer = {
      name: r.name || '',
      path: r.path,
      meta: r.meta || {}
    }
    const childs = []

    if (r.redirect) {
      routeStructer.redirect = r.redirect
    }

    // 懒加载中必须使用@/xxx/作为前缀进行拼接，否则会报找不到模块的问题
    if (r.children && r.children.length > 0) {
      r.children.forEach(child => {
        const temp_child = {
          name: child.name || '',
          path: child.path,
          meta: child.meta || {},
          component: () => import(`@/views/${child.component}`)
        }

        if (child.redirect) {
          temp_child.redirect = child.redirect
        }

        childs.push(temp_child)
      })
    }
    routeStructer['children'] = childs

    if (r.component === 'layout') {
      routeStructer.component = () => import(`@/layout`)
    } else {
      routeStructer.component = () => import(`@/views/${r.component}`)
    }
    router.addRoute(routeStructer)
  })
}
