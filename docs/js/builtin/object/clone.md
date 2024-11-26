## 引用值和原始值

### 原始值 Primitive values

数据存在栈区, 赋值就直接传值 `Number/Boolean/String/null/undefined/Symbol/BigInt`

```js
let a = 10;
let b = a;
b += 10;
console.log(a, b); // 10, 20
```

### 引用值 Reference Values

数据存在堆中, 变量只是一个指针, 因此赋值是指针传递, 如 `Object/Array/Function/Date..` 等

```js
const tom = {
  name: "tom",
}

// 由于是 "指针" 所以是直接传递内存地址,
// 所以修改的是同一个堆内存空间的数据
const jerry = tom;
jerry.name = "jerry";

console.log(tom.name, jerry.name); // tom, tom
```

## 什么叫克隆

由于引用数据类型的数据, 是存在堆区的, 变量名存储的是堆区的内存地址, 所以直接重新创建一个变量然后再赋值是没有用的,
指向的还是同一个堆, 如果想要复制一份一模一样的, 就要遍历数据去克隆

```javascript
const num1 = 10;
const num2 = num1; // 基本类型可以这样赋值

const obj = { id: 1001, name: "Jerry" };
const obj2 = obj; // 这样赋值是没有作用的, obj2 如果修改了, obj 的值也会被修改
obj2.name = "Tom";
console.log(obj.name === obj2.name); // true, 证明修改的是同一个堆内存中的数据

```

![js-memory-layout](https://raw.githubusercontent.com/liaohui5/images/main/images/202411200345326.png)

## 使用内置API, 转换类型

### 使用 JSON.stringify 和 JSON.parse

1. 先将引用类型转换为基本类型, 然后在赋值
2. 缺点: `JSON.stringify` 会忽略 `Function` 类型的数据, 如果数据较大, 会比较消耗内存
3. 缺点: 无法处理循环引用的对象

```javascript
const obj1 = { id: 1001, name: "Jerry" };
const obj2 = JSON.parse(JSON.stringify(obj1));
// JSON.stringify 将对象转字符串, 字符串是基本数据类型, 所以是直接复值, 而不是一个堆区的地址
// JSON.parse 将字符串转对象

obj2.name = "Tom";
console.log(obj1.name === obj2.name); // false, 证明修改的不是同一个堆内存中的数据
```

### 使用 structuredClone

[阅读MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/structuredClone)

```js
const obj1 = { id: 1001, name: "Jerry" };
const obj2 = structuredClone(obj1);
console.log(obj1 === obj2, obj1, obj2); // false
```

### 使用 MessageChannel

```javascript
function deepClone(origin) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(origin);
    port2.onmessage = (target) =>resolve(target);
  });
}
```

## 手动实现

### 浅拷贝

只会处理第一层, 不会深度的去处理一个对象中所有的引用值

```javascript
function shallowClone(obj, target) {
  target = target || {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

var p1 = {
  name: "张三",
  age: 10,
  isBoy: true,
  children: {
    first: "张小三",
    second: "张小五",
  },
};

var p2 = shallowClone(p1);

p2.name = "李四";
console.log(p1.name === p2.name); // false

p2.children.first = "李大锤";
console.log(p1.children.first === p2.children.first); // true, 证明此时引用的是同一个堆内存
```

### 深拷贝

深度处理一个对象中的所有, 完全复制一个新的

::: code-group

```javascript [es5简易版]
function deepClone(obj, target) {
  target = target || {};
  var toString = Object.prototype.toString;
  var val;
  for (var key in obj) {
    val = obj[key];
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

var p1 = {
  name: "张三",
  age: 10,
  isBoy: true,
  children: {
    first: "张小三",
    second: "张小五",
  },
};

var p2 = deepClone(p1);

p2.name = "李四";
console.log(p1.name === p2.name); // false

p2.children.first = "李大锤";
console.log(p1.children.first === p2.children.first); // false, 不是同一个堆内存
```

```javascript [es6 优化版]
// 上面写的 deepClone 其实还不够完善, 如果是非 Object 或者 Array
// 上面写的那个 deepClone 就无法克隆了

function deepClone(origin, hashMap = new WeakMap()) {
  if (!origin || typeof origin !== "object") {
    return origin;
  }

  if (origin instanceof Date) {
    return new Date(origin);
  }

  if (origin instanceof RegExp) {
    return new RegExp(origin);
  }

  const hashKey = hashMap.get(origin);
  if (hashKey) {
    return hashKey;
  }

  const target = new origin.constructor();
  hashMap.set(origin, target);
  for (const key in origin) {
    if (Object.hasOwnProperty.call(origin, key)) {
      target[key] = deepClone(origin[key], hashMap);
    }
  }

  return target;
}
```

:::
