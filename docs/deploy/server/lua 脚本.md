## 介绍

万能胶水语言, 优雅小巧, 灵活强大

## lua 能做什么

- redis 使用 lua 脚本
- nginx 使用 lua 脚本
- neovim lua 脚本配置文件
- wezterm lua 脚本配置文件
- 手机端游戏热更新
- 嵌入式开发
- 编写鼠标宏等...

## 安装

```sh
brew install lua
```

## 快速开始

```sh
echo -e "print(\"world\")" >> hello.lua
lua ./hello.lua
```

## 变量

### 定义变量

```lua
str1="hello"
local str2="world"
```

### 变量类型

```lua
--Nil      :空(类似其他编程语言的 null)
--String   :字符串
--Number   :数值
--Table    :元组
--Function :函数
--Userdata :用户数据
--Thread   :线程
```

### 变量作用域

```lua
-- 全局作用域
str1="hello"

-- 当前(模块/函数)作用域
local str2="world"
```

## 函数

```lua
function hello()
    print("hello world")
end

-- 可以如 js 一样, 直接将函数赋值给一个变量
local hello = function () {

}
```

## 面向对象

## 模块化

## 内置API

### string

### table

### math

### date
