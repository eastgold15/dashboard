/*
 * @Author: qianhua.xiong
 */
import zhMessages from '~/locales/zh-CN';
import enMessages from '~/locales/en';
export default defineI18nConfig(async () => ({
  legacy: false,
  locale: 'zh',
  messages: {
    zh: zhMessages,
    en: enMessages
  }
}))
