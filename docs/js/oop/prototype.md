## 原型对象

原型对象是 function 的上的一个属性 `prototype` , 这个属性的值也是一个对象,这个对象是所有实例的公共祖先

```javascript
function Cat(name) {
  this.name = name;
  this.eat = function () {
    console.info('eat');
  };
}

Cat.prototype.run = function () {
  console.log('running');
};

var c1 = new Cat('tom');
var c2 = new Cat('jerry');

console.info(c1.run === c2.run); // true, 取得是同一个对象上的方法,对象是: Cat.prototype
console.info(c1.eat === c2.eat); // false, 取得不是同一个对象的方法
```

## 实例对象/原型对象/构造函数的关系

```javascript
function Cat(name) {}

c1.__proto__ === Cat.prototype; // true
Cat.prototype.constructor === Cat; // true
```

伪代码: 方便理解3个对象关系

```javascript
var Cat = function () {}; // 构造函数

var protype = {
  // 原型对象
  construct: Cat,
};

Cat.prototype = protype;

var c1 = {
  // 实例对象
  __proto__: protype,
};
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/prototype.png)

## 原型链

在访问对象的属性/方法的时候, 可以看到,
自身没有的就会去自己的原型对象去找, 自己原型对象上没有的,
再去自己原型对象的原型对象上去找, 直到找到,或者全部找完只为, 这样一种链式的关系, 叫做 `原型链`

```javascript
/**
 * 动物
 */
function Animal() {
  this.cell = '动物都有细胞';
}
Animal.prototype.eat = '动物都需要吃东西';

/**
 * 哺乳动物
 */
function Mammal() {
  this.breath = '哺乳动物都需要呼吸';
}
Mammal.prototype = new Animal();

/**
 * 猫
 */
function Cat() {
  this.walk = '猫是爬着走的';
}
Cat.prototype = new Mammal();

var cat = new Cat();
console.info(cat);
console.info('cat.eat:', cat.eat);
console.info('cat.breath:', cat.breath);
console.info('cat.cell:', cat.cell);
console.info('cat.walk:', cat.walk);
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/__proto__.png)

1. cat.prototype -> new Mammal()
2. (new Mammal()).prototype -> new Animal()
3. (new Animal()).prototype -> new Object()
4. (new Object()).prototype -> null

## Object.create (es5)

1. 返回一个对象, 参数只能是 `object | null` , 这个参数, 可以指定被创建的对象的原型
2. `Object.create(obj)` 创建一个空对象, 让这个空对象的 `__proto__` 属性指向 `obj`

```javascript
var obj1 = Object.create(null); // 此时,这个对象就没有 __proto__

var proto = {
  id: 101,
  name: 'test',
};

var obj2 = Object.create(proto); // 此时, 这个对象的 __proto__ 就是 proto
```

3. Objec.create 代码实现(方便理解)

```javascript
Object.prototype.$create = function (proto) {
  if (typeof proto !== 'object') {
    throw new TypeError('The parmater must be a object');
  }
  function Obj() {}
  Obj.prototype = proto;
  return new Obj();
};

var proto = { id: 100 };
var obj = Object.$create(proto);
console.log(obj.__proto__ === proto); // true
```

## toString

内置的构造函数, 会重写 Object 上的 toString 方法, 隐式转换(比如字符串拼接)的时候会调用 `toString` 方法

1. Number
2. String
3. Boolean
4. Array
5. Object
6. Date
7. .....

```javascript
Number.prototype.toString.call(2); // "2"
String.prototype.toString.call('3'); // "3"
Boolean.prototype.toString.call(false); // "false"
Array.prototype.toString.call([1, 2, 3]); // "1,2,3"
Date.prototype.toString.call(new Date()); // "Fri Jul 02 2021 19:21:17 GMT+0800 (中国标准时间)"

Object.prototye.toString.call(2); // "[object Number]"
Object.prototye.toString.call('3'); // "[object String]"
Object.prototye.toString.call(false); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call(new Date()); // "[object Date]"
```

## 练习1

写个插件,使用内部的方法实现加减乘除

```javascript
(function (win) {
  function Calc(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new TypeError('the params must be number');
    }
    // 防止不使用 new 关键, 而是直接调用函数
    if (!(this instanceof Calc)) {
      return new Calc(a, b);
    }
    this.a = a;
    this.b = b;
    this.result = 0;
  }

  Calc.prototype = {
    constructor: Calc,
    // 加
    sum: function () {
      return this.a + this.b;
    },
    // 减
    minus: function () {
      return this.a - this.b;
    },
    // 乘
    mul: function () {
      return this.a * this.b;
    },
    // 除
    div: function () {
      return this.a / this.b;
    },
  };

  win.Calc = Calc;
})(window);

var calc = new Calc(10, 5);
var res = calc.sum();
console.log(res); // 10

var c2 = Calc(2, 3);
var res2 = c2.mul();
console.log(res2); // 6
```

## 练习2

结论: 如果原型对象的属性是 `引用类型` , 那么实例对象可以直接更改这个属性的值, 如果是基本类型, 实例对象在修改的时候,
则会直接给自己添加一个属性, 而不是修改原型对象的属性

```javascript
function Animal() {
  this.id = 100;
  this.desc = {
    name: 'Animal',
  };
}

function Cat() {}
var animal = new Animal();
Cat.prototype = animal;

var c = new Cat();
c.desc.name = 'Cat'; // 能够直接修改 animal 对象的属性
c.desc.say = 'hello'; // 也能够直接增加 animal 对象的属性
c.id = 110; // 不会改变, animal 的值, 而是直接往 c 对象上添加一个 id 属性, 并且赋值为 110

consol.log(aniaml, c);
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/__proto__.png)

## 练习3

Q: 控制题打印什么
A: 打印 `intro` `Mazda`

```javascript
function Car() {
  this.brand = 'Benz';
}

Car.prototype = {
  brand: 'Mazda',
  intro: function () {
    console.log(this.brand);
  },
};

var car = new Car();
car.inrto(); // benz
car.__proto__.intro(); // Mazda
```

解题思路: 其实非常简单, 谁代用 `intro` this就指向谁, 本身 this 有 `brand` 属性, 所以就不会到原型对象去找

## 练习6

使用 call 和 apply 组合两个构造函数的功能
写个构造函数可以设置车的品牌, 颜色,排量, 再写一个构造消费者的构造函数,设置用户的名字,年龄,收入用过选择的方法实例化该用户喜欢的车再设置车的属性

```javascript
function Car(options) {
  this.color = options.color || '';
  this.brand = options.brand || '';
  this.emissions = options.emmissions || 0;
}

function Customer(options) {
  this.name = options.name || '';
  this.age = options.age || 1;
  this.income = options.income || 0;
}

Customer.prototype.buyCar = function (carOptions) {
  return Car.call({}, carOptions);
};
```
