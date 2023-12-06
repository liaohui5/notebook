FROM node:lts-alpine AS build-app

# 1.set work directory
WORKDIR /app

# 2.copy source code to docker image
COPY . /app

# 3.config npm registry
RUN npm config set registry https://registry.npm.taobao.org

# 4.install dependences and build
RUN npm install pnpm -g && \
  pnpm install --frozen-lockfile && \
  pnpm run build

RUN echo "🎉 build completed"

# 5.deploy with nginx
FROM nginx:stable AS deploy-app

COPY --from=build-app /app/src/.vitepress/dist /usr/share/nginx/html/dist
COPY --from=build-app /app/nginx.conf          /etc/nginx/nginx.conf

RUN echo "🎉 deploy completed"

