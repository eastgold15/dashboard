# 使用与项目匹配的 Node 版本
FROM node:23.9.0-alpine

# 设置工作目录
WORKDIR /app

# 安装 PM2 和必要工具
RUN npm install -g pm2 && \
    apk add --no-cache tzdata curl

# 复制构建产物和配置文件
COPY .output ./.output
COPY ecosystem.config.cjs ./

# 使用 PM2 启动应用
CMD ["pm2-runtime", "ecosystem.config.cjs"]
