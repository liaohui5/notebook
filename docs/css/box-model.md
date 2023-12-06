---
outline: deep
---

## CSS 盒模型

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202311012038577.png)

## 外边距和内边距

### 外边距 margin

设置当前元素和其他元素的位置距离, 设置撑开元素的宽/高度

```css
/* 单独设置 */
margin-top: 10px;
margin-right: 10px;
margin-bottom: 10px;
margin-left: 10px;

/* 连写设置顺序: 上 右 下 左 */
margin: 10px 20px 30px 40px;

/* 连写设置顺序: 上下 左右 */
margin: 10px 20px;
```

### 内边距 padding

设置当前元素和内容的位置距离, 内边距会撑开盒子的高度(默认情况下)

```css
/* 单独设置 */
padding-top: 10px;
padding-right: 10px;
padding-bottom: 10px;
padding-left: 10px;

/* 连写设置顺序: 上 右 下 左 */
padding: 10px 20px 30px 40px;

/* 连写设置顺序: 上下 左右 */
padding: 10px 20px;
```

## 边框和轮廓

### 边框 border

| 属性         | 说明       |
| :----------- | :--------- |
| none         | 不需要边框 |
| border-width | 边框宽度   |
| border-style | 边框风格   |
| border-color | 边框颜色   |

```css
border-width: 1px;
border-style: solid;
border-color: #f00;

/* 简写: width, style, color */
border: 1px solid #f00;

/* 四个方向都不需要边框 */
border: none;
```

#### 边框风格 border-style

| 类型   | 描述                                               |
| ------ | -------------------------------------------------- |
| none   | 定义无边框                                         |
| dotted | 定义点状边框, 在大多数浏览器中呈现为实线           |
| dashed | 定义虚线,在大多数浏览器中呈现为实线                |
| solid  | 定义实线,                                          |
| double | 定义双线,双线的宽度等于 border-width 的值          |
| groove | 定义 3D 凹槽边框,其效果取决于 border-color 的值    |
| ridge  | 定义 3D 垄状边框,其效果取决于 border-color 的值    |
| inset  | 定义 3D inset 边框,其效果取决于 border-color 的值  |
| outset | 定义 3D outset 边框,其效果取决于 border-color 的值 |

#### 单独设置某一个方向的边框

```css
/* 单独设置上边框: 简写(推荐) -> width, style, color */
border-top: 1px solid #eee;

/* 单独设置下边框: 不简写 */
border-top-width: 1px;
border-top-style: solid;
border-top-color: #f00;

/* 学会单独设置一个方向的边框, 那么其他方向的边框也是一样的:
border-left: 1px solid #00f;
border-right: 1px solid #0f0;
*/
```

### 边框圆角 border-radius

```css
border-top-left-radius: 10px; /* 左上角 */

border-top-right-radius: 10px; /* 右上角 */

border-bottom-left-radius: 50%; /* 左下角 */

border-bottom-right-radius: 50%; /* 右下角 */

/* 简写: 4个角同时设置 */
border-radius: 10px;
```

### 轮廓 outline

轮廓不会占用宽度(只会显示样式,但是不会占用宽度/高度)

| 属性          | 说明     |
| :------------ | :------- |
| outline-width | 轮廓宽度 |
| outline-color | 轮廓颜色 |
| outline-style | 轮廓样式 |

```css
outline-width: 10px;
outline-style: solid;
outline-color: #f00;

/* 简写(推荐) */
outline: 10px solid #f00;
```

#### 轮廓风格 outline-style

| 取值   | 说明                                            |
| :----- | :---------------------------------------------- |
| none   | 定义无轮廓(默认值)                              |
| dotted | 定义点状的轮廓                                  |
| dashed | 定义虚线轮廓                                    |
| solid  | 定义实线轮廓                                    |
| double | 定义双线轮廓双线的宽度等同于 outline-width 的值 |
| groove | 定义 3D 凹槽轮廓此效果取决于 outline-color 值   |
| ridge  | 定义 3D 凸槽轮廓此效果取决于 outline-color 值   |
| inset  | 定义 3D 凹边轮廓此效果取决于 outline-color 值   |
| outset | 定义 3D 凸边轮廓此效果取决于 outline-color 值   |

```css
input:focus {
  outline: none;
}
```

## 盒子尺寸计算方式 box-sizing

| 取值        | 计算方式                        | 说明                                                                   |
| :---------- | :------------------------------ | :--------------------------------------------------------------------- |
| content-box | height = padding+border+content | 元素的总宽度和总高度是内容区域宽度和高度加上外边距、边框和内填充的总和 |
| border-box  | height = content                |                                                                        |

::: code-group

```css [css]
.box-item {
  width: 100px;
  height: 100px;
  background: #f00;
  padding: 10px;
  border: 10px solid #0f0;
}

.box1 {
  /* 总宽度: width + (border-width * 2) + (padding * 2) */
  box-sizing: content-box;
}

.box2 {
  /* 总宽度: width */
  box-sizing: border-box;
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
    <div class="box1 box-item"></div>
    <div class="box2 box-item"></div>
  </body>
</html>
```

:::

## 阴影 box-shadown

```css
/*
box-shadown: 阴影垂直方向的位置  阴影水平方向的位置  阴影模糊距离  阴影扩散范围(也就是阴影大小)  阴影的颜色
*/
box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.5);
```

## 内容溢出控制

### 容器内容溢出 overflow

| 选项   | 说明                                              |
| ------ | ------------------------------------------------- |
| hidden | 溢出内容隐藏                                      |
| scroll | 显示滚动条(有些浏览器会一直显示,有些在滚动时显示) |
| auto   | 根据内容自动处理滚动条                            |

```css
/* 这会让水平/垂直方向都隐藏 */
overflow: hidden;

/* 单独设置水平方向 */
overflow-x: hidden;

/* 单独设置垂直方向 */
overflow-y: hidden;
```

### 文本内容溢出 text-overflow

<span class="red-text">`text-overflow: ellipsis` 需要与 `white-space: nowrap` 配合使用,否则文本不会被截断(因为会换行显示)</span>

| 选项     | 说明                                   |
| -------- | -------------------------------------- |
| clip     | 直接隐藏超出的内容不做其他操作(默认值) |
| ellipsis | 隐藏超出的内容, 并且显示 `...`         |
| "string" | 隐藏超出的内容, 并且显示自定义的字符串 |

```css
.paragraph-clip {
  text-overflow: clip;
  white-space: nowrap;
}

.paragraph-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.paragraph-more {
  text-overflow: ' more...';
  white-space: nowrap;
}
```

### 显示文本超出指定行才隐藏

```css
.text-limit {
  line-height: 18px; /* 根据实际情况来调整行高 */
  font-size: 10px;
  font-weight: normal;
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap; /* 禁止文字换行 */
  text-overflow: ellipsis; /* 超出显示 ... */
  display: -webkit-box; /* 使用特殊的显示模式 */
  -webkit-line-clamp: 2; /* 超出2行才阶段 */
  -webkit-box-orient: vertical;
}
```
