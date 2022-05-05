import ls from '@/utils/storage'

export const app = {
  namespaced: true,
  state: () => ({
    sideCollapse: null,
    device: 'desktop'
  }),
  mutations: {
    SET_COLLAPSE(state, collapse) {
      state.sideCollapse = collapse
      ls.set('sideBarState', collapse)
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    }
  },
  actions: {
    setSideCollapse(context, collapse) {
      context.commit('SET_COLLAPSE', collapse)
    },
    toggleDevice(context, device) {
      context.commit('TOGGLE_DEVICE', device)
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
