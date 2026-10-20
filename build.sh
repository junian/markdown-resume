#!/usr/bin/env bash

set -euo pipefail
cd "$(dirname "$0")"

pnpm install --frozen-lockfile
pnpm run release

echo "Build complete: site/.output/public"
echo "Run pnpm serve to preview at http://localhost:3000"
