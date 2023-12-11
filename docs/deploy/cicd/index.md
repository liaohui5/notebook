

## 什么是 CI & CD

CICD 其实是以下几个单词组合, 翻译成中文就是: 持续集成, 持续部署, 持续交付

- CI: continuous integration
- CD: continuous deployment / continuous delivery

## 为什么要使用?

因为高效, 需要配置一次, 后面就可以自动部署

## 有哪些方案?

- [Github Actions](https://docs.github.com/en/actions) 很多开源项目都是用的这种
- [Gitlab Runner](https://docs.gitlab.com/runner/configuration/advanced-configuration.html) 公司一般用的都是自建的 Gitlab,
  推荐使用 Gitlab, 因为工作中可能会用到, 而且有[中文文档](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)
- [Gitea Actions](https://docs.gitea.com/zh-cn/next/usage/actions/quickstart) 暂时(2023年)还不推荐, 因为这个功能还在开发中, 不太稳定...
  这个项目有Go 语言开法, 比 gitlab 更加轻量, 占用资源更少, 如果你只是需要一个管理代码仓库的项目, 它也是不错的选择, 速度很快, 而且是国人开发的,
  国际化(中文文档)做得比 gitlab 好, 是个值得关注的开源项目
