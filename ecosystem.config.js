module.exports = {
  /**
   * Application configuration section
   * https://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'water', // 应用名称
      script: 'nuxt.ts', // 启动脚本，对于 Nuxt.js 通常是 nuxt.js 或 nuxt-ts (如果使用 TypeScript)
      args: 'start', // 传递给脚本的参数，通常是启动命令
      instances: 1, // 启动的实例数量
      exec_mode: 'fork',
      // fork模式，适合单服务器
      autorestart: true,

      watch: false, // 是否监视文件变化并自动重启应用（通常在开发模式下使用）
      max_memory_restart: '512M', // 当内存使用超过这个值时重启应用
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
        NITRO_PRESET: 'node',
      },
    },
  ],

  /**
   * Deployment section
   * https://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      'user': 'root', // SSH 用户名
      'host': '47.109.24.194', // SSH 主机名或 IP 地址
      'ref': 'origin/main', // Git 仓库的分支
      'repo': 'git@github.com:eastgold15/dashboard.git', // Git 仓库的 URL
      'path': '/nuxt3/water-dashboard', // 远程服务器上的部署路径
      'pre-deploy': 'git pull',
      'post-deploy':
        'pnpm install && '
        + 'pnpm build && '
        + 'pm2 reload ecosystem.config.js --env production', // 部署后执行的命令
    },
  },
}

// pm2 start ecosystem.config.js --env production    PM2 使用 ecosystem.config.js 文件中的配置来启动应用。您还可以通过添加 --env 参数来指定环境
