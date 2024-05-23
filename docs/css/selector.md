---
outline: deep
---

## 什么是选择器?

所谓选择器就是用来选中HTML标签的一类表达式符号, 样式是作用在html标签上的, 所以需要选中想要的标签然后在设置属性和值

```css
/*
因为 css 的语法是这样的

选择器 {
  属性: 值;
  属性: 值;
  属性: 值;
}

所以,选择器就是用来选择需要设置这些属性和值的的标签的, 如:

div {
  background-color: red;
}
*/
```

## 基本选择器

| 选择器     | 示例  | 选择器名     | 描述                         |
| ---------- | ----- | ------------ | ---------------------------- |
| selector   | p     | 标签选择器   | 选择所有 p 标签              |
| .className | .item | 类选择器     | 选择 class="item" 的所有标签 |
| \#id       | \#app | id 选择器    | 选择 id="app" 的所有标签     |
| \*         | \*    | 通配符选择器 | 选择所有标签                 |

<span class="red-text"> ID 应该是唯一的, 虽然为多个元素设置同一个 ID 也可以产生样式效果, 但这是不符合规范的</span>

## 结构选择器

| 选择器            | 示例  | 描述                   |                                                 |
| ----------------- | ----- | ---------------------- | ----------------------------------------------- |
| selector,selector | div,p | 并集选择器             | 选择所有 div 标签和所有 p 标签                  |
| selector selector | div p | 后代选择器             | 选择 div 标签内部的所有 p 标签                  |
| selector>selector | div>p | 子元素选择器           | 选择父元素为 div 标签的所有 p 标签              |
| selector+selector | div+p | 相邻兄弟选择器         | 选择紧接在 div 标签之后的所有 p 标签            |
| selector~selector | div~p | 兄弟选择器(关联选择器) | 选择 div 元素同级并在 div 元素后面的所有 p 元素 |

## 属性选择器

| 选择器              | 示例            | 描述                                                                   |
| ------------------- | --------------- | ---------------------------------------------------------------------- |
| [attribute]         | [src]           | 所有带有 src 属性所有标签                                              |
| [attribute=value]   | [target=_blank] | target 属性 等于"\_blank" 的所有标签                                   |
| [attribute~=value]  | [title~=hello]  | title 属性包含单词 "hello" 的所有标签                                  |
| [attribute\|=value] | [title\|=hello] | title 属性值为 "hello" 的单词,或类似 `hello-world` 以-连接的的独立单词 |
| [attribute*=value]  | a[src*="baidu"] | src 属性中包含 "baidu" 字符的每个 a 标签                               |
| [attribute^=value]  | a[src^="https"] | src 属性值以 "https" 开头的每个 a 标签                                 |
| [attribute$=value]  | a[src$=".png"]  | src 属性以 ".png" 结尾的所有 a 标签                                    |

## 伪类选择器

### 特殊伪类

| 状态   | 示例    | 说明                                        |
| ------ | ------- | ------------------------------------------- |
| :root  | :root   | 选择文档的根元素即 html                     |
| :empty | p:empty | 选择没有子元素的每个 p 元素（包括文本节点） |

### 超链接伪类

| 状态     | 示例      | 说明                   |
| -------- | --------- | ---------------------- |
| :link    | a:link    | 选择所有未被访问的链接 |
| :visited | a:visited | 选择所有已被访问的链接 |
| :hover   | a:hover   | 鼠标移动到元素上时     |
| :active  | a:active  | 点击正在发生时         |

### 结构伪类

| 状态                      | 示例                       | 说明                                        |
| ------------------------- | -------------------------- | ------------------------------------------- |
| :first\-child             | p:first\-child             | 选择属于父元素的第一个子元素的每个 p 元素   |
| :last\-child              | p:last\-child              | 选择属于其父元素最后一个子元素每个 p 元素   |
| :first\-of\-type          | p:first\-of\-type          | 选择属于其父元素的首个 p 元素的每个 p 元素  |
| :last\-of\-type           | p:last\-of\-type           | 选择属于其父元素的最后 p 元素的每个 p 元素  |
| :only\-of\-type           | p:only\-of\-type           | 选择属于其父元素唯一的 p 元素的每个 p 元素  |
| :only\-child              | p:only\-child              | 选择属于其父元素的唯一子元素的每个 p 元素   |
| :nth\-child\(n\)          | p:nth\-child\(2\)          | 选择属于其父元素的第二个子元素的每个 p 元素 |
| :nth\-child\(odd\)        | p:nth\-child\(odd\)        | 选择属于其父元素的奇数 p 元素               |
| :nth\-child\(even\)       | p:nth\-child\(even\)       | 选择属于其父元素的偶数 p 元素               |
| :nth\-of\-type\(n\)       | p:nth\-of\-type\(2\)       | 选择属于其父元素第二个 p 元素的每个 p 元素  |
| :nth\-last\-child\(n\)    | p:nth\-last\-child\(2\)    | 同上,从最后一个子元素开始计数               |
| :nth\-last\-of\-type\(n\) | p:nth\-last\-of\-type\(2\) | 同上,但是从最后一个子元素开始计数           |
| :not\(selector\)          | :not\(p\)                  | 选择非 p 元素的每个元素                     |

### 表单伪类

| 选择器    | 示例           | 说明                        |
| --------- | -------------- | --------------------------- |
| :focus    | input::focus   | 选择获得焦点的 input 元素   |
| :enabled  | input:enabled  | 选择每个启用的 input 元素   |
| :disabled | input:disabled | 选择每个禁用的 input 元素   |
| :checked  | input:checked  | 选择每个被选中的 input 元素 |
| :required | input:required | 包含required属性的元素      |
| :optional | input:optional | 不包含required属性的元素    |
| :valid    | input:valid    | 验证通过的表单元素          |
| :invalid  | input:invalid  | 验证不通过的表单            |

## 伪元素选择器

| 状态     | 示例     | 说明                            |
| -------- | -------- | ------------------------------- |
| ::before | p:before | 在每个 p 元素的内容之前插入内容 |
| ::after  | p:after  | 在每个 p 元素的内容之后插入内容 |

## 不同浏览器兼容

### 浏览器前缀

在CSS中,某些属性可能在不同的浏览器中得到不同的支持,这就需要使用浏览器前缀来确保在所有浏览器中都能正确显示样式,以下是一些常见的CSS属性浏览器前缀：

| 前缀     | 说明          |
| :------- | :------------ |
| -webkit- | Safari/Chrome |
| -moz-    | Firefox       |
| -ms-     | IE            |
| -o-      | Opera         |

常见的需要添加浏览器前缀的的样式有: 盒阴影、圆角、透明度等

```css
.box {
  /* 保证所有的浏览器都能正确的显示圆角 */
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
}
```

<span class="red-text">注意:一般这种添加浏览器前缀,不需要人工手动去添加,应该使用工具</span>

- https://github.com/postcss/autoprefixer

### 不同浏览器的伪元素选择器

浏览器滚动条样式

```css
/* 修改滚动条背景颜色 */
::-scrollbar {
  width: 10px;
}

/* Chrome/Safari */
::-webkit-scrollbar {
  width: 10px;
}

/* Firefox */
::-moz-scrollbar {
  width: 10px;
}

/* Opera */
::-o-scrollbar {
  width: 10px;
}

/* IE */
::-ms-scrollbar {
  width: 10px;
}
```
