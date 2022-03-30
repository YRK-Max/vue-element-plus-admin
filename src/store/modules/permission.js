/* eslint-disable no-unused-vars */
import { getPermissionsByUser } from "@/api/user"
import router, { constantRoutes } from "@/router";

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
    async generateRoutes (context, roles) {
      // 根据角色从后端获取对应的路由列表
      const routes = await getPermissionsByUser({ roles: roles })
      // 404 对应路由必须放在路由表的最下面，所以需要在获取动态路由后添加
      // ‘/:pathMatch(.*)’ vue3中无法直接使用*号
      routes.push({ path: '/:pathMatch(.*)', redirect: '/404', hidden: true });
      handleRoutes(null, routes);
      console.log(router.getRoutes());
      context.commit('SET_ROUTES', constantRoutes.concat(...routes));
    }
  },
  getters: {
    
  }
}

function handleRoutes (parent, routes) {
  routes.forEach(r => {
    let routeStructer = {
      name: r.name || '',
      path: parent ? parent.path + '/' + r.path : r.path,
      meta: r.meta || {}
    };
    let childs = [];

    if(r.redirect) {
      routeStructer.redirect = r.redirect;
    }
    
    // 懒加载中必须使用@/xxx/作为前缀进行拼接，否则会报找不到模块的问题
    if (r.children && r.children.length > 0) {
      r.children.forEach(child => {
        let temp_child = {
          name: child.name || '',
          path: child.path,
          meta: child.meta || {},
          component: () => import(`@/views/${child.component}`)
        }

        if(child.redirect) {
          temp_child.redirect = child.redirect;
        }
        
        childs.push(temp_child);
      })
    }
    routeStructer['children'] = childs;

    if (r.component === 'layout') {
      routeStructer.component = () => import(`@/layout`)
    } else {
      routeStructer.component = () => import(`@/views/${r.component}`);
    }
    router.addRoute(routeStructer);
  });
}