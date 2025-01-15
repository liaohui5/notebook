## eval

函数会将传入的字符串当做 JavaScript 代码进行执行

```js
eval('var a = 1 + 2;');
console.log(a); // 3
```

## isFinite

判断一个值是否是有限的

```js
console.log(isFinite(Infinity)); // false
console.log(isFinite(-Infinity)); // false
console.log(isFinite(11)); // true
console.log(isFinite(-12)); // true
```

## isNaN

判断一个值是否是 `NaN`

```js
console.log(isNaN(NaN)); // true

// 注意 isNaN 和 Number.isNaN 是不同的函数
// isNaN()会尝试将传入的参数转换为数字, 然后再进行NaN的判断
// Number.isNaN()不会对传入的参数进行类型转换,
// 它要求传入的必须是一个数字类型
// 由此可见, 用 isNaN 判断是不准确的
console.log(isNaN === Number.isNaN); // false
console.log(isNaN('abc')); // true
```

## parseFloat

尝试将一个字符串转为数字(浮点数), 必须以数字开头, 否则 NaN

```js
console.log(parseFloat('1.1')); // 1.1
console.log(parseFloat('1.2.3')); // 1.2
console.log(parseFloat('a1.2.3')); // NaN
console.log(parseFloat('1.2.3a')); // 1.2
```

## parseInt

尝试将一个字符串转为数字(整数), 必须以数字开头, 否则 NaN

```js
console.log(parseInt('1.1')); // 1
console.log(parseInt('11abc')); // 11

// 第二个参数表示, 将字符串当作n进制
parseInt('1010', '2'); // 10
parseInt('1f', '16'); // 32
```

## encodeURI/decodeURI

将字符串以url编码格式编码/解码

```js
const url = 'http://localhost/api/users?name=张三';

const encodedUrl = encodeURI(url); // "http://localhost/api/users?name=%E5%BC%A0%E4%B8%89"

decodeURI(encodedUrl); // "http://localhost/api/users?name=张三"
```

## decodeURIComponent/encodeURIComponent

将字符串以url编码格式编码/解码, 与 encodeURI/decodeURI 不同的是,
这两个函数会编码更多的字符

```js
const url = 'http://localhost/api/users?name=张三';
const encodedUrl = encodeURIComponent(url); // "http%3A%2F%2Flocalhost%2Fapi%2Fusers%3Fname%3D%E5%BC%A0%E4%B8%89"
decodeURIComponent(encodedUrl); // "http://localhost/api/users?name=张三"
```
