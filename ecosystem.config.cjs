const path = require('node:path')

module.exports = {
  /**
   * Application configuration section
   * https://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'water', // 应用名称
      script: path.resolve(__dirname, './.output/server/index.mjs'), // 直接使用构建后的入口文件
      instances: 'max', // 根据可用CPU核心自动调整实例数
      exec_mode: 'cluster', // 使用集群模式提高性能
      autorestart: true,
      watch: false, // 是否监视文件变化并自动重启应用（通常在开发模式下使用）
      max_memory_restart: '512M', // 当内存使用超过这个值时重启应用
    },
  ],
}
