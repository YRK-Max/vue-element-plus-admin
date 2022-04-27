import ls from "@/utils/storage";
import { createI18n } from "vue-i18n";
import enUS from "./lang/en_US";
import zhCN from "./lang/zh_CN";

const i18n = createI18n({
  legacy: false,
  locale: ls.get('locale') || 'zh_CN',
  globalInjection: true,
  global: true,
  messages: {
    'zh_CN': zhCN,
    'en_US': enUS
  }
})

export default i18n