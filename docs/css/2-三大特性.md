## 继承

父元素的样式将被继承到其子元素上

```html
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      div {
        color: red;
      }
    </style>
  </head>
  <body>
    <div>
      我是div
      <span> 我是div内部 snap </span>
    </div>
    <span> 我是div外部 snap </span>
  </body>
</html>
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202310181507603.png)

由上图代码可证, 明明只设置了 div 的文字颜色, 可是 div 中的 span 颜色也变了, 但是外部的span却没有变化

## 层叠

CSS 层叠性是指多个样式规则可以同时应用于一个 HTML 元素, 这也是为什么叫 `层叠样式表` 的来源

```html
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      div {
        background-color: gray;
      }
      .red-text {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="red-text">hello css</div>
    <p class="red-text">hello css</p>
  </body>
</html>
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231018151409.png)

由上效果图可知: `div` 标签选择器选择类所有的 div, 设置背景为灰色, `.red-text` 类选择器选中了所有的类名为 `red-text` 的元素,
并且设置字体颜色为红色, 这两个选择器都选中类 `div` 元素, 所以效果会叠加

## 权重优先级

### 选择器权重

CSS 中一种处理多个样式冲突的方式(比如用多种方式设置类)

| 选择器类型                       | 权重值 | 示例                                            |
| -------------------------------- | ------ | ----------------------------------------------- |
| Style属性(内联样式)              | 10000  | &lt;div style="color: red;"&gt;&lt;/div&gt;     |
| ID 选择器                        | 1000   | \#myElement \{\}                                |
| 类选择器、属性选择器、伪类选择器 | 100    | \.myClass \{\} \[type="text"\] \{\} :hover \{\} |
| 元素选择器、伪元素选择器         | 10     | div \{\} ::before \{\}                          |
| 通配选择器                       | 1      | \* \{\}                                         |

```html{7-12,16}
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      .main {
        color: green;
      }
      #app {
        color: red;
      }
    </style>
  </head>
  <body>
    <div id="app" class="main">hello world</div>
  </body>
</html>
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231018160038.png)

### 定义方式权重

| 方式                  | 权重值 | 示例                                             |
| --------------------- | ------ | ------------------------------------------------ |
| 内联样式(Style属性)   | 10000  | &lt;div style="color: red;"&gt;&lt;/div&gt;      |
| 内部样式表(Style标签) | 1000   | &lt;style&gt; \.myClass \{\} &lt;/style&gt;      |
| 外部样式表(Link标签)  | 100    | &lt;link rel="stylesheet" href="styles\.css"&gt; |
| 浏览器默认样式        | 1      |

```html{7-9,13}
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      .main {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="main" style="color: green">hello world</div>
  </body>
</html>
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202310181605457.png)

## 前置提升优先级

使用关键字 `!important` 可以强行提升优先级

```html
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      .main {
        color: red !important;
      }
    </style>
  </head>
  <body>
    <div class="main" style="color: green">hello world</div>
  </body>
</html>
```
