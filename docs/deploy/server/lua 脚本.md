

## 介绍

万能胶水语言, 优雅小巧, 灵活强大, 执行效率最快的脚本语言

- [5.3 在线中文文档](https://cloudwu.github.io/lua53doc/contents.html#index)
- [最新版本英文文档](https://www.lua.org/docs.html)

## lua 能做什么

- redis 使用 lua 脚本
- nginx 使用 lua 脚本
- 一些软件的配置文件(如: neovim/wezterm)
- 手机端游戏热更新
- 嵌入式开发
- 编写鼠标宏

## 安装

```sh
brew install lua
```

## 快速开始

```sh
echo -e "print(\"world\")" >> hello.lua
lua ./hello.lua
```

## 注释

```lua
-- 单行注释

--[[
多行注释
多行注释
多行注释
]]
```

## 变量

### 定义变量

```lua
-- 定义变量
local val;

-- 定义变量并且赋值
local str = "hello world"

-- 连续声明并且赋值
local a,b,c = 1,2,3
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

-- 获取变量类型
local value;

print(type(value)); -- nil

value = 11
print(type(value)); -- number

value = 'str'
print(type(value)); -- string

value = {}
print(type(value)); -- table

value = function() end
print(type(value)); -- function
```

### 变量作用域

```lua
-- 全局作用域
str1 = "hello"

-- 局部作用域
local str2 = "world"
```

## 运算符

### 算术运算符

注: 和其他编程语言不同的是, 没有 `++` `--` `+=` `-+` 这些运算符

```lua
-- 加减乘除
print(1 + 1);
print(3 - 1);
print(2 * 2);
print(4 / 2);

-- 取余
print(4 % 3);

-- 幂
print(2 ^ 3); -- => 2 * 2 * 2 => 8

-- 负值
print(-1);

-- 整除
print(5 // 2); -- 2
```

### 关系运算符

```lua
-- 相等
print(1 == 1)

-- 不相等
print(1 ~= 1)

-- 大于, 大于等于
print(1 >= 1)

-- 小于, 小于等于
print(1 <= 1)
```

### 逻辑运算符

与其他编程语言不同的是不能使用 `&&` `||` `~` 这几个符号, 只能用这些关键字

```lua
-- 与
print(true and false)

-- 或
print(true or false)

-- 非
print(not true)
```

## 流程控制

```lua
local bool = true

-- 单分支
if bool then
  print("真")
end

-- 双分支
if bool then
  print("真")
else
  print("假")
end

-- 多分支
local n = 10;
if n < 10 then
  print("小于10")
elseif n > 10 then
  print("大于10")
else
  print("等于10")
end
```

## 循环

### for

- i: index, 从 1 开始
- 10: 结束值
- 2: 步长

```lua
for i=1,10,2 do
  -- 1,3,5,7,9
	print("value is :" .. i)
end
```

### while

注: 需要设置跳出循环的条件, 否则会死循环
和其他类 c 语言不同的是, 只有 while 语句, 没有 `do while` 语句

```lua
local i = 1;
while(i < 10) do
  print("i value is:" .. i);
  i = i+1;
end
```

### repeat + unitl

```lua
local i = 1;
repeat
    print("i value is:" .. i)
    i = i + 1;
until(i > 10)
```

### for + pairs 遍历元组

```lua
-- 数字下标
local t1 = { 11, 22, 33 };
for k,v in pairs(t1) do
  local str = string.format("key:%s, value:%s", k, v)
  print(str)
  -- key:1, value:11
  -- key:2, value:22
  -- key:3, value:33
end


-- 字符串下标
local t2 = {
  a = 10,
  b = 20,
  c = 30,
}
for k,v in pairs(t2) do
  local str = string.format("key:%s, value:%s", k, v)
  -- key:a, value:10
  -- key:b, value:20
  -- key:c, value:30
  print(str)
end
```

## 函数

### 内置函数

内置函数就是, 安装 lua 解释器后, 自带的函数, 如之前一直使用的 `print`

```lua
print("hello world")
```

### 自定义函数

```lua
-- 全局函数
function hello()
  print("hello ")
end

-- 局部函数
local function localHello()
  print("hello ")
end

-- 可以如 js 一样, 直接将函数赋值给一个变量
local world = function ()
  print(" world")
end

-- 赋值给元组的属性方法
local Man = {}
Man.run = function ()
  print("running")
end
```

## 面向对象

在 Lua 中，由于语言本身并未直接提供类和对象的概念，
面向对象的实现主要是通过使用 Lua 的表(table)和元表(metatable)来模拟类和对象的行为

### 实例化

```lua
local Person = {}

-- 类似 js 中的 constructor
function Person:new(name, age)
  local instance = {};
  setmetatable(instance, { __index = Person })
  instance.name = name
  instance.age = age
  return instance
end

function Person:sayHi()
    print("hi, my name is" .. self.name, "my age is " .. self.age)
end

-- 实例化
local p = Person:new("tom", 11);
p.sayHi();
```

### 继承

```lua
-- 父类
local Person = {};
function Person:new(name, age)
    local instance = {
        name = name,
        age = age
    };
    setmetatable(instance, {
        __index = Person
    })
    return instance
end

function Person:self_intro()
    print("Hello, my name is ".. self.name.. " and I am ".. self.age.. " years old.")
end

-- 继承父类: 类似于 js 的组合继承
-- 设置子类的 __index 和 metatable
function __inherit(parentClass)
    local childClass = {};
    childClass.__index = childClass;
    setmetatable(childClass, {
        __index = parentClass
    })
    return childClass
end

-- 子类
local Student = __inherit(Person)
function Student:new(name, age, stu_no)
    local instance = Person:new(name, age);
    setmetatable(instance, Student)
    instance.stu_no = stu_no; -- 学号
    return instance
end

function Student:get_student_number()
    print("my student number is " .. self.stu_no)
end

-- 实例化子类
local s = Student:new("Tom", 18, 123456);

-- 都能够正常执行证明已经继承了父类的方法
s:get_student_number();
s:self_intro();
```

## 模块化

::: code-group

```lua [导出]
-- fileName: lua/demo/a.lua 导出一个 table
return {
  x: 1,
  y: 2
}

-- fileName: lua/demo/b.lua 直接导出方法
return function() print("b module") end
```

```lua [导入]
-- 注意导入路径不是从 lua 开始
-- 注意导入路径是用 . 作为分割符号

-- 直接 require 导入
local modA = require("demo.a")

-- 安全导入 使用 pcall
local ok, modB = pcall(require, "demo.b")
if not ok then
  return;
end
modB()
```

:::

## 面向对象

```lua
-- 定义类
local Person = {}

-- 定义构造函数
function Person:new(name, age)
  local instance = {};
  setmetatable(instance, { __index = Person })
  instance.name = name
  instance.age = age
  return instance
end

-- 定义方法
function Person:sayHi()
  print("hi, my name is" .. self.name, "my age is " .. self.age)
end

-- 实例化
local p = Person:new("tom", 11);

-- 调用实例方法
p:sayHi();
```

### 继承

```lua
-- 父类
local Person = {};
function Person:new(name, age)
    local instance = {
        name = name,
        age = age
    };
    setmetatable(instance, {
        __index = Person
    })
    return instance
end

function Person:self_intro()
    print("Hello, my name is ".. self.name.. " and I am ".. self.age.. " years old.")
end

-- 继承父类: 类似于 js 的组合继承
-- 设置子类的 __index 和 metatable
function __inherit(parentClass)
    local childClass = {};
    childClass.__index = childClass;
    setmetatable(childClass, {
        __index = parentClass
    })
    return childClass
end

-- 子类
local Student = __inherit(Person)
function Student:new(name, age, stu_no)
    local instance = Person:new(name, age);
    setmetatable(instance, Student)
    instance.stu_no = stu_no; -- 学号
    return instance
end

function Student:get_student_number()
    print("my student number is " .. self.stu_no)
end

-- 实例化子类
local s = Student:new("Tom", 18, 123456);

-- 都能够正常执行证明已经继承了父类的方法
s:get_student_number();
s:self_intro();
```


## 常用内置 API

只会列举常用的 API, 更多 API 请查看 [Lua 5.3 文档](http://www.lua.org/manual/5.3/)

### basic

| 函数名  | 作用                   | 示例                                     | 示例返回值                                                 |
| :------ | :--------------------- | :--------------------------------------- | :--------------------------------------------------------- |
| print   | 输出信息到控制台       | print("hello")                           | nil                                                        |
| require | 导入模块               | require("demo.a")                        | 导入 demo.a 模块返回的内容                                 |
| pcall   | 防止调用出错(错误处理) | local ok, mod = pcall(require, "demo.b") | 返回一个状态(ok)和对应函数调用(require('demo.b'))的值(mod) |
| print   | 输出信息到控制台       | print("hello")                           | nil                                                        |
| pairs   | 获取元组的迭代器       | pairs({a=1, b=2})                        | 利用迭代器可以遍历元组所有元素                             |

### string

| 函数名  | 作用             | 示例                            | 示例返回值 |
| :------ | :--------------- | :------------------------------ | :--------- |
| len     | 获取字符串长度   | string.len("Lua")               | 3          |
| upper   | 字符串全部转大写 | string.upper("Lua")             | LUA        |
| lower   | 字符串全部转大写 | string.lower("Lua")             | lua        |
| format  | 格式化字符串     | string.format("Lua %s", 5)      | Lua 5      |
| reverse | 翻转字符串       | string.reverse("Lua")           | auL        |
| rep     | 重复字符串       | string.rep("Lua", 3)            | LuaLuaLua  |
| sub     | 字符串截取       | string.sub("hello-world", 5, 7) | o-w        |

### table

| 函数名 | 作用                                         | 示例                                    | 示例返回值           |
| ------ | -------------------------------------------- | --------------------------------------- | -------------------- |
| insert | 在指定位置插入新的元素到元组中\(改变原数组\) | table.insert\(\{1,2,3\}, 'str'\)        | \{ 1, 'str', 2, 3 \} |
| remove | 移除元组中指定位置的元素\(改变原数组\)       | table.remove\(\{1,2,3\}, 2\)            | \{ 1, 3 \}           |
| unpack | 将数据展开可以直接多次赋值                   | local a,b,c = table.unpack\(\{1,2,3\}\) | a=1, b=2, c=3        |

### math

| 函数名    | 作用                    | 示例                | 示例返回值     |
| :-------- | :---------------------- | :------------------ | :------------- |
| random    | 返回 0-1 之间的随机数字 | math.random()       | 0.148470939433 |
| floor     | 向下取整                | math.floor(5.6)     | 5              |
| ceil      | 向上取整                | math.ceil(5.1)      | 6              |
| tointeger | 将整数字符串转数字类型  | math.tointeger('5') | 5              |

### os

| 函数名  | 作用             | 示例                         | 示例返回值             |
| :------ | :--------------- | :--------------------------- | :--------------------- |
| date    | 获取系统日期时间 | os.date("%Y-%m-%d %H:%M:%S") | 2023-11-12 11:12:13    |
| execute | 执行系统命令     | os.execute("ls -al")         | 显示当前目录下所有文件 |
