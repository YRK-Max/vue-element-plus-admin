// 引入组件库 Element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
// 引入windicss
import 'windi.css'
import App from './App.vue'
// 引入图标库
import './assets/iconfont/iconfont.css'
// 国际化
import VueI18n from './locales'
// permission.js 主要处理页面跳转，权限检查相关工作
import './permission'
import router from './router'
import store from './store'

// 开启mock, 如不需要则删掉此行，关闭mock需要卸载mockjs，删掉src/mock，调整proxy至真实后端
require('./mock')

const app = createApp(App)
app.use(VueI18n)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
