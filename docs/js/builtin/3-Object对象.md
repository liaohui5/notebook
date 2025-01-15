## 基础介绍

### Object 类

在 JavaScript 中，Object 是一个内置对象, 用于表示和操作复杂的数据结构m, 几乎所有类型的值都可以被视为对象, 包括数组、函数和日期等,
甚至 数值, 字符串, 和布尔值都有对应的包装类, Object 对象提供了一系列方法和属性, 用于创建、操作和检查对象, 所以在 JS 中 `万物皆对象`

更多的内容可以[查看MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

### 创建对象

```js
// 字面量创建
const user = {
  id: 1,
  name: 'tom'
}

// new 关键字创建
const obj = new Object();
const date = new Date();
const reg = new RegExp("\d");
```

### 遍历对象

```js
const user = {
  id: 1,
  name: 'tom'
}

for (let key in user) {
  if(user.hasOwnProperty(key)) {
    console.log(key, user[key]);
  }
}
```

<!--@include: ./object/获取属性与遍历对象.md -->
<!--@include: ./object/静态方法学习.md -->
<!--@include: ./object/实例方法学习.md -->
<!--@include: ./object/对象克隆.md -->
<!--@include: ./object/树形数据处理.md -->