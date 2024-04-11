## 什么是媒体查询响应式布局?

简而言之, 同一个网页在不同的设备上显示成不同的样式(如:屏幕/打印机),
那么只有判断代码在哪个设备上运行, 才能写出适合对应设备显示的样式

## 媒体设备类型

- screen: 屏幕
- print: 打印机

::: code-group

```html [html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>媒体查询响应式布局</title>
    <link rel="stylesheet" href="./screen.css" media="screen" />
    <link rel="stylesheet" href="./print.css" media="print" />
  </head>
  <body>
    <h2>媒体查询响应式布局</h2>
  </body>
</html>
```

```css [screen.css]
h2 {
  color: #f00;
  font-size: 18px;
}
```

```css [print.css]
h2 {
  color: #0f0;
  font-size: 24px;
}
```

```css [在css中导入并指定生效设备]
/* 只在屏幕设备生效 */
@import url(screen.css) screen;

/* 只在打印机设备生效 */
@import url(print.css) print;

/* 默认就是 all 所有设备都生效 */
@import url(common.css) all;

/* 在index.html 中导入这一个文件即可 */
```

```css [直接在css中使用@media关键字来指定设备类型]
@media screen {
}
@media print {
}
```

:::

![media-device-type](https://raw.githubusercontent.com/liaohui5/images/main/images/202403170114190.png)

## 设备方向

使用 `orientation` 属性可以定义设备的方向

| 值        | 说明               |
| --------- | ------------------ |
| portrait  | 竖屏: 高度大于宽度 |
| landscape | 横屏: 宽度大于高度 |

## 查询条件

- 设备类型
- 设备方向
- 设备尺寸(宽度/高度/最小宽度/最大宽度/最小高度/最大高度)

| 特性        | 说明                                    |
| ----------- | --------------------------------------- |
| orientation | 设备方向 (landscape:横屏 portrait:竖屏) |
| width       | 设备宽度                                |
| height      | 设备高度                                |
| min\-width  | 最小宽度                                |
| max\-width  | 最大宽度                                |
| min\-height | 最小高度                                |
| max\-height | 最大高度                                |

## 查询逻辑

因为大多数开发的项目都是要显示在屏幕上, 而屏幕也有很多中尺寸, 手机屏幕和电脑显示器屏幕虽然都是屏幕但是尺寸相差比较大,
也就是说不仅仅要限制设备类型还需要限制设备的尺寸, 那么就就需要用 `and` 关键字来限制多个条件

### 逻辑与 and

```css
@media screen and (max-width: 375px) {
  /* iphone 等手机设备的屏幕: 必须是屏幕并且最大宽度是375px */
}

@media screen and (min-width: 768px) and (max-width: 1360px) {
  /* ipad 等平板设备的屏幕: 必须是屏幕并且最小宽度是375px 并且最大宽度是 1360px,
     如果有多个条件就用多个 and 隔开类似编程语言里的 &&  
  */
}

@media screen and (min-width: 1360px) {
  /* 电脑屏幕的尺寸: 必须是屏幕并且最小宽度是1360px */
}
```

### 逻辑或 ,

```css
@media screen and (min-width: 768px), screen and (orientation: landscape) {
  /* 屏幕最小宽度是 768px 或者屏幕方向是横屏的 */
}
```

### 逻辑非 not

注意: not 只能在媒体查询的最开始, 且只能有一个, 不能有多个

```css
@media not screen and (min-width: 375px) {
  /* 如果最小宽度不是 375px 的屏幕设备 */
}
```

### 排除不支持媒体查询语法的老旧浏览器 only

- 对支持媒体查询的浏览器, 就正常的使用样式, 此时就当 only 不存在, 对不支持媒体查询的老旧浏览器不使用有 only 的样式
- only 和 not 一样只能出现在媒体查询的开始

```css
@media only screen and (min-width: 375px) {
  /* 如果打开本网页的浏览器支持媒体查询的语法, 那么就使用这些样式, 不支持就不使用 */
}
```
