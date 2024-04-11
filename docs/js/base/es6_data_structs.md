---
outline: deep
---

## 基本了解

### [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

symbol 是一种 `基本数据类型`, Symbol 函数会返回 symbol 类型的值，每个值都是全局唯一的

注意事项:

1. 注意 `Symbol` 不是一个构造函数, 不能使用 `new` 来创建对象
2. Symbol 定义的属性无法被 `for...in` 和 `getOwnerPropertyNames` 获取到, 也就是说可以利用 Symbol 做私有属性

```js
const foo = Symbol('foo');
console.log(foo === 'foo'); // false
console.log(foo === Symbol('foo')); // false
console.log(typeof foo); // Symbol
console.log(typeof Symbol.iterator); // Symbol

// -- 做私有属性 -- //
const idNumber = Symbol('id_number');
const obj = {
  name: 'tom',
  [idNumber]: '43042120001122123X',
};

// 如果在不同文件且 只导出 obj 不导出 idNumber 的话
// 就只能获取 name 无法获取 idNumber
console.log(obj.name);
```

### Map/WeakMap

- [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) 可以简单理解为加强半的object对象, map 的 key 不仅可以是字符串, 还可以是对象, 甚至另外一个 Map 对象
- [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) 弱引用版的Map, key 必须是对象, 而且不会创建对其他对象的强引用, 不会阻止其他对象被垃圾回收机制回收

1. Map 是一个构造函数, 返回一个 Map 类型的值
2. Map 的 key 可以是任意类型的值

```js
// 对象
var k1 = 1;
var k2 = false;
var k3 = { id: 1 };
var k4 = function () {};
var obj = {
  k1: 1,
  k2: 2,
  k3: 3,
  k4: 4,
};

var map = new Map();
map.add(k1, 1);
map.add(k2, 2);
map.add(k3, 3);
map.add(k4, 4);

console.log(obj, map);
```

### Set/WeakSet

- [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 可以简单理解为数组的加强版, 但是会去重, 只保存唯一值的一组数据集合
- [WeakSet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 弱引用版的 Set, key 必须是对象

1. Set 是一个构造函数, 返回一个 Set 类型的值
2. Set 的成员是唯一的, 不能有重复的值

```js
// Set 的构造函数的参数, 必须实现 Symbol.iterator 接口
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.size); // 总共有多少个元素, 5

set.add(6); // 添加一个元素
set.add(1); // 静默失败的, 重复了
set.delete(1); // 删除一个值
set.has(2); // 是否有某个值: true
set.clear(); // 清空所有元素
set.keys(); // 返回一个迭代器对象, 所有的value(set没有k,只有值)
set.values(); // 返回一个迭代器对象, 所有的value
set.entries(); // 返回一个迭代器对象, 所有的[v,v]

// 数组去重
const arr = [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7];
const uniArray = Array.from(new Set(arr));
```

## 熟练掌握 API

熟练掌握API最好的方式就是直接去手动实现一遍

::: code-group

```js [模拟 Map]
class MockMap {
  // [{key: $key, value: $value}]
  #datas = [];

  // items must be a iterable object, like: [ ['a', 1], ['b', 2] ]
  constructor() {
    this.#datas = [];
  }

  // size
  get size() {
    return this.#datas.length;
  }

  // clear
  clear() {
    this.#datas = [];
  }

  // forEach
  forEach(callback, thisArg) {
    if (typeof callback !== 'function') {
      throw new TypeError("'callback' must be a function");
    }
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      callback.call(thisArg || this, item.value, item.key, this);
    }
  }

  // set
  set(key, value) {
    for (let i = 0, l = this.size; i < l; i++) {
      if (Object.is(this.#datas[i].key, key)) {
        // update value if key exists
        this.#datas[i].value = value;
        return;
      }
    }
    this.#datas.push({ key, value });
  }

  // get
  get(key) {
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      if (Object.is(item.key, key)) {
        return item.value;
      }
    }
  }

  // has
  has(key) {
    for (let i = 0, l = this.size; i < l; i++) {
      if (Object.is(this.#datas[i].key, key)) {
        return true;
      }
    }
    return false;
  }

  // delete
  delete(key) {
    const items = this.#datas;
    for (let i = 0, l = this.size; i < l; i++) {
      if (Object.is(items[i].key, key)) {
        items.splice(i, 1);
        break;
      }
    }
  }

  // implements Symbol.iterator interface
  // can be direct for of Map instance
  // for(const item of mapInstance) {...}
  [Symbol.iterator]() {
    let i = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        const target = this.#datas[i];
        const yieldValue = {
          value: target ? [target.key, target.value] : void 0,
          done: i >= this.size,
        };
        i++;
        return yieldValue;
      },
    };
  }

  // entries
  entries() {
    return this[Symbol.iterator]();
  }

  // keys
  *keys() {
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      yield item.key;
    }
  }

  // values
  *values() {
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      yield item.value;
    }
  }

  // for debug handy
  toString() {
    return JSON.stringify(this.#datas);
  }
}

// const m = new MockMap();
const m = new Map();

// set & get
var obj = { id: 'obj' };
m.set('a', 1);
m.set(2, 2);
m.set('2', 3);
m.set(obj, false);
// console.log("a:", m.get("a"));
// console.log("2:", m.get(2));
// console.log("'2':", m.get("2"));
// console.log("obj:", m.get(obj));
// console.log("anthor obj:", m.get({ id: "obj" }));

// has
// console.log(m.has('a') === true);
// console.log(m.has(2) === true);
// console.log(m.has('2') === true);
// console.log(m.has(3) === false);
// console.log(m.has(obj) === true);

// delete
// m.delete("a");
// console.log(m.toString());

// keys
for (const key of m.keys()) {
  console.log(key);
}

// values
for (const value of m.values()) {
  console.log(value);
}

// entries
for (const [k, v] of m) {
  console.log(k, v);
}
```

```js [模拟 Set]
const isCallable = (value) => typeof value === 'function';
const isIterable = (value) => isCallable(value[Symbol.iterator]);

class MockSet {
  #datas = [];
  constructor(items) {
    if (!isIterable(items)) {
      throw new Error('The paramter is not a iterable object');
    }
    for (let i = 0; i < items.length; i++) {
      this.add(items[i]);
    }
  }

  // size
  get size() {
    return this.#datas.length;
  }

  // forEach
  forEach(callback, thisArg) {
    if (!isCallable(callback)) {
      throw new TypeError("'callback' is not a function");
    }
    for (let i = 0, l = this.size; i < l; i++) {
      const value = this.#datas[i];
      callback.call(thisArg || this, value, value, this);
    }
  }

  // add value to set
  add(value) {
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      if (Object.is(item, value)) {
        return;
      }
    }
    this.#datas.push(value);
    return this;
  }

  // delete
  delete(value) {
    for (let i = 0, l = this.size; i < l; i++) {
      const item = this.#datas[i];
      if (Object.is(item, value)) {
        this.#datas.splice(i, 1);
        break;
      }
    }
    return this;
  }

  // clear
  clear() {
    this.#datas = [];
  }

  // for...of
  [Symbol.iterator]() {
    let i = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next: () => {
        const target = this.#datas[i];
        const yieldValue = {
          value: [target, target],
          done: i >= this.size - 1,
        };
        i++;
        return yieldValue;
      },
    };
  }

  // entries
  entries() {
    return this[Symbol.iterator]();
  }

  // keys
  keys() {
    return Object.keys(this.#datas);
  }

  // values
  values() {
    return Object.values(this.#datas);
  }

  // toString
  toString() {
    return JSON.stringify(this.#datas);
  }
}
```

:::
