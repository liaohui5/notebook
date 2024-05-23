## 什么是预编译

就是代码在执行之前, 先检查一下, 代码是否有语法错误, 初始化作用域, 变量提升, 函数提升, 等操作, 这个过程就称之为预编译

> js代码被js引擎执行的过程

1. 预编译(检查语法错误, 变量提升, 初始化作用域)
2. 解释代码, 执行代码(解释一行就执行一行)

### 预编译现象

```javascript{2}
console.log("111");
console.log("222"]; // 这行的 ] 打错了
console.log("333");
```

以上代码是不会执行的, js 执行引擎在预编译过程就检测到了语法错误, 所以代码是不会执行的,无论是错误执行之前还是之后,都不执行

## 变量提升, 函数提升

1. 所谓变量提升, 就是通过 `var` 关键字声明的变量, 或者 `function` 声明的函数( `函数提升` ), 在代码预编译过程就被自动放到, `变量所在作用域` 的最前面去声明, `具体实例请查看下面代码: 1.变量提升现象`
2. 变量赋值是没有 `变量提升`现象的 `具体实例请查看下面代码: 2.函数提升现象`
3. 函数提升是把声明的函数整个提升, 而变量提升只是把声明放到最前面, 但是赋值还是在代码执行过程去赋值 `具体实例请查看下面代码: 3.变量赋值不会提升现象`

```javascript
// 1. 变量提升现象
console.log(a); // undefined
var a = 10;
console.log(a); // 10

// 2. 函数提升现象, 可以在函数声明之前, 直接调用
test(); // test
function test() {
  console.log('test');
}

// 3.变量赋值不会提升的现象, var test = function 是一个赋值语句
console.log(typeof test2); // undefined
var test2 = function () {
  console.info('test');
};

console.log(typeof test2); // function
```

### 以上代码预编译过程

1. 检测语法错误
2. 变量提升, 函数提升
   1. `var a = undefined`
   2. `var test2 = undefined`
   3. `function test() {}`

### 以上代码执行过程

1.  `console.log(a);`  所以此时获取到的值是: `undefined`
2.  `a = 10` 此时才给变量 a 赋值
3.  `console.log(a);` 所以此时获取到的a是: `10`
4.  `test();`  因为在预解析阶段已经函数提升了, 所以可以在声明函数的代码之前调用函数
    1.  `console.log(typeof test2);` 变量赋值并不会出现 `函数提升` 的现象, 所以此时是 `undefined`
    2.  `test2 = function {}` 此时才给 `test` 赋值
    3.  `console.log(typeof test2);` 因为已经赋值了, 所以此时是 `function`

## 暗示全局变量 imply global variable

没有用 `var` 声明的变量, 而是直接赋值, 默认会放到全局对象 `window`  上

```javascript
function test() {
  var userid = 101;
  username = 'tom';
}

test();

console.log(window.username); // tom
console.log(window.userid); // undefined
```

## 函数上下文 activation object

虽然我们看不到, 但是可以确定的是: `函数在预编译过程, 就会初始化活跃对象也叫``函数上下文 context`

### 函数上下文的初始化过程

1. 寻找形参, 并且将实参赋值给对应形参
2. 变量提升,函数提升
3. 执行

```javascript
function test(a) {
  console.info(typeof a); // function
  var a = 1;
  function a() {}
  console.info(typeof a); // number
  var b = function () {};
  console.info(typeof b); // function
}

test(5);
```

### 以上代码在预编译过程

1. `function test(a) {}`
   1. `a = 5` 寻找形参,将实参的值赋值给形参
   2. `var a = undefined;` 变量提升
   3. `var b = undefined ` 变量提升
   4. `function a(){}`  函数提升

### 以上代码在执行过程

1. `test(5)`
   1. `console.info(typeof a)` 此时的 a 是 `function`
   2. `a=1` 此时 a 是 `number`
   3. `console.info(typeof a);`  此时 a 是 `number`
   4. `b = function () {}` 给b赋值
   5. `console.info(typeof b);` 此时的b是 `function`

## 全局上下文 global object

注意: 全局上下文在浏览器环境下是: `window` , 但是在 node.js 环境下, 全局变量是 `global`

其实, 全局上下文和函数上下文初始化的过程非常相似, 可以将全局上下问看做 没有寻找形参, 并且将实参赋值给对应形参, 那一个步骤的特殊 `"函数上下文"`

### 全局上下文初始化过程

1. 变量提升 + 函数提升
2. 执行

```javascript
console.log(typeof a); // function
var a = 1;
function a() {}
console.log(a); // 1
```

### 以上代码在预编译过程

1. `var a = undefined;` 变量提升
2. `function a(){}` 函数提升, 此时的 a 的值是 `function a(){}`

### 以上代码在执行过程

1. `console.log(typeof a);` 此时的 a 的值是 `function a(){}`
2. `a = 1` 给变量a赋值
3. `console.log(a);` 此时 a 的值是 `1`

## 练习1

```javascript
var b = 3;
var c = 7;
console.log(typeof a); // function
function a(a) {
  console.log(typeof a); //function
  var a = 2;
  console.log(a); // 2
  function a() {}
  var b = 5;
  console.log(b); // 5
  console.log(c); // 7
}

a(1);
```

### 以上代码预编译阶段

1. `var b = undefind;` 变量提升
2. `var c = undefined;` 变量提升
3. `function a(){}` 函数提升
   1. `a = 1;` 寻找形参,将实参的值赋值给形参
   2. `var a = undefind;` 变量提升
   3. `var b = undefind;` 变量提升
   4. `function a (){}` 函数提升

### 以上代码执行阶段

1. `b = 3;` 给变量b赋值
2. `c = 7;` 给变量c赋值
3. `console.log(typeof a);` 此时的a是 `function`
4. `a()` 执行函数a
   1. `console.log(a);` 此时的a是 `function`
   2. `a = 2;` 给变量a赋值
   3. `console.log(a);` 此时的a是 `2`
   4. `b = 2;` 给变量b赋值
   5. `console.log(b);` 此时的b是 `2`
   6. `console.log(c);` 此时的c是 `7`

## 练习2

```javascript
a = 1; // 这只是个赋值语句, 并没有用 var声明, 所以不会变量提升
function test() {
  console.info(a); // 此时这个a获取的是test函数内部的a, 第6行, undefined
  a = 2;
  console.info(a); // 2
  var a = 3;
  console.info(a); // 3
}

console.log(a); // 1
test();
console.log(a); // 1
```

### 以上代码预编译阶段

1. `function test(){}` 函数提升
   1. `var a = undefined;` 变量提升

### 以上代码执行过程

1. `a = 1;` 给变量a赋值
2. `console.log(a);` 此时a的值是 `1`
3. `test();` 执行test函数
   1. `console.info(a);` 此时函数内部的a的值是 `undefind`
   2. `a = 2;` 给变量a赋值
   3. `console.info(a);` 此时a的值是 `2`
   4. `a = 3;` 给变量a赋值
   5. `console.info(a);` 此时a的值是 `3`
4. `console.log(a);` 此时a的值是1, 因为无论函数内部的变量怎么变, 都和外面的这个 a 没有关系

## 练习3

```javascript
function test() {
  console.log(b); // undefined
  if (a) {
    var b = 2; // 判断是执行阶段才会执行, 所以 var b 会变量提升(预编译阶段)
  }
  c = 3;
  console.log(c); // 3
}

var a;
test();
a = 1;
console.log(a); // 1
```

### 以上代码预编译过程

1. `var a = undefined;` 变量提升
2. `function test(){}` 函数提升
   1. `var b = undefined;` 函数中, 变量提升

### 以上代码执行过程

1. `console.log(b);` 此时b的值是 `undefined`
2. `if (a) { var b = 2 }` 此时a的值是 `undefined` 所以b不会被赋值
3. `c = 3` 暗示全局变量 `window.c = 3`
4. `console.log(c);` 此时c的值是 `c`
5. `a = 1;` 给变量a赋值
6. `console.log(a);` 此时a的值是 1

## 练习4

```javascript
function test() {
  return a;
  a = 1;
  function a() {}
  var a = 2;
}

console.log(test()); // function a() {}
```

### 以上代码预编译过程

1. `function test(){}` 函数提升
   1. `var a = undefined;` 变量提升
   2. `function a(){}` 函数提升, 此时, test函数内a的值为 `function a(){}`

### 以上代码执行过程

1. `console.log(test());`
   1. `return a;`  此时的a是test函数内部的 `function a(){}`

## 练习5

```javascript
function test() {
  a = 1;
  function a() {}
  var a = 2;
  return a;
}

console.log(test()); // 2
```

### 以上代码预编译过程

1. `function test() {}` 函数提升
   1. `var a = undefined;` 变量提升
   2. `function a(){}` 函数提升, 所以此时test内部变量a的值为 `function a(){}`

### 以上代码执行过程

1. `console.log(test())`
   1. `a = 1;` 暗示全局变量
   2. `a = 2;` 给函数内部的变量a赋值, 所以此时test内部变量a的值为 `2`
   3. 所以console.log打印出 `2`

## 练习6

```javascript
a = 1;
function test(e) {
  function e() {}
  arguments[0] = 2;
  console.log(e); // 2
  if (a) {
    var b = 3;
  }
  var c;
  a = 4;
  var a;
  console.log(b); // undefined
}

var a;
test(1);
console.log(a); // 4;
```

### 上面代码预编译过程

1. `var a = undefined;` 变量提升
2. `function test(){}` 函数提升
   1. `e = 1;` 寻找形参, 并且将实参赋值给对应形参
   2. `var b = undefined;` 变量提升
   3. `var c = undefined;` 变量提升
   4. `var a = undefined` 变量提升
   5. `function e(){}` 函数提升, 所以此时e的值是 `function() {}`

### 上面代码指定指定阶段

1. `a = 1;` 给变量a赋值
2. `test(1);` 调用 test 函数
   1. `arguments[0] = 2;` 修改实参的值为 2, `argument[0]`的值, 代表的就是形参 `e` 的值
   2. `console.log(e);` 此时的 e 是 `2`
   3. `if (a) {b = 3}` 此时a的值是 `undefined` 所以, `b=3` 不会被执行
   4. `a = 4;` 给test函数内部变量a赋值
   5. `console.log(b);` 此时, b的值是 `undefined`

## 练习7

Q: 以下代码会在控制台打印什么
A: 会打印 `通过了`

```javascript
if (typeof a && -true + +undefined + '') {
  console.log('通过了');
} else {
  console.log('不通过');
}
```

解题思路: 虽然看起来很复杂, 其实只要看每一个判断条件都隐式转换后的值就能知道结果了

1. `typeof(a)` -> `'undefined'`
2. `(-true) + (+undefined) + ''`  -> `-1 + NaN + '' `  -> `'NaN'`
3. `'undefined' && 'NaN'` -> true

## 练习8

Q: 以下代码会在控制台打印什么
A: 会打印 `通过了`

```javascript
if (1 + 5 * '3' === 16) {
  console.log('通过了');
} else {
  console.log('不通过');
}
```

解题思路: 和数学中的计算一样, 会先计算乘法(计算的时候会 `隐式类型转换` ), 然后在计算加法

## 练习9

Q: 以下代码会在控制台打印什么
A: 会打印 `1`

```javascript
var res = !!' ' + !!'' - !!false || '通过了';
console.log(res); // 1
```

解题思路:

1. 因为 `||` 运算符的优先级是最低的, 所以只要知道 `||` 左边的值 `true` 还是 `false` 是多少就知道打印什么了
2. `!!' '` -> true: `两个!!的作用抵消了`
3. `!!''` -> false `两个!!的作用抵消了`
4. `-!!false` -> `-false`(-运算符隐式转换成Number类型) -> `0`
5. `true + false - 0` -> `1 + 0 - 0` -> `1`
6. `1 || '通过了'`  -> `1`

[运算符优先级参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)
