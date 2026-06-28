## 什么是 ssh 协议

SSH 是 Secure Shell(安全外壳协议)的缩写, 它是一种网络协议, 用于在不安全的网络环境中安全地远程登录、执行命令和传输文件
简单来说, 它就像一个加密的隧道, 让你可以安全地操控远方的电脑, 不用担心密码或数据被窃听。

### 为什么要使用 ssh 协议?

linux 服务器不像 WindowsServer, 一般来说为了性能不会带有图形化桌面, 而是只有一个黑乎乎的窗口,
通过 shell(或者通俗点说:通过输入命令)与 linux 操作系统交互, 此时为了安全的远程登录计算机, 就需要
一个安全的,加密的隧道, 让你可以安全地操控远程的电脑, 不用担心密码或数据被窃听

### ssh 协议的几个特点

- 机密性: 所有数据都加密传输，防止窃听
- 完整性: 确保数据在传输过程中没有被篡改
- 认证: 验证 "你是谁", 防止有人冒充服务器或用户

### 它是怎么工作的?

SSH 采用经典的C/S(客户端/服务器)模型:

1. 你的电脑运行 SSH 客户端(如 ssh 命令)
2. 远程服务器运行 SSH 服务端(一般是 sshd)
3. 客户端连接服务端的 22 端口(默认,是可修改的), 双方进行一次密钥交换, 建立一个加密通道
4. 之后, 所有通信都在这个安全的通道中进行

### 协议内部的 `三层结构`

SSH 协议并非一个整体, 而是由三个子协议构成：

1. 传输层协议: 负责建立安全连接, 包括协商加密算法、交换密钥、验证服务器身份(通过主机密钥,防止你连接到伪造的服务器)
2. 用户认证协议: 在安全通道建立后, 验证你的身份, 也就是我们常用的密码认证和公钥认证(也包括键盘交互认证 mfa/otp)
3. 连接协议: 在认证通过后, 处理你想做的事情, 比如打开一个远程 Shell、执行一条命令, 或者开启端口转发、SFTP 文件传输等

### SSH 能做什么

1. 安全文件传输(scp/sftp): 通过安全的加密隧道传输文件不怕被篡改/窃听
2. 端口转发
3. 作为其他协议的底层安全层: git 可通过 ssh 传输代码, rsync 可通过 ssh 传输文件

### 什么是 sshd 服务

由上面的协议部分可知, sshd 就是 ssh 协议的服务端, 只不过大多数的 linux 发行版都默认将 sshd 作成了常驻后台(且开机自启)的服务

### 认证方式

如果将服务器比作你的赛博房子, 那么 ssh 就是进入你家门上最后一道锁, 使用什么级别的锁非常重要

- 密码认证: 基于文本字符串,最简单(容易被爆破),虚拟机默认是仅密码认证(云服务器默认可能是让你下载保存私钥)
- 私钥认证(包括带私钥本身带有密码): 基于文件内容, 安全性稍高一点(但是也存在私钥泄露的可能)
- 键盘交互认证(mfa/otp): 基于设备保存动态密码(不容易爆破)
- 组合认证: 认证方式是多选的, 可以多种方式组合 `密码+私钥认证` 也可以 `密码+交互认证` 也可以 `私钥+密码+交互认证`

## 客户端命令基本使用

- 服务端基本是默认配置好的,主要关注客户端如何用命令去链接

```sh
# 使用密码链接: ssh 用户名@主机地址 -p sshd监听端口
ssh root@192.168.2.11 -p 2233

# 使用私钥链接: ssh -i ~/.ssh/id_rda 用户名@主机地址 -p sshd监听端口
ssh -i ~/.ssh/id_rda root@192.168.2.11 -p 2233
```

## sshd 服务端配置

配置文件一般是: `/etc/ssh/sshd_config`

::: danger [建议]
在修改配置文件之前一定要备份: `sudo cp sshd_config sshd_config.bak`
:::

::: code-group

```ini [带有注释版本]
# 引入 sshd_config.d 目录下的所有配置文件
Include /etc/ssh/ssh_config.d/*.conf

##### 网络相关设置 #####
Port 22                # sshd 监听端口(默认 22)
#AddressFamily any     # 地址族, any(同时监听IPv4/IPv6)、inet(仅IPv4)、inet6(仅IPv6)
ListenAddress 0.0.0.0  # 监听地址，0.0.0.0 表示所有IPv4地址
ListenAddress ::       # 监听所有IPv6地址

# 主机私钥文件路径
#HostKey /etc/ssh/ssh_host_ecdsa_key     # 按照需要开启(默认注释)
HostKey /etc/ssh/ssh_host_rsa_key        # 兼容旧版本
HostKey /etc/ssh/ssh_host_ed25519_key    # 推荐使用(安全且速度快,当时可能旧版本不支持)

# 密钥重新协商的阈值(default 表示使用默认值)
RekeyLimit default none

#####日志相关设置 #####
SyslogFacility AUTH                # 系统日志设施
LogLevel INFO                      # 日志级别(DEBUG/INFO/)

##### 认证相关设置 #####
LoginGraceTime 2m          # 登录超时时间(秒或分钟)
StrictModes yes            # 是否严格检查用户主目录及密钥文件的权限
#MaxAuthTries 6            # 最大认证尝试次数(默认:6)
#MaxSessions 10            # 最大并发会话数(默认:10)
PermitRootLogin no         # 是否允许root登录(no:不许登录yes:允许登录/prohibit-password:默认值,允许但必须密钥登录)
PasswordAuthentication no  # 是否允许密码认证(默认:yes, 推荐关闭:容易被强行爆破)
UsePAM yes                 # 是否启用 PAM 认证,账户管理及会话处理
#KbdInteractiveAuthentication no # 是否启用键盘交互认证(默认:no, yes: 开启后可以启用 pam_google_authenticator 认证插件)
PubkeyAuthentication yes         # 是否允许公钥认证
#PermitEmptyPasswords no         # 是否允许空密码登录(默认:no)
AuthenticationMethods publickey  # 认证方式,可组合(password:默认密码认证,publickey:密钥认证,keyboard-interactive:键盘交互认证)
AuthorizedKeysFile .ssh/authorized_keys  # 授权密钥文件路径(登录用户目录下的 ~/.ssh/authorized_keys 文件)
#AuthorizedPrincipalsFile none           # 授权主体文件
#AuthorizedKeysCommand none              # 用于获取授权密钥的外部命令
#AuthorizedKeysCommandUser nobody        # 执行AuthorizedKeysCommand命令的用户
#HostbasedAuthentication no              # 是否启用基于主机的认证
#IgnoreUserKnownHosts no                 # 是否忽略用户已知主机文件(~/.ssh/known_hosts)中的记录
#IgnoreRhosts yes                        # 是否忽略用户的 ~/.rhosts 和 ~/.shosts 文件(默认:yes)

##### Kerberos 相关选项 #####
#KerberosAuthentication no     # 是否启用Kerberos认证(默认: no)
#KerberosOrLocalPasswd yes     # 是否在Kerberos认证失败时回退到本地密码
#KerberosTicketCleanup yes     # 是否在登出时清除Kerberos票据
#KerberosGetAFSToken no        # 是否获取AFS令牌

##### GSSAPI 相关选项 #####
#GSSAPIAuthentication no       # 是否启用GSSAPI认证
#GSSAPICleanupCredentials yes  # 是否在登出时清除GSSAPI凭据
#GSSAPIStrictAcceptorCheck yes # 是否严格检查GSSAPI接受方
#GSSAPIKeyExchange no          # 是否启用GSSAPI密钥交换

##### 端口转发相关选项 #####
#AllowAgentForwarding yes     # 是否允许SSH agent转发
#AllowTcpForwarding yes       # 是否允许TCP转发
#GatewayPorts no              # 是否允许绑定到非本地回环地址的转发端口
X11Forwarding yes             # 是否启用X11转发
#X11DisplayOffset 10          # X11转发的显示偏移量
#X11UseLocalhost yes          # 是否将X11转发绑定到本地回环地址
#PermitTTY yes                # 是否分配伪终端
PrintMotd no                  # 是否显示当日消息（motd）
PrintLastLog yes              # 是否显示上次登录信息
#TCPKeepAlive yes             # 是否启用TCP保活机制
#PermitUserEnvironment no     # 是否允许用户设置环境变量
#Compression delayed          # 是否压缩,delayed 表示认证后开启压缩
#ClientAliveInterval 0        # 客户端存活探测间隔（秒）
#ClientAliveCountMax 3        # 客户端未响应探测的最大次数
#UseDNS no                    # 是否使用DNS反向解析
#PidFile /run/sshd.pid        # PID文件路径
MaxStartups 10:30:100         # 未认证连接的最大并发数以及开始拒绝、全部拒绝的阈值(建议开启防止撞库爆破密码)
#PermitTunnel no              # 是否允许隧道
#ChrootDirectory none         # chroot目录
#VersionAddendum none         # 版本后缀字符串

##### 登录后显示的横幅文件路径 #####
#Banner none

##### 允许客户端传递的环境变量 #####
AcceptEnv LANG LC_* COLORTERM NO_COLOR

##### 定义子系统, 此处为sftp #####
Subsystem    sftp    /usr/lib/openssh/sftp-server

##### 匹配用户名，覆盖全局设置, 优先级更高 #####
#Match User anoncvs
#       X11Forwarding no
#       AllowTcpForwarding no
#       PermitTTY no
#       ForceCommand cvs server
```

```ini [没有注释版本]
Include /etc/ssh/ssh_config.d/*.conf

##### network #####
Port 22
#AddressFamily any
ListenAddress 0.0.0.0
ListenAddress ::

##### keys #####
#HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
RekeyLimit default none

##### loging #####
SyslogFacility AUTH
LogLevel INFO

##### Authentication #####
LoginGraceTime 2m
StrictModes yes
#MaxAuthTries 6
#MaxSessions 10
PermitRootLogin no
PasswordAuthentication no
UsePAM yes
#KbdInteractiveAuthentication no
PubkeyAuthentication yes
#PermitEmptyPasswords no
AuthenticationMethods publickey
AuthorizedKeysFile .ssh/authorized_keys
#AuthorizedPrincipalsFile none
#AuthorizedKeysCommand none
#AuthorizedKeysCommandUser nobody
#HostbasedAuthentication no
#IgnoreUserKnownHosts no
#IgnoreRhosts yes

##### Kerberos #####
#KerberosAuthentication no
#KerberosOrLocalPasswd yes
#KerberosTicketCleanup yes
#KerberosGetAFSToken no

##### GSSAPI #####
#GSSAPIAuthentication no
#GSSAPICleanupCredentials yes
#GSSAPIStrictAcceptorCheck yes
#GSSAPIKeyExchange no

##### Forwarding #####
#AllowAgentForwarding yes
#AllowTcpForwarding yes
#GatewayPorts no
X11Forwarding yes
#X11DisplayOffset 10
#X11UseLocalhost yes
#PermitTTY yes
PrintMotd no
PrintLastLog yes
#TCPKeepAlive yes
#PermitUserEnvironment no
#Compression delayed
#ClientAliveInterval 0
#ClientAliveCountMax 3
#UseDNS no
#PidFile /run/sshd.pid
MaxStartups 10:30:100
#PermitTunnel no
#ChrootDirectory none
#VersionAddendum none

##### banner #####
#Banner none

##### env #####
AcceptEnv LANG LC_* COLORTERM NO_COLOR

##### sftp #####
Subsystem    sftp    /usr/lib/openssh/sftp-server

##### override #####
#Match User anoncvs
#       X11Forwarding no
#       AllowTcpForwarding no
#       PermitTTY no
#       ForceCommand cvs server
```

:::

## 使用密钥登录

要使用密钥登录,确保配置文件中的选项允许密钥登录 `PubkeyAuthentication yes`

### 1.生成密钥(两种方式都可以)

```sh
# 1.使用 Ed25519 算法生成密钥(推荐)
# -f 表示生成到当前目录的 ed25519key 文件中
# -t 表示使用的算法
# -C 表示注释(附加信息)
# 会生成两个文件: ed25519key.pub(公钥) ed25519key(私钥)
ssh-keygen -f ./ed25519key -t ed25519 -C "your-email@example.com"

# 2.使用 rsa 算法生成密钥(兼容性高)
# 会生成两个文件: rsakey.pub(公钥) rsakey(私钥)
ssh-keygen -f ./rsakey -t rsa -b 4096 -C "your_email@example.com"
```

### 2.服务器设置

将公钥内容添加到服务器信任的密钥列表中(authorized_keys)

```sh
# 假设 ed25519key.pub 的内容是这样的
# 假设我登录的用户是: ubuntu 那么就是 /home/ubuntu/.ssh/authorized_keys
echo "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIB/uqOJ7DOqN+g/OKQ/axnwwAmZJuol0x+y6DWzrAXza your-email@example.com" >> ~/.ssh/authorized_keys
```

### 3.客户端使用私钥登录

刚才用的是 ed25519key.pub, 所以现在登录也应该用 ed25519key

```sh
# 注意使用自己的主机地址和密钥
ssh -i ./ed25519key ubuntu@192.168.1.21
```

## 增加 mfa 多因子认证方式

- MFA(Multi-Factor Authentication)意思是 `多因素认证` 是一种安全机制, 要求用户提供两种或以上不同类别的身份验证凭据才能访问系统, 这三类通常称为 `所知、所有、所是`
- OTP(One-Time Password，一次性密码)是指基于时间的仅能使用一次的临时密码,使用后立即失效,下次登录时需重新生成,即使攻击者截获了一个OTP,也无法再次使用它登录

### 安装 mfa 认证插件

```sh
# 安装 mfa 认证插件
sudo apt install libpam-google-authenticator

# 为当前用户生成密钥(会在用户的家目录下生成 .google_authenticator 文件)
google-authenticator

# 此时会出现一个二维码: 请使用手机客户端扫描(Google Authenticator, Microsoft Authenticator, Authy/ente auth)
# 然后输入出现的 otp 代码:
# 然后会问一些问题, 全部输入 y 即可
```

### 修改配置文件

1. 修改 `/etc/pam.d/sshd` 文件, 在文件最顶端加入这行代码

```txt
auth required pam_google_authenticator.so
```

2. 修改 `/etc/ssh/sshd_config` 文件, 确保这些配置选项存在并且值是这样的

```ini
UsePAM yes                                          # 允许 pam 认证
# ChallengeResponseAuthentication yes               # 这个是 KbdInteractiveAuthentication 的兼容写法(老版本)
KbdInteractiveAuthentication yes                    # 允许键盘交互认证
PasswordAuthentication yes                          # 允许密码认证
AuthenticationMethods password,keyboard-interactive # 必须同时通过密码认证和 MFA/OTP 认证

### 当然也可以与密钥认证组合
#PubkeyAuthentication yes                             # 允许密钥认证
#AuthenticationMethods publickey,keyboard-interactive # 必须同时通过密钥认证和 MFA/OTP 认证
```

3. 测试 sshd 配置文件是否有问题

```sh
# 如果没有输出错误信息,说明配置文件没有问题
sudo ssh -t
```

4. 重启并使用另一个ssh客户测试

```txt
sudo systemctl restart ssh
```

开源 ssh 客户端

- [eleterm](https://github.com/electerm/electerm)
- [ashell](https://github.com/rust-kotlin/ashell)
