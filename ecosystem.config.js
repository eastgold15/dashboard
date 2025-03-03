module.exports = {
  /**
   * Application configuration section
   * https://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'water', // 应用名称
      script: 'nuxt.ts',   // 启动脚本，对于 Nuxt.js 通常是 nuxt.js 或 nuxt-ts (如果使用 TypeScript)
      args: 'start',       // 传递给脚本的参数，通常是启动命令
      instances: 1,        // 启动的实例数量
      autorestart: true,   // 当应用崩溃时自动重启
      watch: false,        // 是否监视文件变化并自动重启应用（通常在开发模式下使用）
      max_memory_restart: '1G', // 当内存使用超过这个值时重启应用
      env: {
        NODE_ENV: 'production' // 设置环境变量
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * https://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'username',      // SSH 用户名
      host: 'hostname',      // SSH 主机名或 IP 地址
      ref: 'origin/master',  // Git 仓库的分支
      repo: 'repo_url',      // Git 仓库的 URL
      path: '/var/www/app',  // 远程服务器上的部署路径
      'post-deploy': 'npm install && pm2 startOrReload ecosystem.config.js --env production' // 部署后执行的命令
    }
  }
};


// pm2 start ecosystem.config.js --env production    PM2 使用 ecosystem.config.js 文件中的配置来启动应用。您还可以通过添加 --env 参数来指定环境
