import ls from "@/utils/storage"
import { removeToken, setToken } from "@/utils/token"
import { ElMessage } from "element-plus"

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
    async login (context, userInfo) {
      if (userInfo['username'] === 'admin' && userInfo['password'] === '123456') {
        context.commit('setUserInfo', userInfo['username']);
        setToken('admin-token');
      } else {
        ElMessage.error("用户名或密码错误")
      }
    },
    logout(context) {
      context.commit('resetUserInfo')
      removeToken()
    }
  },
  getters: {}
}