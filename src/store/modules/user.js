import { getUserInfo, login } from '@/api/user'
import ls from '@/utils/storage'
import { removeToken, setToken } from '@/utils/token'

export const user = {
  namespaced: true,
  state: () => ({
    userInfo: {
      username: 'default',
      avatarUrl: '@/assets/images/avatar.jpg'
    },
    roles: [],
    isThirdLogin: false
  }),
  mutations: {
    SET_USERINFO(state, info) {
      state.userInfo = info
      ls.set('userInfo', state.userInfo)
    },
    SET_THIRD_LOGIN(state, bool) {
      state.userInfo = bool
      ls.set('isThirdLogin', bool)
    },
    SET_ROLES(state, roles) {
      state.roles = roles
    },
    RESET_USERINFO(state) {
      state.userInfo = { username: 'default' }
      ls.remove('userInfo')
    }
  },
  actions: {
    login(context, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res && res['success']) {
            setToken('admin-token')
            context.dispatch('getUserInfo', userInfo).then(({ roles }) => {
              context.dispatch('permission/generateRoutes', roles, { root: true })
              resolve()
            })
          } else {
            reject(res['msg'])
          }
        })
      })
    },
    getUserInfo(context, userInfo) {
      return new Promise((resolve, reject) => {
        getUserInfo(userInfo).then(res => {
          if (res && res['success']) {
            context.commit('SET_USERINFO', res['data']['userInfo'])
            context.commit('SET_ROLES', res['data']['roles'])
            resolve(res['data'])
          } else {
            reject(res['msg'])
          }
        })
      })
    },
    logout(context) {
      context.commit('RESET_USERINFO')
      context.commit('SET_THIRD_LOGIN', false)
      removeToken()
    }
  },
  getters: {}
}
