## 面相过程 Procedural Programming

面向过程编程是一种编程范式,它强调程序执行的过程和步骤,在这种范式中,
程序是由一系列过程(或子程序,函数)组成的,每个过程完成特定的任务,
面向过程编程的主要目的是通过模块化来组织代码,使得代码更加清晰和易于维护

特点包括:

- 模块化: 将程序分解成小的可重用的功能块
- 顺序执行: 通常按照代码的顺序执行
- 变量作用域: 定义了变量在何处可用
- 数据和行为分离: 数据和对数据的操作通常是分开的

```js
// 举个例子: 造车

// 车的属性
var width = 10;
var length = 25;
var height = 15;
var color = '#ff0000';

// 造车的过程
function makeCar() {
  makeLayout();
  makeEnginer();
  makeTires();
  putParts();
}

// 制造车架
function makeLayout() {}

// 制造引擎
function makeEnginer() {}

// 制造轮胎
function makeTires() {}

// 组装
function putParts() {}
```

## 面向对象 Object-Oriented Programming(OOP)

面向对象编程是一种编程范式, 它使用"对象"来设计软件,
对象是数据和处理这些数据的方法的封装体, OOP的核心思想
是将现实世界中的事物抽象为对象, 并通过类来描述这些对象的属性和行为

> 什么是类?

类是一类事物的抽象(比如: 人类)

> 什么是对象?

对象是一个具体的实际例子(比如: 小明)

特点包括:

- 封装: 隐藏对象的内部状态和实现细节, 只暴露必要的接口给外部
- 继承: 子类可以从父类那里继承属性和方法, 减少代码重复
- 多态: 同一接口可以有多种不同的实现方式(这个特点在 JS 这样的弱类型语言中无法体现, 但是在 TS 中可以)
- 抽象: 定义接口或抽象类, 不提供具体实现, 由子类去完成

```js
// 举个例子: 造车

// 1.首先将 车 这个概念做一个抽象, 有哪些属性和行为
class Car {
  width: 10;
  length: 25;
  height: 15;

  constructor() {
    makeLayout();
    makeEnginer();
    makeTires();
    putParts();
  }

  // 制造车架
  makeLayout() {}

  // 制造引擎
  makeEnginer() {}

  // 制造轮胎
  makeTires() {}

  // 组装
  putParts() {}
}


// 2.在使用的时候不需要关心, 具体的实现, 只需要使用封装好的方法即可
function makeCar() {
  var car = new Car();
  return car;
}
```

## 扩展:函数式编程 Functional Programming

函数式编程是一种编程范式, 它把计算过程视为一系列函数的组合,
函数式编程强调函数的纯度, 即函数的输出只依赖于输入参数, 没有副作用

特点包括:

- 不可变性: 数据一旦创建就不能被改变
- 纯函数: 函数的结果只取决于输入参数, 且没有副作用
- 递归: 经常使用递归来解决问题而不是循环
- 高阶函数: 函数可以接受其他函数作为参数, 也可以返回函数作为结果
