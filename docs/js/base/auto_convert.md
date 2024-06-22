## 为什么会自动转换?

在一些特定的情况下, 代码会自动使用包装类将一个普通的值转换从一个对象来保证代码的正确运行

从一个方面来说, 这是脚本语言的便捷性, 从另外一个方面来说, 这也体现了脚本语言不如强类型语言严谨的问题

```js
const n = 1;
n.toString();
// 这个将 n 自动转为对象然后执行 toString 方法的过程就是自动装箱
```

## 包装类 & 自动装/拆箱

个人理解: 在js代码被js执行的时候, 一些 基本类型 的值,会自动被js引擎 "装箱",
在取值/运算的时候, 会自动 拆箱 , 这也就是为什么一些 基本类型可以像对象那样直接使用 . 调用方法,
 一些类型就不行, 比如 undefined 和 null 就不能调用方法, 而 string 和 number 却可以直接调用方法/属性
[装箱/拆箱概念参考](https://www.cnblogs.com/dolphin0520/p/3780005.html)
 
1. Number
2. String
3. Boolean
4. Object, 这个比较特殊

```js
var n1 = 1.35;
var n2 = new Number(1.22);
console.log(typeof n1); // number
console.log(typeof n2); // object
n1.toFixed(2); // n1 是 number类型, 却可以像使用对象那样直接调用方法 -> 自动装箱

var str = "hello world";
str = str.slice(1);
```

### 什么情况会装箱?

在给基本类型并且有与之对应的构造函数的值使用 点语法 的时候会自动装箱

```js
// 此时就会装箱
// 1. 有 String 这个构造函数
// 2. 基本类型变量使用了 . 语法
var str = "hello";
console.log(str.length); // new String("hello").length

// 此时不会装箱, 而是直接报错
// 因为 undefined 类型并没有, 与之类型对应构造函数
var undf = undefined;
console.log(undf.length); 

// --- es6 的内容 --- //

// 这里是把 1 隐式处理为 => Number(1) 
// 只有这样才能用对象的解构方式来获取到 toString
const { toString: s1 } = 1;
console.log(s1 === Number.prototype.toString); // true
```

### 什么情况会拆箱?

在运行运算的时候会拆箱(比如: 比较运算, 判断, 数学运算等..)

```js
var str = new String("hello");
console.log(typeof str); // 运算前: object
console.log(typeof str); // 运算后: string
```
