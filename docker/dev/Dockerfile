FROM node:22-alpine

# 设置工作目录
WORKDIR /app

# 安装依赖
RUN npm install -g pnpm

# 复制源代码 .代表当前构建上下文，就就是你执行docker build -f docker/dev/Dockerfile -t myapp:dev .  的目录  开发环境 源代码通过volume挂载到容器中，安装依赖就好
# 只复制依赖相关文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install

# 启动开发服务器
CMD ["pnpm", "dev"]
