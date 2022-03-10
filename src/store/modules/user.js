import ls from "@/utils/storage"
import { removeToken, setToken } from "@/utils/token"

export const user = {
  namespaced: true,
  state: () => ({
    userInfo: {
      username: 'default'
    }
  }),
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
      ls.set('userInfo', state.userInfo)
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
        if (userInfo['username'] === 'admin' && userInfo['password'] === '123456') {
          context.commit('setUserInfo', userInfo['username']);
          setToken('admin-token');
          resolve();
        } else {
          reject('用户名或密码错误');
        }
      })
    },
    logout(context) {
      context.commit('resetUserInfo')
      removeToken()
    }
  },
  getters: {}
}