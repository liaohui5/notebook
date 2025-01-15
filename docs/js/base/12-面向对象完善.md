## class 类

其实 ES6 的类是更规范的面向对象编程语言的实现, 就算没有新的语法,
ES5 也是可以实现类似的功能, 只不过写法有点奇怪和其他面向对象编程语言的写法完全不一样
为了规范或者说为了避免很多千奇百怪的写法(比如es5的继承就有好多种方式), 推荐使用新的语法

- [在线将ES6类转换成ES5的类](https://babeljs.io/repl#?browsers=&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=FBA&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=7.24.3&externalPlugins=&assumptions=%7B%7D)
- [在线将ES6类转换成ES5的类(中国镜像)](https://www.babeljs.cn/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=Q&debug=false&forceAllTransforms=false&modules=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Creact%2Cstage-2&prettier=false&targets=&version=7.24.3&externalPlugins=&assumptions=%7B%7D)

::: code-group

```js [es5定义类]
function Cat(name) {
  // 默认情况下: 需要手动限制不能直接调用,必须用new来实例化
  // if (!(this instanceof Cat)) {
  //   throw new Error("Class constructor Cat cannot be invoked without 'new'");
  // }
  this.name = name;
}

Cat.prototype.say = function () {
  console.log('my name is ' + this.name);
};

Cat.isCat = function (inst) {
  // static method
  return inst instanceof Cat;
};
```

```js [es6定义类]
class Dog {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log('my name is ' + this.name);
  }
  static isDog(inst) {
    // static method
    return inst instanceof Dog;
  }
}

// 1. Dog() ES6 的类不使用 new 是无法直接执行的
// 2. ES6 类所有的方法都是写在 class 里面的, 这种明显比 给 prototype 属性赋值要更直观
// 3. ES6 定义静态方法只需要用 static 关键字修饰即可
```

:::

## extends 继承

在 es3/5 版本, 想要实现继承是非常费劲的,
而且有很多种(中间人继承,组合继承...), ES6 终于有继承的关键字了,
推荐都使用这种, 规范简洁且可读性好

::: code-group

```js [es6继承]
class Animal {
  breathe() {
    console.log('动物都需要呼吸');
  }
}
class Cat extends Animal {
  constructor() {
    super();
  }
  catchMouse() {
    console.log('猫可以抓老鼠');
  }
}
const c = new Cat();
c.breathe();
c.catchMouse();
```

```js [es5组合继承]
function Animal() {}
Animal.prototype.breathe = function () {
  console.log('动物需要呼吸');
};

function Cat() {
  Animal.call(this);
}
Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;
Cat.prototype.catchMouse = function () {
  console.log('猫可以抓老鼠');
};
```

:::

## super 关键字

在继承时, `super` 关键字主要有两个作用:

- super(): 调用父类的构造函数
- super.xxx: 访问父类的方法/属性(包括静态方法)

```js
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log("my name is ", this.name);
  }

  static target = "everyone";
  static hello() {
    console.log(`hello ${Parent.target}`);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  static hi() {
    // 在静态方法中可以访问父类的静态方法和静态属性
    super.hello();
    console.log(`hi ${super.target}`);
  }

  intro() {
    // 在原型方法中可以访问父类的普通属性和方法
    super.sayName();
    console.log(`I am ${this.age} years old`);
  }
}

const c = new Child("tom", 20);
Child.hi();
c.intro();
```

## \# 定义私有属性

```js
class Demo {
  #age = 10; // 这样定义的属性, 只能在 Demo 这个类中使用

  getAge() {
    return this.#age;
  }

  setAge(age) {
    this.#age = age;
  }
}

const d = new Demo();

console.log(d.getAge()); // 可以获取
// console.log(d.#age); // 不能获取: Private field '#age' must be declared in an enclosing class

d.setAge(20); // 可以设置
console.log(d.getAge()); // 获取到 20
// d.#age = 30; // 不能设置:  Private field '#age' must be declared in an enclosing class
```
