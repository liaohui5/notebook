---
outline: deep
---

## Github Action 文档

如果还需要更多关于 github action 相关的知识, [可以看这里](https://docs.github.com/en/actions)

## 笔记对应的代码

[https://github.com/lh5sa/learn-github-actions-demo](https://github.com/lh5sa/learn-github-actions-demo)

## 部署项目到 Github Pages

> 为什么部署 `vitepress` 项目作为示例?

因为 vitepress 项目也需要编译, 部署步骤和部署 vue.js 项目是一样的

> 为什么部署到 `Github Pages` ?

因为很多开源项目都是用这种方式部署的, 如果你想写个不错的开源产品, 在线文档是必不可少的, 那么 Github Pages 就是一个很好的选择

### 1. 新建 Github 仓库, 开启 Github Pages 功能

仓库名是很重要, 如: `learn-github-actions-demo`

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312070339373.png)

### 2. 修改 vitepress 的配置

配置 vitepress 代码的 [base 字段](https://vitepress.dev/reference/site-config#base) 为 `/learn-github-actions-demo/`

```js
export default {
  base: '/learn-github-actions-demo/',
};
```

### 3. 创建 Github Action 配置文件

在项目根目录下创建 `.github/workflows/deploy.yml`, [参考vitepress文档](https://vitepress.dev/guide/deploy#github-pages):

```yml
# 工作流名称可以填写一些描述信息,这个配置文件是做什么用的
name: Deploy VitePress site to Pages

# 什么时候触发, 执行这个 Action
# 当代码提交到 main 分支的时候触发
on:
  push:
    branches: [main]

  # 允许手动在项目仓库主页的 Actions 中手动运行
  workflow_dispatch:

# 需要的权限有哪些
permissions:
  contents: read
  pages: write
  id-token: write

# 是否可以取消(如果 action 正在运行的时候)
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  #### 构建流程 ####
  build:
    runs-on: ubuntu-latest
    steps:
      # 下载仓库中的源代码
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      # - uses: pnpm/action-setup@v2 # Uncomment this if you're using pnpm
      # - uses: oven-sh/setup-bun@v1 # Uncomment this if you're using Bun

      # 安装 node 环境
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm # or pnpm / yarn

      # 配置 Github Pages
      - name: Setup Pages
        uses: actions/configure-pages@v3

      # 安装项目需要的依赖
      - name: Install dependencies
        run: npm ci # or pnpm install / yarn install / bun install

      # 执行打包
      - name: Build with VitePress
        run: |
          npm run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build
          touch docs/.vitepress/dist/.nojekyll

      # 上传打包后的结构, 注意 path, 如果你的不是 docs, 需要修改
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: docs/.vitepress/dist

  #### 部署到 Github Pages 流程 ####
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2
```

### 4. 执行 Github actions

只要将代码提交到远程仓库,就会自动执行, 如果没有自动执行, 也可以提交代码后, 去手动执行

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312070354674.png)

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312070356709.png)

## 部署项目到自己的服务器

### 1.准备步骤

前面创建仓库的步骤不变, 但是需要准备一台公网能够访问的服务器

### 2.创建 Repository secrets

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312070410503.png)

### 3.去 Github 创建 Token

[去 Github 创建一个 Token](https://github.com/settings/tokens) 并将它设置到 Repository secrets 中, 名字就叫 `TOKEN`

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312070501785.png)

### 4.创建 Github Action 配置文件

这个配置文件是将项目部署到服务器用的, 配置文件 `.github/workflows/deploy-to-server.yml`

```yml
name: Deploy VitePress site to Server

on:
  push:
    tags: ['v*'] # 推送 tag(以v开头) 的时候才执行

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  #### 构建流程 ####
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      # 安装 node 环境
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      # 安装项目需要的依赖
      - name: Install dependencies
        run: npm ci

      # 执行打包
      - name: Build with VitePress
        run: |
          npm run docs:build
          touch docs/.vitepress/dist/.nojekyll
          tar -zcvf release.tar.gz run.sh docs/.vitepress/dist
          # 使用 tar 命令压缩需要的文件方便发布release

      # 发布 Release
      - name: Create Release
        id: create_release
        uses: actions/create-release@master
        env:
          # 注意需要创建这个 Repository secrets 变量,
          # 这个的 TOKEN 就是第2,3步添加的 screts 变量的名字
          GITHUB_TOKEN: ${{ secrets.TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false

      # 上传打包结果到 Release
      - name: Upload Release Asset
        id: upload-release-asset
        uses: actions/upload-release-asset@master
        env:
          GITHUB_TOKEN: ${{ secrets.TOKEN }}
        with:
          upload_url: ${{ steps.create_release.outputs.upload_url }}
          asset_path: ./release.tar.gz
          asset_name: release.tar.gz
          asset_content_type: application/x-tgz

  #### 部署到服务器流程 ####
  deploy:
    needs: build # 需要等待构建完成
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to Server
        id: deployment
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_ADDR }}
          username: ${{ secrets.SERVER_USER }}
          password: ${{ secrets.SERVER_PASS }}
          port: ${{ secrets.SERVER_PORT }}
          script: |
            rm -rf ~/learn-github-actions-demo    # 清除上次打包缓存, 考虑多次打包的问题
            mkdir -p ~/learn-github-actions-demo  # 创建目录
            cd ~/learn-github-actions-demo        # 进入目录
            # 下载打包结果, 注意这个链接: 必须是你自己的 github 账号名字 和 代码仓库名字
            wget https://github.com/lh5sa/learn-github-actions-demo/releases/latest/download/release.tar.gz -O release.tar.gz 
            tar -zxvf release.tar.gz              # 解压

            # 运行部署脚本(如果你会写 shell 脚本的话, 也可以将上面的步骤写到这个脚本里, 然后直接运行)
            chmod +x ./run.sh && ./run.sh
```

### 5. 创建在服务器执行的shell脚本

这里用 docker 方式部署, shell 脚本: `./run.sh`

```sh
#!/bin/bash

# docker 镜像和容器名
docker_image_name="nginx:stable"
docker_container_name="learn-github-action-demo"

# 先停止原来的
docker stop $docker_container_name
docker rm $docker_container_name

# 启动容器, 注意端口不能被占用, 否则会部署失败
docker run -d \
	-p 80:80 \
	-v $(pwd)/docs/.vitepress/dist:/usr/share/nginx/html \
	--name $docker_container_name $docker_image_name

# 注意路径: 因为现在用的是 nginx:stable 默认的配置文件,
# 并没有映射新的配置文件, 所以容器内的路径必须是这个路径
```

### 6.修改 vitepress 配置

由于没有映射自定义的配置文件到 `nginx:stable` 容器中, 使用的是默认的配置文件,
那么这个步骤必不可少, 否则静态资源加载失败

```js
export defalt {
  base: '/',
}
```

> 注意:

如果你将 main 分支的代码改成这个这样的话部署到 Github Pages 的的项目资源加载就出问题了,
如果是根据我的文档来的建议再新建一个分支然后创建tag, 提交这个分支的代码就不会触发 `deploy.yml`
而只会触发 `deploy-to-server.yml`, 这样的话两个都不会出问题

### 7.执行 Github Action

注: Git 提交代码时要打 `tag` 然后提交才会执行(或者去 github 手动执行), 这个执行条件是卸载 yml 配置文件中的

### 部署到服务器注意点

1. 服务器需要有 docker 环境
2. 这个部署脚本用的是 80 端口, 不能被占用, 否则会部署失败
3. 只有提交 tag 的时候, 才会执行这个 Github Actins
4. 注意 vitepress 的 `base` 配置
