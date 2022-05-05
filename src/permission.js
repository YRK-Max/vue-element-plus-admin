import { constantRoutes } from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import store from './store'
import ls from './utils/storage'
import { getToken } from './utils/token'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']
// 判断是否是刷新操作
let isFresh = true

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // 获取Token
  const token = getToken()
  // 1. 判断token是否存在
  if (token) {
    // 2. 如果存在 token ，跳过登陆页面，进入主页，如果是跳转到其他页面则需要对页签，routes 进行操作
    if (to.path === '/login') {
      next('/')
    } else {
      // 从 local storage 中获取当前用户数据
      const currentUserInfo = ls.get('userInfo')

      // 获取当前页签列表
      const pages = store.state.tags.viewdPages
      // 如果页签列表为空，则为首次登入，
      if (pages.length === 0) {
        const viewdPages = getAffixPages(constantRoutes)
        store.commit('tags/addPage', viewdPages)
      }

      if (isFresh) {
        // 如果是刷新页面，需要重新请求一次用户角色，并重新构造路由表
        const { roles } = await store.dispatch('user/getUserInfo', { username: currentUserInfo.username })
        await store.dispatch('permission/generateRoutes', roles)
        isFresh = false
        /**
          在动态添加路由addRoute后，需要确保新加入的路由被完全加载上去
          1. next({ ...to}): 如果参数to不能找到对应的路由的话，就再执行一次beforeEach((to, from, next)直到其中的next({ ...to})能找到对应的路由为止。
          2. replace: true: 告诉VUE本次操作后，不能通过浏览器后退按钮，返回前一个路由。
        **/
        next({ ...to, replace: true })
      } else {
        // 如果不是刷新，则找到跳转的路由的完整信息，添加到多页签内【不能使用routes中的数据，缺失部分数据】
        const fullRoutesInfo = router.getRoutes()
        const length = pages.filter(p => p.path === to.path).length
        const fullInfoOfTo = fullRoutesInfo.filter(r => r.path === to.path)[0]
        if (length === 0 && !fullInfoOfTo.meta.affix) {
          store.commit('tags/addPage', fullInfoOfTo)
        }
        next()
      }
    }
  } else {
    // 2. 如果 token 不存在，判断是否在白名单内
    // 3. 如果在白名单内，则跳转，否则跳转回登陆页面
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // 递归获取固钉页面
  function getAffixPages(routerNode) {
    const tempPages = []
    routerNode.forEach(node => {
      if (node.children) {
        tempPages.push(...getAffixPages(node.children))
      }
      if (node.meta && node.meta.affix) {
        tempPages.push(node)
      }
    })
    return tempPages
  }
})

router.afterEach(() => {
  // 进入页面后判断如果是移动端，则隐藏侧边栏
  if (store.state.app.device === 'mobile') {
    store.dispatch('app/setSideCollapse', true)
  }
  NProgress.done()
})
