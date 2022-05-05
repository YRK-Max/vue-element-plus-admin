import { createStore } from 'vuex'
import { app } from './modules/app'
import { permission } from './modules/permission'
import { tags } from './modules/tags'
import { user } from './modules/user'

const store = createStore({
  modules: {
    user,
    app,
    tags,
    permission
  }
})

export default store
