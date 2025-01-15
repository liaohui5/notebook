## 布尔值

与大多数编程语言一样, bool 只有两个值: `true` 和 `false`

而 [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean) 是布尔值的包装器类
它与布尔值的关系是类与实例的关系

## 用法1: 将实例转对象

```js
const b1 = new Boolean(true); // 对象
const b2 = true; // 值

console.log(b1.toString()); // string, "false"
console.log(b1.valueOf()); // false
console.log(b1 === b2); // false
```

## 用法2: 将其他值强行转布尔值

```js
const values = [
  // falsy
  NaN,
  0,
  '',
  false,
  null,
  undefined,

  // all other value is truthy
  '0',
  'false',
  {},
  []
];

const bool_values = values.map(Boolean);

console.log(bool_values);
```
