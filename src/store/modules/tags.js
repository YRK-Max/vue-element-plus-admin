export const tags = {
  namespaced: true,
  state: () => ({
    viewdPages: []
  }),
  mutations: {
    ADD_PAGE(state, page) {
      if (page instanceof Array) {
        state.viewdPages.push(...page)
      } else {
        state.viewdPages.push(page)
      }
    },
    REMOVE_PAGE(state, index) {
      state.viewdPages.splice(index, 1)
    },
    REMOVE_ALL_PAGE(state) {
      const pageCount = state.viewdPages.length
      for (let i = pageCount - 1; i >= 0; i--) {
        const element = state.viewdPages[i]
        if (!element.meta['affix']) {
          state.viewdPages.splice(i, 1)
        }
      }
    },
    REMOVE_OTHER_PAGE(state, currentPageName) {
      const pageCount = state.viewdPages.length
      for (let i = pageCount - 1; i >= 0; i--) {
        const element = state.viewdPages[i]
        if (!element.meta['affix'] && element.name !== currentPageName.value) {
          state.viewdPages.splice(i, 1)
        }
      }
    }
  },
  actions: {
    delPageTag(context, index) {
      return new Promise(resolve => {
        if (index > -1) {
          context.commit('REMOVE_PAGE', index)
        }
        resolve([...context.state.viewdPages])
      })
    },
    delAllPageTag(context) {
      return new Promise(resolve => {
        context.commit('REMOVE_ALL_PAGE')
        resolve([...context.state.viewdPages])
      })
    },
    delOtherPageTag(context, currentPageName) {
      return new Promise(() => {
        context.commit('REMOVE_OTHER_PAGE', currentPageName)
      })
    }
  },
  getters: {

  }
}
