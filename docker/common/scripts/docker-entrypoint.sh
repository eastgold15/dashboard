#!/bin/sh
set -e

# 等待其他服务就绪
./health-check.sh

# 启动应用
exec "$@"