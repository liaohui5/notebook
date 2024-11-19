
## 错误信息

1. [Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error#syntax): 错误(以下所有错误的父类)
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

## 手动抛出错误

```javascript
/**
 * 格式化时间
 * @param {Date} date
 * @returns
 */
function formatByDate(date) {
  if (Object.prototype.toString.call(date) !== "[object Date]") {
    throw new TypeError("The parameter must be instance of Date");
  }
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  return y + "-" + m + "-" + d;
}

formatByDate('hello');
// TypeError: The parameter must be instance of Date at formatByDate

```

## 异常处理

```javascript

try {
 // 可能会出报错的代码(可能会抛出 Error)
} catch(e) {
 // 如果出现了错误, 就会执行这里代码
} finally{
 // 如论是否出错, 都会执行执行
}

// 后面的代码也会执行(相当于写在 finally 中)

```

## ECMAScript 历史

1. 1.0版本: 1997
2. 2.0版本: 1998
3. 3.0版本: 1999 -> `javascript 通行标准`
4. 4.0版本(草案): 2007(草案没有通过, 有些很激进的更新)
5. 3.1版本: 2008 -> 也叫(ECMAScript 5) -> 此时并没有发布, 只是草案通过了协商
6. 5.0版本: 2009 -> ECMAScript 5 正式发布
7. 5.1版本: 2011 -> ECMAScript 5.1 发布, 成为 ISO 国际标准
8. 6.0版本: 2013 发布ES6草案
9. 6.0版本: 2015 正式发布ES6 ->所以也叫(ECMAScript 2015)

## ES5 严格模式

> 随着 ECMAScript 版本的更新迭代, 有些语法/函数不再推荐使用, 为了向下兼容, 默认不开启严格模式, 如果开启严格模式, es3的有些语法就会报错, 比如 with
>

<font style="color:#F5222D;">IE9 及其以下版本的IE浏览器不支持严格模式</font><font style="color:#F5222D;"></font>

> 开启严格模式
>

是否应该开启严格模式? 开启严格模式有怎样的策略?

1. 在写代码的过程中, 应该开启严格模式! 因为可以减少各种奇怪的bug,代码可读性好
2. 不要在全局开启严格模式, 因为别人的代码可能用到了非严格模式下才能用的语法, 建议在方法的内容开启严格模式!

```javascript
// 整个脚本开启严格模式
'use strict';


(function(){
  // 当前这个函数开启严格模式
 'use strict';
})();

```

## 严格模式不可以使用的语法/属性

1. with 不能用
2. caller/callee 不能用
3. 暗示全局变量是不可以的, 必须用 var 来声明
4. 在函数中, 如果没有实例化, `this` 指向 `undefined`  而不是 `window`
5. 在使用 `call(obj)` 的时候: 如果 `obj =1` 普通模式下, 会自动装箱, 严格模式不会自动装箱
6. 函数的形参数不能重复, `非严格模式` 是可以重复的 `function test(a, a){}`
7. 对象的key不能重复, `非严格模式是可以的` `{ a:1, a:2 }`
8. 不能直接删除变量 `delete user`, 只能删除属性 `delete user['prop']`
9. `eval` 函数有独立的作用域, 但是非严格模式是没有的, 具体请查看下面代码

```javascript
'use strict';
eval('var a = "hello world"');
console.info(a); // ReferenceError: a is not defined

// 关闭严格模式
eval('var a = "hello world"');
console.info(a); // hello world

```
