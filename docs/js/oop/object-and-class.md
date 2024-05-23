## 什么是类?

类是一类事物的抽象(比如: 人类)

## 什么是对象?

对象是一个具体对象的实例(比如: 小明)

## 对象的构成

1. 属性
2. 方法(也就是之前学过的函数)

```javascript
var cat = {
  name: 'feifei',
  age: 5,
  eat: function () {
    console.log('eat');
  },
  run: function () {
    console.log(this.name + ' is running.');
  },
};

cat.name;
cat.run();
```

## 删除对象属性和方法

```javascript
var cat = {
  name: 'feifei',
  age: 5,
  eat: function () {
    console.log('eat');
  },
  run: function () {
    console.log(this.name + ' is running.');
  },
};

delete cat.age; // 可以删除
delete cat.eat; // 可以删除
delete cat.run(); // 不能删除, 会先执行这个函数, delete 此时意思是, 删除函数返回的结果
```

## 创建对象

### 字面量对象

```javascript
var cat = {
  name: 'feifei',
  age: 5,
  eat: function () {
    console.log('eat');
  },
};
```

### 使用构造函数(系统内置的构造函数)

```javascript
var cat = new Object();
cat.name = 'tom';
cat.age = 5;
cat.eat = function () {
  console.log('eat');
};
```

### 使用自定义的构造函数(类似其他语言的自定义类)

注意构造函数, 函数名需要使用大驼峰(所有单词首字母大写), 虽然不使用大驼峰也可以, 但是这是约定俗成的规范,易于代码的可读性

```javascript
function Cat(name, age) {
  this.name = name;
  this.age = age;
  this.eat = function () {
    console.log('eat');
  };
}

var tom = new Cat('tom', 5);
```

## 课后练习

1. 写个构造函数,接收数字类型的参数,参数数量不定, 完成参数新加和相乘的功能

```javascript
function Calc() {
  this.result = 0;

  // 循环
  this.each = function (nums = [], callback = null) {
    var isCallback = typeof callback === 'function';
    for (var i = 0, l = nums.length; i < l; i++) {
      isCallback && callback.call(this, nums[i]);
    }
    return this;
  };

  // 加法计算
  this.sum = function (...nums) {
    return this.each(nums, (num) => {
      this.result += num;
    });
  };

  // 乘法计算
  this.mul = function (...nums) {
    return this.each(nums, (num) => {
      this.result *= num;
    });
  };

  // 获取结果
  this.getResult = function () {
    return this.result;
  };

  // 清除结果
  this.clear = function () {
    this.result = 0;
    return this;
  };
}

var calc = new Calc();

var res = calc.sum(1, 2, 3, 4).mul(2, 3).getResult();

console.info(res);
```

2. 写一个构造车的函数, 可以设置车的品牌, 颜色,排量,再写一个构造消费者的构造函数,设置用户的名字,年龄,收入用过选择的方法实例化该用户喜欢的车再设置车的属性,

```javascript
// 汽车类
function Car(options) {
  this.banner = options.banner || 'Mercedes';
  this.color = options.color || 'black';
  this.emissions = options.emissions || 1;
}

// 客户类
function Customer(options) {
  this.name = options.name || '';
  this.age = options.age || 1;
  this.income = options.income || 0;
  this.buyCar = function (options) {
    return new Car(options);
  };
}

var zs = new Customer({
  name: '张三',
  age: 21,
  incime: 15000,
});

var car = zs.buyCar({
  banner: 'BMW',
  color: 'red',
  emissions: 5,
});

console.info(zs);
console.info(car);
```

## new构造函数的本质

1. `初始化this`
2. `将this指向new出来的实例对象`
3. `隐式的return this`

```javascript
function Car(color) {
  this.color = color;
}
var car = new Car('red'); // { color:"red" }

// 伪代码, 方便理解
function Car(color) {
  var self = {
    color: color,
  };
  return self;
}

var car = Car('blue'); // { color: "blue" }
```

## 在构造函数中使用 return 语句

当在构造函数中使用 `return` 的时候, 如果return的是 `基本类型的值` 则 `不会改变实例的this指向` , 如果return的是 `引用类型的值` 则 `不会返回实例, 而是返回, 你return的值`

```javascript
function Car(color) {
  this.color = color;
  return 1;
}

var car = new Car();
console.log(typeof car); // object

function Cat(name) {
  this.name = name;
  return function () {
    console.log('hello');
  };
}
var cat = new Cat();
console.log(typeof cat); // function
```

## 包装类(隐式转换)

<span class="red-text">装箱拆箱是Java中的概念, 有的资料将这种现象叫作: `隐式转换`</span>

个人理解: 在js代码被js执行的时候, 一些 `基本类型` 的值, 会自动被js引擎 "装箱", 在取值/运算的时候, 会自动 `拆箱` ,
这也就是为什么一些 基本类型可以像对象那样直接使用 `.` 调用方法, 一些类型就不行, 比如 `undefined 和 null` 就不能调用方法,
而 `string 和 number` 却可以直接调用方法/属性([装箱概念参考](https://www.cnblogs.com/dolphin0520/p/3780005.html) )

1. Number
2. String
3. Boolean

```javascript
var n1 = 1.35;
var n2 = new Number(1.22);
console.log(typeof n1); // number
console.log(typeof n2); // object
n1.toFixed(2); // n1 是 number类型, 却可以像使用对象那样直接调用方法 -> 自动装箱

var str = 'hello world';
str = str.slice(1);
```

### 什么情况会装箱?

在给基本类型并且有与之对应的构造函数的值使用 `点语法` 的时候会自动装箱

```javascript
// 此时就会装箱
// 1. 有 String 这个构造函数
// 2. 基本类型变量使用了 . 语法
var str = 'hello';
console.log(str.length); // new String("hello").length

// 此时不会装箱, 而是直接报错
// 因为 undefined 类型并没有, 与之类型对应构造函数
var undf = undefined;
console.log(undf.length);
```

### 什么情况会拆箱?

在运行运算的时候会拆箱(比如: 比较运算, 判断, 数学运算等..)

```javascript
var str = new String('hello');
console.log(typeof str); // 运算前: object
str += 10;
console.log(typeof str); // 运算后: string
```

## 练习1

```javascript
var name = 'abced';
name += 10;
var type = typeof name; // string
if (type.length === 6) {
  // true
  type.text = 'string'; // new String("string").text = "string"
}

console.log(type.text); // new String("string").text -> undefined
```

Q: 控制台输出什么内容?
A: `undefined`
解题思路: 看注释

1. `type.text = "string"` 赋值的时候,会被包装类包装一下, 也就是说会 `new String("string")`
2. `console.log(type.text)` 取值的时候, 又会被被包装类包装一下, 又会 `new String("string")`
3. 给第一个包装类对象赋值, 去第二个包装类对象上取值, 必定是 `undefined`

## 练习2

```javascript
function Test() {
	var d = 1;
  function f = () {
  	d++;
    console.log(d);
  }
  this.f = f;
}

var t1 = new Test();
t1.f(); // 2;
t1.f(); // 3;

var t2 = new Test();
t2.f(); // 2
```

Q: 控制台输出什么内容
A: `2, 3, 2`
解题思路: 每new 一次就会产生一个新的对象,两个对象互不干扰. 所以是, `2, 3, 2`

## 练习3

```javascript
var x = 1,
  y = (z = 0);

function add(x) {
  return x + 1;
}

y = add(x);

function add(x) {
  return x + 3;
}

z = add(x);

console.log(x, y, z);
```

Q: 控制台输出什么内容
A: `1, 4, 4` 
解题思路:

1. 预编译阶段, 函数提升, 但是:
2. 后定义的函数会覆盖前面定义的同名函数, 所以两次执行的都是 `+3`
3. 也就是或, y, z 都是执行的都是 `1+3`

## 练习4

Q: 哪些函数可以输出 `1,2,3` 
A: `f1 f3 f4 f5`

```javascript
function f1(x) {
	console.log(arguments);
  return x;
}
f1(1,2,3);

function f2(x){
  console.log(arguments);
  return x;
}();

function f3(x){
  console.log(arguments);
  return x;
}(true);
f3(1,2,3);

+function f4(x){
  console.log(arguments);
  return x;
}();


(function f5(){
	console.log(arguments);
  return x;
})(1,2,3);
```

解题思路: 其实就是想考, 哪些函数会正常执行,

1. f1, f5 肯定能正常执行
2. f2 不能正常执行, 因为声明语句直接写()是会语法错误的
3. f3 虽然代码是 `function f3(){}(true)` , 但是由于js语法是可以每行最后不加 `;` 的, 所以代码实际会这样解析 `function f3(){}; (true);` 这其实是两个语句, 填 `true` 是故意迷惑, 填个 `(1,2,3)` 也是可以执行的
4. f4 是一个运算表达式(类型转换), 在表达式后面加 `()` 是可以执行的

## 练习5

Q: 控制台会输出什么?
A: `10`

```javascript
function test(a, b, c) {
  c = 10;
  console.log(arguments[2]);
}

test();

/*
反过来理解以上代码:
function test(a, b, c) {
	arguments[2] = 10;
  console.log(c);
}

test();
*/
```

解题思路: 形参和 `arguments` 是映射关系, c 被改变了所以 `arguments[2]` 也会改变

## 练习6

写一个函数,计算任意一个字符串的总字节数,

1. UNICODE 码 0-255 都算一字节(1byte)(ASCII 表1 + ASCII 表2)
2. UNICODE 码大于 255 都算2字节(2byte): UNICODE包括(表1,2), 索引大于255的都算2个字符
3. `charCodeAt` 方法, 可以获取一个字符在 `UNICODE` 中的索引位置
4. [ASSIC 参考](https://www.yuque.com/liaohui5/js-dom/kgk6vu?inner=a8486609)

```javascript
function getByteSize(str) {
  var str = new String(str);
  var len = str.length;
  if (len === 0) {
    return 0;
  }

  var bytes = 0;
  for (var i = 0; i < len; i++) {
    if (str[i].charCodeAt() <= 255) {
      bytes += 1;
    } else {
      bytes += 2;
    }
  }
  return bytes;
}

var size = getByteSize('hello你好'); // 5 + 2 + 2
console.info(size);
```
