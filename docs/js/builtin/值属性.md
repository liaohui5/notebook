## globalThis

`globalThis` 是ES2022中新增的关键字, 他指向当前运行环境的全局对象

通过使用 globalThis, 可以更方便地在 JavaScript
代码中访问全局对象, 避免了环境依赖的写法

::: code-group

```js [浏览器环境]
if (globalThis === window) {
  console.log('globalThis === window');
}
```

```js [Node.js 环境]
if (globalThis === global) {
  console.log('globalThis === global');
}
```

```js [web worker 环境]
if (globalThis === self) {
  console.log('globalThis === self');
}
```

:::

## Infinity

全局属性 Infinity 是一个数值, 表示无穷大

```js
/**
 * 返回指定范围内的随机数
 * @param min - 最小值
 * @param max - 最大值
 * @returns 返回值
 */
export function range(min, max) {
  const isInf = min === Infinity || max === Infinity;
  const isInf2 = min === -Infinity || max === -Infinity;
  if (isInf || isInf2) {
    throw new RangeError('min and max must not be Infinity');
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}
```

## NaN

NaN(`Not a Number`) 表示不是一个数字, 它不等同于任何值包括他自己

```js
console.log(NaN === 123); // false
console.log(NaN === NaN); // false
console.log(typeof NaN); // number

// 如何判断 NaN 呢?
console.log(isNaN(NaN)); // true
console.log(Number.isNaN(NaN)); // true
console.log(Object.is(NaN, NaN)); // true
```

## undefined

只有一个值得数据类型, 这个值就是他自己, 他表示变量已经定义但是未赋值

```js
var num;
console.log(num); // undefined

function f1() {}
console.log(f1()); // undefined

var obj = {};
console.log(obj.not_defined_property); // undefined

// 如何判断 undefined 呢?
console.log(undefined === undefined); // true
console.log(null == undefined); // true
```
