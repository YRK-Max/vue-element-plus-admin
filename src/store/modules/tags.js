export const tags = {
  namespaced: true,
  state: () => ({
    viewdPages: []
  }),
  mutations: {
    addPage(state, page) {
      if (page instanceof Array) {
        state.viewdPages.push(...page)
      } else {
        state.viewdPages.push(page)
      }
    },
    removePage(state, index) {
      if (index > -1) {
        state.viewdPages.splice(index, 1)
      }
    }
  },
  actions: {
    delPageTag(context, index) {
      return new Promise(resolve => {
        context.commit('removePage', index)
        resolve([...context.state.viewdPages])
      })
    }
  },
  getters: {

  }
}
