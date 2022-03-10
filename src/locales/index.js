import { createI18n } from "vue-i18n";
import zhCN from "./lang/zh_CN";
import enUS from "./lang/en_US";

const i18n = createI18n({
  locale: 'zh_CN',
  globalInjection: true,
  global: true,
  messages: {
    'zh_CN': zhCN,
    'en_US': enUS
  }
})

export default i18n