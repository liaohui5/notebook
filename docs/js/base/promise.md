---
outline: deep
---

## Promise 介绍

[推荐阅读 MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
ES6（ECMAScript 6）中引入的Promise API是一种用于处理异步操作的新特性，它旨在解决传统回调函数导致的 "回调地狱" 问题，
并提供了一种更加优雅、可读性强且易于管理的异步编程模型。Promise 主要具有以下几个关键特性：

0. 三种状态: pending(进行中) fulfilled(已兑现) rejected(已拒绝)
1. 状态只能通过提供的函数来改变, 不受外界影响
2. 默认是 pending 状态, 一旦修改, 就无法再次修改

```js
const p = new Promise((fulfilled, rejected) => {
  // promise 对象默认是 pending 状态
  // 只能通过 fulfilled 或者 rejected 来改变状态
  // 一旦 resolved 或者 rejected, 状态被改变后, 就无法再次改变状态
  fulfilled(1);
  rejected(2);
});

console.log(p);

// 1. 不受外界影响, 无法这样操作 p[[PromiseState]] = "rejected"
// 2. 状态一但修改就不可再次修改
// 输出对象,状态如下:
// [[PromiseState]] : "fulfilled"
// [[PromiseResult]] : 1
```

> 形象化的理解: 向公司提出升职加薪申请

0. 提出申请(new Promise)
1. 等待公司审核(pending)
2. 同意: 那么就升职加薪成功(fulfilled)
3. 拒绝: 那么就升职加薪失败(rejected)

## 更优雅的解决异步问题

::: code-group

```js [callback]
// callback, like jquery $.ajax
function mockRequest(cb) {
  setTimeout(() => {
    cb('callback');
  }, 1000);
}

mockRequest((res) => {
  console.log(res);
  // 增加代码层级, 如果需要多次调用, 那么在 cb 中再调用 mockRequest
  // mockRequest(() => { ...})
});
```

```js [promise]
// promise, like fetch API
function mockRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise'), 1000);
    // setTimeout(() => reject("promise"), 1000);
  });
}

// 减少代码层级, 而且就是需要再次调用 mockRequest
// 只需要增加 then 方法就行
mockRequest()
  .then((value) => {
    console.log('promise 成功(调用resolve) 后执行', value);
    return mockRequest();
  })
  .then((value) => {
    console.log('第二次 mockRequest 的结果', value);
  })
  .catch((reason) => {
    console.log('promise 成功(调用reject) 后执行', reason);
  })
  .finally(() => {
    console.log('finally 不管成功失败, 最后都会执行');
  });
```

```js [async/await]
// async/await 其实就是 Promise + Generator 的语法糖
// 但是可以让 语法更简洁, 看起来就如同步代码一般
// 大大提高代码的可读性, 但是需要注意先后顺序
function mockRequest(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise_' + delay), delay * 1000);
    // setTimeout(() => reject("promise"), 1000);
  });
}

// promise + async/await
const value1 = await mockRequest(2);
const value2 = await mockRequest(1);
console.log(value1);
console.log(value2);
```

:::

## 实例方法

一些用于判断测试的工具函数

```js
// 是否是一个函数
const isCallable = () => typeof value === 'function';

// 是否是一个 对象并且有 then 方法(promise)
function isPromise(value) {
  return Object.prototype.toString.call(value) === '[object Promise]';
}
```

### then

当 promise 为 `fulfilled` 状态时会执行 then 函数, 返回一个新的 promise

```js
const p = new Promise((resolve) => {
  resolve(1);
});

console.log(isPromise(p)); // true
const pThen = p.then((v) => {
  console.log(`结果:${v}`);
});
console.log(isPromise(pThen)); // true
console.log(pThen === p); // false: then 方法返回了一个新的 promise 对象
```

### catch

当 promise 为 `rejected` 状态时会执行 catch 函数, 并返回一个新的 promise
`如果没有调用 catch 就会抛出异常`

```js
const p = new Promise((_, reject) => {
  reject(1);
});

const pCatch = p.catch((r) => {
  console.log(`拒绝原因: ${r}`);
});

console.log(isPromise(pCatch)); // true
console.log(pCatch === p); // false: catch 方法返回了一个新的 Promise

// 如果不调用 catch 会抛出异常
// Uncaught (in promise) should be throw an error
const p2 = new Promise((_, reject) => {
  reject('should be throw an error');
});
```

### finally

无论成功失败都会执行这个函数

```js
const p = new Promise((resolve, reject) => {
  Math.random() > 0.5 ? resolve(1) : reject(1);
});

const pFinally = p.finally(() => {
  console.log('finally', p);
});

console.log(isPromise(pFinally)); // true
console.log(p === pFinally); // false: 返回了一个新的 promise 对象
```

### 语法糖 async/await

await 其实就是 then 方法的语法糖, 获取到 promise 对象 fulfilled 状态的值

::: code-group

```js [then & catch]
// 模拟发送请求
function mockRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve({ id: 111, name: 'user-111' }) : reject('You are off line');
    }, 1000);
  });
}

function sendRequest() {
  // 1. mockRequest 会返回一个 promise 对象(p1)
  mockRequest()
    // 2. promise 对象可以执行then方法
    .then((v) => {
      console.log('resolve', v);
    })
    // 3. then 方法会返回一个新的 promise 对象(p2)
    // 所以又可以调用新 promise 的 catch 方法
    .catch((e) => {
      console.log('reject:', e);
    });
}

sendRequest();
```

```js [async & await]
// 模拟发送请求
function mockRequest() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve({ id: 111, name: 'user-111' }) : reject('You are off line');
    }, 1000);
  });
}

async function sendRequest() {
  // 1. mockRequest() 返回一个 promise 对象 p1
  // 2. 等待 p1 状态改变(调用: resolve/reject)
  // 3. 如果 p1 是 fulfilled 状态就拿到结果并赋值给 res
  //    如果 p1 是 rejected 状态就照常的抛出异常
  const res = await mockRequest();

  // 4. 后续代码, 无论 resovle 还是 reject 都需要执行
  //    如果抛出异常不管, 那么后续代码就无法执行
  console.log('finally:', res);
}

sendRequest();
```

:::

## 静态方法

在 Promise 类上的一些语法糖和工具方法

### reject/resolve

语法糖性质方法, 直接返回一个 `fulfilled/rejected` 状态的 promise 对象, 也就是默认不是 `pending` 且状态无法改变的 promise 对象

::: code-group

```js [resolve]
const p = Promise.resolve('resolved some values');
console.log(isPromise(p)); // true

// 实现原理:
function PromiseResolve(value) {
  return new Promise((resolve) => resolve(value));
}
```

```js [reject]
const p = Promise.reject('should be throw an error');
console.log(isPromise(p)); // true

// 实现原理:
function PromiseReject(reason) {
  return new Promise((_, reject) => reject(value));
}
```

:::

### withResolvers

语法糖性质方法, 直接获取到 `promise` 对象和改变状态的两个方法 `resolve` 和 `reject`

```js
// 实现原理的简写方式, 更方便的直接解构, 而不需要再声明其他变量
const { promise, resolve, reject } = Promise.withResolvers();

// 实现原理:
function PromiseWithResolvers() {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
```

### all

- 传入一个可迭代对象(如:数组), 返回一个新的 promise

- 当数组中的元素不是 promise 对象时, 那么使用 `Promise.resolve` 方法将元素转成 `promise` 对象

- 新 promise 对象的 then 方法的参数就是`所有 promise resolvedValue 的集合`, 并且和传入 all 方法参数的顺序一致

- 当数组为空或数组中的所有 promise 对象状态都被修改为 `fulfilled` 那么 `all` 方法返回的新 promise 对象的状态才会改变为 `fulfilled`
  只要有任意一个状态为 `rejected` 那么这个新 promise 对象的状态就会改变为 `rejected`

```js
const p1 = Promise.resolve(1);
const p2 = 2;
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));

const arr = [p3, p1, p2];
if (Math.random() > 0.5) {
  arr.push(Promise.reject('should be throw an error'));
}

const pAll = Promise.all(arr); // 返回一个新的 promise

console.log(isPromise(pAll)); // true

pAll
  .then((values) => {
    console.log('fulfilled:', values); // [3, 1, 2]
  })
  .catch((e) => {
    console.log('rejected', e);
  });
```

### allSettled

- 传入一个可迭代对象(如:数组), 返回一个新的 promise 对象

- 当数组中的元素不是 promise 对象时, 那么使用 `Promise.resolve` 方法将元素转成 `promise` 对象

- 新 promise 对象的 then 方法的参数就是`所有改变状态后的 promise 对象`, 并且和传入 allSettled 方法参数的顺序一致

- 当数组为空或数组中的所有 promise 对象状态都被修改后(不管 fulfilled 还是 rejected), 那么 `allSettled` 方法返回的新 promise 对象的状态才会改变为 `fulfilled`

```js
const p1 = Promise.resolve(1);
const p2 = 2;
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));
const p4 = Promise.reject('should be throw an error');

// 返回一个新的 promise
const p = Promise.allSettled([p3, p1, p2, p4]);

console.log(isPromise(p)); // true

p.then((promises) => {
  console.log(promises);
  /*
  [
    Promise {status: fulfilled, value: 3},
    Promise {status: fulfilled, value: 1},
    Promise {status: fulfilled, value: 2},
    Promise {status: rejected, reason: 'should be throw an error'},
  ]
  */
});
```

### any

- 传入一个可迭代对象(如:数组), 返回一个新的 promise 对象
- 当数组中的元素不是 promise 对象时, 那么使用 `Promise.resolve` 方法将元素转成 `promise` 对象
- 当数组为空或者数组中的所有 promise 状态都是 `rejected` 的时候, 返回的新 promise 状态也修改为 `rejected`
- 当数组中有一个或多个 promise 的状态是 `fulfilled` 的时候, 那么 promise 的状态就修改为 `fulfilled`
  并且, 新 promise 对象的 then 方法的参数为 `数组中第一个状态为 fulfilled 的 promise 的 resolvedValue`

```js
// resolved promise & number value
const p1 = Promise.resolve(1);
const p2 = 2;

// asynchronously  resolved promise
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000));

// rejected promise
const p4 = Promise.reject('should be throw an error');

Promise.any([p4, p3, p1, p2])
  .then((value) => {
    console.log('resolved:', value);
  })
  .catch((e) => {
    console.log('rejected:', e);
  });

// Uncaught (in promise) AggregateError: All promises were rejected
const pAny = Promise.any([]);
console.log(isPromise(pAny)); // true
```

### race

- 传入一个可迭代对象(如:数组), 返回一个新的 promise 对象
- 如果传入的数组为空, 那么返回的新 promise 就一直处于 `pending` 状态
- 数组中的所有 promise 哪个的状态先改变, 返回的新 promise 的状态就是最先改变状态的 promise 的状态(不管是 `fulfilled/rejected`)

```js
const pRace = Promise.race([]);
console.log("isPromise:", isPromise(p));
console.log("p:", pRace); // Promise { status: 'pending' }

const slowPromise = new Promise((resolve) => setTimeout(resolve, 300, "slow"));
const fastPromise = new Promise((resolve) => setTimeout(resolve, 200, "fast"));
const arr = [slowPromise, fastPromise];

if (Math.random() > 0.5) {
  console.log("push reject promise");
  const rejectPromise = new Promise((_, reject) => setTimeout(reject, 100, "some reason message") });
  arr.push(rejectPromise);
}

Promise.race(arr);
  .then((value) => {
    console.log("resolved:", value);
  })
  .catch((e) => {
    console.log("rejected:", e);
  });
```

## 源码实现

[推荐阅读 Promises/A+ 规范](https://promisesaplus.com/), 也可以 [阅读中文版本](https://promisesaplus.com.cn/)

[也可以使用在线工具讲代码执行流程可视化来帮助理解](https://www.jsv9000.app)

按照[Promise/A+ 规范](https://promisesaplus.com.cn/)的要求来实现

## 环境搭建

vite + vitest

项目目录结构如下:

```txt
.
├── __tests__            // 测试文件目录
│   └── state.spec.js    // promise 状态相关测试用例
├── index.html
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── src                 // 源码目录
│   ├── MockPromise.js
│   └── utils.js
└── vite.config.js      // vite 配置文件
```

## 2.1 Promise状态

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20240512180438.png)

::: code-group

```js [MockPromise.js]
import { isCallable } from './utils';

// 1. promise 三种状态
export const PromiseStates = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export class MockPromise {
  constructor(executor) {
    if (!isCallable(executor)) {
      throw new Error('Promise executor is not a function');
    }

    // 2.1.1 默认是 pending 状态
    this.state = PromiseStates.pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      // 2.1.1.1 & 2.1.2.1 & 2.1.3.1
      // 只有是 pending 状态的 promise 才可以修改为 fulfilled 状态
      if (this.state !== PromiseStates.pending) {
        return;
      }

      // 2.1.2.2 必须有一个值
      this.value = value;
      this.state = PromiseStates.fulfilled;
    };

    const reject = (reason) => {
      // 2.1.1.1 & 2.1.2.1 & 2.1.3.1
      // 只有是 pending 状态的 promise 才可以修改为 rejected 状态
      if (this.state !== PromiseStates.pending) {
        return;
      }

      // 2.1.3.2 必须有一个原因
      this.reason = reason;
      this.state = PromiseStates.rejected;
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    // not implement
  }
}
```

```js [state.spec.js]
import { describe, it, vi, expect } from 'vitest';
import { MockPromise, PromiseStates } from '../src/MockPromise';

describe('Promise状态', () => {
  it('一个promise必须处于以下三种状态之一：pending（待定）、fulfilled（实现）或rejected（拒绝）。', () => {
    const p = new MockPromise(vi.fn());
    expect(p.state).toBe(PromiseStates.pending);
  });

  it('处于pending状态的promise, 可以转换为实现或拒绝状态', () => {
    // state transform to fulfilled
    let res;
    const p1 = new MockPromise((resolve) => {
      res = resolve;
    });
    expect(p1.state).toBe(PromiseStates.pending);
    res();
    expect(p1.state).toBe(PromiseStates.fulfilled);

    // state transform to reject
    let rej;
    const p2 = new MockPromise((_, reject) => {
      rej = reject;
    });
    expect(p2.state).toBe(PromiseStates.pending);
    rej();
    expect(p2.state).toBe(PromiseStates.rejected);
  });

  it('处于fulfilled/rejected状态的promise, 不能转换为其他任何状态', () => {
    const p1 = new MockPromise((resolve, reject) => {
      resolve();
      reject();
    });
    expect(p1.state).toBe(PromiseStates.fulfilled);

    const p2 = new MockPromise((resolve, reject) => {
      reject();
      resolve();
    });
    expect(p2.state).toBe(PromiseStates.rejected);
  });
});
```

```js [utils.js]
export const isCallable = (value) => typeof value === 'function';
```

:::

## 实现 then 方法

### 2.2.1 then 方法:初步实现

![](https://raw.githubusercontent.com/liaohui5/images/main/images/20240512185105.png)

初步实现可以在 then 的 onFulilled 和 onRejected 中拿到调用 resolve/reject 的传入值

::: code-group

```js {27-28,37-38,41-46}[MockPromise.js]
import { isCallable } from './utils';

export const PromiseStates = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export class MockPromise {
  constructor(executor) {
    if (!isCallable(executor)) {
      throw new Error('Promise executor is not a function');
    }

    this.state = PromiseStates.pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== PromiseStates.pending) {
        return;
      }
      this.value = value;
      this.state = PromiseStates.fulfilled;
      // 执行订阅的 onFulfilledCallbacks
      this.onFulfilledCallbacks.forEach((fn) => fn());
    };

    const reject = (reason) => {
      if (this.state !== PromiseStates.pending) {
        return;
      }
      this.reason = reason;
      this.state = PromiseStates.rejected;
      // 执行订阅的 onRejectedCallbacks
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    // 捕获 executeor 异常
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 由于 onFulfilled 和 onRejected 是可选参数
    // 但是在后续代码又要求 onFulfilled 和 onRejected
    // 必须是函数(因为要直接调用), 所以应该判断并设置默
    // 认值, 以便让后续代码正确执行
    if (!isCallable(onFulfilled)) {
      onFulfilled = (value) => value;
    }
    if (!isCallable(onRejected)) {
      onRejected = (reason) => {
        throw reason;
      };
    }

    if (this.state === PromiseStates.fulfilled) {
      onFulfilled(this.value);
      return;
    }
    if (this.state === PromiseStates.rejected) {
      onRejected(this.reason);
      return;
    }
    if (this.state === PromiseStates.pending) {
      // subscribe MockPromise state changes
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}
```

```js [then.spec.js]
import { describe, it, expect, vi } from 'vitest';
import { MockPromise } from '../src/MockPromise';

describe('then方法', () => {
  it('2.2.1 如果onFulfilled/onRejected不是一个函数，它必须被忽略', () => {
    const p1 = new MockPromise((resolve) => resolve(1));
    p1.then(1);

    const p2 = new MockPromise((_, reject) => reject(1));
    p2.then(1, 1);
  });

  describe('2.2.2 如果onFulfilled是一个函数', () => {
    it('2.2.2.1 它必须在promise实现后调用，并以promise的值作为其第一个参数', () => {
      const v = 1;
      const p = new MockPromise((resolve) => resolve(v));
      const onFulfilled = vi.fn((value) => value);
      p.then(onFulfilled);
      expect(onFulfilled).toBeCalled();
      expect(onFulfilled).toBeCalledWith(v);
    });

    it('2.2.2.2 在promise实现之前不得调用它', () => {
      let resolve;
      const p = new MockPromise((res) => {
        resolve = res;
      });
      const onFulfilled = vi.fn();
      p.then(onFulfilled);
      expect(onFulfilled).not.toBeCalled();

      resolve();
      expect(onFulfilled).toBeCalled();
    });

    it('2.2.2.3 它不能被调用多次', () => {
      const p = new MockPromise((resolve) => {
        resolve();
      });

      const onFulfilled = vi.fn();
      p.then(onFulfilled);

      expect(onFulfilled).toBeCalledTimes(1);
    });
  });

  describe('2.2.3 如果onRejected是一个函数', () => {
    it('2.2.3.1 它必须在promise拒绝后调用，并以promise的原因作为其第一个参数', () => {
      const v = 1;
      const p = new MockPromise((_, reject) => reject(v));

      const onRejected = vi.fn((reason) => reason);
      p.then(onRejected);
      expect(onRejected).toBeCalled();
      expect(onRejected).toBeCalledWith(v);
    });

    it('2.2.3.2 在promise实现之前不得调用它', () => {
      let reject;
      const p = new MockPromise((_, rej) => {
        reject = rej;
      });

      const onRejected = vi.fn();
      p.then(onRejected);

      expect(onRejected).not.toBeCalled();

      reject();
      expect(onRejected).toBeCalled();
    });

    it('2.2.3.3 它不能被调用多次', () => {
      const p = new MockPromise((_, reject) => {
        reject();
      });

      const onRejected = vi.fn();
      p.then(onRejected);

      expect(onRejected).toBeCalledTimes(1);
    });
  });

  // 之后再实现
  // it("2.2.4 onFulfilled或onRejected不能在执行上下文堆栈中只包含平台代码之前调用", () => {
  //     // 简单来说, 这个 then 是不能同步执行的, 必须异步的执行
  // });

  // 这个 2.2.5 已经在源码中约束死了(isCallable), 不需要再次测试了
  // it("2.2.5 onFulfilled和onRejected必须作为函数被调用 ", () => {
  // });

  describe('2.2.6 then方法可以在同一个promise上多次调用', () => {
    it('2.2.6.1 如果/当promise被实现时，所有相应的onFulfilled回调函数必须按照它们发起then调用的顺序执行。', () => {
      const p = new MockPromise((resolve) => {
        resolve();
      });

      const f1 = vi.fn();
      const f2 = vi.fn();
      const f3 = vi.fn();
      p.then(f1);
      p.then(f2);
      p.then(f3);

      expect(f1).toBeCalled();
      expect(f2).toBeCalled();
      expect(f3).toBeCalled();
    });

    it('2.2.6.2 如果/当promise被拒绝时，所有相应的onRejected回调函数必须按照它们发起then调用的顺序执行。', () => {
      const p = new MockPromise((_, reject) => {
        reject();
      });

      const f1 = vi.fn();
      const f2 = vi.fn();
      const f3 = vi.fn();
      p.then(null, f1);
      p.then(null, f2);
      p.then(null, f3);

      expect(f1).toBeCalled();
      expect(f2).toBeCalled();
      expect(f3).toBeCalled();
    });
  });
});
```

:::

### 2.2.2 then 方法:链式调用

要想实现 then 的链式调用 `then(...).then(...)`, 那么就只能在 then 方法中返回一个新的 `promise` 对象

> 为什么不能在 then 方法中返回 this?

promise/A+ 规范中明确说了, promise2 不能等于 promise1

::: code-group

```js [初步实现]
export class MockPromise {
  constructor(executor) {
    // ...
  }

  then(onFulfilled, onRejected) {
    if (!isCallable(onFulfilled)) {
      onFulfilled = (value) => value;
    }
    if (!isCallable(onRejected)) {
      onRejected = (reason) => {
        throw reason;
      };
    }
    const promise2 = new MockPromise((resolve, reject) => {
      let x;
      if (this.state === PromiseStates.fulfilled) {
        try {
          x = onFulfilled(this.value);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }
      if (this.state === PromiseStates.rejected) {
        try {
          x = onRejected(this.reason);
          resolve(x);
        } catch (e) {
          reject(e);
        }
      }
      if (this.state === PromiseStates.pending) {
        // subscribe Promise state changes
        this.onFulfilledCallbacks.push(() => {
          try {
            x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}
```

```js [测试代码]
import { MockPromise } from './MockPromise';

// 链式处理 fulfilled 态的
new MockPromise((resolve) => {
  resolve(1);
})
  .then((value) => {
    console.log('1.then -> onFulfiled:', value);
    return value + 1;
  })
  .then((value) => {
    console.log('2.then -> onFulfiled:', value);
  });

// 链式处理 rejected 态的 promise 后再次执行 then
new MockPromise((_, reject) => {
  reject(11);
})
  .then(null, (reason) => {
    console.log('1.then -> onRejected:', reason);
    return reason + 1;
  })
  .then((value) => {
    // 走完 onRejected 之后, 再执行then, 就会走 onFulfilled
    console.log('2.then -> onRejected:', value);
  });

// 链式处理 fulfilled 态的 promise 后, 抛出异常
new MockPromise((resolve) => {
  resolve(1);
})
  .then((value) => {
    throw new Error('throw some error message, resolved value is ' + value);
  })
  .then(null, (reason) => {
    console.log('2. then -> onRejected:', reason);
  });
```

:::

### 2.2.3 实现 catch 方法

catch 的本质就是一个then方法的语法糖: `then(null, catchCallbackFn)`

```js
export class MockPromise {
  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
```

### 2.2.4 then 方法的问题及改进

#### then 方法必须异步执行的问题

1. 现在的 then 和原生的 Promise 执行的结果不一样, 原生 Pormise 的 then 方法是异步执行的

::: code-group

```js [问题]
console.log('前面同步代码1');
const mp = new MockPromise((r) => r(1));
mp.then((value) => {
  console.log('mp then', value);
});
console.log('后续同步代码1');

console.log('=================');

console.log('前面同步代码2');
const p = new Promise((r) => r(1));
p.then((value) => {
  console.log('p then', value);
});
console.log('后续同步代码2');

// 由结果可以知道, MockPromise 的 then 方法是同步执行的
// 而 Promise 的 then 方法是异步执行的, 不会阻塞后续代码的执行
```

```js {16-24,27-34}[改进代码]
export class MockPromise {
  constructor(executor) {}

  then(onFulfilled, onRejected) {
    if (!isCallable(onFulfilled)) {
      onFulfilled = (value) => value;
    }
    if (!isCallable(onRejected)) {
      onRejected = (reason) => {
        throw reason;
      };
    }
    const promise2 = new MockPromise((resolve, reject) => {
      let x;
      if (this.state === PromiseStates.fulfilled) {
        // 异步执行
        setTimeout(() => {
          try {
            x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.rejected) {
        setTimeout(() => {
          try {
            x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.pending) {
        // 订阅状态变化
        this.onFulfilledCallbacks.push(() => {
          try {
            x = onFulfilled(this.value);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(this.reason);
            resolve(x);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}
```

:::

#### then 参数(函数)返回 promise 的问题

所谓的参数函数就是 then 的参数(onFulfilled 和 onRejected 这两个函数)

2. 现在的then可以处理普通值, 但是还无法处理 then 中返回一个Promise对象的情况

::: code-group

```js [问题]
new MockPromise((resolve) => {
  resolve(1);
})
  .then((value) => {
    return new Promise((resolve) => {
      resolve(value + 1);
    });
  })
  .then((value) => {
    // 在这里拿到的 value 的值是一个 promise 对象, 而不是 2
    // 但是, 如果将 MockPromise 修改为原生的 Promise, 同样的
    // 代码, Promise 可以拿到结果 2
    console.log('2.then -> onFulfilled:', value);
  });
```

```js {2-4,25,35,46,54}[改进代码]
// then 方法内部新 promise 的处理流程
// 如果 x 是一个 Promise 要如何处理?
function resolvePromise(promise2, x, resolve, reject) {
  // some codes...
}

export class MockPromise {
  constructor(executor) {}

  then(onFulfilled, onRejected) {
    if (!isCallable(onFulfilled)) {
      onFulfilled = (value) => value;
    }
    if (!isCallable(onRejected)) {
      onRejected = (reason) => {
        throw reason;
      };
    }
    const promise2 = new MockPromise((resolve, reject) => {
      let x;
      if (this.state === PromiseStates.fulfilled) {
        // 异步执行
        setTimeout(() => {
          try {
            x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.rejected) {
        setTimeout(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.pending) {
        // 订阅状态变化
        this.onFulfilledCallbacks.push(() => {
          try {
            x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }
}
```

:::

## 2.3 then 参数函数中的 Promise 的解决过程

```js [MockPromise.js]
import { isCallable, isObject } from './utils';

function resolvePromise(promise2, x, resolve, reject) {
  // 2.3.1 如果promise和x引用同一个对象，则以TypeError为原因拒绝promise。
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MockPromise>'));
  }

  // 防止重复的调用改变状态的函数, 只有第一次改变状态的函数的调用生效
  let isCalled = false;

  if (!(isObject(x) || isCallable(x))) {
    // 如果x既不是对象也不是函数,那么就证明x是普通值
    return resolve(x);
  }

  // 如果x是对象或者函数, 那么证明 x 可能是 一个 Promise
  try {
    // 如果可以正常的获取 x 的 then 属性, 并且 then 是一个函数
    // 那么我就执行这个 then, 并且传入 onFulfilled 和 onRejected
    // 在传入的 onFulfilled 和 onRejected 中改变 x 的状态
    let then = x.then;
    if (isCallable(then)) {
      const onFulfilled = (y) => {
        if (isCalled) return;
        isCalled = true;
        /** 这里不能直接调用 resolve(x) 改变状态, 需要防止递归的情况:
        如果直接 resolve(x), 那么第二次获得的 value 就是一个 MockPromise 对象
        const p = new MockPromise((resolve) => resolve(1)).then((value) => {
          return new MockPromise((resolve2) => {
            const p3 = new MockPromise((resolve3) => resolve3(value + 1));
            resolve2(p3);
          });
        });
        p.then((value) => {
          console.log("value:", value);
        });
        **/
        resolvePromise(promise2, y, resolve, reject);
      };
      const onRejected = (r) => {
        if (isCalled) return;
        isCalled = true;
        reject(r);
      };

      // 4.在执行 then 的时候将 this 指向 x
      then.call(x, onFulfilled, onRejected);
    } else {
      resolve(x);
    }
  } catch (e) {
    if (isCalled) return;
    isCalled = true;
    reject(e);
  }
}
```

## 完整源码

::: code-group

```js [MockPromise.js]
import { isCallable, isObject } from './utils';

export const PromiseStates = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<MockPromise>'));
  }

  let isCalled = false;

  if (!(isObject(x) || isCallable(x))) {
    return resolve(x);
  }

  try {
    let then = x.then;
    if (isCallable(then)) {
      const onFulfilled = (y) => {
        if (isCalled) return;
        isCalled = true;
        resolvePromise(promise2, y, resolve, reject);
      };
      const onRejected = (r) => {
        if (isCalled) return;
        isCalled = true;
        reject(r);
      };
      then.call(x, onFulfilled, onRejected);
    } else {
      resolve(x);
    }
  } catch (e) {
    if (isCalled) return;
    isCalled = true;
    reject(e);
  }
}

export class MockPromise {
  constructor(executor) {
    if (!isCallable(executor)) {
      throw new Error('Promise executor is not a function');
    }

    this.state = PromiseStates.pending;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== PromiseStates.pending) {
        return;
      }
      this.value = value;
      this.state = PromiseStates.fulfilled;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    };

    const reject = (reason) => {
      if (this.state !== PromiseStates.pending) {
        return;
      }
      this.reason = reason;
      this.state = PromiseStates.rejected;
      this.onRejectedCallbacks.forEach((fn) => fn());
    };

    // catch executor function exceptions
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    if (!isCallable(onFulfilled)) {
      onFulfilled = (value) => value;
    }
    if (!isCallable(onRejected)) {
      onRejected = (reason) => {
        throw reason;
      };
    }
    const promise2 = new MockPromise((resolve, reject) => {
      let x;
      if (this.state === PromiseStates.fulfilled) {
        setTimeout(() => {
          try {
            x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.rejected) {
        setTimeout(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
      if (this.state === PromiseStates.pending) {
        // subscribe Promise state changes
        this.onFulfilledCallbacks.push(() => {
          try {
            x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    return promise2;
  }

  catch(errorCallback) {
    return this.then(null, errorCallback);
  }
}
```

```js [utils.js]
// 判断一个值是否是一个函数
export const isCallable = (value) => typeof value === 'function';

// 判断一个值是否是一个对象
export const isObject = (value) => value !== null && typeof value === 'object';
```

:::
