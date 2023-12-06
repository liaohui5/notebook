## [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)

## 等于 ==

<span style="color:#f00">不推荐使用</span>
非严格/非约束/抽象相等 Loose Equeality/Abstract Equeality
比较之前肯定要先隐式转换, 转换之后还是用 `===` 来判断, 也就是说 `===`  性能比 `==` 性能更好, 而且 `===` 语法更清晰明确

```javascript
console.log(1 == '1'); // true

console.log(null == undefined); // true, what the fuck this?
```

## 全等(也叫严格相等) ===

严格相等 Strict Equality, 不仅值要相同, 数据类型也要相同

```javascript
console.log(1 === '1'); // false
console.log(null === undefined); // false
```

## 同值相等 `-0 !== +0  NaN===NaN`

同值相等: same-value
底层实现原理就是用 `Object.is` 这个方法来做的, 但是 `Object.is` 是 es6 才有的方法, es5 并没有这个方法

```javascript
var obj = {};

Object.defineProperty(obj, 'zero', {
  value: -0,
  writable: false,
  configurable: false,
});

// 报错: Uncaught TypeError: Cannot redefine property: zero
Object.defineProperty(obj, 'zero', {
  value: +0,
});

// 没有报错: 这就证明 -0 !== +0, +0就是0
Object.defineProperty(obj, 'zero', {
  value: -0,
});

// ======================= //

Object.defineProperty(obj, 'NotaNumber', {
  value: NaN,
  writable: false,
  configurable: false,
});

// 没有报错: 证明 NaN === NaN
Object.defineProperty(obj, 'NotaNumber', {
  value: NaN,
  writable: false,
  configurable: false,
});
```

## 零值相等 -0 === +0

零值相等: same-value-zero
零值相等和同值相等的区别就是: 零值相等模式下 `-0 === +0`

## Object.is

用来比较是否同值相等
和全等 `===` 的判断区别就是 `0 -0` `NaN NaN` 的判断

```javascript
console.log(Object.is(0, -0)); // false: 进入if{}
console.log(Object.is(NaN, NaN)); // true: 进入else{}
```

## Object.is 源码实现

```javascript
Object.$is = function (x, y) {
  if (x === y) {
    // 判断 0 和 -0:
    // x === 0 才会执行||后面的代码:
    // 也就是 1/0 === 1/0 => Infinity === Infinity => true
    // 或者是 1/0 === 1/-0 => Infinity === -Infinity => false
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // 处理 NaN 和 NaN
    return x !== x && y !== y;
  }
};
```
