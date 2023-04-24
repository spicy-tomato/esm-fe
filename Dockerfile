FROM node:16-alpine as base
RUN npm i -g pnpm

FROM base as dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:1.24
COPY --from=dependencies /app/dist/out/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
