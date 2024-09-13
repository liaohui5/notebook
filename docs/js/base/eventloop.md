

## 进程 & 线程

进程(Process): 是计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位
线程(thread): 是操作系统能够进行运算调度的最小单位。它被包含在进程之中，是进程中的实际运作单位

### 多进程 & 多线程

多进程: 启动多个进程共同完成任务(可以简单理解为: 打开多个软件同时工作)

1. 打开浏览器上网冲浪
2. 打开QQ音乐一边上网一边听音乐

多线程: 在一个进程中同时做多个事情(简单理解为: 一个进程中至少有一个线程, 也可能有多个)

1. 第一个标签页打开淘宝网
2. 再开一个浏览器标签去打开百度

多进程: 像一个公司, 有不同的部门(研发部: 负责产品的研发, 财务部: 负责公司的财务, 人事部: 负责人员的流动)
多线程: 像一个公司中的一个部门, 有多个人可以同时工作

![](https://raw.githubusercontent.com/liaohui5/images/main/images/eventloop-1.png)

### 浏览器是多进程的

GPU进程, 渲染引擎进程(浏览器内核), 第三方插件的进程

## 浏览器常驻线程

1. js引擎线程: 解释和执行js代码, js内核-v8引擎, js引擎用来解释和执行js代码(一个主线程+多个辅助线程)
2. GUI线程: 用于绘制用户界面(与js引擎线程互斥)
3. http网络请求线程: 处理用户的get,post请求,返回结果后,把回调函数推入到任务队列中
4. 定时器触发线程: setTimeout, setInterval, 等待时间结束后把回调行数推入到任务队列中
5. 浏览器事件(包括DOM)处理线程: 将click, foucus, blur 等交互事件推入到任务队列中

## JS 单线程 & 异步任务

js引擎是单线程的, 是非阻塞的, 先执行同步任务, 同时可以将异步任务放到 `回调队列中`然后通过 `event-loop`的方式来执行回调

[什么是event-loop(事件轮询)?](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231015102518.png)

注: 此处的异步任务队列是 `宏任务队列`, 只有 `promise.then`的中的回调函数会放到`微任务队列`中,其他所有的异步任务都会放到 `宏任务队列中`, js的执行顺序为 `同步 -> 微任务队列 -> 宏任务队列`

注: 所有的异步任务都是以回调函数的形式出现的, 但是不是所有的回调函数都是异步的

```javascript
var items = [11, 2, 13, 41, 5];
items.map((item) => item > 10); // 这个map的回调函数是同步执行的的
```

### 宏任务队列 && 微任务队列

[nodejs event loop](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)

### 宏任务 Macro Task

JS 执行环境宿主提供的API:

1. UI渲染/DOM Event: 事件触发的回调函数
2. setTimeout/setInterval/setImmediate 的回调函数
3. messageChanel
4. requestAnimationFrame
5. Ajax

### 微任务 Micro Task

ECMA262中规定的API:

1. promise: `Promise.then回调`
2. MutationObserver 回调函数,[参考资料](http://javascript.ruanyifeng.com/dom/mutationobserver.html)
3. queueMicrotask 回调函数, [参考资料](https://developer.mozilla.org/zh-CN/docs/web/api/queuemicrotask)
4. process.nextTick 回调函数, NodeJS 环境独有的

### js代码的执行顺序:

同步任务 -> 清空微任务队列 -> UI渲染(可能没有) -> 清空宏任务队列
-> 开启新的一轮循环:
同步任务 -> 清空微任务队列 -> UI渲染(可能没有) -> 清空宏任务队列

![](https://raw.githubusercontent.com/liaohui5/images/main/images/eventloop-4.png)

### 代码执行顺序分析

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20231015102518.png)

所以执行结果如下:

![](https://raw.githubusercontent.com/liaohui5/images/main/images/eventloop-6.png)

### 练习题1: 代码的执行顺序

Q: 以下程序会输出什么?
A: `1``10``2``3``9` `4` `6-4``8-7``5`

```javascript
console.info(1);
setTimeout(() => {
  // timeoutCb1
  console.info(2);

  const p1 = new Promise((resolve) => {
    console.log(3);
    setTimeout(() => {
      // timeoutCb2
      console.log(4);
      resolve(4);
    });
  });

  setTimeout(() => {
    // timeoutCb3
    console.info(5);
  });
  const p2 = p1.then((val) => {
    // p1.thenCb
    console.info('6-' + val);
    return 7;
  });

  p2.then((val) => {
    // p2.thenCb
    console.info('8-' + val);
  });

  console.info('9');
});
console.info('10');
```

答题思路:
同步代码:

1. console.info(1) // 1
2. 把 timeoutCb1 放到异步队列中
3. console.info(10) // 10

异步回调队列(第一次轮询):

1. 执行`timeoutCb1`回调函数(因为此时Promise还没有执行,还没有微任务) // 2
2. 执行 `new Promise`传的回调函数, 因为这个函数是同步的, 同时把 `timeoutCb2`放到 `宏任务队列` // 3
3. `timeoutCb3`放到 `宏任务队列中`
4. p1.then 和 p2.then 都没有执行, 因为此时`timeouCb2`还没有执行, p1的状态还是 `pending`
5. 执行 console.log(9) // 9

异步回调队列(第二次轮询):

1. `timeoutCb2` 执行, 此时 `p1`这个promise 的状态被改变了 // 4
2. p1.then执行把 `p1.thenCb`放到`微任务队列`中
3. p2.then执行把 `p2.thenCb`放到`微任务队列`中

异步回调队列(第三次轮询):

1. 先执行微任务队列
   1. `p1.thenCb`执行 // 6-4
   2. `p2.thenCb`执行 // 8-7
2. 然后执行宏任务队列
   1. `timoutCb3`执行 // 5

### 练习题2: async/await 语法执行顺序&原理

Q: 下列练习题会输出什么
A: `f2-end``1``f2-return-value``f1-end`

```javascript
async function f1() {
  var res = await f2();
  console.info(res);
  console.info('f1-end');
}

async function f2() {
  console.info('f2-end');
  return 'f2-return-value';
}

f1();
console.info('1');
```

解题思路: 必须会 async/await 的实现原理([可以查看生成器](https://www.yuque.com/liaohui5/js-base/ufnkzr#XuaTf))

> 既然 async/await 是 generator 函数 + co 的语法糖, 那么将他还原成没有语法糖的样子就好理解了

```javascript
function* genF1() {
  // async function -> generator function
  var res = yield asyncF2(); // await -> yield
  console.log(res);
  console.log('f1-end');
}

function asyncF2() {
  function f2() {
    // 这个是同步执行的, 因为 Promise 的 executor 参数是同步的
    console.info('f2-end');
    return 'f2-return-value';
  }
  return new Promise((resolve) => resolve(f2()));
}

// 可以用tj大神开发的模块: https://github.com/tj/co
// 这个就是 co 的核心实现原理
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

co(genF1());
console.log(1);

// 1. 输出 "f2-end", 因为 Promise 的构造函数的参数(executor)是同步执行的
// 2. yield 会中止 genF1 的执行, 直到 asyncF2 返回出结果, 但这是个异步任务(添加到微任务队列)
// 3. 执行后续同步代码, 输出 1,
// 4. 执行微任务队列, 获得结果(res)
// 5. genF1 继续执行, 输出 res -> "f2-return-value"
// 6. genF1 继续执行, 输出 "f1-end"
```

同步代码:

1. `f1`执行, 遇到 `await`阻塞线程, `f2`执行, 返回一个 promise 对象, 也就是说 await 后面的代码是放到 `微任务队列`中的 // f2-end
2. console.log('1'); // 1

异步队列执行:

1. console.log(res); // f2-return-value
2. console.log('f1-end'); // f1-end

### 练习题3: 实现一个异步队列

实现一个异步队列, 让下列代码能够按照顺序正确执行

```javascript
new Queue()
  .addTask(2000, () => {
    console.log('1');
  })
  .addTask(1000, () => {
    console.log('2');
  })
  .addTask(3000, () => {
    console.log('3');
  })
  .addTask(2000, () => {
    console.log('4');
  })
  .start();

// 队列代码实现
class Queue {
  constructor() {
    this.taskList = [];
  }

  addTask(wait, callback) {
    const asyncTask = function () {
      return new Promise((resolve) => setTimeout(() => resolve(callback), wait));
    };

    this.taskList.push(asyncTask);
    return this;
  }

  async start() {
    for (const taskItem of this.taskList) {
      const callback = await taskItem();
      callback();
    }
  }
}

// 实现异步队列的关键: 就是控制 promise executor 的执行时机
// 也就是说, 所谓的 "任务" 必须是一个返回 promise 的函数,
// 让我自己来控制这个 任务函数 何时执行, 这样才能控制 promise
// executor 何时执行
class AsyncQueue {
  constructor() {
    this.tasks = [];
  }

  addTask(promiseFunc) {
    this.tasks.push(promiseFunc);
    return this;
  }

  async run() {
    for (const task of this.tasks) {
      await task();
    }
  }
}

const q = new AsyncQueue();
'12345'.split('').forEach((item) => {
  q.addTask(() /* 返回异步任务的函数 */ => {
    return new Promise((resolve) => {
      const sec = Math.ceil(Math.random() * 5) * 1000;
      setTimeout(() => {
        console.log(`item=${item}, sec=${sec}`);
        resolve();
      }, sec);
    });
  });
});

q.run();
```

其实由上面的代码可知: 实现异步任务队列的关键就是 `每个任务必须是一个返回 promise 的函数`
任务为什么必须是一个返回 `promise`的函数呢? `为了控制 promise executor 的执行时机`

```javascript
// 因为 promise executor 是同步的, 如果直接传入一个 promise, 那么无法控制的执行时机
// 为了手动的控制所有 promise executor 函数执行的时机: 所以每个任务必须是一个返回 promise 的函数
// 必须执行完这个任务后, 将下一个任务, 添加到下一次 eventloop 的微任务队列中
class AsyncQueue {
  constructor() {
    this.tasks = [];
  }

  addTask(promiseFunc) {
    this.tasks.push(promiseFunc);
    return this;
  }

  run() {
    for (const task of this.tasks) {
      task.then((res) => {
        console.log('then:' + res);
      });
    }
  }
}

const q = new AsyncQueue();

// 如果是这样添加: 那么在 forEach 执行的时候, promise executor function 也会同步的执行,
// promise executor 执行那么 setTimeout 也会同步的执行
const tasks = {
  a: 3000,
  b: 1000,
  c: 2000,
};

for (const [value, delay] of Object.entries(tasks)) {
  const task = new Promise((resolve) => {
    setTimeout(() => {
      console.log(value);
      resolve(value);
    }, delay);
  });
  q.addTask(task);
}

q.run();

/*
同步任务:
const q = new AsyncQueue();
for...of:
  第1次循环: 
    promise = new Promise(executor 同步执行)
      setTimeout执行: 添加宏任务队列 -> 3000ms 后执行
    q.addTask(promise) -> tasks.push

  第2次循环: 
    promise = new Promise(executor 同步执行)
      setTimeout执行: 添加宏任务队列 -> 2000ms 后执行
    q.addTask(promise) -> tasks.push

  第3次循环: 
    promise = new Promise(executor 同步执行)
      setTimeout执行: 添加宏任务队列 -> 1000ms 后执行
    q.addTask(promise) -> tasks.push

q.run()
  -> 第1次循环: task.then 执行 -> 添加到微任务队列
  -> 第2次循环: task.then 执行 -> 添加到微任务队列
  -> 第3次循环: task.then 执行 -> 添加到微任务队列

宏任务:
setTimeoutCallback(1000ms) 执行: resolve(value) 
setTimeoutCallback(2000ms) 执行: resolve(value) 
setTimeoutCallback(3000ms) 执行: resolve(value) 

微任务:
第1个执行 then 的是: 第一个被 resolve 的 promise, 也就是 b
第2个执行 then 的是: 第一个被 resolve 的 promise, 也就是 a
第3个执行 then 的是: 第一个被 resolve 的 promise, 也就是 c

这并不是我们想要的结果, 应该顺序来执行: 输出 a,b,c
那么就必须我们来控制 promise executor 何时来执行
*/
```

### 练习题4: 手动触发事件/自动执行触发事件的区别

```javascript
// 手动触发: 循环一次后, 才会触发下一个监听函数
// 所以结果是: 1, promise-1, 2, promise-2

// 自动执行: 同时触发两个监听函数, 两个函数的内容都是在同一次事件环中的
// 所以结果是: 1,2, promiose-1, promise-2

function onclick1() {
  console.log('1');
  Promise.resolve('promise-1').then((val) => {
    console.log(val);
  });
}

function onclick2() {
  console.log('2');
  Promise.resolve('promise-2').then((val) => {
    console.log(val);
  });
}

const oBtn = document.createElement('button');

oBtn.textContent = 'click';
oBtn.addEventListener('click', onclick1, false);
oBtn.addEventListener('click', onclick2, false);

document.body.append(oBtn);

oBtn.click();
```

## 信道 MessageChannel

[https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)
[https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort)

## 浏览器动画帧 requestAnimationFrame

[https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

## 监听dom树变化 MutationObserver

[https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)
