## 内存模型

在JavaScript中，数据类型分为两大类：原始数据类型（Primitive Data Types）和引用数据类型（Reference Data Types）
理解这两者的区别对于深入学习 JavaScript 非常重要

### 原始数据类型(Primitive Data Types)

原始数据类型是JavaScript中最基本的数据存储方式，它们是不可变的，意味着你不能更改这些类型的值本身，当你尝试修改时，
实际上是创建了一个新的值。JavaScript中有六种原始数据类型:

+ Number
+ String
+ Boolean
+ undefined
+ null
+ Symbol

```js
let a = 10;
a = "str";
```

### 引用数据类型(Reference Data Types)

引用数据类型是存储在堆内存中的复杂数据结构,
这意味着两个变量可以引用同一个内存地址, 改变其中一个变量的值会影响到另一个,
JavaScript中的所有广义上的对象都是引用数据类型:

```js
const o = new Object();
const d = new Date();
const s = new String('str');
```

### 数据的拷贝

由于引用数据类型的特性, 将一个变量的值直接赋值给另外一个变量是无法获取一份新的数据的

::: code-group

```js [问题]
const obj = {
  id: 1,
  name: 'tom'
}

const obj2 = obj1; // 这还是同一份数据
```

```js [浅拷贝]
function shallowClone(obj) {
  const target = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key];
    }
  }
  return target;
}
```

```js [深拷贝]
/* 解决浅拷贝只会遍历一层数据的问题, 如这样的数据就无法完整拷贝了:
var obj = {
  id: 1,
  name: 'tom',
  friends: ['jerry', 'spike']
}
*/
function deepClone(obj) {
  const target = {};
  const toString = Object.prototype.toString;
  for (const key in obj) {
    const val = obj[key];
    if (obj.hasOwnProperty(key)) {
      if (val && typeof val === "object") {
        target[key] = toString.call(val) === "[object Array]" ? [] : {};
        deepClone(val, target[key]);
      } else {
        target[key] = val; // 非引用值, 直接赋值
      }
    }
  }
  return target;
}
```

:::

## 垃圾回收

也就是 `Garbage Collection` 的直译, 简称 `GC` 

## 内存溢出

使用太多内存导致内存爆满

```js
// 递归调用自身，没有停止条件，最终耗尽栈内存导致内存溢出
function recursiveCall(i) {
  console.log(i);
  recursiveCall(i + 1);
}
recursiveCall(0);
```

## 内存泄漏

代码的逻辑问题导致有一些无用的变量一直存在内存中没有被回收

```js
function memoryLeakWithTimer() {
  var div = document.getElementById('div');
  var top = 0;
  setInterval(function() {
    top += 10;
    div.style.top = top + "px";
  }, 1000);
  // 即使后来 div 不再需要，setInterval内的回调依然持有着对 div 的引用
  // 如果 div 从 DOM 中移除，但定时器还在运行，div 就不会被垃圾回收
  // 解决办法如下:
  // var timer = setInterval(function() {
  //   top += 10;
  //   div.style.top = top + "px";
  // }, 1000);
  // 当不需要时候, 及时的清除掉计时器
  // timer && clearInterval(timer);
}
```
