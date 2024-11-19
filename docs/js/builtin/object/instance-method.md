## 文档

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)

## Object.prototype.hasOwnProperty

判断一个属性是否是自有的属性, 而不是继承而来的属性

```js
class Car {
  constructor(color) {
    this.color = color;
  }
}

const car = new Car("black");

console.log(car.hasOwnProperty("toString")); // false
console.log(car.hasOwnProperty("color")); // true
```

## Object.prototype.isPrototypeOf

方法用于检查一个对象是否存在于另一个对象的原型链中

```js
class Animal { }
class Cat extends Animal { }

const a = new Animal();
const c = new Cat();

console.log(Animal.isPrototypeOf(c)); // false
console.log(Cat.isPrototypeOf(c));    // false


function Foo() {}
function Bar() {}
Bar.prototype = Object.create(Foo.prototype);

const bar = new Bar();
console.log(Foo.prototype.isPrototypeOf(bar)); // true
console.log(Bar.prototype.isPrototypeOf(bar)); // true
```

## Object.prototype.toString

返回一个表示该对象的字符串, 或者说: 在对象被转为字符串时(当作字符串使用就会自动转换)自动调用这个方法

```js
class Cat {
  constructor(name) {
    this.name = name;
  }

  // override Object.prototype.toString
  toString() {
    return `${this.name}`;
  }
}

const c = new Cat("tom");
console.log(c.toString());
console.log(c + "-some-string");


// es5 like this:
function Dog(name) {
  this.name = name;
}
Dog.prototype.toString = function dogToString() {
  return `${this.name}`;
};

const d = new Dog('Gabby');
console.log(d.toString());
```
