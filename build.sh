#!/usr/bin/env bash

pnpm install --frozen-lockfile
pnpm release

# echo "https://markdown-resume-app.netlify.app/ https://www.junian.dev/markdown-resume/ 301" > site/dist/_redirects
# echo "https://markdown-resume-app.netlify.app/* https://www.junian.dev/markdown-resume/:splat 301" >> site/dist/_redirects
