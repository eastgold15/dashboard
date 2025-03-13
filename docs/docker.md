# Docker 配置说明

## 开发环境

````bash
cd docker/dev
docker-compose up --build

```js
d:\1codespace\flutter\web\dashboard
├── docker/
│   ├── common/
│   │   ├── Dockerfile.base    # 基础镜像配置
│   │   ├── nginx/            # Nginx 配置目录
│   │   │   └── conf.d/       # Nginx 配置文件
│   │   └── scripts/          # 共享脚本目录
│   │       ├── docker-entrypoint.sh
│   │       └── health-check.sh
│   ├── dev/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── .env.dev
│   └── prod/
│       ├── Dockerfile
│       ├── docker-compose.yml
│       └── .env.prod
├── .devcontainer/
│   └── devcontainer.json
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI 工作流
│       └── cd.yml            # CD 工作流
├── docs/                      # 项目文档目录
│   ├── docker.md             # Docker 相关文档
│   └── deployment.md         # 部署文档
└── README.md
```
````
