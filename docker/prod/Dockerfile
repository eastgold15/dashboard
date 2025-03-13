# 使用与项目匹配的 Node 版本
FROM node:22.14.0-alpine

# 设置工作目录
WORKDIR /app

# 安装 PM2 和必要工具
RUN npm install -g pm2 && \
    apk add --no-cache tzdata curl

# 复制构建产物和配置文件
# 注意：这里的路径是相对于 docker build context 的
COPY docker/prod/.output ./.output
COPY docker/prod/ecosystem.config.cjs ./

# 使用 PM2 启动应用
CMD ["pm2-runtime", "ecosystem.config.cjs"]
