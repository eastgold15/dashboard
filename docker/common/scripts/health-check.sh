#!/bin/sh
set -e

echo "Checking application health..."
curl --fail http://localhost:4000/health || exit 1