## 基础回顾

### 定义 & 调用

```javascript
// 利用 function 关键字定义
function sayHi() {
  console.log("hi");
}

// 调用
function sayHi() {
  console.log("say-hi");
}

// 赋值
var sayHello = function () {
  
}

// 内置函数: JS 自带的函数, 可以直接使用
var r = Math.random();
console.log("随机数:", r);

```

## arguments 详解(了解)

<span class="red-text">了解即可, 做笔记是为了方便查阅, 尽量不要使用这个玩意, 建议用es6的语法</span>

非箭头函数的函数内部对应参数值的实参列表, 是一个类数组对象

1. arguments 是一个类数组(`Aarray-Like`), 类数组, 没有数组方法
2. arguments 是一个可迭代对象
3. arguments.callee: 指向宿主函数
4.  Symbol.iterator: arguments 是一个可迭代对象:

```javascript
function test(a, b, c) {
  console.log(arguments.toString()); // [object Arguments]
  console.log(Array.isArray(arguments)); // false
  console.log(arguments.callee); // 指向宿主函数:  test

  // Symbol.iterator: arguments 是一个可迭代对象:
  function* each(obj) {
    for (var key in obj) {
      yield obj[key];
    }
  }

  var iterator = each(arguments);
  console.log(iterator.next()); // {value: 1, done: false}
  console.log(iterator.next()); // {value: 2, done: false}
  console.log(iterator.next()); // {value: 3, done: false}
  console.log(iterator.next()); // {value: undefined, done: true}
}

test(1, 2, 3);

```

### arguments 转数组的问题

不推荐直接用 slice去转数组, 推荐用 for 循环取值, 或者 apply 的方式去转数组

[错误的使用arguments](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments) 会让v8引擎无法优化代码, 影响性能

```javascript
// 不推荐!!!
function f1() {
 var args = [].slice.call(arguments);
}

// 推荐
function f2() {
 var args = [];
  for (var key in arguments){
   args.push(arguments[key]);
  }
}

// 推荐(这种方式, 并没去修改 arguments 区别于f1, 而是直接把值全部取出来, 当做参数去使用)
function f3() {
 var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
}

// !!! 推荐es6 !!!
function f4(...args){
}

f1();
f2();
f3();
f4();

```

### 什么时候使用arguments?

1. 实参个数是不确定的
2. 实参个数大于形参个数

```javascript
// 不确定参数有多少个,只能这样去获取传入的实参
function sum() {
  var sum = 0;
  for (var key in arguments) {
    sum += arguments[key];
  }
  return sum;
}

console.log(sum(1, 2, 3, 4, 5, 6, 7, 8, 9, 10));

```

### arguments 和形参的有对应关系的情况

1. arguments中的实参改变之后()的形参也会改变
2. 改变()形参的值, arguments实参也会改变

```javascript
function f1(a) {
  console.log(a); // a
  arguments[0] = 1;
  console.log(a); // 1
}

function f2 (b) {
  console.log(b); // "b"
  a = 2;
  console.log(arguments[0]); // 2
}

f1("a");
f2("b");

```

### arguments 和形参的没有对应关系的情况

1. 形参列表中, 任意一个形参有默认值
2. 形参列表使用了 `...` 操作符
3. 形参列表的参数是结构的
4. 严格模式

```javascript
function f1(a = 10) {
  arguments[0] = 15;
  console.log(a); // 22, 修改了 arguments[0] 却没有修改形参 a 的值
  console.log(arguments[0]); // 15
}

function f2(b = 20) {
  b = 35;
  console.log(b); // 35
  console.log(arguments[0]); // 30, 修改了形参 a的值, 但是 arguments[0] 的值却没有修改
}

f1(20);
f2(30);

// --------- 多个参数的情况 -----------

function f3(a, b, c = 3) {
  arguments[0] = 100;
  arguments[1] = 200;
  arguments[2] = 300;
 
  // 但凡有一个参数有默认值, arguments 就不会跟踪形参最终的值
  console.log(a, arguments[0]); // 1, 100
  console.log(b, arguments[1]); // 2, 200
  console.log(c, arguments[2]); // 3, 300
}

function f4(a, b, c) {
  arguments[0] = 100;
  arguments[1] = 200;
  arguments[2] = 300;
 
  // 所有参数都没有默认值的情况就会跟踪形参最终的值
  console.log(a, arguments[0]); // 100, 100
  console.log(b, arguments[1]); // 200, 200
  console.log(c, arguments[2]); // 300, 300
}

function f5(...args) {
  arguments[0] = 100;
  arguments[1] = 200;
  arguments[2] = 300;

  // 并没有跟踪形参最终的值
  console.log(args[0], arguments[0]); // 1, 100
  console.log(args[1], arguments[1]); // 2, 200
  console.log(args[2], arguments[2]); // 3, 300
}


f3(1, 2, 3);
f4(1, 2, 3);
f5(1, 2, 3);

```

### 关于 arguments 的建议

推荐使用 es6 的 `...` 操作符, 慢慢的抛弃对 `arguments` 的使用, 因为 arguments 有各种不确定性....

> 既然推荐使用es6的新语法, 为什么还要费劲的学习 arguments??

因为有些老的代码中, 可能会用到 arguments, 所以还是有必要了解记录下

## 函数式编程

### 函数是JavaScript中的一等公民

1. 声明调用(封装功能)
2. 赋值/传参/返回(作为一种数据来传递)
3. 构造函数/构造实例(类/面向对象/设计模式)
4. 立即执行(封装模块/块级作用域)

### 函数式编程的好处

1. 易读/易维护
2. 扩展性强
3. 第一类对象, 不依赖其他对象
4. 可移植性和可测试性
5. 可缓存性

```javascript
/**
 * 获取参数的和
 * @param {*} args
 * @returns
 */
function sum(...items) {
  let res = 0;
  for (var i = 0, l = items.length; i < l; i++) {
    res += items[i];
  }
  return res;
}

/**
 * 缓存参数计算的结果
 * @param {Function} fn
 * @returns
 */
function makeCache(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  const caches = {};
  return function () {
    const key = JSON.stringify(arguments);
    if (!caches[key]) {
      caches[key] = fn.call(fn, ...arguments);
    }
    // else {
    //   // 为了方便看到效果
    //   console.log("计算结果来自缓存", caches);
    // }
    return caches[key];
  };
}

// 这个 add 就是带有缓存功能的纯函数
const add = makeCache(sum);

console.log(add(1, 2, 3, 4)); // 10
console.log(add(1, 2, 3, 4)); // 10, "计算结果来自缓存"
console.log(add(1, 2)); // 3
console.log(add(1, 2)); // 3, "计算结果来自缓存"

```

### 纯函数

1. 相同的输入,得到相同的输出
2. 不依赖也不影响外部的环境, 也不会产生的副作用(发送请求,改变外部数据,console,DOM操作,存储数据)
3. 可移植性和可测试性
4. 拿数组的函数举例:
    1. slice 就是一个纯函数
    2. splice 就不是一个纯函数, 因为他会改变原数组

```javascript
function sum(a, b){
  if(typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("sum paramaters must be number");
  }
  return a + b;
}
```

### 函数组合

多个纯函数/偏函数/科里化的函数组合成一个新的函数, 形成数据传递, 并实现一种有序执行的效果

```javascript
// 1. compose 函数执行 -> 返回的结果为 composeReturnedFn
// 2. composeReturnedFn 执行(x 是通过 composeReturnedFn 这个管道函数来传递的)
// 3. f(g(x)) 执行
function compose(f, g) {
  return function(x) { // composeReturnedFn
    return f(g(x)); // 左倾
  }
}

function toUpperCase(str){
  return str.toUpperCase();
}
function exclaim(str) {
  return str + '!!!';
}

var f = compose(exclaim, toUpperCase);
console.log(f('look out'));


// 组合任意多个函数(就类似于 react-redux 中的中间件)
function mutilCompose() {
  var callbacks = Array.prototype.slice.call(arguments),
    len = callbacks.length - 1;
  return function (x) {
    var res = callbacks[len](x);
    while (len--) {
      res = callbacks[len](res);
    }
    return res;
  };
}

/*
// ES6 简化写法: 上面的写法是为了好理解
function mutilCompose() {
  const callbacks = Array.prototype.slice.call(arguments);
  return (x) => callbacks.reduceRight((prev, item) => item(prev), x);
}
*/


function split(str) {
  return str.split("");
}

function join(arr) {
  return arr.join("-");
}

function reverse(arr) {
  return arr.reverse();
}

var str = "hello";
var handler = mutilCompose(exclaim, toUpperCase, join, reverse, split);
var res = handler(str);
console.log(res);

```

### 结合律 associativity

组合函数的参数, 无论怎么分组, 结果都是不变的

```javascript
// 组合函数
function compose() {
  const callbacks = Array.prototype.slice.call(arguments);
  return (x) => callbacks.reduceRight((prev, item) => item(prev), x);
}

const split = (str) => str.split("");
const join = (arr) => arr.join("-");
const reverse = (arr) => arr.reverse();

var f1 = compose(compose(join, reverse), split);
var f2 = compose(join, compose(reverse, split));

console.log("f1:", f1("hello")); // f1: o-l-l-e-h
console.log("f2:", f2("hello")); // f2: o-l-l-e-h

```

### point-free style

point-free style means never having to say your data

[https://www.ruanyifeng.com/blog/2017/03/pointfree.html](https://www.ruanyifeng.com/blog/2017/03/pointfree.html)

```javascript
var menus = [
  {
    id: 1,
    desc: "用户管理",
    path: "",
    level: 0,
    hidden: false,
    pid: 0,
  },
  {
    id: 2,
    desc: "用户列表",
    path: "/users",
    hidden: true,
    level: 1,
    pid: 1,
  },
  {
    id: 3,
    desc: "权限管理",
    path: "",
    hidden: false,
    level: 0,
    pid: 0,
  },
  {
    id: 4,
    desc: "角色管理",
    path: "/roles",
    hidden: false,
    level: 1,
    pid: 3,
  },
  {
    id: 5,
    desc: "权限管理",
    path: "/permissions",
    hidden: false,
    level: 1,
    pid: 3,
  },
  {
    id: 6,
    desc: "测试管理",
    path: "/test",
    hidden: true,
    level: 2,
    pid: 5 
  }
];

// 赛选出所有的二级菜单(level==1), 赛选出所有的二级菜单中的隐藏菜单(hidden === true)
function compose() {
  const callbacks = Array.prototype.slice.call(arguments);
  return (x) => callbacks.reduceRight((prev, item) => item(prev), x);
}

const subMenuFilter = (item) => item.level === 1 && item;
const hiddenMenuFilter = (item) => item.hidden && item;

const res = [];
let item, filters;
for (let i = 0, l = menus.length; i < l; i++) {
  item = menus[i];
  filters = compose(subMenuFilter, hiddenMenuFilter);
  filters(item) && res.push(item);
}
console.log(res);
/*
[
    {
        "id": 2,
        "desc": "用户列表",
        "path": "/users",
        "hidden": true,
        "level": 1,
        "pid": 1
    }
]
*/

```

以上代码看起来好像是把一个简单的赛选功能复杂化了, 但是, 如果  `subMenuFilter` 和 `hiddenMenuFilter`中的逻辑非常复杂, 那这种组合的方式, 显然是更好维护

### 高阶函数

一个函数的参数中有函数或者返回值是函数, 那么, 这个函数就是高阶函数

通俗来说: 操作其他函数的的函数, 就是高阶函数

```javascript
function forIn(obj, callback) {
  if (!(obj && typeof obj === "object")) {
    throw new TypeError("obj must be a object");
  }

  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }

  for (var k in obj) {
    obj.hasOwnPorperty(k) && callback(obj[k], k, obj);
  }
}

function debounce(fn, delay) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

```

### 函数科里化

<font style="color:#E8323C;">所谓的函数科里化就是用闭包将函数的参数保存起来, 当函数的个数达到指定个数的时候, 才会执行</font>

> 为什么要科里化
>

1. 简化代码
2. 提高维护性
3. 功能单一化
4. 功能内聚/减低耦合
5. 提高代码的适应性

如何让以下代码都能够输出正常的结果?

```javascript
// add(1,2,3);
// add(1)(2)(3);
// add(1, 2)(3);
// add(1)(2,3);

function curry(fn, args) {
  var len = fn.length;
  var args = args || [];

  return function () {
    var items = [...args, ...arguments];
    if (items.length < len) {
      // 如果参数不够, 直接继续返回一个科里化函数, 然后把fn向下传递
      // 然后将上一次的args和这一次的 arguemnts 合并成一个新的数组
      // 然后把这个 items 传入到下一次科里化函数中
      // console.log("save-args:", { len, items });
      return curry.call(this, fn, items);
    } else {
      // 如果参数个数够了, 直接执行 fn 然后返回结果
      // console.log("exec:", { len, items });
      return fn.apply(this, items);
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}

var add = curry(sum);

console.log(add(1,2,3)); // 这个不会递归, 直接走35行
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2,3));

```

### 偏函数 partial Application

在计算机科学中, 偏函数叫做 局部应用(部分应用), 指固定一个函数的一些参数, 然后产生另一个更小元的参数

所谓元的意思就是: 一个函数的参数有几个, 就是几元函数

> 偏函数与科里化的区别(虽然他们看起来功能可能有点像)
>

1. 科里化: 将一个n个参数的函数,转换为n个函数并且参数只有一个, 也就是说,科里化是可以传多次, 直到参数传完才执行
2. 偏函数: 先传一部分参数, 然后返回一个新的函数, 然后执行这个新的函数的时候, 会把之前的arguments 带上, 但是他只能传两次

```javascript
Function.prototype.partial = function (...args) {
  // 绑定后, 返回一个新的函数, 第二次传参数的时候直接执行
  return this.bind(null, ...args);
};

var sum = (a, b, c) => a + b + c;

var add = sum.partial(1);

console.log(add(2, 3)); // 6

```

### 惰性函数

在函数执行的过程中, 函数体会全部完成, 然后这个函数会被重写, 这样就可以达到一个优化性能的效果

比如加事件的兼容函数( 需要判断浏览器, 但是只需要判断一次, 因为浏览器的API不会在js执行的过程中改变的 )

```javascript
// 原函数: 这样虽然也可以实现效果, 但是每次都要去判断浏览器是否是那种老浏览器, 其实是没有必要的
function addEvent(el, type, handler, captcha) {
  if (el.addEventListener) {
    el.addEventListener(type, handler, captcha);
  } else if (el.attachEvent) {
    el.attachEvent("on" + type, function () {
      handler.call(el);
    });
  } else {
    el["on" + type] = handler;
  }
}

// 惰性函数: 同样也能实现功能, 但是只会判断一次
function addEventLazy(el, type, handler, captcha) {
  if (window.addEventListener) {
    addEventLazy = function (el, type, handler, captcha) {
      el.addEventListener(type, handler, captcha);
    };
  } else if (window.attachEvent) {
    addEventLazy = function (el, type, handler) {
      el.attachEvent("on" + type, handler.bind(el));
    };
  } else {
    addEventLazy = function (el, type, handler) {
      el["on" + type] = handler;
    };
  }
  
  // 只有这一次执行会判断, 在这一次执行后, addEvent 就被重写了
  return addEventLazy(el, type, handler, captcha);
}

```
