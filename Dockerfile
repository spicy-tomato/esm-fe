FROM node:16-alpine as base
RUN npm i -g pnpm

FROM base as dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install
COPY ./ /app/
ARG configuration=production
RUN pnpm run build --configuration $configuration
