---
outline: deep
---

## 相关资料

- 标准文档: https://tc39.es/ecma262/
- ES6 入门教程: https://es6.ruanyifeng.com/

## let/const 关键字

es6之前, 定义变量只能用 `var` 关键字来定义, 但是 `var` 关键字的缺点很多, 比如: 变量提升, 会导致一些迷惑性的代码
但是为了做先后兼容, 又不能直接修改 `var` 关键字, 所以在 es6 就新增了 `let` 和 `const` 关键字, 用来定义 `变量` 和 `常量`

```js
var str1 = 'str1';
let str2 = 'str2';
const str3 = 'str3';
```

### let/const 和 var 有什么不同

es6之前, js只有全局作用域和函数作用域, 没有块级作用域的概念,es6出现后,开始有了块级作用域的概念
let/const 是块级作用域, 没有变量提升现象

```javascript
{
  var vstr = 'hi';
  let lstr = 'hi';
}

console.log(vstr); // hi
console.log(lstr); // ReferenceError: lstr is not defined

// if
if (true) {
  let a = 1;
}
console.log(a); // ReferenceError

// for
for (let i = 0; i < 5; i++) {}
console.log(i); // ReferenceError
```

### let 和 const 有什么不同

1. let 用于定义变量, const 用于定义常量, const 定义的常量不能重新赋值

```javascript
let str1 = 'hello';
str1 = 'world';

const str2 = 'hi';
str2 = 'hello'; // TypeError: Assignment to constant variable.

const obj = {
  id: '101',
  name: 'jack',
};

obj.id = '102'; // 这个不是给变量重新赋值, 这个是修改变量(对象)属性的值
```

### 暂时性死区(TDZ: Temporal Dead Zone)

在es6之前,使用 var定义的变量, 因为有变量提升的现象存在, 所以, 在(用 `var`)定义之前直接使用是不会报错的
但是有了es6之后, 用`let/const`定义的变量(`没有变量提升现象`), 必须先定义, 然后在使用, 否则就会 `ReferenceError`

```javascript
console.log(vmsg); // undefined
var vmsg = 'hello';

console.log(lmsg);
let lmsg = 'world'; // ReferenceError

var a = a;
console.log(a); // unedeeind;

let b = b;
console.log(b); // ReferenceError

// typeof 判断问题
cnosole.log(typeof c); // undefined
console.log(typeof d); // ReferenceError
let d;
```

## 解构赋值(结构化赋值)

### 解构 && 嵌套解构

```javascript
// 对象的解构
let { name, age, friends } = { name: 'tom', age: 18 };
console.log(name, age, friends); // tom 18 undefined

// 数组解构
let [first, second, last] = [1, 2, 3];
console.log(first, second, last); // 1 2 3

// ------- 嵌套解构 --------

// 嵌套解构(数组->对象): 个人不建议使用, 可读性差, 特别是超过2层的时候
const datas = [
  { id: 1, name: 'user1', email: 'user1@qq.com' },
  { id: 1, name: 'user2', email: 'user2@qq.com' },
  { id: 1, name: 'user3', email: 'user3@qq.com' },
];
const [{ name: name1 }, { name: name2 }, { name: name3 }] = datas;
console.log(name1, name2, name3);

// 嵌套解构(对象->对象): 个人不建议使用, 可读性差, 特别是超过2层的时候
const familyTree = {
  name: '王大富',
  son: {
    name: '王国忠',
    son: {
      name: '王韬',
    },
  },
};

const {
  son: {
    son: { name: wt },
  },
} = familyTree;
console.log(wt);
```

### 解构并且重命名

```javascript
// 解构别名(对象)
let { name: userName, age: userAge } = { name: 'tom', age: 18 };
console.log(userName, userAge); // tom 18

// console.log(age); ReferenceError: age is not defiend

// console.log(name); undefined 是因为 window.name 的原因
// 在node环境下: ReferenceError: name is not defiend
```

### 解构默认值

```javascript
// 解构默认值,有点类似函数的默认参数
// 如果解构失败(或者值是undefined), 就使用默认值
// 如果能够结构成功, 就优先使用结构的值
let { name, age = 22, friends = 'jerry' } = { name: 'tom', age: 18 };
console.log(name, age, friends); // tom 18 jerry

let [first, second = 22, last, other = 4] = [1, 2, 3];
console.log(first, second, last, other); // 1 2 3 4
```

### 解构赋值隐式转换(自动装箱)

只有对象才能够解构赋值, 所以对原始值进行解构操作, 一定要向装箱才能解构

```javascript
// 从Number构造函数的原型对象中解构出 toString 方法
// 可以这样理解如下代码
// let toString = (new Number(1)).toString
let { toString } = 1;
console.log(toString === Number.prototype.toString); // true

// 也可以解构并重命名
let { toString: tostr } = false;
console.log(tostr === Boolean.prototype.toString); // true

// 同理也可以解构其他属性
let { length } = 'str';
console.log(length); // 3
```

## class/super/extends/static 等关键字

在 es6 之前想要定义一个类, 是比较变态的, js 不像其他语言一样,
可以用 `class` 关键字来直接定义类, 也不能用 `extends` 来直接继承,
而是要通过 `function` 关键字通过各种操作才能实现 `类` 和 `继承` 这两个面向对象编程中很重要的两个概念

::: code-group

```js [es6]
// 定义类
class Animal {
  constructor(age) {
    this.age = age;
  }
  eat() {
    console.log('我需要吃东西');
  }

  // 静态方法
  static isAnimal(obj) {
    return obj !== nulll && typeof obj === 'function' && obj instanceof Animal;
  }
}

// 继承基类
class Cat extends Animal {
  name = '';
  constructor(name, age) {
    super(age);
    this.name = name;
  }
  catchMouse() {
    console.log('我可以抓老鼠');
  }
}
```

```js [es5]
// 定义类
function Animal(age) {
  this.age = age;
}
Animal.prototype.eat = function () {
  console.log('我需要吃东西');
};

// 静态方法
Animal.isAnimal = function (obj) {
  return obj !== nulll && typeof obj === 'function' && obj instanceof Animal;
};

// 继承类
function Cat(name) {
  Animal.call(this); // 1. 让子类获取父类的所有属性
  this.name = name;
}
Cat.prototype = Object.create(Animal.prototype); // 2. 让子类的原型指向父类的原型
Cat.prototype.constructor = Cat; // 3. 让子类的原型对象(constructor) 指向子类本身
Cat.prototype.catchMouse = function () {
  console.log('我可以抓老鼠');
};
```

:::

> Q: ES5 的类又不是不能用? 为什么要使用新语法呢?

<span class="red-text">咱凭良心说, 哪种方式跟简洁明了?
那肯定是 ES6 的这种语法啊, 哪怕就只是一个语法糖, 这种方式
也比原来的容易理解啊, 再者说 `prototype` 是底层实现的一个
`链表`(JS中叫原型链), ES5继承的方式是通过强行修改这个链表节点的值,
这是不太好的</span>

## 新增运输符

### Nullish Coalescing 判断符 ??

🤔 呃, 这个名字实在不好记忆, 还是强行翻译下叫 `聚合空值判断符` 吧

注: `??` 运算符和 `||` 不同的是, 它只会判断 `null` 和 `undefined` 不会判断其他的 false 值

```js
const v1 = null ?? 'default-value'; // default-value
const v2 = null || 'default-value'; // default-value

const v3 = undefined ?? 'default-value'; // default-value
const v4 = undefined || 'default-value'; // default-value

const v5 = NaN ?? 'default-value'; // NaN
const v6 = NaN || 'default-value'; // default-value

const v7 = false ?? 'default-value'; // false
const v8 = false || 'default-value'; // default-value

const v9 = 0 ?? 'default-value'; // 0
const v0 = 0 || 'default-value'; // default-value
```

### 可选链运算符 ?.

如果一个对象上的值不存在就可以直接返回 undeinfed, 而不是报错

```js
const obj = {
  foo: {
    bar: 1,
  },
};

const v1 = obj.no_exists_property.bar; // Uncaught TypeError: Cannot read properties of undefined (reading 'bar')
const v2 = obj?.no_exists_property?.bar; // undefined

/*
v2 不会报错: 因为用的是 ?. 运算符, 其实原理很简单, ?就是在判断之前想判断下值是否是对象, 如果是对象才取值
const v2 = obj?.no_exists_property?.bar;
可以将这个代码理解为这样, 每次用 . 取值都判断一次, 被取值的是否是一个对象, 如果不是那么就返回 undefined
我们也可以用利用 IIFE 立即执行的特性, 手动模拟实现:
*/

// 模拟实现 ?.
const v3 = (function (object, keys) {
  const isObject = (value) => value !== null && typeof value === 'object';
  let value = object;
  for (let i = 0; i < keys.length; i++) {
    if (!isObject(value)) {
      return;
    }
    value = value[keys[i]]; // 每次改变 value 的值, 一层一层的取值
  }
  return value;
})(obj, ['no_exists_property', 'bar']);
```

### 指数运算符 \*\*

这个其实是 `Math.pow(x, y)` 这个方法的语法糖

<!-- prettier-ignore-start -->

```js
const v1 = Math.pow(2, 3); // 2 * 2 * 2
const v2 = 2 ** 3;         // 2 * 2 * 2
```

<!-- prettier-ignore-end -->

## 模板字符串

让字符串拼接更加简单, 在字符串中直接解析符号

```js
// 解析变量
const name = 'tom';
const str1 = 'hello,' + name;
const str2 = `hello,${name}`;

// 换行
const str3 = 'hello\ntom';
const str4 = `hello,
tom`;

// 调用函数: react 中的 styled-component 就是这样实现的
function sayHi(args) {
  console.log('hello,', args[0]);
}

sayHi`tom`;
```

## rest 运算符(展开运算符)

> 展开运算符, 在有的资料中也叫 `延展运算符` `扩展运算符`

```javascript
// 1.合并数据
const arr1 = [2, 3, 4];
const arr2 = [1, ...arr1]; // [1, 2, 3, 4]

// 2.函数参数, 必须是最后一个, 不是就报错
function sum(...args) {
  console.log(args);
}
sum(); // []
sum(1, 2, 3); // [1, 2, 3]

// 在es2015版本时, rest 只能展开实现了 iterator 接口的对象
// 但是在 es2017 版本, rest 已经支持可以直接展开 普通对象
const obj = { ...{ id: 101 }, ...{ name: 'tom' } };
console.log(obj); // {id: 101, name: 'tom'}
```

## 箭头函数

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

```javascript
const f1 = (a, b) => {
  console.log(a + b);
};
f1();

// 当参数只有一个时, 可以省略 (), 如果不止一个就不能省略
const f2 = (x) => console.log(x);
f2('hello');

// 当函数体 只有一个 return 语句时候, 可以省略 return 和 {}
const f3 = (x, y) => x + y;
console.log(f3(1, 2)); // 4

const f4 = (x) => console.log(x);
f4();
/*
代码就类似于:
var f4 = (x) => {
  return console.log(x);
}
*/
```

### 箭头函数注意事项

1. 箭头函数是表达式, 所以不会函数提升
2. 箭头函数 `没有自己的 this`, 所以无法改变 this 指向, 也不能用 `new`来实例化对象
3. 箭头函数的中的 `this`其实是上一级作用域的 this
4. 箭头函数中没有 `arguments`对象

```javascript
f1();
// 结果输出: 1
// 能够正常的执行函数并输出1, 那就证明在预编译阶段就已经函数提升了,所以才能够正常执行

f2();
// TypeError: f2 is not a function,
// 这就证明 var 已经在预编译阶段让这个变量提升了,
// 但是还没有赋值(默认是 undefined), 所以代码执行阶段就会报错

f3();
// ReferenceError: f3 is not defined
// 这个就证明 const 声明的常量在编译阶段不会提升, 所以在执行阶段, 找不到这个变量

function f1() {
  console.log('f1');
}
var f2 = () => console.log('f2');
const f3 = () => console.log('f3');

function f4() {
  'use strict';

  const ctx = { id: 1 };

  const f5 = () => {
    console.log(this);
  };
  const f6 = () => {
    console.log(this);
  };
  const f7 = () => {
    console.log(this);
  };
  const f8 = () => {
    console.log(this);
  };

  f5.bind(ctx)(); // undefined
  f6.call(ctx); // undefined
  f7.apply(ctx); // undefined
  new f8(); // TypeError: f8 is not a constructor
}

// 箭头函数中的 this 是 f4 的 this
f4();
f4.call({ id: 1 }); // 箭头函数执行输出: {id: 1}
```

## 特殊命令 #!

这个仅限 Node.js 环境下有效

Unix 的命令行脚本都支持#!命令, 称为 Shebang 或 Hashbang, 这个命令放在脚本的第一行, 用来指定脚本的执行器

如 shell 脚本

```sh
#!/usr/bin/env bash
# 或者
#!/usr/bin/bash

echo "hello, ShellScript"
```

在 nodejs 脚本里也可以这样

```sh
#!/usr/bin/env node
# 表示用 node 这个执行器来执行以下脚本

console.log("hello, JavaScript")
```

当然也可以使用 google 开发的 [zx](https://google.github.io/zx/getting-started)

```sh
#!/usr/bin/env zx

await $`ls .`
```
