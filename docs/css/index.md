---
outline: deep
---

## w3c在线文档

https://www.w3school.com.cn/css/index.asp

## CSS 是什么?

- CSS 是是一种标记语言, 用于设置 html 标签的显示样式

- CSS 的是 `Cascading Style Sheets` 的简称, 翻译成中文就是 `层叠样式表`

## CSS 能做什么?

CSS 主要用于设置 HTML 页面中的文本内容（字体、大小、对齐方式等）、图片的外形（宽高、边框样式、边距等）以及版面的布局和外观显示样式

CSS 让我们的网页更加丰富多彩，布局更加灵活自如。简单理解：CSS 可以美化 HTML , 让 HTML 更漂亮， 让页面布局更简单。

## 基础语法

```css
/* 
这是一个注释, 在css中没有单行注释, 只有多行注释

选择器 {
  属性: 值
}

选择器选中对应的html元素, 设置{}内对应的属性和值
*/
div {
  color: red;
}
```

## 如何使用?

### 导入外部样式文件

- link 需要放在 head 标签中(推荐)
- link 标签 `rel` 属性必须设置为 `stylesheet`
- link 标签可以有多个, 也就是说可以导入多个样式文件

| 属性 | 说明                                           |
| :--- | :--------------------------------------------- |
| rel  | 定义当前文档与被链接文档之间的关系             |
| href | 外部样式文件的URL(可以是相对路径, 也可以使URL) |

```html {6}
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### 使用 style 标签

```html {6-11}
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      div {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

### 内联样式

- 给某个html标签单独设置样式
- 内联样式,如果有多个属性可以用 `;` 分割

```html {8}
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
  </head>
  <body>
    <div style="margin: 0; padding: 0"></div>
  </body>
</html>
```

### @import 模块化

所谓的模块化就是在 一个样式文件或者style标签中导入并使用另外一个样式

- 语法: `@import(path) `: 这个 `path` 可以是相对路径, 也可以是 url

- 练习: `style -> a.css -> b.css`

::: code-group

```html{7} [style 标签]
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <title>title</title>
    <style>
      @import ('./a.css');
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```css{1} [a.css]
@import("./b.css")
/* other css codes */
```

:::

## 注意事项

### 默认样式

有的 html 标签可能会有一些默认的样式, 而且不同的浏览器可能默认值还不一样, 就会导致同样的代码在不同的浏览器中看到的效果不一样, 如: `margin` `padding` `list-style` 等

> 如何清除这些默认样式, 让所有浏览器都呈现同样的效果?

- https://github.com/necolas/normalize.css
- https://github.com/shannonmoeller/reset-css

## 相关文档

- [W3C CSS 属性](https://www.w3school.com.cn/css/index.asp)
- [devDocs CSS](https://devdocs.io/css/)
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)
- [中文文档 CSS3](http://caibaojian.com/css3/)
- [菜鸟教程](https://www.runoob.com/css3/css3-tutorial.html)
- [后盾人文档库 CSS](https://doc.houdunren.com/%E7%B3%BB%E7%BB%9F%E8%AF%BE%E7%A8%8B/css/1%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html)
