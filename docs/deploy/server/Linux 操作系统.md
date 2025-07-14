## 介绍

Linux 以高效性和灵活性著称, 具有真正的多任务、多用户能力, 在服务器设备上广泛使用, 互联网大多数服务器都是架构在 Linux 之上的

> 疑问: 为什么要学这个? 这不是专业运维干的活吗?

这是一个我前端的同事问我的问题, 九年义务教育也不光只是学习 语文和数学 这两门课,
让你识字识数就算完事了, 不还得学生物/化学等看起来平常用不到的这些课吗? 这是一个人的基本常识啊

同样的, 作为开发者, 不说玩的多溜, 至少要玩得转, 基本操作总得会吧

## 发行版本

- 发行版本了解 debian/centos/ubuntu

## 环境搭建

- 在虚拟机中需要的系统, 然后配置网络, 最后用 ssh 客户端去连接

## 命令用法查询

```
man [command]
```

- [在线查询命令用法的工具](https://github.com/jaywcjlove/linux-command)

## 文件管理

- ls
- cd
- cp
- ln
- mv
- touch
- cat
- whereis
- find
- tar
- zip
- chmod
- vim 查看/编辑文件

## 用户管理

- useradd/userdel
- groupadd/groupdel
- passwd

## 进程管理

- ps
- top/htop
- kill
- systemd/services

## 网络

- ssh
- sftp
- curl/wget
- ifconfig/ipaddr
- ping
- netstat
- lsof

## 软件管理

- 换源(服务器在国外速度会很慢, 具体操作各个发行版本不同)
- yum/apt/pacman

## 容器化

- docker

## 部署前端项目

- 安装 nginx
- 修改配置文件

## debian/ubuntu 配置网络

因为如果使用默认的 dhcp 那么每次开机都不一样, 不利于用ssh远程链接

```sh
# 查看 ip 地址信息
ip addr
```

### ubuntu18

1. 创建 `/etc/netplan/01-network-config.yaml` 文件, 在其中添加如下配置

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3:
      dhcp4: false
      addresses:
        - 192.168.2.33/24
      gateway4: 192.168.2.1
      nameservers:
        addresses:
          - 114.114.114.114
          - 114.114.115.115
          - 8.8.8.8
```

### ubuntu22

1. 创建 `/etc/netplan/01-network-config.yaml` 文件, 在其中添加如下配置

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s3: # 注意修改 enp0s3 为你的网卡名称(ip addr 可查看)
      dhcp4: false
      addresses:
        - 192.168.2.11/24 # ip 地址
      routes: # 注意这里和 ubuntu18 不一样, 不能再使用 gateway 字段
        - to: default
          via: 192.168.2.1 # gateway 地址
      nameservers:
        addresses: # dns
          - 114.114.114.114
          - 8.8.8.8
```

2. 应用配置文件

```sh
# 测试是否有错误, yaml 都是缩进, 容易出错
netplan try

# 应用配置文件
netplan apply
```

### debian12

创建 `/etc/network/interfaces.d/01-network-config` 文件, 在其中添加如下配置

```sh
# 注意: enp0s3 是网卡名称(ip addr 可查看),如果不是这个需要手动修改
# 最好删除中文注释, 我这里是为了做笔记
allow-hotplug enp0s3
iface enp0s3 inet static
    address 192.168.2.22  # ip
    netmask 255.255.255.0 # 掩码
    gateway 192.168.2.1   # gateway
    dns-nameservers 114.114.114.114 223.5.5.5 8.8.8.8 # dns
```

```sh
# 应用配置文件
systemctl restart networking
```

## 配置 ssh 远程链接

默认情况下, 可能没有安装 `openssl-server`

### 安装 ssh 服务

```sh
# 注意如果速度慢可以换中国源, 所谓换源就是
# 修改配置文件, 搜索一下就会了
# 如果是 debian12 可能默认没有 sudo 命令
sudo apt-get install openssh-server -y
```

### 修改配置文件

```sh
# 先备份防止修改错误
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
vi /etc/ssh/sshd_config
```

配置文件内容如下, 可以搜索然后取消注释, 也可以直接覆盖
原文件内容, 因为有备份, 所以不用怕

```sh
Port 22
ListenAddress 0.0.0.0
ListenAddress ::
PermitRootLogin yes
PasswordAuthentication yes
```

- Port: ssh 服务端口号
- ListenAddress: 允许连接的 ip 地址
- PermitRootLogin: 是否允许 root 用户登录
- PasswordAuthentication: 是否允许密码验证

```sh
# 重启服务 & 查看服务状态
systemctl restart sshd
systemctl status sshd
```

此时, 如果都没有报错, 那么就可以用宿主机去链接测试了

```sh
# 注意换成你自己的ip
ssh root@192.168.5.11
```
