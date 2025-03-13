## 数值类型

在 JavaScript 中, 数值类型是 JavaScript 的基本数据类型之一, 它表示一个数字,
不同于其他编程语音的是, 它不区分整数和浮点数, 都使用同一个数据类型 `Number`

```js
// 10 进制
const num1 = 11;
cnosole.log(10); // 11

// 8 进制
const num2 = 0o17; // 注意是 0o 开头
console.log(num2); // 十进制的 15

// 2 进制
const num3 = 0b11; // 注意是 0b 开头
console.log(num3); // 十进制的 3

// 浮点数(小数)
const fnum = 0.15;
console.log(fnum);
```

## 浮点数精度问题

```js
const fnum1 = 0.1;
console.log(fnum1); // 0.1

const fnum2 = 0.2;
console.log(fnum2); // 0.2

const fnum3 = fnum1 + fnum2;
console.log(fnum3); // 0.30000000000000004

// 0.1 + 0.2 不等于 0.3 ?????
console.log(fnum3 === 0.3); // false
console.log(fnum3.toString()); // 输出: 0.4
```

## 双精度浮点数

> 计算机是如何存储浮点数的?

可以理解为用科学计数法在计算机里存小数,
计算机用 64 二进制表示一个小数, 第一位存储符号位, 就像人用这种符号 `±123×10⁻³` 表示 `0.123` 一样
但它能存的位数有限, 所以有些小数(比如 0.1)在二进制中会变成无限循环小数, 存储的时候会被砍断, 导致精度丢失

## 如何解决浮点数数值精度问题

解决这个问题的思路主要有几种, `同比例放大成整数计数`, ``

### 同比放大倍数然后计算

```js
let n1 = 0.1;
let n2 = 0.2;
console.log(n1 + n2 === 0.3); // false

// 先放大 100 倍
n1 *= 100;
n2 *= 100;

// 比较时再缩小 100 倍
console.log((n1 + n2) / 100 === 0.3);
```

### 使用第三方专门的数学计算库

- [decimal.js](https://www.npmjs.com/package/decimal.js)
- [big.js](https://www.npmjs.com/package/big.js)

```js
let x = new Decimal("0.1");
let y = new Decimal("0.2");
let z = new Decimal("0.3");
console.log(x.plus(y).equals(z)); // true
```

## Number 类型一些特殊的值

| 变量      | 描述                                             |
| :-------- | :----------------------------------------------- |
| Infinite  | 无穷大                                           |
| -Infinite | 无穷小                                           |
| NaN       | 不是一个数字, 且值与自己本身不想等 `NaN !== NaN` |

### 判断一个值

```js
typeof value === "number"; // 是否是数值类型
Number.isNaN(value); // 是否是 NaN
Number.isFinite(value); // 是否是无限大/无限小的数值
Number.isInteger(value); // 是否是整数
Number.isSafeInteger(value); // 是否是安全整数
```

### 将其他值转数字类型

```js
// 将其他类型的值转数字类型, 如果无法转换就 NaN
Number(value);

// 将以数字符串转数字类型, 如果无法转换就 NaN
Number.parseInt(value);
parseInt(value); // 与全局对象的方法完全一致
console.log(Number.parseInt === parseInt);

// 将以数字字符转数字类型(浮点数), 如果无法转换就 NaN
Number.parseFloat(value);
parseFloat(value); // 与全局对象的方法完全一致
console.log(Number.parseFloat === parseFloat);
```
