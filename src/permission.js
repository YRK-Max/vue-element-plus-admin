import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store';
import { getToken } from './utils/token';
import { constantRoutes } from "@/router";
import ls from './utils/storage';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login']
let firstFresh = true;

router.beforeEach(async(to, from, next) => {
  NProgress.start();
  const token = getToken()
  let viewdPages = []

  if (token) {
    if(to.path === '/login') {
      next('/')
    } else {
      const routes = store.state.permission.routes;
      const hasRoutes = routes && routes.length > 0;
      const currentUserInfo = ls.get('userInfo');
      const pages = store.state.tags.viewdPages;
      if (pages.length === 0) {
        getAffixPages(constantRoutes);
        store.commit('tags/addPage', viewdPages)
      }

      if (hasRoutes) {
        const fullRoutesInfo = router.getRoutes();
        const length = pages.filter(p => p.path === to.path).length
        const fullInfoOfTo = fullRoutesInfo.filter(r => r.path === to.path)[0];
        if (length === 0 && !fullInfoOfTo.meta.affix) {
          store.commit('tags/addPage', fullInfoOfTo)
        }
        next()
      } else {
        if (firstFresh) {
          const { roles } = await store.dispatch('user/getUserInfo', { username: currentUserInfo.username });
          await store.dispatch('permission/generateRoutes', roles);
          firstFresh = false;
        }
        next({ ...to, replace: true })
      }
    }
  } else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  function getAffixPages(routerNode) {
    routerNode.forEach(node => {
      if(node.children) {
        getAffixPages(node.children)
      }
      if(node.meta && node.meta.affix){
        viewdPages.push(node)
      }
    });
  }
})

router.afterEach(() => {
  if(store.state.app.device === 'mobile') {
    store.dispatch('app/setSideCollapse', true);
  }
  NProgress.done();
})