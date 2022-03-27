import { createStore } from "vuex";
import { app } from "./modules/app";
import { user } from "./modules/user";
import { tags } from "./modules/tags";
import { permission } from "./modules/permission";

const store = createStore({
  modules: {
    user,
    app,
    tags,
    permission
  }
})

export default store