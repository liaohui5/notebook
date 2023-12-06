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

```javascript
/**
 * 手动模拟实现bind方法
 * @param {*} context
 * @returns
 */
Function.prototype.$bind = function (context) {
  // 圣杯模式继承
  var $inherit = (function () {
    function Middleman() {}
    return function (child, parent) {
      Middleman.prototype = parent.prototype;
      child.prototype = new Middleman();
      child.prototype.constructor = child;
      child.super_class = parent;
    };
  })();

  var slice = Array.prototype.slice;
  var self = this;

  // 处理调用 $bind 时传入的参数, 第一个是要绑定的对象
  var args = slice.call(arguments, 1);
  var fn = function () {
    // args 是调用 $bind 方法时传入的参数
    // newArgs 是调用改变this指向后方法传入的参数
    var newArgs = slice.call(arguments);

    // 如果是通过new来实例化的方式来执行函数的, 此时的 self 指
    // 向构造函数, 那么此时的 this 就是 self 的实例如果不是,
    // 证明是普通的函数调用
    var o = this instanceof self ? this : context;
    self.apply(o, args.concat(newArgs));
  };

  // 把构造函数当做普通函数来 bind, 然后改变这个构造函数的 this 指向(此时指向 obj)
  // 此时直接用 instanceOf 来判断的话, 是无法判断的, 因为 fn 的
  // prototype.constructor 与 self(Person) 的prototype.constructor 不一致
  // 此时需要让 fn 继承 self 就能解决问题!
  // 为什么不 fn.prototype = self.prototype 如果直接赋值, Person.prototype 上的属性可能会
  // 被 fn.prototype 修改
  $inherit(fn, self);
  return fn;
};

var obj = {
  id: 101,
  name: 'tom',
  firend: 'jerry',
};

function Person(name) {
  console.info('this: ', this);
  console.info('this.age: ', this.age);
  console.info(name);
}

var p2 = Person.$bind(obj, 'zs', 10);
new p2();

// 浏览器输出:
// this:  fn {}
// this.age undefined
// zs 10
```

## 手动实现 new 方法

`new` 关键字的本质就是执行构造函数, 创建一个对象并指向这个构造函数的实例
