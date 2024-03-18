## 转换模块 transform

CSS 转换(transform)允许您移动、旋转、缩放和倾斜元素, 并且默认参考位置是元素本身

转换模块取值函数:

| 函数                      | 说明                                               |
| ------------------------- | -------------------------------------------------- |
| none                      | 取消转换(不进行转换)                               |
| translateX\(x\)           | 定义转换, 只是用 X 轴的值                          |
| translateY\(y\)           | 定义转换, 只是用 Y 轴的值                          |
| translateZ\(z\)           | 定义 3D 转换, 只是用 Z 轴的值                      |
| translate\(x,y\)          | 定义 2D 转换(translateX + translateY)              |
| translate3d\(x,y,z\)      | 定义 3D 转换(translateX + translateY + translateZ) |
| scaleX\(x\)               | 通过设置 X 轴的值来定义缩放转换                    |
| scaleY\(y\)               | 通过设置 Y 轴的值来定义缩放转换                    |
| scaleZ\(z\)               | 通过设置 Z 轴的值来定义 3D 缩放转换                |
| scale\(x,y\)              | 定义 2D 缩放转换 (scaleX + scaleY)                 |
| scale3d\(x,y,z\)          | 定义 3D 缩放转换 (scaleX + scaleY + scaleZ)        |
| rotateX\(angle\)          | 定义沿着 X 轴的 3D 旋转                            |
| rotateY\(angle\)          | 定义沿着 Y 轴的 3D 旋转                            |
| rotateZ\(angle\)          | 定义沿着 Z 轴的 3D 旋转                            |
| rotate\(angle\)           | 定义 2D 旋转,在参数中规定角度 (rotateZ)            |
| rotate3d\(x,y,z,angle\)   | 定义 3D 旋转 (rotateX + rotateY + rotateZ)         |
| skewX\(angle\)            | 定义沿着 X 轴的 2D 倾斜转换                        |
| skewY\(angle\)            | 定义沿着 Y 轴的 2D 倾斜转换                        |
| skew\(x\-angle,y\-angle\) | 定义沿着 X 和 Y 轴的 2D 倾斜转换 (skewX + skewY)   |
| perspective\(n\)          | 为 3D 转换元素定义透视视图                         |

## 基本的形变操作

主要以 2D 作为笔记, 理解了 2D 那么在学习 3D 转换时, 只需要注意 Z 轴就可以和透视属性即可, 其他和 2d 是一样的

- 平移
- 缩放
- 旋转
- 倾斜

```html {30-65}
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <style>
      .list,
      .item {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }
      .list {
        width: 500px;
        border: 1px solid #eee;
        box-sizing: border-box;
        margin: 100px auto;
      }
      .list .item {
        width: 100px;
        line-height: 30px;
        background: #f00;
        margin-bottom: 100px;
        text-align: center;
        /* 使用过渡效果, 让属性变化 */
        transition: all 1000ms;
      }
      .item:last-child {
        margin-bottom: 0;
      }
      .list:hover .translate {
        /* 
          translate: 是根据原来位置作为参照物
          第一个参数代表的是x轴的平移量, 如果是负数则向左平移
          第二个参数代表的是y轴的平移量, 如果是负数则向上平移
          如:x轴向右平移100px，y轴向下平移45px
        */
        transform: translate(200px, 50px);
      }
      .list:hover .scale {
        /* 
          scale: 是根据原来尺寸大小来作为参照物
          第一个参数代表宽度缩放多少倍数
          第二个参数代表高度缩放多少倍数
          倍数值设置为正数放大,负数缩小,如果设置为1,代表不缩放
          如:宽度高度全部放大 1.5倍
        */
        transform: scale(1.5, 1.5);
      }
      .list:hover .rotate {
        /* 
          scale: 是根据原来位置来作为参照物
          正数向右旋转, 负数向左旋转, 注意单位是 deg
          如:向右旋转45度
        */
        transform: rotate(45deg);
      }
      .list:hover .skew {
        /* 
          skew: 是根据原来的角度
          第一个参数是x轴, 第二个参数是y轴
          正数向右/下倾斜, 负数向左/上倾斜
          如:x轴向右倾斜45度，y轴向下倾斜45度
        */
        transform: skew(15deg, 15deg);
      }
    </style>
  </head>
  <body>
    <div id="app" class="container">
      <ul class="list">
        <li class="item translate">translateX</li>
        <li class="item scale">scale</li>
        <li class="item skew">skew</li>
        <li class="item rotate">rotate</li>
      </ul>
    </div>
  </body>
</html>
```

![2d模块效果](https://raw.githubusercontent.com/liaohui5/images/main/images/202401010955235.gif)

## 形变中心点

默认情况下, 旋转是参考元素自身的中心点来进行旋转操作的, 而这个 `形变中心点` 是可以设置的

```html {29-51}
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <style>
      .box {
        width: 100%;
        height: 100%;
        /* width: 100px; */
        margin: 100px auto;
        display: flex;
      }
      .box-outer {
        width: 100px;
        height: 100px;
        background-color: #ccc;
        margin-right: 100px;
      }
      .box-inner.normal {
        transform: rotate(0deg);
      }
      .box-inner {
        /* 外层作为参考点, 模拟元素未旋转之前的位置 */
        width: 100%;
        height: 100%;
        background-color: #f00;
        transform: rotate(45deg);
      }
      /* 
        transform-origin 设置旋转的中心点
        允许的值3种:  
          1. 特殊位置关键字(left top bottom right)
          2. 百分比
          3. 像素具体值(也支持 rem 之类的单位)
      */
      .box-inner.left-top {
        transform-origin: left top;
      }
      .box-inner.right-top {
        transform-origin: right top;
      }
      .box-inner.left-bottom {
        transform-origin: 0% 100%;
      }
      .box-inner.right-bottom {
        transform-origin: 100% 100%;
      }
      .box-inner.custom-position {
        /* 中心点, 因为宽度和高度都是 100px */
        transform-origin: 50px 50px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="box-outer">
        <div class="box-inner normal">不旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner">基于中心点旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner left-top">基于左上角旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner left-bottom">基于左下角旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner right-top">基于右上角旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner right-bottom">基于右下角旋转</div>
      </div>
      <div class="box-outer">
        <div class="box-inner custom-position">自定义一个位置旋转</div>
      </div>
    </div>
  </body>
</html>
```

![transform-origin](https://raw.githubusercontent.com/liaohui5/images/main/images/202401031413901.png)

## 转换轴向

![x-y-z](https://raw.githubusercontent.com/liaohui5/images/main/images/202401031500035.png)

## 透视属性 & 聚焦属性

> 透视属性 perspective

所谓透视属性就是模拟人眼的近大远小的效果, perspective 这个属性就是设置, 是在多远距离来观察需要呈现效果的元素,

值越小, 代表距离越近, 效果越明显, 值越大, 代表距离越远, 效果越不明显

> 聚焦属性 perspective-origin

所谓聚焦属性就是模拟人眼睛看一个物体的聚焦点, 必须设置透视属性才生效

```html {23-28}
<!doctype html>
<html lang="zh-cn">
  <head>
    <title>JavaScript</title>
    <style>
      .box-list {
        margin: 30px auto;
        display: flex;
        padding-left: 50px;
      }
      .box-item {
        width: 100px;
        height: 100px;
        border: 1px solid #f00;
        margin-right: 100px;
      }
      .box-inner {
        width: 100%;
        height: 100%;
        background: #f00;
        transition: transform 1s;
      }
      .rotate1 {
        transform: rotateX(50deg);
      }
      .rotate2 {
        transform: perspective(300px) rotateX(45deg);
      }
    </style>
  </head>
  <body>
    <div class="box-list">
      <div class="box-item">
        <div class="box-inner rotate1">未设置透视属性</div>
      </div>
      <div class="box-item">
        <div class="box-inner rotate2">已设置透视属性</div>
      </div>
    </div>
  </body>
</html>
```

![perspective](https://raw.githubusercontent.com/liaohui5/images/main/images/202401032306892.png)

可以从上图很明显的看出, 在设置透视属性后, 平面图是有类似人眼的 "近大远小" 的视觉效果的
