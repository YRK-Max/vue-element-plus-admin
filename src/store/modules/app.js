import ls from '@/utils/storage'

export const app = {
  namespaced: true,
  state: () => ({
    sideCollapse: null
  }),
  mutations: {
    newSideCollapse (state, collapse) {
      state.sideCollapse = collapse
      ls.set('sideBarState', collapse)
    }
  },
  actions: {
    setSideCollapse (context, collapse) {
      context.commit('newSideCollapse', collapse)
    }
  },
  getters: {
    getSideCollapse: (state) => {
      if (!state.sideCollapse) {
        state.sideCollapse = JSON.parse(ls.get('sideBarState'))
      }
      return state.sideCollapse
    }
  }
}