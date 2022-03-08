import { createStore } from "vuex";
import { app } from "./modules/app";
import { user } from "./modules/user";
import { tags } from "./modules/tags";

const store = createStore({
  modules: {
    user,
    app,
    tags
  }
})

export default store