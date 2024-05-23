---
outline: deep
---

## 网格布局

强烈推荐阅读[CSS Grid 网格布局教程](https://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)
还有 [MDN Grid 布局相关文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_grid_layout)

https://www.bilibili.com/video/BV134411m7dJ

### 介绍

grid 布局是一种新的, 强大的 css 布局方式, 与 flex 有很多相似的地方,
都是在一个容器中, 设置多个子项的属性(如:宽度, 位置)
但是 flex(弹性布局) 是根据 `主轴侧轴` 来实现布局的, 但是 grid 则是
将容器分为 `行` 和 `列` 来管理 子项的, 行和列都可以有多个,
说起来和表格也有相似之处, 但是却比表格更强大, 但是兼容性没有表格好

![grid](https://raw.githubusercontent.com/liaohui5/images/main/images/202311081538640.png)

### 兼容性

[使用 caniuse 查看 grid 兼容性](https://caniuse.com/?search=grid)

### 容器和子项

和 `flex` 类似, 只要将显示模式修改为 `grid` 就可以获得一个 `grid` 布局的容器

只要是 `grid` 容器中的元素都可以算做 `grid` 的子项

::: code-group

```html [html]
<div class="grid-box">
  <div class="item"></div>
  <div class="item"></div>
</div>
```

```css [css]
.grid-box {
  display: grid;
  /* display: inline-grid; */
}
```

## 网格线和单元格

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231108155926.png)

:::

### 定义网格容器

```css
.grid-box {
  display: grid; /* 或者, display:inline-grid */
}
```

### 划分容器行和列

和 flex 布局不同的是, flex 布局是按照轴线来设置尺寸和对齐方式,
但是 grid 布局可以像表格那样划分 `行(row)` 和 `列(column)`, 子项可以按照
划分的行列来设置尺寸和对齐方式

#### 基本使用

- grid-template-columns
- grid-template-rows

::: code-group

```css [使用具体单位]
/* 不仅仅只是可以使用 px 也可以使用 rem vw 等其他具体单位 */
.grid-box {
  width: 300px;
  height: 300px;
  display: grid;
  grid-template-rows: 100px 100px 100px;
  grid-template-columns: 100px 100px 100px; /* 3行3列的九宫格 */
}
```

```css [使用百分比]
/* 按照容器元素根据比例缩放 */
.grid-box {
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-rows: 33.33% 33.33% 33.33%;
  grid-template-columns: 33.33% 33.33% 33.33%; /* 3行3列的九宫格 */
}
```

:::

#### repeat 和 minmax 函数

::: code-group

```css [repeat 函数]
/* 
如果css属性的多个取值是一样的, 全部手写太麻烦了, 还容易出错
可以使用 repeat 函数来简写
*/
.grid-box {
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(10, 1fr); /* 10行10列的网格 */
  grid-template-rows: repeat(10, 1fr); /* 这种写法等同于: 1fr 1fr 1fr */
}
```

```css [minmax 函数]
.grid-box {
  display: grid;
  grid-template-columns: minmax(200px, 400px) 1fr 1fr;
  /* 
    1.网格容器没有设置宽度, 那么默认宽度会继承父元素的宽度
      如果要查看效果, 最好写到 body 里面, 然后手动缩放浏览器窗口

    2.将网格分为 3 列: 
      第一列: 最小值为 200px, 最大值为 400px, 如果需要让最大值随容器缩放
              也可以使用 fr 单位: minmax(200px, 1fr) 这样设置
      第二列: 随网格容器的宽度缩放
      第三列: 随网格容器的宽度缩放
  */
}
```

```css [repeat 配合 minmax 使用]
.grid-box {
  display: grid;
  grid-template-columns: minmax(200px, 400px) repeat(4, 1fr);
  /*
    将容器分为 5 列:
    第一列: 最小为200px, 最大为 400px
    后面四列: 随着容器宽度缩放(容器总宽度 - 第一列宽度)平分 4 份
    其实可读性也非常好, 等价于:
    grid-template-columns: minmax(200px, 400px) 1fr 1fr 1fr 1fr;
  */
}
```

:::

#### 使用 fr 单位

::: code-group

```css [使用fr单位]
/* 
在CSS中,"fr"代表"分数"(fraction)单位
它用于定义网格布局容器中的列或行的大小,以实现响应式设计
"fr"单位的工作原理是将可用空间分为等份,并根据每个项目的分配比例来确定其大小

grid-template-rows: 1fr 1fr 1fr; 将容器分为 3 份, 每行占 1 份
grid-template-rows: 1fr 3fr 1fr; 将容器分为 5 份, 第1,3行各占1份,第二行占3份
*/
.grid-box {
  width: 600px;
  height: 600px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}
```

```css [配合其他单位使用]
.grid-box {
  display: grid;
  grid-template-columns: 100px 2fr 1fr;
  /* grid-template-columns: 100px auto 100px; */
}
/*
1. grid-template-columns: 100px 2fr 1fr;
  将容器分为 3 列:
    第一列: 宽度为 100px, 不随着容器缩放
    第二列: 宽度为 2 份, 随着容器宽度缩放
    第三列: 宽度为 1 份, 随着容器宽度缩放


2. grid-template-columns: 100px auto 100px;
  将容器分为 3 列:
    第一列: 宽度为 100px, 不随着容器宽度缩放
    第二列: 宽度为容器总宽度 - 200px(其实就是:1fr)
    第三列: 宽度为 100px, 不随着容器宽度缩放

注意: 只有所有列都使用可缩放单位(如: 33%, 1fr)时候, 才会使用容器总宽度来计算
*/
```

:::

#### 自动填充

这个例子是自动填充行, 其实列也是可以自动填充的

::: code-group

```css [自动填充]
/*
在实际开发中可能会遇到这样的需求:
不确定有多少条数据(没法提前知道有多少行和列, 但是可以设置容器的宽度)
但是可以一直下拉刷新更多的数据(知道子项的宽度和高度, 因为不管有多少条, 样式是不变的)
那么就可以使用自动填充, 让容器尽可能多的放下更多的子项
如以下的html结构:

<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  ...
</div>
*/
.container {
  background-color: #ccc;
  display: grid;
  width: 600px;
  grid-template-columns: repeat(auto-fill, 100px);
}

.item {
  height: 100px;
  background: #f00;
}

.item {
  width: 100px;
  height: 100px;
  background: #f00;
}
```

```css [注意事项]
.container {
  background-color: #ccc;
  display: grid;
  width: 500px;
  grid-template-columns: repeat(auto-fill, 110px);
  /* 
    每列 110px, 只能放 4 列(110 * 4), 因为 5 列就放不下了, 
    每行多出 60 会直接留白, 可以将每列设置为 100px, 这样可以正好放下
    grid-template-columns: repeat(auto-fill, 100px);
  */
}

.item {
  height: 100px;
  background: #f00;
}

/**
  auto-fill 自动填充划分单元格是(例子为列,行也可以这样操作):
  每行自动填充列数 = 容器总宽度 / 每份的宽度 ( 500 / 110 = 4.5454 )
  如果无法(容器总宽度 / 每份的宽度)无法整除,
  并且使用的是不可缩放的单位(如上面那个例子) 那么会有多余的留白区域,
  所以: 要使用这种自动填充的, 建议使用可缩放的单位或者计算好宽度
**/
```

:::

## 设置排列顺序

默认的放置顺序是"先行后列", 即先填满第一行, 再开始放入第二行

- grid-auto-flow

假设将网格分为3行3列的九宫格,并且有9各div

::: code-group

```html [元素结构]
<div class="container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
  <div>7</div>
  <div>8</div>
  <div>9</div>
</div>
```

```css{9} [先行后列]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  /* grid-auto-flow: row; */
  /* 默认值: 先行后列, 元素排列顺序:
    1 2 3
    4 5 6
    7 8 9
  */
}

.item {
  background-color: #f00;
}
```

```css{9} [先列后行]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column;
  /* 先列后行, 元素排列顺序:
    1 4 7
    2 5 8
    3 6 9
  */
}

.item {
  background-color: #f00;
}
```

:::

## 设置间距

- grid-row-gap
- grid-column-gap
- grid-gap: 这个属性是 grid-row-gap 和 grid-column-gap 的连写方式

<!-- prettier-ignore-start -->

```css
.grid-box {
  /* grid-row-gap: 10px; */      /* 只设置行间距 */
  /* grid-column-gap: 10px; */   /* 只设置列间距*/
  /* grid-gap: 10px 10px; */     /* 分别设置行间距和列间距 */
  grid-gap: 10px;                /* 同时设置行间距和列间距 */
}
```
<!-- prettier-ignore-end -->

## 栅格命名

栅格命名是为了后面更好的操作子项

::: code-group

```css [手动命令]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  /* 命名用 [名称1 名称2], 如果要手动命名, 尽量用有意义的单词来描述, 并且最好是有规律 */
  grid-template-rows: [r1-start] 1fr [r1-end r2-start] 1fr [r2-end r3-start] 1fr [r3-end];
  grid-template-columns: [c1-start] 1fr [c1-end c2-start] 1fr [c2-end c3-start] 1fr [c3-end];
}
```

```css [自动命名]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, [r-start] 100px [r-end]);
  /* 可以这样理解: [r-start 1] 1fr [r-end 1 r-start 2] 1fr [r-end 2 r-start 3] 1fr [r-start 3] */
  grid-template-columns: repeat(3, [c-start] 100px [c-end]);
  /* 可以这样理解: [c-start 1] 1fr [c-end 1 c-start 2] 1fr [c-end 2 c-start 3] 1fr [c-start 3] */
}
```

```css [默认命名]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  /* 默认用数字命名, 可以这样理解: [1] 1fr [2] 1fr [3] 1fr [4] */
}
```

![container](https://raw.githubusercontent.com/liaohui5/images/main/images/20231122002606.png)

:::

## 元素定位

> 什么是元素定位?

可以将容器看作是一个带着格子的设计图, 那些线就是栅格(网格), 而子项就是要摆放的东西,
至于这个子项放到哪个位置, 占多高, 占多宽就不是容器来管了, 应该设置子项的属性, 如图

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231122000009.png)

| 样式属性          | 说明                                                                     |
| ----------------- | ------------------------------------------------------------------------ |
| grid-row-start    | 行开始栅格线                                                             |
| grid-row-end      | 行结束栅格线                                                             |
| grid-column-start | 列开始栅格线                                                             |
| grid-column-end   | 列结束栅格线                                                             |
| grid-row          | grid-row-start/grid-row-end 的简写形式                                   |
| grid-column       | grid-column-start/grid-column-end 的简写形式                             |
| grid-area         | grid-row-start/grid-column-start/grid-row-end/grid-column-end 的简写形式 |

<span class="red-text">注: 圈定的栅格区域必须是矩形(长方形/正方形) </span>

<span class="red-text">注: grid-area 值的顺序必须按照规定的顺序来设置值 </span>

::: code-group

```css [子项]
/* 手动命名 */
.item {
  background-color: #f00;
  grid-row-start: r2-start;
  grid-row-end: r2-end;
  grid-column-start: c2-start;
  grid-column-end: c2-end;
}
```

```css [容器]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: [r1-start] 1fr [r1-end r2-start] 1fr [r2-end r3-start] 1fr [r3-end];
  grid-template-columns: [c1-start] 1fr [c1-end c2-start] 1fr [c2-end c3-start] 1fr [c3-end];
}
```

```html [元素结构]
<div class="container">
  <div class="item">1</div>
</div>
```

:::

::: code-group

```css [子项]
/* 自动命名 */
.item {
  background-color: #f00;
  grid-row-start: r2-start;
  grid-row-end: r3-end;
  grid-column-start: c2-start;
  grid-column-end: c3-end;
}
```

```css [容器]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, [row-start] 1fr [row-end]);
  grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
  grid-auto-flow: column;
}
```

```html [元素结构]
<div class="container">
  <div class="item">1</div>
</div>
```

:::

::: code-group

```css [子项]
/* 默认命名 */
.item {
  background-color: #f00;
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 3;
}
```

```css [容器]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}
```

```html [元素结构]
<div class="container">
  <div class="item">1</div>
</div>
```

:::

::: code-group

```css [子项]
/* grid-row + grid-column 简写形式: 3种命名都可以使用简写方式 */
.item {
  background-color: #f00;
  grid-row: row-start 2 / row-end 2;
  grid-column: col-start 2 / col-end 2;
}
```

```css [容器]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, [row-start] 1fr [row-end]);
  grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
}
```

```html [元素结构]
<div class="container">
  <div class="item">1</div>
</div>
```

:::

::: code-group

```css [子项]
/* grid-area 简写形式: 3种命名都可以使用简写方式 */
.item {
  background-color: #f00;
  grid-area: row-start 2 / col-start 2 / row-end 2 / col-end 2;
}
```

```css [容器]
.container {
  display: grid;
  width: 300px;
  height: 300px;
  grid-gap: 10px;
  background: #ccc;
  grid-template-rows: repeat(3, [row-start] 1fr [row-end]);
  grid-template-columns: repeat(3, [col-start] 1fr [col-end]);
}
```

```html [元素结构]
<div class="container">
  <div class="item">1</div>
</div>
```

:::

## 使用区域布局

在写后台的时候, 可能经常会写这样的布局, 其实用 grid 布局就可以很轻松的做到这样的布局

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202311222344532.png)

- grid-template-areas: 定义模板
- grid-area: 使用模板

### 分开定义模板

::: code-group

```css [使用区域布局]
html,
body {
  margin: 0;
  padding: 0;
}

.full-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 100px 1fr 50px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'header header'
    'aside main'
    'aside footer';
  /* 注意事项:
     使用模板布局时: 关键字的数量和grid-template-rows 和
     grid-template-columns 一定要相对应, 比如这个代码中
     的布局是 3 行(100px 1fr 50px) 2 列(300px 1fr)的布局
     那么关键字也必须是3行2列的布局:
     'area1 area1'
     'area2 area3'
     'area2 area4'
  */
}

.header {
  background: #f00;
  grid-area: header;
}

.aside {
  background: #0f0;
  grid-area: aside;
}

.main {
  background: #00f;
  grid-area: main;
}

.footer {
  background: #ff0;
  grid-area: footer;
}
```

```html [元素结构]
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <link rel="stylesheet" type="text/css" href="./styles.css" />
  </head>
  <body>
    <div id="app" class="full-container">
      <header class="header">header</header>
      <aside class="aside">aside</aside>
      <main class="main">main</main>
      <footer class="footer">footer</footer>
    </div>
  </body>
</html>
```

:::

### 简写定义模板

上面代码效果图如下:

![preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202311230002659.png)

## 对齐

与 flex 类似, 在 grid 中也可以很方便的使用一些关键字来对其容器/子项

| 选项            | 说明                                            | 设置对象 |
| --------------- | ----------------------------------------------- | -------- |
| justify-content | 所有栅格在容器中的水平对齐方式,容器有额外空间时 | 容器     |
| align-content   | 所有栅格在容器中的垂直对齐方式,容器有额外空间时 | 容器     |
| align-items     | 栅格内所有元素的垂直排列方式                    | 容器     |
| justify-items   | 栅格内所有元素的横向排列方式                    | 容器     |
| align-self      | 元素在栅格中垂直对齐方式                        | 子项     |
| justify-self    | 元素在栅格中水平对齐方式                        | 子项     |

取值范围:

| 值            | 说明                                  |
| ------------- | ------------------------------------- |
| start         | 容器左边(水平方向) 容器上边(垂直方向) |
| end           | 容器右边(水平方向) 容器下边(垂直方向) |
| center        | 容器中间                              |
| stretch       | 撑满容器                              |
| space-between | 均匀分布空间                          |
| space-around  | 每个元素两侧的间隔相等                |
| space-evenly  | 栅格间距离完全平均分配                |

## 自动排列

当栅格无法放置内容时, 系统会自动添加栅格用于放置溢出的元素, 我们需要使用以下属性控制自动添加栅格的尺寸

- grid-auto-rows: 自动添加行的高度
- grid-auto-columns: 自动添加列的宽度

::: code-group

```css [自动排列]
ul,
li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.list {
  width: 300px;
  height: 300px;
  display: grid;
  background: #f00;
  gap: 5px;
  grid-template-rows: 100px 100px;
  grid-template-columns: 100px 100px;
  grid-auto-columns: 200px; /* 宽度最大只能是 grid-template-columns 定义的中宽度 */
  grid-auto-rows: 200px; /* 高度可以撑开为 200 */
  /* 高度可以撑开, 但是宽度最大无法超过 grid-template-columns 定义的总宽度 */
}

.item {
  background: #0f0;
}
```

```html [元素结构]
<ul class="list">
  <li class="item">item-1</li>
  <li class="item">item-2</li>
  <li class="item">item-3</li>
  <li class="item">item-4</li>
  <li class="item">item-5</li>
  <li class="item">item-6</li>
  <li class="item">item-7</li>
  <li class="item">item-8</li>
  <li class="item">item-9</li>
  <li class="item">item-10</li>
</ul>
```

:::

效果图如下:

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202311232327511.png)
