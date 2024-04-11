## 什么是异常处理

错误是编程过程的一部分, 编写程序的过程难免会出现一些错误, 当我们知道一些代码可能会出现错误的时候就可以用 `try catch` 来检测

```js
function div(a, b) {
  return a / b;
}

try {
  div(1, 0);
  console.log('没有错误就继续执行后面的代码');
} catch (e) {
  // e 是一个 Error 对象
  console.log('有错误就继续就执行这里的代码', e);
} finally {
  console.log('不管是否有错误, 最后都会执行的代码');
}

// 后面的其他代码
```

## 手动抛出异常

就如同上面那个例子, 调用函数时, 传入了错误的值, 就可以手动抛出异常来提示开发者, 参数有误

```js
function div(a, b) {
  if (b === 0) {
    throw new Error('不能除以 0');
  }
  return a / b;
}

try {
  div(1, 0);
} catch (e) {
  console.log(e.message); // console output: 不能除以0
}
```

## 异常类

1. [Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#syntax): 错误(以下所有错误的基类)
2. [SyntaxError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError): 语法错误
3. [ReferenceError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError): 引用错误
4. [RangeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RangeError): 范围错误
5. [TypeError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError): 类型错误
6. [URIError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/URIError): URL编码解析错误
7. [EvalError](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/EvalError): eval 函数错误(不建议使用: 不好调试, 性能问题, XSS攻击)

```javascript
// SyntaxError
var 1 = 1;
var 2abc = 2;
function 1abc () {}
var 1 = 2 = 3; // SyntaxError: Invalid left-hand side in assignment

// ReferenceError
console.log(asdfasdf); //ReferenceError: asdfasdf is not defined

var a = 1;
console.log(a) = 2; // ReferenceError: Invalid left-hand side in assignment


// RangeError
var arr = new Array(-1); // RangeError: Invalid array length
var num = 66.66;
num.toFixed(-2); //  RangeError: toFixed() digits argument must be between 0 and 100

// TypeError
var undf = undefined;
console.log(undf.name); // TypeError: Cannot read property 'name' of undefined


// URIError
decodeURI("%asdfasdf%") // URI malformed at decodeURI
```
