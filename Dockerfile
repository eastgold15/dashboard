# 使用与项目匹配的 Node 版本
FROM node:23.9.0-alpine

# 设置工作目录
WORKDIR /app

# 复制构建产物
COPY .output ./.output

# 设置环境变量
ENV NODE_ENV=production \
    NITRO_PRESET=node \
    TZ=Asia/Shanghai

# 设置非 root 用户
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    apk add --no-cache tzdata

USER appuser

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", ".output/server/index.mjs"]
