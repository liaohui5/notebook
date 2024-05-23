## 关键帧动画与过渡效果的区别

过渡必须要设置触发条件(如:hover), 也就是说需要手动触发, 而动画模块不需要手动的触发就可以直接执行动画

## 示例代码

::: code-group

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>关键帧动画</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div id="box1"></div>
    <div id="box2"></div>
  </body>
</html>
```

```css [style.css]
body,
html {
  margin: 0;
  padding: 0;
}

#box1,
#box2 {
  width: 100px;
  height: 100px;
  margin: 0;
}

#box1 {
  background: #f00;
}

#box2 {
  background: #0f0;
}
```

:::

## 定义动画

```css
/*
定义动画的格式如下: 

@keyframes 动画名 {
  动画关键帧 {
    需要进行变化的属性: 值
  }
}
*/

/* 使用关键字定义关键帧 */
@keyframes move-to-right {
  form {
    /* 动画开始状态 */
    margin-left: 0px;
    transform: scale(1);
  }
  to {
    /* 动画结束状态 */
    margin-left: 500px;
    transform: scale(2);
  }
}

/* 使用百分比更精准的控制动画 */
@keyframes move-to-down {
  0% {
    /* 第一帧: 动画开始状态 */
    margin-top: 10px;
    transform: scale(1);
  }
  25% {
    /* 第二帧 */
    margin-top: 50px;
    transform: scale(1.25);
  }
  50% {
    /* 第三帧 */
    margin-top: 100px;
    transform: scale(1.5);
  }
  75% {
    /* 第四帧 */
    margin-top: 150px;
    transform: scale(1.25);
  }
  100% {
    /* 第五帧: 动画结束状态 */
    margin-top: 200px;
    transform: scale(1);
  }
}
```

## 应用动画

::: code-group

```css [应用动画]
#box1 {
  background: #f00;
  /* 
    应用动画: 需要给哪个元素加上哪个动画, 就给这个元素设置对应的 animation-name
    动画时长: 和过渡类似, 关键帧动画也需要设置动画时长
  */
  animation-name: move-to-right;
  animation-duration: 2s;
}

#box2 {
  background: #0f0;
  /* 使用简写形式: animation: animation-name animation-duration */
  animation: move-to-down 2s;
}
```

```css [style.css]
body,
html {
  margin: 0;
  padding: 0;
}

#box1,
#box2 {
  width: 100px;
  height: 100px;
  margin: 0;
}

#box1 {
  background: #f00;
  animation-name: move-to-right;
  animation-duration: 2s;
}

#box2 {
  background: #0f0;
  animation-name: move-to-down;
  animation-duration: 2s;
}

/* 使用关键字定义关键帧 */
@keyframes move-to-right {
  form {
    /* 动画开始状态 */
    margin-left: 0px;
  }
  to {
    /* 动画结束状态 */
    margin-left: 500px;
  }
}

/* 使用百分比更精准的控制动画 */
@keyframes move-to-down {
  0% {
    /* 第一帧: 动画开始状态 */
    margin-top: 10px;
    transform: scale(1);
  }
  25% {
    /* 第二帧 */
    margin-top: 50px;
    transform: scale(1.25);
  }
  50% {
    /* 第三帧 */
    margin-top: 100px;
    transform: scale(1.5);
  }
  75% {
    /* 第四帧 */
    margin-top: 150px;
    transform: scale(1.25);
  }
  100% {
    /* 第五帧: 动画结束状态 */
    margin-top: 200px;
    transform: scale(1);
  }
}
```

:::

应用动画之后, 不需要先过渡那样, 需要设置一个手动触发的条件, 直接自动开始

## 支持使用动画的属性

[推荐阅读MDN文档](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)

## 其他属性和取值

| 属性                      | 取值                                                          |
| :------------------------ | :------------------------------------------------------------ |
| animation-name            | 指定帧动画名, 如 `move-to-down`                               |
| animation-duration        | 动画执行时长                                                  |
| animation-iteration-count | 动画执行次数, `infinite` 表示无限执行                         |
| animation-direction       | 动画执行方向, normal/reverse/alternate/alternate\-reverse     |
| animation-delay           | 动画执行前的延迟时间, 如 `100ms`                              |
| animation-timing-function | 动画执行速率, [可在这体验](https://cubic-bezier.com/#0,0,1,1) |
| animation-play-state      | 动画执行状态, paused:暂停, running:执行                       |

### 动画方向取值

| 选项               | 说明                            |
| ------------------ | ------------------------------- |
| normal             | 从 0%到 100%运行动画            |
| reverse            | 从 100%到 0%运行动画            |
| alternate          | 先从 0%到 100%,然后从 100%到 0% |
| alternate\-reverse | 先从 100%到 0%,然后从 0%到 100% |

### 动画速率取值

| 值                       | 描述                                  |
| ------------------------ | ------------------------------------- |
| linear                   | 规定以相同速度开始至结束的过渡效果    |
| ease                     | 开始慢,然后快,慢下来,结束时非常慢     |
| ease\-in                 | 开始慢,结束快                         |
| ease\-out                | 开始快,结束慢                         |
| ease\-in\-out            | 中间快,两边慢                         |
| cubic\-bezier\(n,n,n,n\) | 在 cubic\-bezier 函数中自定义执行速率 |

## 简写形式注意点

animation 属性是一个简写属性，用于设置六个动画属性：

| 属性                      | 描述         | 是否必选 |
| :------------------------ | :----------- | :------- |
| animation-name            | 动画名       | Y        |
| animation-duration        | 动画持续时间 | Y        |
| animation-timing-function | 动画执行速率 | N        |
| animation-delay           | 动画延迟时间 | N        |
| animation-iteration-count | 动画执行次数 | N        |
| animation-direction       | 动画执行方向 | N        |

## 极简加载动画练习

::: code-group

```html [index.html]
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>极简加载动画练习</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body>
    <div id="loading"></div>
  </body>
</html>
```

```css [style.css]
body,
html {
  margin: 0;
  padding: 0;
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

#loading {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  /* 画个圆圈, 让其中一个边框透明, 看到旋转动画效果 */
  border: 10px solid #f00;
  border-left: 10px solid transparent;
  animation: loading 500ms infinite linear;
}

@keyframes loading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
```

:::
