import { getUserInfo, login } from "@/api/user"
import ls from "@/utils/storage"
import { removeToken, setToken } from "@/utils/token"

export const user = {
  namespaced: true,
  state: () => ({
    userInfo: {
      username: 'default'
    },
    roles: []
  }),
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
      ls.set('userInfo', state.userInfo)
    },
    setRoles(state, roles) {
      state.roles = roles
    },
    resetUserInfo(state) {
      state.userInfo = { username: 'default' }
      ls.remove('userInfo')
    }
  },
  actions: {
    setUserInfo(context) {
      context.commit('setUserInfo')
    },
    login (context, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if(res && res['success']) {
            setToken('admin-token');
            context.dispatch('getUserInfo', userInfo).then(({ roles }) => {
              context.dispatch('permission/generateRoutes', roles, { root: true });
              resolve();
            });
          }else {
            reject(res['msg']);
          }
        })
      })
    },
    getUserInfo (context, userInfo) {
      return new Promise((resolve, reject) => {
        getUserInfo(userInfo).then(res => {
          if (res && res['success']) {
            context.commit('setUserInfo', res['data']['userInfo']);
            context.commit('setRoles', res['data']['roles']);
            resolve(res['data']);
          }else {
            reject(res['msg']);
          }
        })
      })
    },
    logout(context) {
      context.commit('resetUserInfo')
      removeToken()
    }
  },
  getters: {}
}