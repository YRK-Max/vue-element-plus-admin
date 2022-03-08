export const tags = {
  namespaced: true,
  state: () => ({
    viewdPages: []
  }),
  mutations: {
    addPage (context, page) {
      if (page instanceof Array) {
        context.viewdPages.push(...page)
      } else {
        context.viewdPages.push(page)
      }
    },
    removePage(context, index) {
      if (index > -1) {
        context.viewdPages.splice(index, 1)
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