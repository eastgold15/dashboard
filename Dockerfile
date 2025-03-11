# 使用与项目匹配的 Node 版本
FROM node:23.9.0-alpine

# 设置工作目录
WORKDIR /app

# 复制构建产物
COPY .output ./.output

# 验证构建产物完整性
RUN ls -la .output/server/ && \
    test -f .output/server/index.mjs || echo "构建产物不完整"

# 设置环境变量
ENV NODE_ENV=production \
    NITRO_PRESET=node \
    TZ=Asia/Shanghai \
    DEBUG=nuxt:*,nitro:*


# 设置非 root 用户
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    apk add --no-cache tzdata curl && \
    chown -R appuser:appgroup .output

USER appuser

# 暴露端口
EXPOSE 3000

# 启动命令
# CMD ["node", ".output/server/index.mjs"]
# 启动命令 - 使用更详细的日志
CMD ["node", "--trace-warnings", ".output/server/index.mjs"]
