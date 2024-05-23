---
outline: deep
---

## 前置知识

### 什么是遍历

一次性的按照一定顺序的依次访问每一个元素, 这个过程就叫遍历(`默认一次走完`)

```javascript
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  // 一次性的按照一定顺序的依次访问没一个元素就叫遍历
}
```

### 什么是迭代?

一次只会访问一个元素,需要手动调用迭代器的 `next` 方法, 才会访问下一个元素, 这个过程就叫迭代(`一次走一步, 推一次走一次`)

```javascript
const it = [1, 2, 3].values();
let value = it.next(); // 1
value = it.next(); // 2
value = it.next(); // 3
value = it.next(); // undefined
value = it.next(); // undefined
```

## 基本了解

### 什么是生成器? Generator

生成器就是方法执行后会返回一个迭代器对象, 也叫 `生成器函数`

生成器是英语直译的(Generator), 比较生硬, 按照功能来说, 它应该叫 `迭代器生成函数`

生成器不会一次性直接执行完成, 而是通过 `yeild` 关键字来一次一次的执行然后产出结果

```js
function* generateIteratorForArray(arr) {
  for (let i = 0, l = arr.length; i < l; i++) {
    yield [i, arr[i]];
  }
}

// 这个 it 就是一个迭代器对象
const it = generateIteratorForArray(['a', 'b', 'c']);

console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:undefined  done: true
```

### 什么是迭代器? Iterator

迭代器是由 `生成器函数`执行后的返回的带有 `next` 方法的对象(迭代器对象)

## 迭代器

### 迭代器对象 && 迭代结果对象

迭代器对象: 一个包含 `next` 方法, 而且 `next` 方法每次会返本次迭代的结果

迭代结果: 就是 迭代器对象调用 next 方法返回的结果(也是对象: 就叫 `迭代结果对象`)

```javascript
const it = 'abcde'.split().values(); // 这个 it 就是一个迭代器对象
console.log(it.next()); // { value: 'a', done: false }
```

### for...of 遍历迭代器

for of 是 es6 的新语法, 专门为遍历迭代器而设置的

```js
let arr = [1, 2, 3];
for (let item of arr) {
  // item: 1
  // item: 2
  // item: 3
}
```

<span class="red-text">注: for .. of 语法的性能是不如 for/while 和 forEach/map 的</span>

### 遍历元素和遍历迭代器的区别?

- 遍历元素: 通过索引依次访问类数组解构的数据(如: 字符串/NodeList/HTMLCollection), 一般使用 for 语法
- 遍历迭代器: 先获取迭代器, 然后通过迭代器对象next方法依次获取值,

迭代器是一种对象, 它定义了用于遍历集合(不一定是数组, 也可以是其他值)的接口, 使用 `next` 方法返回集合中的下一个值

```js
const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  // for 是根据数组索引依次递增的特性来遍历取值的
  // 所以也可以用 while 来替换 for
  const item = arr[i];
}

for (let item of arr) {
  // 先获取数组的迭代器对象, 然后依次调用 next, 直到获取的值为 undefined
  // 注意: 这个迭代器对性和 Array.prototype.entries 返回的迭代器对象有区别
  // 直接用 for of 语法遍历数组迭代器时, 默认使用的是 Array.prototype.values
  // 而不是 Array.prototype.entries, 可以这样查看
  // Array.prototype[Symbol.iterator] == Array.prototype.entries // => false
  // Array.prototype[Symbol.iterator] == Array.prototype.values  // => true
  // 也就是说, 应该这样理解代码: for(let item of arr.values())
}

// 手动模拟实现 for of 语法, 理解 for of 语法
function $forOf(array, callback) {
  const isCallable = typeof callback === 'function'; // 在循环外判断就只需要判断一次
  const iterator = array.values(); // 先获取数组的迭代器
  let item = iterator.next(); // 每次返回一个对象 { value: 本次访问的值, done: 是否迭代完成 }
  while (!item.done) {
    isCallable && callback(item.value);
    item = iterator.next();
  }
}
$forOf(arr, (item) => console.log(item));
```

### 迭代器 next 方法的特性

1. for of 无法遍历到 generator 函数 return 语句的值
2. 由于 generator 函数生成的迭代器, next 函数的参数, 可以作为上一次 yield 的返回值, 也就是说: `第一个 next 传的值, 是无法获取到的`
3.

```javascript
function* f1() {
  var a = yield 'a';
  console.log('f1-1:', a);

  var b = yield 'b';
  console.log('f1-2:', b);

  var c = yield 'c';
  console.log('f1-3:', c);

  return 'd';
}

const it = f1();

// 1. for of 无法遍历到 generator 函数 return 的值
for (let item of it) {
  console.log(item);
  // 第1次: a     f1-1 undefined
  // 第2次: b     f1-2 undefined
  // 第3次: c     f1-3 undefined
}

// 2. 由于 generator 函数生成的迭代器(非手动实现的)
// next 函数的参数, 可以作为上一次 yield 的返回值, 也就是说: 第一个 next传的值, 是无法获取到的

// 3. return 的值, 即使 done 为 true, 还是会赋值给 value 属性
// 如果迭代器已经迭代完成了(done:true), 那么 value 的值为 undefined
console.log(it.next('one'));
// {value:a, done:false}

console.log(it.next('two'));
// f1-2: two       {value:b, done:false}

console.log(it.next('three'));
// f1-3: three     {value:c, done:false}

console.log(it.next('four'));
// f1-4: four      {value: 'd', done: true}

console.log(it.next('five'));
// {value: undefined, done: true}
// {value: undefined, done: true}
```

### 迭代器 return 方法特性

```javascript
// return() 方法可以终止迭代器的运行, 执行这个方法
// 就相当于在 generator 函数中使用 return 指令
function* f1() {
  yield 'a';
  yield 'b';
  // return 1; // 使用 renturn 方法就相当于执行这行代码, 迭代直接结束
  yield 'c';
  yield 'd';
}

var it = f1();
console.log(it.next());
console.log(it.next());
console.log(it.return(1));
console.log(it.next());
console.log(it.next());
console.log(it.next());

/*
无论是在 f1 函数内部用 return 指令,
还是在外部用 return() 方法, 执行结果都是不变的

执行结果如下:
{ value: 'a', done: false }
{ value: 'b', done: false }
{ value: 1, done: true }
{ value: undefined, done: true }
{ value: undefined, done: true }
*/
```

### 迭代器 throw 方法特性

```javascript
// 1.Generator 函数捕获异常的机制
// 只有当代码走到异常的位置才会捕获, yield 会暂停代码的执行
// 当捕获到异常后, done 立即变为 true, 后续的 yield 失效
function* f1() {
  yield 'a';
  try {
    yield 'b';
    yield c;
    yield 'd';
  } catch (e) {
    console.log('Generator exception:', e.message);
  }
}

let it = f1();
it.next();
it.next();
it.next();
// 只有执行到第2个next: 才会触发 try/catch
// 前面有2个yield, 会暂停代码的执行

// ------------- 华丽的分割线 -------------
function* f2() {
  // throw new Error("error-1");
  yield 'a';
  try {
    yield 'b';
    // throw new Error("error-2");
    yield 'c';
    yield 'd';
    yield 'e';
  } catch (e) {
    console.log('Generator execption:', e.message);
  }
}

var iter = f2();
// iter.throw(new Error("error-1"));
// 如果直接 throw, 会直接抛出异常, 因为代码不在 try/catch 中
// 相当于在第 24 行写了个 throw 语句

console.log(iter.next()); // { value: 'a', done: false }
console.log(iter.next()); // { value: 'b', done: false }
iter.throw(new Error('error-2')); // 被捕获了: Generator execption: error-2
// 异常捕获之后, 会自动将 done 变为 true, 后面的 yield 语句失
console.log(iter.next()); // { value: undefined, done: false }
console.log(iter.next()); // { value: undefined, done: false }

// 情况1: 直接抛出(24, 38)
// 情况2: 异常被捕获(28, 44)
```

### 可迭代协议 & 迭代器协议

[推荐阅读MDN: 可迭代协议 & 迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)

### 手动实现迭代器接口 Symbol.iterator

迭代器接口是一种es6新增的访问数据的一种方式, 凡是实现了迭代器接口的数据类型都可以使用 `for of` 语法

```javascript
const obj = {
  id: 1001,
  username: 'username',
  email: 'xxx@qq.com',
  show() {
    console.info(this.email);
  },
};

// 使用 生成器函数生成一个 迭代器对象
// function* generateIteratorForObject() {
//   const keys = Object.keys(obj);
//   for (let i = 0, l = keys.length; i < l; i++) {
//     const key = keys[i];
//     yield [key, obj[key]];
//   }
// }

// 手动模拟实现一个 迭代器对象
function generateIteratorForObject() {
  const keys = Object.keys(obj);
  let index = 0;
  // 必须返回一个带有 next 方法的对象(迭代器对象)
  return {
    next: function () {
      const done = index === keys.length;
      const key = keys[index++];
      const value = done ? undefined : [key, obj[key]]; // [key, value]
      return {
        // next 方法返回一个带有 done, value 属性的对象(迭代结果对象)
        done: done,
        value: value,
      };
    },
  };
}

Object.defineProperty(obj, Symbol.iterator, {
  value: generateIteratorForObject,
});

// 默认情况下, for..of 是无法直接遍历 object 对象的, 但是当
// obj 实现迭代器接口后, 就可以使用 for of 语法来遍历对象
for (item of obj) {
  console.info(item);
}
```

## 生成器 Generator

### 语法 `functin * fn() { ...yield }`

```javascript
function* getIterator(arr) {
  for (var i = 0, l = arr.length; i < l; i++) {
    yield [i, arr[i]];
  }
}

var it = getIterator(['a', 'b', 'c']);

console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:[0,a]  done: false
console.log(it.next()); // value:undefined  done: true
```

### 生成器函数实现原理

不使用 yield 关键字, 手动实现: getIterator 方法

```javascript
// 生成器函数执行后: 必须返回一个带有 next 函数的迭代器对象
function getIterator(arr) {
  let index = 0;
  return {
    [Symbol.iterator]: function () {
      // 迭代器对象必须实现迭代器接口
      // 这个 this 指向 迭代器对象, 也就是 each 函数返回的这个对象
      return this;
    },

    next: function () {
      // 实现迭代器对象的 next 方法
      return {
        done: index >= arr.length,
        value: arr[index++], // 每次遍历后, 需要修改 index 的值
      };
    },
  };
}

const it = getIterator(['a', 'b', 'c']);
console.info(it.next()); // {value: 'a', done: false}
console.info(it.next()); // {value: 'b', done: false}
console.info(it.next()); // {value: 'c', done: false}
console.info(it.next()); // {value: undefined, done: true}

for (const item of it) {
  console.log(item); // a, b, c
}
```

### Generator & Promise 实现异步代码线性处理

建议先学习 promise 相关的内容

```javascript
// mock some async task codes
function getNumber(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), 1000);
  });
}

// calculation results
function* sum() {
  let n1 = yield getNumber(1);
  let n2 = yield getNumber(2);
  let n3 = yield getNumber(3);
  return n1 + n2 + n3;
}

// 异步迭代, 每次 yield 会停下, 等待Promise完成, 然后再执行下一个 next
// 这个方法也不用自己实现, 有个模块叫 co, 这个就是它的实现原理
// github: https://github.com/tj/co
function co(iterator) {
  function next(data, onResolve, onReject) {
    const { value, done } = iterator.next(data);
    if (done) {
      return onResolve(data);
    } else {
      Promise.resolve(value).then((val) => next(val, onResolve), onReject);
    }
  }
  return new Promise((resolve, reject) => next(null, resolve, reject));
}

// 线性获取
co(sum()).then((val) => {
  console.log('sum:', val);
});
```

### 利用生成器函数捕获异步代码

默认情况下js是无法捕获异步代码的

```javascript
// 没有办法捕获到异步代码的异常
try {
  setTimeout(() => {
    throw new Error('async exceptions');
  });
} catch (e) {
  console.log('捕获到异常了:', e.message);
}

// 利用 generator 函数来捕获异步代码的异常
function* sum() {
  try {
    setTimeout(() => {
      throw new TypeError('async excpetion');
    });
  } catch (e) {
    console.log('catched:', e.message);
  }
}

const it = sum();
it.next();
// 必须执行一次 next, 因为 generator 函数会返回
// 一个迭代器对象并不是直接执行函数体
```

### async/await 语法糖

async/await 的原理其实就是使用 es6 的 generator + promise 的语法糖

```javascript
// github: https://www.npmjs.com/package/co
const co = require('co');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

function* read() {
  try {
    let js = yield readFile('./index.js', 'utf8');
    let xxx = yield readFile('xxx.xxx', 'utf8'); // xxx.xxx not exists
    return js + xxx;
  } catch (e) {
    // 如果捕获到异步的异常, 一定会执行这个代码
    console.log('### error' + e.message);
  }
}

// 将异步代码线性处理
co(read()).then((val) => {
  console.log('### res:', val);
});

// ------------------------------ 华丽的分割线 ------------------------------
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

// async/await 的本质就是 generator/promise + co 的语法糖
// 但是: 内置的 async/await 语法更加语义化,易于理解,且实用性更好
async function read() {
  try {
    let js = await readFile('./index.js', 'utf8');
    let xxx = await readFile('xxx.xxx', 'utf8'); // xxx.xxx文件不存在, 文件读取错误异常
    return js + xxx;
  } catch (e) {
    console.log('### catched-1:', e.message);
  }
  return js + xxx; // 无法访问到js/xxx变量,抛出引用异常
}

read()
  .then((val) => {
    console.log('### res', val);
  })
  .catch((e) => {
    console.log('### catched-2', e);
  });
```

使用 es7 的 `async/await`语法

```javascript
// 1. async 函数返回值一定是 Promise 实例
const f1 = async (x) => x;
/****
async 函数 f1 可以这样来理解它:
const f1 = (x) => Promise.resolve(x);
*/
const p1 = f1(11);
console.log(p1 instanceof Promise); // true

const p2 = f1('1');
console.log(p2 instanceof Promise); // true

const p3 = f1({ id: 101 });
console.log(p3 instanceof Promise); // true

const p4 = f1(null);
console.log(p4 instanceof Promise); // true

const p5 = f1(undefined);
console.log(p5 instanceof Promise); // true

// 2. async 函数体如果抛出了异常, 可以用 async 函数的结果 promise.catch 来捕获
const f2 = async () => {
  throw new Error('async expection');
};

/****
async 函数 f2 可以理解为, executor 有异常, 自己会执行 reject
const f2 = () => new Promise(() => {
  throw new Error('async expection');
});
*/
const p6 = f2();
p6.then().catch((reason) => {
  console.log('catched:', reason);
});
```

### 使用 generator & promise 模拟 async/await

```javascript
function asyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('asyncTask-resolved');
    }, 1000);
  });
}

async function run() {
  const r1 = await asyncTask();
  console.log('async+await-r1:', r1);

  const r2 = await asyncTask();
  console.log('async+await-r2:', r2);

  const r3 = await asyncTask();
  console.log('async+await-r3:', r3);
}

function* $run() {
  // 模拟 run 函数的函数体
  const r1 = yield asyncTask();
  console.log('generator+promise-r1:', r1);

  const r2 = yield asyncTask();
  console.log('generator+promise-r2:', r2);

  const r3 = yield asyncTask();
  console.log('generator+promise-r3:', r3);
}

function $async(iterator) {
  return new Promise((resolve, reject) => {
    function walk(data) {
      const { done, value } = iterator.next(data);
      if (done) {
        resolve(value);
      } else {
        // walk 的参数会作为 yiled 返回值, 在 $await 中就可以接收到
        Promise.resolve(value).then(walk, reject);
      }
    }
    // 先手动执行一次, 让迭代器开始迭代起来
    walk();
  });
}

// === 两个代码运行结果一致 === //
// run();
$async($run());
```
