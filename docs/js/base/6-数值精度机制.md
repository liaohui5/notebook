## 前置知识

JavaScript 是一门脚本语言, 没有类似其他静态语言中的那种 `int` `float` 类型来区分整数和小数,
在 JavaScript 中, 只要是数值不管是是小数还是整数都是 `Number` 类型

## 精度丢失现象

```js
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
```

## 如何解决精度丢失

可以使用 以下几个库来解决, 示例代码使用的 big.js

- [big.js](https://github.com/MikeMcl/big.js)
- [decimal.js](https://github.com/MikeMcl/decimal.js)
- [bignumber.js](https://github.com/MikeMcl/big.js)

```js
const Big = require('big.js');

const x = new Big(0.1);
const r = x.plus(0.2);

console.log(r.toNumber() === 0.3); // true
```

## JS 中数字是如何存储的?

JavaScript 数字是以 64 位双精度浮点数
