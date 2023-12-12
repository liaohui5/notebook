## 什么是 CI & CD

CICD 其实是以下几个单词组合, 翻译成中文就是: 持续集成, 持续部署, 持续交付

- CI: continuous integration
- CD: continuous deployment / continuous delivery

说简单点那就是:将部署项目写成配置文件, 开发人员只管提交代码就可以自动构建然后部署到的服务器上去

## 为什么要使用?

因为高效, 需要配置一次, 后面就可以自动部署

## 有哪些方案?

- [Github Actions](https://docs.github.com/en/actions) 很多开源项目都是用的这种, 很方便, 功能也很强大, 缺点也很明显, 非开源, 企业是无法部署一套到自己的服务器上
- [Gitlab Runner](https://docs.gitlab.com/runner/configuration/advanced-configuration.html) 公司一般用的都是自建的 Gitlab,
  推荐使用 Gitlab, 因为工作时可能会用到, 而且有[中文文档](https://docs.gitlab.com/runner/configuration/advanced-configuration.html),
  优点就是功能齐全, 但是缺点也很明显, 就是资源占用较大
- [Gitea Actions](https://docs.gitea.com/zh-cn/next/usage/actions/quickstart) 暂时(2023年)还不推荐, 因为这个功能还在开发中, 而且 gitea.com 的项目是无法直接运行
  actions 来测试的, 一直显示等待中... 这个项目由 Go 语言开发, 比 gitlab 更加轻量, 占用资源更少, 如果你只是需要一个管理代码的工具, 它也是不错的选择, 速度很快, 是
  个值得关注的开源项目

虽然还有其他的CICD工具, 如: Jenkins, Drone, GoCD 等, 但是那些都不带有管理代码库的功能...

## 所谓 CICD 的原理

虽然这些软件听着很多, 名字也各不相同, 但是原理都是大同小异的

1. 将代码代码管理工具: gitlab/github/gitea
2. 提交带有 cicd 配置文件的代码, 如: `gitlab-ci.yml`
3. 通过软件(Runner)来读取 cicd 配置文件, 然后执行相应的步骤

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312120222606.png)
