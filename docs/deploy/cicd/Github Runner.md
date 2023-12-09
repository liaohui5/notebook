---
outline: deep
---

## 在线文档

- [英文](https://docs.gitlab.com/ee/ci/yaml/)
- [中文](https://docs.gitlab.cn/jh/ci/)

## 笔记对应的代码

- [笔记对应的代码](https://gitlab.com/liaohui5/learn-gitlab-runner-demo)
- [效果预览](https://learn-gitlab-runner-demo-liaohui5-8f69af01bb7c24058e076a5197bc1.gitlab.io/)

## 将项目部署到 GitLab Pages

> 说明

跟 Github Actions 一样还是部署 vitepress 项目

> 注意

公司内部的文档项目可能是这样部署的, 如果用的是社区免费版本自建的 gitlab 服务器,
那么需要登录管理员去开启 Pages 功能, 因为 Pages 功能默认是关闭的, 如果只是学习
的话, 建议直接使用 [gitlab.com](https://gitlab.com)

### 1.修改 vitepress 配置

修改 `outDir` 字段, [参考官方文档](https://vitepress.dev/guide/deploy#gitlab-pages)

```js
export default {
  outDir: '../public',
};
```

> 注意与 Github Pages 的不同, 不需要设置 `base` 字段

因为 Github Pages 生成的域名是这样的 `https://<user-name>.github.io/<repo-name>`

而 GitLab pages 生成的域名是这样的 `https://<repo-name>-<username>-<hash>.gitlab.io`

所以 Github Pages 是必须设置 `base` 字段的, 但是 GitLab Pages 是不需要的, 你可以[查看 vitepress 文档](https://vitepress.dev/reference/site-config#base)

- \<user-name\>: 平台账号名
- \<repo-name\>: 仓库名
- \<hash\>: 随机30位字符串

> 为什么要修改 `outDir` 字段?

经测试, 不改成 `../public` 无法部署成功, 所以就必须设置 vitepress 打包结果输出目录

### 2.创建 gitlab CICD 配置文件

在项目根目录下新建 `.gitlab-ci.yml` 内容如下:

[参考 vitepress 文档](https://vitepress.dev/guide/deploy#gitlab-pages)

```yml
# 配置文件字段可参考: https://docs.gitlab.cn/jh/ci/yaml/gitlab_ci_yaml.html
# 使用的容器: https://hub.docker.com/_/node
# 使用的容器的版本tag: 18
image: node:18
pages:
  cache:
    paths:
      # 下次运行使用的缓存, 不要重复的下载已有的 node_modeuls
      - node_modules/

  # 要执行的脚本: 先安装依赖, 然后打包
  script:
    # - apk add git # 如果使用特别精简的 docker 镜像版本, 比如 alpine, 需要先安装 git
    - npm install
    - npm run docs:build

  # 产出结果的目录
  artifacts:
    paths:
      - public

  # 当提交 main 分支代码的时候执行
  only:
    - main
```

### 3. 运行&查看 gitlab runner 执行和输出

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312090426714.png)

## 将项目部署到服务器
