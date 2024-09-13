

## 介绍 WSL

Windows Subsystem for Linux (WSL) 是微软为Windows 10及更高版本操作系统开发的一个功能组件，它允许用户在Windows环境中直接运行原生的Linux命令行工具、应用程序和服务，而无需使用传统的虚拟机或双启动环境。WSL通过在Windows内核上实现一个轻量级Linux内核接口层，使得Linux ELF64二进制文件能够在Windows上无缝运行。

## 为什么用 wsl

linux 环境先让更适合做开发, 因为开发完后的代码, 基本都需要放到 linux 服务器上

直接在 linux 上开发的话, 一些 GUI 操作的软件生态不如windows, 比如 录屏/会议软件/等

而 wsl 就做到了 `我全都要`, 既又 GUI 软件生态, 又可以使用 linux 开发环境

## wsl 基本使用

### 开启 WSL 支持

0. 进入 bios 确保开启了 虚拟化功能
1. 打开控制面板
2. 寻找并进入`程序` -> `卸载程序` -> `启用或关闭Windows功能`
3. 在弹出的窗口中，滚动找到 `适用于Linux的Windows子系统` 选项，并勾选它
4. 点击 `确定` 保存更改，系统可能会要求你重启计算机以完成安装
5. 启用 wsl2

```sh
# 开启 wsl2 支持
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

# 查看是否安装成功
wsl --help

# 设置 wsl 默认版本
wsl --set-default-version 2
```

## 使用

### 安装 linux

1. 查看可以安装的 linux 版本 `wsl --list --online`

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20240411190715.png)

2. 安装(以 Ubuntu-20.04 为例)

```sh
wsl --install -d Ubuntu-20.04
```

3. 初始化用户名和密码

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20240411191108.png)

### 启动/停止/删除/查看运行状态

```sh
# 启动
wsl -d Ubuntu-20.04

# 停止
wsl -t Ubuntu-20.04

# 删除发行版
wsl --unregister Ubuntu-20.04
```

### 导出/导入备份

类似虚拟机快照功能

```sh
# 导出
wsl --export Ubantu-20.04  ./ubuntu-docker.tar

# 导入
wsl --import ubuntu-docker ./ubuntu-docker.tar
```

## 注意事项

### 代理

由于很多软件可能都需要访问外网, 所以有时候就需要用到代理, 比如安装 docker

1. clash 开启 TUN 模式
2. 代理的地址不是 `127.0.0.1` 而是 `windows 系统的 ip 地址`
3. windows 查看本机的 ip 地址, `win+r` 输入 `cmd` 然后输入 `ipconfig`

### vim/nvim 粘贴板

虽然可以很方便的使用 vscode 直接打开文件操作, 但是有一些系统配置文件需要 root 权限才能修改, 这就不方便用 code 命令来编辑了, 比如 `/etc/hosts`
此时就需要再 vim/nvim 中使用 windows 的粘贴板

::: code-group

```vim {vim}
set clipboard+=unnamedplus
```

```lua {neovim}
vim.opt.clipboard = 'unamed,unmaedplus'
```

:::

### apt 包管理器换源

1. 百度搜索你安装的linux版本如何换源, 如: `Ubuntu-20.04 中国镜像源`
2. 备份 `cp /etc/apt/source.list /etc/apt/source.list.bak`
3. 修改 `/etc/apt/source.list` 内容为中国镜像源
4. 更新源 `sudo apt-get update`

### brew 包管理器

如果你使用的是 Debian/或者比较老的 Ubuntu-16.04, 那么用 apt-get 命令安装的软件可能比较老旧了,
比如 neovim很多插件需要 0.8.x 以上版本, apt 包管理器安装的版本是比较旧的, 此时想要用比较新的版本就可以使用 brew 包管理器

[推荐阅读文档](https://docs.brew.sh/Homebrew-on-Linux) 不同的linux可能需要安装不同的依赖

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### python 开发环境搭建

1. 安装 python-env/conda
2. pip 换中国源

### node 开发环境搭建

1. 安装 fnm/nvm
2. 安装包管理工具 pnpm(可选但推荐)
3. 安装源管理工具 nrm

### rust 开发环境搭建

1. 安装 rustup
2. 搜索 rsproxy 并 换源
