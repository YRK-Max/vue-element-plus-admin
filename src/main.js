import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'

// 引入windicss
import 'windi.css'

// 引入图标库
import './assets/iconfont/iconfont.css'

// 引入组件库 Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 国际化
import VueI18n from './locales'

const app = createApp(App)
app.use(VueI18n)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
