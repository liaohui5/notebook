## 保护系统不被恶意攻击的一些技术了解

- 入侵检测系统(): 门口摄像头,只记录行为作为证据,并不直接拦截
- 入侵防御系统(): 门口的门卫,直接拦截恶意行为
- 防火墙: 开放/关闭入口的规则, 隔离内网/外网(严进宽出)
- 防水墙: 开放/关闭入口的规则, 隔离内网/外网(严出宽进), 防止重要信息泄露

## 防火墙有什么用?

简单来说就是: `控制网络流量, 过滤恶意黑客攻击行为, 保护系统安全`

举个例子: 假如说有这么一个网站 `www.example.com`
那么我就可以用 `ping www.example.com` 命令查询出这个网站的 ip 地址(如: 192.168.2.11)
人人都知道 sshd 监听的端口是 `22`, 我就可以写个程序不停的用不同的账户密码去ssh链接
(暴力破解这个服务器的用户名和密码), 此时可以

- sshd 监听端口修改为其他端口
- 使用 ufw 拒绝 22 端口所有进入的流量

以应对暴力破解密码

## 你是否需要防火墙

如果你使用的是 阿里云/腾讯云/华为云/甲骨文云 等等云服务商的 esc 服务器,
那么就不需要手动管理 ufw 规则, 它们一般有主机的网络安全组(其实就是防火墙)

## ufw

ufw(Ubuntu fire wall) 是由 ubuntu 开发的 iptables 的前端工具链
[官方文档](https://help.ubuntu.com/community/UFW) 用来快速生成 iptables 规则

### 快速开始

默认情况下: ufw 会禁止所有入站流量, 允许所有出站流量

```sh
# 1.安装: debian 默认是没有安装 ufw 的
sudo apt install -y ufw

# 2.查看 ufw 状态
sudo ufw status verbose
# Status: inactive, 说明没有启动

# 3.查看系统服务状态
sudo systemctl status ufw

# 4.启动 ufw 服务
sudo ufw enable

# 5.停止 ufw 服务
sudo ufw disabled

# 6.查看 ufw 所有规则
sudo ufw status numbered

# 7.删除 ufw 规则
sudo ufw delete [ruleId]

# 8.删除所有 ufw 规则并关闭服务
sudo ufw reset

# 9.允许某个端口协议入栈
sudo ufw allow 8888/tcp
```

### 测试脚本

```python
from http.server import HTTPServer, BaseHTTPRequestHandler
import json

class Handler(BaseHTTPRequestHandler):
    def handler(self):
        data = {"status": "ok", "message": "hello"}
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

HTTPServer(("0.0.0.0", 8888), Handler).serve_forever()
```

### 测试

1. 启动脚本: `python3 server.py`
2. 打开浏览器测试: `http://192.168.2.11`
3. 使用 ufw 关闭 `8888` 端口: `sudo ufw allow 8888/tcp`
4. 再次打开浏览器测试, 如果无法正常访问服务就说明拦截成功了

### 注意点

如果服务是通过 docker/docker-compose 启动的, 那么 ufw 会失效,
因为 docker 也会操作 iptables, 而且优先级比 ufw 更高

## 什么是 iptables

iptables 是 Linux 内核防火墙的核心用户态工具, 用于配置 netfilter 框架的包过滤规则

简单说, 它是一个命令行工具,让你能定义内核如何处理网络数据包(接受、拒绝、转发、修改等), 它通过表(table)和链(chain)组织规则(rule)

而 ufw 则是用于快速生成 iptables 的 rule 的简化工具
