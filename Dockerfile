# 使用与项目匹配的 Node 版本
FROM node:23.9.0-alpine

# 设置工作目录
WORKDIR /app

# 安装 PM2
RUN npm install -g pm2

# 复制构建产物和配置文件
COPY .output ./.output
COPY ecosystem.config.js ./

# 设置环境变量
ENV NODE_ENV=production \
    NITRO_PRESET=node \
    TZ=Asia/Shanghai

# 设置非 root 用户
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    apk add --no-cache tzdata curl && \
    chown -R appuser:appgroup /app

USER appuser

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
# 启动命令
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]
