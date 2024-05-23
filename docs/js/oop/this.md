## this 是什么?

## this 指向问题

```javascript
// 1. 默认绑定规则(非严格模式 window, 如果是严格模式: undefined)

function f1() {
  console.log(this);
}
f1(); // window

// 2. 谁调用 this 就是谁
var user = {
  name: 'tom',
  show: f1,
};
f1(); // 可以理解为: window.f1();
user.show(); // { name: "tom", show: function f1(){} }

// 3. 手动绑定(call/bind/apply)
var o = { id: 1 };
user.show.bind(o)(); // {id: 1}
user.show.call(o); // {id: 1}
user.show.apply(o); // {id: 1}

// 4. 使用 new 关键字
function Cat() {}
var c = new Cat();

// 5. 箭头函数: 指向执行时上级作用域的 this, 且无法改变
var af = () => console.log(this);
af.call(null); // window
```

## call/apply 改变函数的this指向并且立即执行

1. call 传入参数是一个个依次传入
2. apply 传入参数是一个数组依次性全部传入
3. bind 改变函数的执行时的 this, 但是不立即执行, 返回一个新的函数, 并且只能 bind 一次

```javascript
var p1 = {
  name: '张三',
  age: 18,
  sex: '男',
  show: function (food1, food2) {
    var desc = '我叫';
    desc += this.name + ',';
    desc += this.sex + ',今年';
    desc += this.age;
    desc += '岁, 我喜欢吃:';
    desc += food1 + '和' + food2;
    console.info(desc);
  },
};

var p2 = {
  name: '李四',
  age: 20,
  sex: '女',
};

// call 传入参数是一个个依次传入
// apply 传入参数是一个数组依次性全部传入

p1.show.call(p2, '米饭', '鱼');
// 改变this指向然后执行, 输出：我叫李四,女,今年20岁, 我喜欢吃:米饭和鱼

p1.show.apply(p2, ['面条', '辣椒']);
// 改变this指向然后执行, 输出：我叫李四,女,今年20岁, 我喜欢吃:面条和辣椒

var show2 = p2.bind(p2); // 改变this指向但是没有立即执行
show2('肯德基', '麦丹劳'); // 输出: 输出：我叫李四,女,今年20岁, 我喜欢吃:肯德基和麦丹劳
```

## 手动实现 bind 方法

- 改变函数调用时的 this 指向, 并且返回一个新的函数
- 只能 bind 一次, 只要bind一次之后就无法再次绑定新的

```js
Function.prototype.$bind = function (ctx, ...args) {
  if (this.__$bound) {
    return this;
  }
  Object.defineProperty(this, '__$bound', {
    value: true,
    configurable: false,
    writable: false,
    enumerable: false,
  });
  const _this = this;
  return function (...args2) {
    _this.apply(ctx, [...args, ...args2]);
  };
};

function f1(args) {
  console.info('this: ', this);
  console.info('args: ', args);
}

var f2 = f1.$bind({ id: 1 });
// var f2 = f1.$bind({ id: 1 }, 100);
// 如果直接bind的时候传入参数, 那么 f2/new/f3 执行时的参数都将无法更改

// 直接执行
f2(10);
// this: {id: 1}
// args: 10

// 用 new 关键字执行
new f2(20);
// this: {id: 1}
// args: 20

// 再次绑定并执行
var f3 = f2.$bind({ id: 222 }); // 无法再次绑定新的对象
f3(30);
// this: {id: 1}
// args: 30
```

## 手动实现 new 方法

要实现一个功能, 首先要明确这个功能有哪些步骤, 做了写什么事情

js 的 `new` 关键字有以下几个功能:

1. 创建一个新对象
2. 给这个对象设置原型属性(\_\_proto\_\_) 并指向被 `new` 修饰的函数
3. 如果被修饰的函数没有返回一个 `引用值` 那么就返回刚才创建的新对象
4. 如果被修饰的函数返回了一个 `引用值` 那么就返回这个引用值

::: code-group

```js [new关键字的特性]
// 只要 Cat 这个类没有返回一个引用值
// 那么 new Cat 返回的始终是新创建的对象
function Cat(name) {
  this.name = name;
  return 1;
}
Cat.prototype.run = function () {
  console.log('my name is ' + this.name + ", I'm running");
};
var c = new Cat('tom'); // { name: 'tom', [[Prototype]]: { run: function(){...} } }
console.log(Cat.prototype.constructor === Cat); // true

// 只要 Dog 这个类返回了一个引用值
// 那么 new Dog 就会直接返回这个引用值
function Dog() {
  this.name = name;
  return {
    a: 1,
    b: 2,
  };
}

var d = new Dog('spike');
console.log(d); // {a:1, b:2}
```

```js [手动模拟实现]
function $new(classFunc, ...args) {
  if (!classFunc.hasOwnProperty('prototype')) {
    throw new TypeError("'classFunc' is not a constructor");
  }
  const object = Object.create(classFunc.prototype);
  const result = classFunc.apply(object, args);
  if (result !== null && typeof result === 'object') {
    // 对象一定是引用值
    return result;
  }
  if (typeof result === 'function') {
    // 函数也是引用值
    return result;
  }
  // 如果没返回一个引用值, 就返回新创建的对象
  return object;
}

var c2 = $new(Cat, 'tom2');
var d2 = $new(Cat, 'spike2');
console.log(c2); // { name: 'tom', [[Prototype]]: { run: function(){...} } }
console.log(d2); // { a:1, b:2 }
```

:::

## 八股文面试题

this 和 原型链的结合考题

::: code-group

```js [题目]
// 要求: 在不改动这个代码的情况下修改闭包内 obj 对象的属性
var o = (function () {
  var obj = {
    a: 1,
    b: 2,
  };
  return {
    get(key) {
      return obj[key];
    },
  };
})();
```

```js [答案]
// 解题思路:
// 在闭包外肯定无法直接获取到 obj, 但是可以利用 js 2个特点来间接的获取 obj
// 1. 调用函数时(非箭头函数), 不手动指定 this 的情况下, this 永远指向调用方法者本身
// 2. 如果属性本身不存在, 会沿着原型链去找属性, 一直向上找, 最终都会找到
// Object.prototype, 那么就可以用 Object.defintProperty 给
// Object.prototype 这个对象定义属性并设置 getter

Object.defineProperty(Object.prototype, 'getObjectInClosure', {
  get() {
    // 哪个对象来获取 getObjectInClosure 这个属性, 那么 getter 中的 this 就指向哪个对象
    // 如果: const a = {}; a.getObjectInClosure 那么 getter 的 this 就会指向 a 这个对象
    // 同理: o.get('getObjectInClosure') 的时候会执行 闭包中的 obj[key] 也就是获取值,
    // 获取值的时候一定会触发 Object.defineProperty 中定义的 getter
    // 此时的 this 就指向闭包中定义的 obj 那么也就拿到了 obj 然后赋值给 object
    // 此时就可以成功修改 object 的属性
    return this;
  },
});

// 未修改之前
console.log(o.get('a')); // 1
console.log(o.get('b')); // 2

const object = o.get('getObjectInClosure'); // 等同 obj['getObjectInClosure']
object.a = 'a';
object.b = 'b';
object.c = 'c';

// 此时闭包内部的私有变量 obj 已经被修改
console.log(o.get('a')); // a
console.log(o.get('b')); // b
console.log(o.get('c')); // c
```

```js [预防]
/********************************************************
如何预防这种操作? 防止内部的私有变量被外部操作修改,
1. 将 obj 的 prototype 设置为 null, 让他无法沿着原型链向上查找属性
2. 直接使用 Object.freeze 方法冻结 obj, 保证他的值无法被修改
3. 获取属性时候用 hasOwnProperty 判断属性是否是自身的属性
*/

var o = (function () {
  var obj = {
    a: 1,
    b: 2,
  };
  // 1. 让obj无法沿着原型链查找属性属性
  // Object.setProtypeOf(obj, null)

  // 2. 冻结对象, 让属性无法被修改
  // Object.freeze(obj)

  return {
    // 3. 获取值的时候判断是否是自身的属性(推荐,最直观)
    get(key) {
      if (obj.hasOwnProperty(key)) {
        return obj[key];
      }
    },
  };
})();
```

:::
