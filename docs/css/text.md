---
outline: deep
---

## 文本字体

### 字体种类 font-family

可以定义多个字体, 如: `Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace` 系统会依次查找

```css
font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
```

#### 自定义字体种类

有的图标需要一些特殊的字体(如: [nerdfont](https://www.nerdfonts.com/)), 如果用户的电脑上没有这个字体就让他去下载

```css
/* 定义 */
@font-face {
  font-family: 'hack-nerdfont';
  src: url('./Hack Nerd Font Mono.otf') format('opentype');
}

/* 使用 */
.main {
  font-family: 'hack-nerdfont';
}
```

- 自定义字体支持的字体格式:

| 字体   | 格式               |
| ------ | ------------------ |
| \.otf  | opentype           |
| \.woff | woff               |
| \.ttf  | truetype           |
| \.eot  | Embedded\-opentype |

<span class="red-text">很多中文字体都是有版权的, 不建议随便使用有版权的字体, 建议去 [github](https://github.com) 找开源的字体</span>

### 字体粗细 font-weight

| 取值范围 | 示例                    | 说明                           |
| :------- | :---------------------- | :----------------------------- |
| normal   | font-weight: `normal`;  | 普通                           |
| bold     | font-weight: `bold`;    | 加粗                           |
| bolder   | font-weight: `bolder`;  | 比加粗更粗                     |
| bolder   | font-weight: `lighter`; | 细体                           |
| 100-900  | font-weight: `600`;     | 精确控制粗细,取值范围(100-900) |

### 字体大小 font-size

#### 关键字

- `xx-small`
- `x-small`
- `small`
- `meidum`
- `large`
- `x-large`
- `xx-large`

```css
.text {
  font-size: xx-small;
}
```

#### 单位

为了精确控制字体大小, 可以使用如下单位

- px: px是最基本也是最常用的长度单位，它代表屏幕上的一个像素点
- em: em是一个相对单位,它的长度等于当前元素的字体大小
- rem: rem也是一个相对单位,它的长度等于根元素(body)的字体大小
- %: %是相对于父元素的长度单位，它可以用来指定元素的字体大小相对于父元素的百分比

```css
.text1 {
  font-size: 18px;
}

.text2 {
  font-size: 1rem;
}

.text3 {
  font-size: 200%;
}
```

### 字体风格 font-style

- normal：正常样式(默认值)
- italic：斜体样式

```css
.text {
  font-style: italic;
}
```

### 字体颜色 color

#### 关键字

不推荐使用, 因为各个浏览器上关键字代表的颜色不一样, 这就会导致同一份代码在不同的浏览器上, 显示出不同的效果, 这是不合理的

- red: 红色
- green: 绿色
- blue: 蓝色
- ...more: 关键字有很多,无法全部不列举

```css
.text {
  color: red;
}
```

#### rgb 和 rgba

三原色, 其他所有颜色都是有这3种颜色的基础上按照一定比例调配出来的

- 红: `r`ed
- 绿: `g`reen
- 蓝: `b`lue
- 透明度: `a`lpha

<span class="red-text"> rgb 比列的取值范围: `0-255`, a 的取值范围是: `0.1-1` 或者 `1%-100%` </span>

```css
.text1 {
  /* color: rgb(红色比例, 绿色比例, 蓝色比例) */
  color: rgb(255, 0, 0);
}

.text2 {
  /* color: rgb(红色比例, 绿色比例, 蓝色比例) */
  color: rgba(255, 0, 0, 0.35);
  /* color: rgba(255, 0, 0, 35%); */
}
```

#### 16进制颜色

16进制颜色格式如: `#ab09ef`

- 第1,2位表示(ab): 表示红色(`r`ed)
- 第3,4位表示(09): 表示绿色(`g`reen)
- 第5,6位表示(ef): 表示蓝色(`b`lue)

<span class="red-text"> 16 进制的每一位的取值范围是: `0-f`(0 1 2 3 4 5 6 7 8 9 a b e d e f`)</span>

```css
.text1 {
  color: #abcdef;
}
.text2 {
  color: #123456;
}
```

### 行高 line-height

单位和 `字体大小` 是一样的

```css
.line {
  line-height: 1.5rem;
  /* line-height: 15px; */
}
```

## 文本样式

### 大小写转换 text-transform

| 取值       | 说明       |
| :--------- | :--------- |
| capitalize | 首字母大写 |
| uppercase  | 全部大写   |
| lowercase  | 全部小写   |

```css
h1 {
  text-transform: lowercase;
}
```

### 文本装饰线条 text-decoration

| 取值         | 说明             |
| :----------- | :--------------- |
| none         | 没有装饰(默认值) |
| underline    | 下划线           |
| line-through | 删除线(中划线)   |
| overline     | 上划线           |

### 文本阴影控制 text-shadow

```css
/**
语法格式为:
text-shadow: 颜色 水平偏移量 垂直偏移量 模糊程度

颜色单位: rgba
度量单位: px/%/em/rem
**/

.shadow-text {
  text-shadow: rgba(255, 0, 0, 50%) 5px 5px 5px;
}
```

### 空白处理 white-space

| 取值      | 说明                                    |
| --------- | --------------------------------------- |
| pre       | 保留文本中的所有空白，类似使用 pre 标签 |
| nowrap    | 禁止文本换行                            |
| pre\-wrap | 保留空白,保留换行符                     |
| pre\-line | 空白合并,仅保留换行符                   |

```css
div {
  white-space: pre;
}
```

## 段落控制

### 文本缩进 text-indent

取值为数值, 单位可以是 vw/vh, px, %, rem等

```css
h2 {
  text-indent: 10px;
  /* text-indent: 2rem; */
}
```

### 水平/垂直对齐 text-align vertical-align

text-align 属性取值范围

| 取值   | 说明     |
| :----- | :------- |
| left   | 左对齐   |
| right  | 右对齐   |
| center | 居中对齐 |

vertical-align 属性取值范围

| 取值     | 说明                                      |
| :------- | :---------------------------------------- |
| baseline | 基准线对其                                |
| middle   | 居中对其(纵向)                            |
| top      | 向上对齐                                  |
| bottom   | 向下对齐                                  |
| sub      | 垂直对齐其下标的基线, 类似 sub 标签的效果 |
| super    | 垂直对齐其上标的基线, 类似 sup 标签的效果 |

```css
h2 {
  vertical-align: bottom;
  text-align: center;
}
```

### 行高 line-height

line-height 属性指定文本行的高度, 这个属性可以撑开元素的高度

```css
.demo {
  /* line-height: normal; /* default value */ */
  line-height: 1.5;
  /* line-height: 20px; */
  /* line-height: 30rem; */
  /* line-height: 10vw; */
  /* line-height: 10%; */
}
```

### 单词/字符间距 word-spacing letter-spacing

设置字符间距和单词间距:

```css
.demo {
  word-spacing: 2rem;
  letter-spacing: 5px;
}
```

### 排版模式 writing-mode

| 取值          | 说明                   |
| :------------ | :--------------------- |
| horizontal-tb | 水平排版, 从上倒下排版 |
| vertical-rl   | 垂直排版, 从右到左排版 |
| vertical-lr   | 垂直排版, 从左到右排版 |
