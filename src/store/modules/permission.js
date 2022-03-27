/* eslint-disable no-unused-vars */
import { getPermissionsByUser } from "@/api/user"
import router, { constantRoutes } from "@/router";

export const permission = {
  namespaced: true,
  state: () => ({
    routes: []
  }),
  mutations: {
    SET_ROUTES(context, routes) {
      context.routes = routes
    }
  },
  actions: {
    async generateRoutes(context, roles) {
      const routes = await getPermissionsByUser({ roles: roles })
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
    
    if (r.children && r.children.length > 0) {
      r.children.forEach(child => {
        childs.push({
          name: child.name || '',
          path: child.path,
          meta: child.meta || {},
          component: () => import(`@/views/${child.component}`)
        })
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