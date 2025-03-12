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

# 设置环境变量
ENV NODE_ENV=production \
    NITRO_PRESET=node \
    TZ=Asia/Shanghai

# 设置非 root 用户
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# 暴露端口
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]
