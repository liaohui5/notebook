---
outline: deep
---

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
- [Gitea Actions](https://docs.gitea.com/zh-cn/next/usage/actions/quickstart) 可兼容 github actions 的开源 Runner... 这个项目由 Go 语言开发, 且完全开源, 但是比 gitlab 更加轻量,
  占用资源更少, 如果你只是需要一个轻量级的管理代码的工具和 CICD 工具, 它也是不错的选择, 速度很快, 是个值得关注的开源项目

虽然还有其他的CICD工具, 如: Jenkins, Drone, GoCD 等, 但是那些都不带有管理代码库的功能...

## 所谓 CICD 的原理

虽然这些软件听着很多, 名字也各不相同, 但是原理都是大同小异的

1. 将代码代码管理工具: gitlab/github/gitea
2. 提交带有 cicd 配置文件的代码, 如: `gitlab-ci.yml`
3. 通过 Runner (它是独立于代码管理库的软件)来读取配置文件
4. 执行相应的步骤

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202312120222606.png)

## ssh 远程链接的两种方式

### 通过用户名和密码

这是最常用的方式

```sh
ssh root@192.168.10.11 -p2233
```

### 通过私钥来链接,这样就不用输入密码

比如: `A服务器` 想要通过私钥来访问 `B服务器(www.demo.com)`, 那么就需要做以下几个步骤:

1. 生成1对公私钥, 执行命令后会生成2个文件 `id_rsa(私钥)` 和 `id_rsa.pub(公钥)`

```sh
# -C 这个其实是关于这两个key的一些描述, 可填写真实的邮箱
ssh-keygen -t rsa -b 2048 -C "email@example.com"
# 这个命令是交互式的: 他会问你一些问题, 如:
# 生成的文件存在哪里, 如: ./keys
# 设置密码(不需要就直接回车)
# 重复密码(不需要就直接回车)
```

2. 将公钥加入B服务器白名单,即将公钥内容追加到这个 `~/.ssh/authorized_keys` 文件中去
3. 在A服务器上执行如下命令:

```sh
# 如果没有 ssh-agent 命令, 需要安装这命令
eval $(ssh-agent -s)

# 私钥的路径
ssh-add ./id_rsa

# 将B服务器的域名或ip加入 A服务器的受信名单 ~/.ssh/known_hosts
# 不执行这个操作的话, 第一次链接时, 就会问你是否信任这个服务器
ssh-keyscan -H "www.demo.com" >> ~/.ssh/known_hosts
```

通过这3步操作后, A 服务器就可以使用 ssh 直接链接 B 服务器了

```sh
ssh -p22 user@www.demo.com "cd ~ && mkdir test-ssh-connect"
```
