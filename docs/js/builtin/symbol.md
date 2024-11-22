## 什么是 Symbol?

Symbol 是一种原始的数据类型, 会返回一个 Symbol 类型的值, 注意它不是一个包装类,
因此不能使用 `new` 操作符来创建实例


Symbol 类型的值都是唯一的, 每个 Symbol 值都是不相等的

```js
const s1 = Symbol();
const s2 = Symbol();
console.log(s1 === s2); // false

// 即使传入一个标识符一样, 返回的结果也不是同一个
const s3 = Symbol("s3");
const s4 = Symbol("s3");
console.log(s3 === s4); // false
```


## 静态方法学习

- Symbol.for: 根据 key 找对应的 Symbol 值, 没有找到就新建一个
- Symbol.keyfor: 根据 Symbol 值来找这个值对应的 key, 没有找到返回 undefined

```js
const s1 = Symbol.for("symbol-1");
const s2 = Symbol.for("symbol-1");
console.log(s1 === s2); // true, 说明 s1 s2 是同一个值

const k1 = Symbol.keyFor(s1);
console.log(k1); // symbol-1 获取到了 s1 的 key
```

## Symbol 的作用

1. 可以用来进行元编程
2. 在不使用 ES6 `#` 符号的情况下, 定义一些私有变量


::: code-group

```js [元编程]
// 为对象实现 Iterator 接口, 让对象可以遍历
// 1.使用 Symbol 为对象实现迭代器协议
const obj = {
  id: 1,
  name: 'tom',
  age: 10,
}

Object.defineProperty(obj, Symbol.iterator, {
  value: function () {
    const keys = Object.keys(obj);
    let index = 0;
    return {
      next: function () {
        const done = index === keys.length;
        const key = keys[index++];
        const value = done ? undefined : [key, obj[key]]; // [key, value]
        return {
          done: done,
          value: value,
        };
      },
    };
  },
});

for (let [k, v] of obj) {
  // 如果不实现迭代器协议就会报错:
  // obj is not iterable
  console.log(`${k}:${v}`);
}

// 2.使用 Symbol 判断一个函数是否是 async 修饰的异步函数
const f1 = () => console.log(1);
const f2 = async () => Promise.resolve(1)
function isAsyncFunc(fn) {
  if (typeof fn !== "function") {
    throw new TypeError("paramter is not a funciton");
  }

  // 在 async 修饰的函数中有一个
  // Symbol(Symbol.toStringTag) 属性, 他就是用来定义在调用
  // Object.prototype.toString.call(xxx) 返回的是什么
  return Object.prototype.toString.call(fn) === "[object AsyncFunction]";
}

// 诸如此类的元编程例子, 还有很多主要是利用了 Symbol 的静态属性
```

```js [使用Symbol定义私有变量]
class Cat {
  #name;
  constructor() {
    this.#name = "xiaoguai"
  }
}

class Dog {
  constructor() {
    const nameKey = Symbol();
    this[nameKey] = "xiaoqi"
  }
}

const c = new Cat();
// console.log(c.#name); // property '#name' is not assessible
console.log(c);

const d = new Dog();
console.log(d);
// 无法在外部获取, 所以 this[nameKey] 就是私有的
```

:::


## 手动实现一个简单版本 Symbol

像元编程的功能肯定是做不到的, 但是可以实现每次返回不同值的功能

::: code-group
```js [symbol.js 极简实现]
const symbols = [];

function createSymbolItem(uuid) {
  return Object.freeze({
    key: uuid,
  });
}

export function $Symbol() {
  const uuid = window.crypto.randomUUID();
  const symbolItem = createSymbolItem(uuid)
  symbols.push(symbolItem);
  return symbolItem;
}

function $for(key) {
  let symbolItem = symbols.find((item) => item.key === key);
  if (!symbolItem) {
    symbolItem = createSymbolItem(key);
    symbols.push(symbolItem);
  }
  return symbolItem;
}

function $keyFor(symbol) {
  const symbolItem = symbols.find((item) => item.key === symbol.key);
  if (symbolItem) {
    return symbolItem.key;
  }
}

Object.defineProperty($Symbol, 'for', {
  value: $for,
});

Object.defineProperty($Symbol, 'keyFor', {
  value: $keyFor,
});

$Symbol.prototype.toString = function () {
  return 'Symbol()'
}

$Symbol.prototype.valueOf = function () {
  return this.key;
}
```

```js [symbol.spec.js 单元测试]
import { describe, it, expect } from "vitest";
import { $Symbol } from "@/symbol.js";

describe("Symbol", () => {
  it("Symbol", () => {
    const s1 = $Symbol();
    const s2 = $Symbol();
    expect(s1).not.toBe(s2);
  });

  it("Symbol.for", () => {
    const key = "abc";
    const s1 = $Symbol.for(key);
    const s2 = $Symbol.for(key);
    expect(s1).toEqual(s2);
  });

  it("Symbol.keyFor", () => {
    const key = "abc";
    const sym = $Symbol.for(key);

    const k = $Symbol.keyFor(sym);
    expect(k).toBe(key);
  });

});
```

:::
