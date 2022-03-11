import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store';
import { getToken } from './utils/token';
import { constantRoutes } from "@/router";

NProgress.configure({ showSpinner: false });

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start();
  const token = getToken()
  let viewdPages = []

  if (token) {
    if(to.path === '/login') {
      next('/')
    } else {
      const pages = store.state.tags.viewdPages;
      if (pages.length === 0) {
        getAffixPages(constantRoutes);
        store.commit('tags/addPage', viewdPages)
      }

      const length = pages.filter(p => p.path === to.path).length
      if (length === 0 && !to.meta.affix) {
        store.commit('tags/addPage', to)
      }
      next()
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
    store.dispatch('app/setSideCollapse', false);
  }
  NProgress.done();
})