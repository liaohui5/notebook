## 背景颜色 background-color

背景颜色可以使用以下取值:

- 16进制
- gba
- rgba

```css
background-color: #f00;
background-color: rgb(255, 0, 0);
background-color: rgba(255, 0, 0, 0.5);
```

## 背景图片 background-image

取值范围: 图片的地址

```css
background-image: url('./images/1.png');
```

## 背景裁剪 background-clip

| 取值        | 说明                 |
| ----------- | -------------------- |
| border-box  | 包括边框             |
| padding-box | 不含边框, 包括内边距 |
| content-box | 内容区域             |

```css
background-clip: border-box;
```

## 背景重复 background-repeat

| 取值      | 说明                 |
| --------- | -------------------- |
| repeat    | 水平、垂直重复       |
| repeat-x  | 水平重复             |
| repeat-y  | 垂直重复             |
| no-repeat | 不重复               |
| space     | 背景图片对称均匀分布 |

```css
background-repeat: no-repeat;
```

## 背景定位 background-position

| 取值   | 说明     |
| ------ | -------- |
| left   | 左对齐   |
| right  | 右对齐   |
| center | 居中对齐 |
| top    | 顶端对齐 |
| bottom | 底部对齐 |

```css
background-position: center;
/* 
或者这样: 使用具体的值
background-position: x轴值, y轴值
background-position: 50px 50px;
*/
background-position: 50% 50%;
```

## 背景尺寸 bacckground-size

| 取值    | 说明                                       |
| ------- | ------------------------------------------ |
| cover   | 背景完全覆盖, 可能会有背景溢出             |
| contain | 图片不溢出的放在容器中, 可能会漏出部分区域 |

```css
background-size: 50% 100%;
```

## 组合简写 background

```css
/* 颜色 背景图片地址 重复方式 图片位置 图片大小 */
background: red url(xj-small.png) no-repeat right 50%;
```

## 渐变背景

主要用到两个css函数:

- 线性渐变: [linear-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient)
- 径向渐变: [radial-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/radial-gradient)
- 锥形渐变: [conic-gradient](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)

```css
/* 线性渐变 */
background-image: linear-gradient(to right, red, green, blue);

/* 径向渐变 */
background-image: radial-gradient(red, green, blue);

/* 锥形渐变 */
background-image: conic-gradient(red, green, blue);
```

> css 的 linear-gradient 为什么可以作用到 background-image 上, 但是不能作用到 background-color 属性上?

它可以作为背景图像来使用。当你将 linear-gradient() 函数作为 background-image 的值时，它会创建一个渐变背景图像，并将其应用于元素的背景

回答来自 ChatGPT 3.5
