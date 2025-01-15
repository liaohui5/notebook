## 标准文档流

默认情况下, 所有块级的元素, 都是独占一行, 且占用高度, 从上倒下排列的

## 浮动 float

一旦开启浮动就会脱离文档流, 且不会在占用文档流高度

| 取值  | 说明   |
| :---- | :----- |
| left  | 左浮动 |
| right | 右浮动 |

::: code-group

```css [css]
#app {
  border: 1px solid blue;
}

.box {
  width: 100px;
  height: 100px;
}

.bg-red {
  background-color: red;
}

.bg-green {
  background-color: green;
}

.float-right {
  float: right;
}

.bg-blue {
  background-color: blue;
}
```

```html [html]
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <link rel="stylesheet" href="./styles.css" type="text/css" />
  </head>
  <body>
    <div id="app">
      <div class="box bg-red"></div>
      <div class="box bg-green float-right"></div>
      <div class="box bg-blue"></div>
    </div>
  </body>
</html>
```

:::

![float](https://raw.githubusercontent.com/liaohui5/images/main/images/202311041945889.png)

## 清除浮动 clear

清除浮动后, 虽然元素还是会脱离文档流, 但是还是会占用高度:

| 取值  | 说明                   |
| :---- | :--------------------- |
| left  | 清除左浮动             |
| right | 清除右浮动             |
| both  | 同事清除左右两边独浮动 |

::: code-group

```css{26-28} [css]
#app {
  border: 1px solid blue;
}

.box {
  width: 100px;
  height: 100px;
}

.bg-red {
  background-color: red;
}

.bg-green {
  background-color: green;
}

.float-right {
  float: right;
}

.bg-blue {
  background-color: blue;
}

.clearfix {
  clear: both;
}
```

```html{11} [html]
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <link rel="stylesheet" href="./styles.css" type="text/css" />
  </head>
  <body>
    <div id="app">
      <div class="box bg-red"></div>
      <div class="box bg-green float-right"></div>
      <div class="box bg-blue clearfix"></div>
    </div>
  </body>
</html>
```

:::

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202311041955713.png)

