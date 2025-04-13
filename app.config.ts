export default defineAppConfig({
  // 在构建时确定的公共令牌，网站配置（如主题变体、标题）以及不敏感的项目配置等。
  /* 功能	runtimeConfig	app.config
  客户端端	已注入	已打包
  环境变量	✅ 是	❌ 否
  响应式	✅ 是	✅ 是
  类型支持	✅ 部分	✅ 是
  每个请求的配置	❌ 否	✅ 是
  热模块替换	❌ 否	✅ 是
  非原始JS类型	❌ 否	✅ 是 */

  appName: '水务Nuxt',
  appDescription: 'Nuxt Stater for Element Plus',
  // 主题配置
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000',
    },
  },
})
