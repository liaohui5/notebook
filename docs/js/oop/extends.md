## 什么是继承?

继承是一种面向对象编程的概念, 它允许一个类(子类/派生类)从另外一个类(父类/基类)继承属性和方法,
并且在此基础上添加或者修改继承而来的属性/方法.

## 为什么使用继承?

减少代码冗余, 提高代码复用性, 提高代码可维护性

## 原型链继承

1. `Child.prototype = new Parent;` 将子类原型对象修改为父类的实例对象
2. `Child.prototype.constructor = Child;` 将子类的constructor再指向子类构造函数
3. 特点 :
   1. 父类(Animal)中公有(原型对象上的)或者私有(实例对象上的)的属性和方法, 都会变成子类(Cat)的公有属性和方法
   2. Cat实例实例对象可以直接修改父类中的原型对象的属性, 而且会影响 Cat 的其他实例, 这就不合理

```javascript
function A(x) {
  this.x = x;
}
A.prototype.getX = function () {
  console.log(this.x);
};

A.prototype.desc = { id: 1001, test: 'xxx' };

function B(x, y) {
  A.call(this, x); // 普通函数
  this.y = y;
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.getY = function () {
  console.log(y);
};

var b1 = new B();
b1.desc.id = 1002;

var b2 = new B();
console.log(b2.desc.id);
```

```javascript
function Animal() {
  this.cell = '动物都有细胞';
}
Animal.prototype.eat = function () {
  console.info('动物都需要吃东西');
};

function Cat() {
  this.feather = '猫有毛';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
Cat.prototype.catchMouse = function () {
  console.info('猫会抓老鼠');
};

var c = new Cat();
console.info(c.cell); // 动物都有细胞, 父类的属性
console.info(c.feather); // 猫有毛, 实例属性
c.eat(); // 动物都需要吃东西, 父类的方法
c.catchMouse(); // 猫会抓老鼠, 实例方法
```

## call 继承

1. 在 Child 方法中, 把 Parent用 call 当做普通函数执行, 并且把 this 改成 Child 的实例对象, 相当于给 Child 实例设置了 Parent 实例的所有属性/方法
2. 特点
   1. 只能继承 Parent 实例对象的属性/方法, 无法继承 Parent.prototype 上的属性和方法
   2. 原因是把 Parent 当做普通函数去执行无法获取到 Parent.prototye 上属性和方法

```javascript
function A(x) {
  this.x = x;
}
A.prototype.getX = function () {
  console.log(this.x);
};

function B(x, y) {
  A.call(this, x); // 普通函数执行
  this.y = y;
}
B.prototype.getY = function () {
  console.log(y);
};
```

## 组合继承(call + 原型)

1. `Parent.call(this);` 将父类当做普通函数调用, `让子类实例对象获取父类实例对象上的所有属性/方法`
2. `Child.prototype = Object.create(Parent.prototype);`  将子类的原型对象修改为父类的原型对象, `让子类的实例对象, 获取父类原型对象上的属性和方法`
3. `Child.prototype.constructor = Child;` 将子类的原型上的constructor属性修改为子类构造器函数, `防止 instanceof 判断出现错误`
4. 特点
   1. Child.call(this): 将 Parent 的实例对象属性/方法放到 Child 实例对象上
   2. Child.prototype = Object.create(Parent.prototype): 将Parent 的原型对象属性/方法放到子类的原型对象上
   3. 缺点还是: Child实例实例对象可以直接修改父类中的原型对象的属性, 而且会影响 Child 的其他实例, 这就不合理

```javascript
function A(x) {
  this.x = x;
}
A.prototype.getX = function () {
  console.log(this.x);
};

A.prototype.desc = { id: 1001, test: 'xxx' };

function B(x, y) {
  A.call(this, x); // 普通函数
  this.y = y;
}
B.prototype = Object.create(A.prototype);
B.prototype.constructor = B;
B.prototype.getY = function () {
  console.log(y);
};

var b1 = new B();
b1.desc.id = 1002;

var b2 = new B();
console.log(b2.desc.id);
```

## 圣杯模式继承

1. 首先: 3个类, 父类Parent, 子类Child, 中间工具类Middle
2. Middle.prototype = Parent.prototype;
3. Child.prototype = new Middle();
4. Child.prototype.constructor = Child;
5. 特点:
   1. Child 无法继承 Parent 的实例对象上的属性/方法
   2. Child 无法直接修改 Parent 的原型对象, 修改的是 Middle 的实例对象
   3. Child 可以继承 Parent 的原型对象的属性/方法, 因为 Middle 的原型就是 Parent 的原型

```javascript
function Animal() {
  this.x = 'xxx'; // 子类无法获取父类实例属性(私有属性)
}
Animal.prototype = {
  desc: {
    eat: '动物需要吃东西',
    breath: '动物需要呼吸',
  },
  move: function () {
    console.info('动物可以移动');
  },
};

function Middlemam() {}
Middlemam.prototype = Animal.prototype;

function Cat() {}
Cat.prototype = new Middlemam();

var c = new Cat();
console.info(c);
```

## 封装圣杯模式继承

```javascript
var $inherit = (function () {
  function Middleman() {}
  return function (child, parent) {
    Middleman.prototype = parent.prototype;
    child.prototype = new Middleman();
    child.prototype.constructor = child;
    child.super_class = parent;
  };
})();

// 父类 Animal
function Animal() {
  this.x = 'xxx'; // 子类无法获取父类实例属性(私有属性)
}

// 父类原型对象
Animal.prototype = {
  constructor: Animal,
  desc: {
    eat: '动物需要吃东西',
    breath: '动物需要呼吸',
  },
  move: function () {
    console.info('动物可以移动');
  },
};

// 子类
function Cat() {}

// 继承
$inherit(Cat, Animal);
```

## ES6 的继承

1. Child exnteds Parent
2. es6 中的类无法直接执行 `Rect` , 必须使用 `new` 关键字来创建对象
3. 子类的的 constructor 中必须调用 `super` 来构造实例对象 `this` , 而且 `super` 方法只能调用一次
4. es6的类可以增加 `prototype` 的属性, 但是不能重新赋值

```javascript
class Rect {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  getPerimeter() {
    return this.width * 2 + this.height * 2;
  }

  getArea() {
    return this.width * this.height;
  }
}

// Sequare.prototype.__proto__ => Rect.prototype;
class Square extends Rect {
  constructor(width) {
    super(width, width); // 类似 Child.call(this, width, height)
  }
}
```

## 模拟继承和使用ES6继承有什么不同

1. 从语法上说: es5 并没有类似其他强类型语言的那种使用 `extends`  关键字继承, 而是通过模拟继承的功能实现的功能,直到 `es6` 才有 `class` 和 `extends` 关键字的继承

2. 从原理上说: 其他语言是把父类的方法和属性全部拷贝一份到子类, 而 `es5` 的继承是把父类的属性和方法, 放到子类的原型链上, 然后子类的实例对象利用 `__proto__` 去查找父类的属性和方法

> 总结:

1. 语法不同, es5是手动模拟创建的, es6是通过 class 和 extends 来实现继承的
2. 原理不同, es6是先构造父类再构造子类, es5是先构造子类, 然后再构造父类
