---
outline: deep
---

## 什么是模块化

所谓的模块化,就是按照一定的规则(比如功能)来将一个js文件分成多个, 在互相独立的情况下, 可以暴露指定的 API 让其他模块去执行

## 为什么做模块化

- 方便维护: 如果所有功能都在一个js中是不利于团队合作维护的
- 为了性能: 可以方便控制js加载时机, 减少http请求
- 方便测试: 主要是指单元测试

## 模块化发展历史

### IIFE

最原始,最直接,最简单的方式

::: code-group

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>JavaScript</title>
  </head>
  <body>
    <div id="app">JavaScript</div>
    <script src="./script/header.js"></script>
    <script src="./script/footer.js"></script>
    <script src="./script/init.js"></script>
  </body>
</html>
```

```js [header.js]
(function () {
  var initDom = function () {
    const headerDOM = document.createElement('header');
    headerDOM.id = 'header';
    headerDOM.textContent = 'header dom inited';
    document.append(headerDOM);
  };
  var bindEvents = function () {
    var headerDOM = document.getElementById('header');
    if (!headerDOM) {
      return;
    }
    headerDOM.addEventListener('click', function () {
      console.log('header on click');
    });
  };

  window.headerModule = {
    initDom: initDom,
    bindEvents: bindEvents,
  };
})();
```

```js [footer.js]
(function () {
  var initDom = function () {
    const footerDOM = document.createElement('footer');
    footerDOM.id = 'footer';
    footerDOM.textContent = 'footer dom inited';
    document.append(footerDOM);
  };
  var bindEvents = function () {
    var footerDOM = document.getElementById('footer');
    if (!footerDOM) {
      return;
    }
    footerDOM.addEventListener('mouseenter', function () {
      console.log('footer on mouseenter');
    });
  };

  window.footerModule = {
    initDom: initDom,
    bindEvents: bindEvents,
  };
});
```

```js [init.js]
(function () {
  function init() {
    window.headerModule.initDom();
    window.footerModule.initDom();
    window.headerModule.bindEvents();
    window.footerModule.bindEvents();
  }

  // 初始化, 开始执行
  init();
})();
```

:::

### CommonJS

随着技术的不断发展, JavaScript 这个语言得到了更广泛的应用, 不仅可以在浏览器环境中执行, 还可以用于非浏览器环境(Node.js), 也可以将 JavaScript 用于服务端编程, CommonJS 就是为 Node.js 创建的模块化系统

::: code-group

```js [定义模块]
// module.exports 暴露什么, require 这个文件时就会拿到什么
module.exports = {
  static_path: './public/assets',
};
```

```js [使用模块]
const fs = require('fs'); // 使用内置模块
const config = require('./config.js'); // 使用自定义模块
```

:::

### require.js & AMD

AMD: Asynchronous Module Definition

[require.js](https://requirejs.org/)在浏览器中实现了类似 CommonJS 规范的语法, 是一种比较古老的模块化方案

::: code-group

```js [定义模块]
define('header', [], function () {
  var initDOM = function () {};
  var bindEvents = function () {};
  return {
    initDOM,
    bindEvents,
  };
});

define('footer', [], function (require, exports, module) {
  var initDOM = function () {};
  var bindEvents = function () {};
  return {
    initDOM,
    bindEvents,
  };
});
```

```js [使用模块]
// init.js
define(['header', 'footer'], function (header, footer) {
  return {
    init() {
      header.initDom();
      footer.initDom();
      header.bindEvents();
      footer.bindEvents();
    },
  };
});
```

:::

### ESModule 强烈推荐

es6 新增语法, 最实用方便的模块化规范, 在最新的浏览器还有比较高版本的 Node.js 环境中都支持 ESModule 语法

#### 如何开启 ESModule 语法支持

::: code-group

```html [浏览器环境]
<!-- 设置 script 标签的 type 属性的值未 module 即可 -->
<script src="./src/index.js" type="module"></script>
```

```js [Node.js环境]
// 在 package.json 中加入 type 字段, 需要 node 12.x 以上版本
{
  "type": "module"
}
```

:::

#### 基础语法
