

## JS 变量

1. 声明关键字使用关键字 `var`(es6 还可以用: `let` `const`)
2. 声明变量(声明变量的本质就是在内存中开辟一个可以存储数据的空间)

```javascript
// 声明变量
var num;

// 赋值
num = 10;

// 声明变量 & 赋值
var num = 10;
```

### 变量命名规范

1. 不能使用关键字和保留字
2. 不能以数字开头, 只能以 英文,$和\_开头
3. 单词分割, 使用小驼峰(推荐),或者下划线
4. 命名必须有 `意义`, 不能 `a, b, c` 这样的单个字母的变量名
5. 语法规范: 以分号结尾(虽然不写也可以, 但是建议写分号)

```javascript
var name = 'tom';
var $name = 'jerry';
var _name = 'jack';
var userId = 1001; // 小驼峰: 第一个单词小写, 后面所有单词首字母大写
var userId = 101, // 一次声明多个变量
  userName = 'hack',
  userAddress = 'secret';
```

## 基本类型和引用类型

### 基本类型(数据存在栈中, 变量保存的是值)

1. Number: `数字型`

```javascript
var num = 10;
var num = 11.12;
var num = NaN; // Not a Number
var num = Infinity;
```

2. String: `字符串`

```javascript
var str = 'xxx';
```

3. Boolean: `真 or 假`

```javascript
var flag = true;
var flag = false;
```

4. null: `一般用于占位或者手动释放内存`

```javascript
var obj = null;
```

5. undefined: `未定义`

```javascript
var undf; // 意思相等于 => var undf = undefined;
```

### 引用类型(数据存在堆中, 变量保存的是堆区的内存地址)

1. Array: `数组: 存放多个数据`

```javascript
var arr = ['a', 10, 'b'];
```

2. Object: `对象: 存放多个数据或者行为`

```javascript
// 可以先了解, 后面详细讲
var obj = {
  id: 1001,
  name: 'tom',
  sayHello() {
    console.log('my name is: ' + this.name);
  },
};
```

### 基本类型和引用类型的内存模型

```javascript
var num = 10;
var str = 'abc';
var obj = {
  id: 1001,
  name: 'tom',
  sayHello() {
    console.log('my name is: ' + this.name);
  },
};

var obj2 = obj;
// 此时并不是将obj这个变量的值,复制一份给obj2
// 而是将obj的内存地址复制给obj2, 也就是说, 我改变 obj2的值的内容,
// obj的值的内容也会变

obj2.id = 1002;
console.log(obj.id); // 1002
```

![](https://cdn.nlark.com/yuque/0/2021/png/380797/1624859243149-ecebfc7a-ec5b-406a-b9e4-c7e9fe3b5b12.png#height=768&id=nOt3W&originHeight=768&originWidth=938&originalType=binary&ratio=1&rotation=0&showTitle=false&size=0&status=done&style=none&title=&width=938)

## JavaScript 运算符

### 数学运算 `+` `-` `*` `/` `%`

```javascript
var result = 10 + 5; // 加法: 10+5
var result = 10 - 5; // 减法: 10-5
var result = 10 * 2; // 乘法: 10x2
var result = 10 / 2; // 除法: 10/2
var result = 10 % 2; // 取余: 10%2
var result = (10 + 2) / 2; // 小括号可以提高计算优先级(12 / 2)
// 1. 声明变量
// 2. 计算结果
// 3. 将结果赋值给变量
```

> 小案例: 交换两个变量的值, 不能声明新的变量

```javascript
var a = 1;
var b = 2;
a = a + b; // 1+2=3
b = a - b; // 3-2=1
a = a - b; // 3-1=2
```

### 拼接字符串

> 任何类型拼接字符串结果都是字符串

```javascript
var str = 'tom';
var str2 = ' & jerry';
var result = str + str2; // "tom & jerry"
var result = 'str' + 1; // str1
var result = 'str' + null; // strnull
var result = 'str' + undefined; // strundefined
```

### 递增, 递减

```javascript
var a = 1;
console.log(a++); // 1: 先赋值, 后运算
console.log(++a); // 2: 先运算, 后赋值
console.log(a--); // 1
console.log(--a); // 0
```

### 比较运算符(返回 bool 值)

1. 大于 `>`
2. 大于等于 `>=`
3. 小于 `<`
4. 小于等于 `<=`
5. 等于 `==`
6. 全等于 `===`
7. 不等于 `!=`
8. 不全等 `!==`

```javascript
// number 和 number 比较
var bool = 10 > 5; // true

// number 和 string 比较, string 先自动转 number 然后比较得出结果
var bool = 1 > '2'; // false

// 单个, string 和 string 比较, 先找string的ASCII码对应的值(10进制), 然后比较
var bool = 'a' > 'b'; // false ASCII(a:65 b:66)

// 多个, string 和 string 比较, 找ASCII对应的值, 然后一位一位的比较, 知道比较出结果为止
// 第一次比较: 1(ACSII: 49)      1:(ACSII: 49)
// 第二次比较: .(ACSII: 46)      1:(ACSII: 49)
var bool = '1.5' > '11'; // false

// 第一次比较: 4(ACSII: 52)      1:(ACSII: 49)
var bool = '4.5' > '11'; // true;

// 相等, 不会比较数据类型
var bool = 10 == '10'; // true

// 全等(推荐使用), 不仅值要相等, 数据类型也要相同
var bool = 10 === '10'; // false

// 不等, 不会比较数据类型
var bool = 10 != '10'; // 因为10=10所以: false

//  全等(推荐使用), 不仅值要相等, 数据类型也要相同
var bool = 10 !== '10'; // true

// NaN 与任何东西都不相等(包括自己)
var bool = NaN == NaN; // false
```

> ASCII 字符表

[ASCII 字符表](https://raw.githubusercontent.com/liaohui5/images/main/images/20210626171932.png)

### 逻辑运算符

1. && 并且: 两边的条件都必须为真, 整个表达式才为真
2. || 或者: 两边的条件有一个位真, 整个表达式就为真
3. ! 非: 取反, 如果表达式真, 则结果为假, 反之, 亦然

### 特殊运算符 `,` 

返回最后一个值

```javascript
var num = (1, 2, 3, 4);
console.log(num); // 4
```

> 小练习

Q: 控制台会打印什么
A: 打印 `2`

```javascript
var fn = (function test1() {
  return 1;
},
function test2() {
  return 2;
})();

// 1. 逗号运算符返回, test2函数
// 2. 立即执行, return 2 => fn = 2
// 4. console.log(fn)

console.log(fn); // 2
```

> js 中为假的值有以下几个

`false`  `0`  `null`  `undefined`  `NaN`  `""`

> 逻辑运算, 用在复制运算符中

1. `&&` 左边两边的值都为真就往后判断, 如果右边的值为假, 则直接返回左边的值

```javascript
var num = 1 && 2 && null && 3; // 2
// 第一次: 1 && 2 // 两边都为真
// 第二次: 2 && null // 右边为假 -> 2
```

2. `||` 如果左边的值为假就往后判断, 如果左边的值为真, 则直接返回左边的值

```javascript
var num = null || false || 3 || 0; // 3
// 第一次: null || false  // 左边为假
// 第二次: false || 3     // 左边为假
// 第三次: 3 || null      // 左边为真
```

3. `!` 取反

```javascript
var bool = !1; // false
var bool = !0; // true
var bool = !!0; // false
```

## 流程控制

### 分支结构

> 用于程序的判断, 是程序的灵魂

#### 三元运算符

```javascript
// 可以将三元运算符看做if/else的语法糖
var count = 10;
var bool = count > 10 ? true : false;

// -> 转换成if/else

var count = 10;
var bool;
if (count > 10) {
  bool = true;
} else {
  bool = false;
}
```

#### 分支结构 - if/elseif

```javascript
/*
if (条件1为真) {
  // 条件1为真: 执行这里的代码
} else if(条件2为真) {
  // 条件2为真: 执行这里的代码
} else {
  // 条件1,2都不为真: 执行这里的代码
}
*/
var score = 63;
if (score >= 90 && score <= 100) {
  console.log('A');
} else if (score >= 80 && score > 90) {
  console.log('B');
} else if (score >= 60 && score > 70) {
  console.log('C');
} else if (score < 60 && score >= 0) {
  console.log('不合格');
} else {
  console.log('成绩有误');
}
```

#### 分支结构 - switch

```javascript
const city = window.propmt('请输入你所在的城市查看邮政编码');
switch (city) {
  case '北京':
    console.log('100000');
    break;
  case '上海':
    console.log('200000');
    break;
  case '深圳':
    console.log('518000');
    break;
  default:
    console.log('unknow');
}
```

#### 什么时候用 if 什么时候用 switch

1. 当值是确定的几个值的时候用 `switch`, 比如星期(1-7)
2. 单有多个条件或者值是范围值的时候用 `if`

### 循环结构

#### 循环结构 - while

```javascript
/*
所谓循环, 就是根据条件, 重复的执行一段代码, 执行一次就判断一次条件
条件满足就继续执行, 不满足就结束循环
while (判断条件) {
  // 被重复执行的代码
}

// 1. 声明变量, i=0
// 2. 判断条件, i是否小于10, 此时 i=0, 0小于10, 所以执行: "被重复执行的代码"
// 3. i++
// 4.判断条件, i是否小于10, 此时i++以后是1, 1小于, 所以执行: "被重复执行的代码"
// .....执行一次"被重复执行的代码", 就要判断条件, 如果不满足条件, 就结束循环
*/

var i = 0;
while (i < 10) {
  console.log(1);
  i++;
}
```

#### 循环结构 - for

```javascript
/*
for 循环和 while 一样, 都是根据判断条件, 重复的执行一段代码, 执行一次就判断一次条件
只不过写法上有些变动, 本质上的原理是一样的

for (声明变量; 判断条件; 变量改变) {
  // 重复执行的代码
}
*/

for (var i = 0; i < 10; i++) {
  console.log('当前值: ' + i);
}
```

#### 跳过单次循环 - continue

循环中, 遇到 `continue` 语句就跳过本次循环

```javascript
var i = 0;
while (i <= 10) {
  i++;
  if (i === 5) {
    console.log('i == 5 的时候, 执行到这里了..');
    continue;
  }
  console.log(i);
}

/*
第1次执行: i++后等于1, 此时i不等于5, 条件为假, 不会进入if语句
第2次执行: i++后等于2, 此时i不等于5, 条件为假, 不会进入if语句
第3次执行: i++后等于3, 此时i不等于5, 条件为假, 不会进入if语句
第4次执行: i++后等于4, 此时i不等于5, 条件为假, 不会进入if语句
第5次执行: i++后等于5, 此时i等于5, 条件为真, 所以会进入if语句, console.log 输出完之后, 遇到continue, 直接跳过了本次循环, 所以此次不会执行continue后面的语句
第6次执行: i++后等于6, 此时i不等于5, 条件为假, 不会进入if语句
... 直到整个循环结束
*/

for (var i = 0; i < 10; i++) {
  if (i === 6) {
    console.log('执行到这里了');
    continue;
  }
  console.log(i);
}

/*
第1次执行: i=0, 此时i不等于6, 条件为假, 不会进入if语句
第2次执行: i=1, 此时i不等于6, 条件为假, 不会进入if语句
第3次执行: i=2, 此时i不等于6, 条件为假, 不会进入if语句
第4次执行: i=3, 此时i不等于6, 条件为假, 不会进入if语句
第5次执行: i=4, 此时i不等于6, 条件为假, 不会进入if语句
第6次执行: i=5, 此时i不等于6, 条件为假, 不会进入if语句
第7次执行: i=6, 此时i等于6, 条件为真, 所以会进入if语句, console.log 输出完之后, 遇到continue, 直接跳过了本次循环, 所以此次不会执行continue后面的语句
第8次执行: i=7, 此时i不等于6, 条件为假, 不会进入if语句
第9次执行: i=8, 此时i不等于6, 条件为假, 不会进入if语句
第10次执行: i=9, 此时i不等于6, 条件为假, 不会进入if语句
第11次执行: i=10, 此时i不小于10, 所以循环 {} 中的语句都不会执行,循环结束
*/
```

#### 结束整个循环 - break

循环中, 遇到 `break` 语句就结束循环, 不管条件是否为真, 直接结束

```javascript
var i = 0;
while (i <= 10) {
  i++;
  if (i === 3) {
    console.log('结束');
    break;
  }
  console.log(i);
}

/*
第1次执行: i=1, 此时i不等于3, 所以不会进入if语句
第2次执行: i=2, 此时i不等于2, 所以不会进入if语句
第3次执行: i=3, 此时i等于3, 所以会进入if语句, 执行完 console.log("结束"); 遇到了 break 语句, 此时,直接结束循环
*/

for (var i = 0; i < 10; i++) {
  if (i === 2) {
    console.log('循环被结束了');
    break;
  }
  console.log(i);
}

/*
第1次执行: i=0, 此时i不等于2, 所以不会进入if语句
第2次执行: i=1, 此时i不等于2, 所以不会进入if语句
第3次执行: i=2, 此时i等于2, 所以会进入if语句, 执行完 console.log("循环被结束了"); 遇到了 break 语句, 此时,直接结束循环
*/
```

#### 练习题

> 打印 1-100 的数字, 要求用 `for` 循环打印 1-100 的数字,
> 并且() 只能有一句, 不能写比较表达式, {} 不能出现 i--, i++

解题思路: 不能在 `{}` 中改变条件, 那就在 `()` 改变条件,然后让他自己结束循环

```javascript
var i = 101;
for (; i--; ) {
  // 当 i 的值是 0 的循环会停止, 因为 0 是 false
  console.log(i);
}
```

> 计算某个数字的 n 次方

```javascript
// 计算 5 的, 3 次方
var num = 5; // 计算的数值
var sum = 1; // 初始值1: 1 * num
var power = 3; // 循环次数
for (var i = 0; i < power; i++) {
  sum *= num;
}
console.log(sum); // 125
```

> 计算某个数字的乘阶

```javascript
var n = 5;
var sum = 0;
for (var i = 0; i < n; i++) {
  sum = n * i;
}
console.log(sum); // 20
```

> 获取 1- 100 以内的所有质数

```javascript
var count = 0;
const primeArray = [];
for (var i = 2; i < 100; i++) {
  for (var j = 1; j <= i; j++) {
    if (i % j === 0) {
      count++; // 被整除的次数, 如果只有2次, 肯定是质数
    }
  }
  count === 2 && primeArray.push(i);
  count = 0; // 获取完数字后, 清空计数器, 需要重置计数器
}
console.info(primeArray);
```

> 黄金分隔数列

```javascript
// 黄金分割数列
// 1 1 2 3 5 8 13 21 ...
var c = 5;
var n1 = 1;
var n2 = 1;
var n3;
for (var i = 2; i < c; i++) {
  n3 = n1 + n2;
  n2 = n3;
  n1 = n2;
}
console.info(n3);
```

## 数据类型及转换

### 数据类型

JavaScript 中总共有8种数据类型

- boolean
- null
- undefined
- number
- string
- bigInt
- symbol
- object

### typeof 方法

> 可以获取传入值的类型字符串

```javascript
typeof 123; // number
typeof boolean; // boolean
typeof 'hello'; // string
typeof undefined; // undefined
typeof null; // object
typeof window.alert; // function
```

> 可以获取到的类型

1. string
2. number
3. boolean
4. undefined
5. object
6. function

> 为什么 typeof(null) 是 object?

历史遗留问题, js 这个语言设计的 bug

### 显示类型转换

#### Number

1. Number 处理字符串: 只有是纯数字的字符串才能转成 number 类型, 否则转换成 NaN
2. Number 处理布尔值: true:1, false:0
3. Number 处理 null: 0
4. Number 处理 undefined: NaN
5. Number 处理非数字开头的字符串: NaN

```javascript
Number(null); // 0
Number(undefined); // NaN
Number(true); // 1
Number(false); // 0
Number('3.15'); // 3.15
Number('1st'); // NaN
Number('st1'); // NaN
```

#### parseInt

1. parseInt 处理字符串: 只有是以数字开头的才转 number 类型, 如果是小数, 则直接舍弃小数取整
2. parseInt 处理布尔值: NaN
3. parseInt 处理 null: NaN
4. parseInt 处理 undefined: NaN
5. parseInt 处理非数字开头的字符串: NaN

> parseInt 处理字符串: 只有`以数字开头的字符串才能转number`, 如果小数`"1.56"`会直接舍弃小数点后面的数字 `1`

```javascript
parseInt(null); // NaN
parseInt(undefined); // NaN
parseInt(true); // NaN
parseInt(false); // NaN
parseInt('3.15'); // 3
parseInt('1st'); // 1
parseInt('st1'); // NaN
```

#### parseInt 使用注意点

[在线测试进制转换的工具](https://tool.oschina.net/hexconvert)

> parseInt(string, radix): 解析一个字符串, 并且返回一个十进制整数或者NaN
> string: 要被转换的字符串
> radix: 指定字符串的进制数(比如16进制的字符串), 而不是转换成几进制, 取值范围: 2-36 (整数)
> 注: 如果字符串不符合 radix 指定的进制, 则会忽略不符合额数字
> radix默认值的问题: 如果是 0x 开头的是字符串是16进制, 否则就是10进制

```javascript
var str = '123ABC';

console.log(parseInt(str)); // 所以结果是: 123
console.log(parseInt(str, 16)); // 16进制, 结果是: 1194684

console.log(parseInt('1234', 2)); // 二进制没有234, 会从2开始后面的全部忽略, 所以是: 1
```

#### parseFloat

1. 如果数字开头则可以转, 非数字开头就不能转(NaN)
2. 将字符串转小数

```javascript
parseFloat('3ab'); // 3
parseFloat('3.14'); // 3.14
```

#### toFixed

1. [文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) toFixed 可以用来, 保留指定个数的小数位, 但是, 他会将 number 类型的值转字符串

```javascript
const num = 3.1415926;
num.toFixed(2); // "3.14"
num.toFixed(3); // "3.141"

// 注意: 这个方法会四舍五入
const num2 = 3.666;
num.toFixed(2); // "3.67"
```

#### String/toString

2. null/undefined 是没有 toString 方法的
3. toString 方法在类型转换的区别
   1. 都可以转换类型
   2. toString: 是调用对象上的方法(如果是基本类型, 则调用的是其对应包装类原型对象上的toString方法)
   3. String: 是利用内置的包装类强行类型转换成string类型的值

```javascript
var bool = false;
bool.toString(); // 调用的是:  Boolean.prototype.toString
```

### 隐式类型转换

> 什么叫隐式类型转换?

简单而言就是在代码执行过程中, 程序会根据代码自动将变量的数据类型进行转换的现象

#### 数字和字符串互转

```javascript
var num = 10;
num = num + '10'; // num -> string
num = num++; // num -> number
```

#### 比较运算符

1. 特别注意: 只有 `===` 和 `!==` 是不会自动转类型

```javascript
console.log(4 > '3'); // true
console.log(3 == '3'); // true
console.log(5 > 1 > 3); // (5>1 => true -> 1 > 3) => false
console.log(undefined == 0); // false
console.log(null == 0); // false
console.log(undefined == null); // true
console.log(undefined === null); // false
```

#### 正负运算符(`+` `-`)

```javascript
var num = '10';
num = -num;
console.log(num); // number

var num2 = 'abc';
num = -num;
console.log(num); // NaN
```

#### 特殊函数隐藏转换

```javascript
console.log(isNaN('a')); // true
console.log(isNaN(undefined)); // true
console.log(isNaN(null)); // false: 因为先将 null 转 number 类型, 然后再判断是否是NaN

// 大体实现如下: Number(null) => 0
function $isNaN(num) {
  num = Number(num);
  num += ''; // -> string
  return 'NaN' === num;
}
```

## 函数

> 为什么要使用函数?

函数式一段特定功能代码的封装, 符合程序设计 高内聚, 低耦合 的设计原则
使用函数可以让代码变得更加易维护

### 定义函数

1. 使用关键字 `function`, 函数名, 明明规则和变量命名规则一样
2. 使用匿名函数表达式赋值的方式

```javascript
/*
function 函数名(参数) {
  // 函数体
}
*/
function test() {
  console.log(1);
}

const test2 = function () {
  console.log(1);
};
```

### 调用函数

1. `函数名(参数)`
2. es6特殊的调用方式: test`, 用 函数名加 `的方式来调用

```javascript
function test() {
  console.log(1);
}

test();

test``; // es6 的特殊调用方式, react styled-component 就是利用这个原理
```

### 参数

1. 形参: 函数在定义时, 写在括号中的参数
2. 实参: 函数在定义时, 写在括号中的参数
3. 形参和实参顺序是一一对应的, 但是形参和实参数量可以不等
4. 如果形参定义了, 但是没有传实参, 就会 `undefined`

```javascript
// 形参: a, b
function sum(a, b) {
  console.log(a, b);
}

sum(10, 20); // a:10  b:20
sum(10, 15, 20); // a:10 b:20
sum(10); // a:10 b:undefined
```

获取形参个数和实参个数

```javascript
function sum(a, b) {
  console.log(sum.length); // 形参长度
  console.log(arguments.length); // 实参长度
}
```

_关于 arguments 的详细笔记, 请查看后面的 arguments 详解_

#### 默认参数(ES6)

1. 默认参数: 在调用函数时, 没有传入实参的情况下的参数, 参数的默认值, 如果传值了, 就覆盖默认值
2. 有默认参数的形参, 必须放到没有默认参数的形参的后面

```javascript
function multiply(a, b = 1) {
  return a * b;
}

console.log(multiply(5)); // 5
console.log(multiply(5, 2)); // 10
```

### 返回值

1. 使用 `return` 关键字可以返回一个变量,或者任意类型的值作为函数执行的结果
2. 一旦使用 `return` 关键字就代表函数已经执行完毕, 需要返回结果了, `return` 语句后面的代码都不会执行

```javascript
function test() {
  console.log('我执行了11111');
  return '返回的数据';
  console.log('我执行了22222');
}

var res = test(); // 我执行了11111

console.log(res); // 返回的数据
```

## 函数小练习

### 判断是否是对象

```javascript
// 因为用 typepf 操作符来获取 null 的类型也是 object, 所以要排除这种情况
function isObject(value) {
  return value !== null && typeof value === 'object';
}
```

### 使用递归计算阶乘

```javascript
// 递归: 就是在函数体内调用自己
function getFact(num) {
  if (num === 1) {
    return 1;
  }
  return num * getFact(num - 1);
}

console.log(getFact(5)); // 120

/*
getFact(5) 执行流程:
第1次执行: 5 * getFact(4)
第2次执行: 4 * getFact(3)
第3次执行: 3 * getFact(2)
第4次执行: 2 * getFact(1)

递归的返回流程:
第4次执行返回结果: 2 * 1
第3次执行返回结果: 3 * 2
第2次执行返回结果: 4 * 6
第1次执行返回结果: 5 * 24
*/
```

### 使用递归计算斐波拉契数列

```javascript
function fb(num) {
  if (n <= 2) {
    // 1 1 2 3 5
    return 1;
  }
  return fb(num - 1) + fb(num - 2);
}

/*
getGoldNumber(5) 执行流程:
第1次执行: fb(4) + fb(3)
第2次执行: fb(3) + fb(2)
第3次执行: fb(2) + fb(1)

递归的返回流程:
第3次执行返回结果: 1 + 1
第2次执行返回结果: 2 + 1
第1次执行返回结果: 3 + 2
*/
```

## 数据数据总结和获取类型

1. 基本数据类型

   - string
   - number
   - null
   - undefined
   - boolean
   - symbol
   - bigint

2. 引用数据类型

   - object 普通对象
   - array 数组对象
   - function 函数对象
   - regexp 正则对象
   - Math 数学函数对象
   - 其他对象...

### 检测数据类型

<!-- prettier-ignore-start -->

```javascript
// typeof: 获取数据类型字符串(string)
typeof 2;         // "number"
typeof null;      // "object"
typeof undefined; // "undefined"


// instanceof: 获取对象是否是某个类的实例(boolean)
const reg = /test/;
reg instanceof RegExp; // true
reg instanceof Date;   // false


// constructor: 判断对象的构造器是否是给定的类(boolean)
const reg = /test/;
reg.constructor === RegExp; // true;
reg.constructor === Date;   // false;


// Object.prototype.toString.call: 借用Object原型对象的toStirng函数查看对象的数据类型字符串
const toString = Object.prototype.toString;
toString.call(12);             // '[object Number]'
toString.call('hi');           // '[object String]'
toString.call(true);           // '[object Boolean]'
toString.call(undefined);      // '[object Undefined]'
toString.call(null);           // '[object Null]'
toString.call({});             // '[object Object]'
toString.call([]);             // '[object Array]'
toString.call(new Date());     // '[object Date]'
toString.call(function () {}); // '[object Function]'
```
<!-- prettier-ignore-end -->
