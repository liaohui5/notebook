## 什么是 JS

JavaScript是一种轻量级、高级的编程语言,广泛应用于Web开发中.

JavaScript（简称JS）最初设计的目的是作为浏览器中的脚本语言,用来增强网页的交互性.随着技术的发展,JavaScript的应用已经远远超出了浏览器的范围,现在它也被用于服务器端编程（如Node.js）、移动应用开发（React Native）、桌面应用开发（Electron）等众多领域.

以下是JavaScript的一些主要特点:

- 解释型或即时编译型:JavaScript代码在运行时被解释或编译,这使得它能够快速地在不同平台上运行
- 函数优先:在JavaScript中,函数是一等公民,这意味着函数可以像其他对象一样被传递和操作
- 事件驱动:JavaScript支持事件驱动的编程模型,这使得它非常适合处理用户交互和异步任务
- 跨平台:由于几乎所有现代浏览器都内置了JavaScript解释器,因此JavaScript代码可以在多种操作系统和设备上无缝运行
- 支持面向对象编程:虽然JavaScript是一种多范式语言,但它也支持面向对象编程的风格
- Web开发者必学:JavaScript与HTML和CSS一起构成了Web开发的三大核心技术,是前端开发者必须掌握的语言之一

## 浏览器发展史

1. `1990` 年, 蒂姆·伯纳斯·李（Tim Berners-Lee）开发 `WorldWideWeb`
2. `1993` 年, 美国伊利诺伊大学（NCSA）的马克·安德森(Marc Andreessen) 开发了 `Mosaic`
3. `1994` 年, 马克·安德森开发了 `Netscape Navigator`(网景公司)
4. `1996` 年, 微软开发了 IE 1.0, 网景开发了出了 `livescript` 并且和 SUN 公司合作, 将 `livescript` 改名为 `javascript`(此时: java 知名度特别高, 所以改名, 方便推广宣传)
5. `2001` 年, IE6 和 windowXP 诞生,
6. `2003` 年, `mozilla` 在 `Netscape Navigator` 的基础上开发了`firefox`

## 主流浏览器内核

| 浏览器  | 内核            |
| ------- | --------------- |
| IE      | trident         |
| chrome  | webkit/Chromium |
| safari  | webkit          |
| firefox | gecko           |
| opera   | presto          |

## 编程语言分类

1. 编译型(强类型语言): 源码通过编译器编译成机器码
2. 解释型(弱类型语言): 源码通过解释器去执行,解释行就执行一行

## JavaScript 规范

1. ECMAScript: 脚本语言规范(不仅仅是 js, 也包括其他脚本语言, 如 PHP), 规定了语法的规范, 比如(变量, 值, 关键字, 保留字, 语法, 函数等..)
2. W3C: 规定了 DOM 规范(DOM: Document Object Model)
3. BOM: Browser Object Model: `没有规范` 各个浏览器写法不统一

## 单线程多线程

单线程: 同时只能做一件事
多线程: 同时能做多个事

### JavaScript 引擎是单线程还是多线程?

答: `单线程`

### 为什么是 JS 引擎是单线程却可以同时执行多个任务?

虽然 JavaScript 引擎是 `单线程`, 但是 JS 引擎会通过 `轮转时间片` 的方式
来模拟多线程的工作方式, 将异步任务放到异步任务队列中去,然后通过事件轮询
的方式来触发执行异步任务

### 什么叫轮转时间片?

_短时间内轮流执行多个任务的片段_

```
    1. 任务1   任务2
    2. 切分任务1, 任务2
    3. 随机排列任务片段, 组成任务队列
    4. 按照队列顺序将任务送到js程序进程中执行
    5. JS线程执行, 一个一个的任务片段
```

---

## JS 代码引用方式

1. 内部嵌入方式

```html
<!-- other html -->
<script>
  // js codes
</script>
```

2. 外部导入方式

```html
<!-- other html -->
<script src="js/xxx.js"></script>
```

3. 文件类型声明及其作用

```html
<script type="text/javascript">
  // 用于写js代码, 默认不写就是 text/javascript
</script>

<script type="text/tpl" id="tpl">
  // 为了不让js代码执行, 然后通过模板引擎的方式, 获取中间的内容替换成具体数据
  // 比如: https://github.com/aui/art-template
  // 比如: https://ejs.bootcss.com/
  <tr>
      <td>{{id}}</td>
      <td>{{username}}</td>
  </tr>
</script>
```
