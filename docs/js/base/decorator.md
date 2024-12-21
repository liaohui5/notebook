## 装饰器

装饰器(Decorator)用来增强 JavaScript 类(class)的功能, 许多面向对象的语言都有这种语法,
目前有一个提案将其引入了 ECMAScript

装饰器的本质就是一个函数, `@log` 类似这样来修饰, 按照其装饰的目标, 可以分为失踪类型

- 类装饰器
- 类属性(包括属性和方法)装饰器

## 定义装饰器

装饰器的本质就是一个函数, 它的ts签名如下

```ts
type Decorator = (value: Input, context: {
  kind: string; // 被装饰的目标的类型
  name: string | symbol; // 被装饰的目标的变量名
  access: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  private?: boolean; // 被装饰的目标是否是私有的
  static?: boolean; // 被装饰的目标是否是静态的
  addInitializer?(initializer: () => void): void;
}) => Output | void;
```

## 类装饰器

由于js默认不支持装饰器语法, 所以采用ts

```ts
// 单例模式装饰器, 被装饰的类只会有一个实例
function Singleton(originalClass: any, ctx: { kind: string }) {
  if (ctx.kind !== "class") {
    throw new TypeError("Singleton decorator can only be used on classes");
  }

  class Middleman {
    static _instance: typeof originalClass;

    constructor(...args: any[]) {
      if (!Middleman._instance) {
        Middleman._instance = Reflect.construct(originalClass, args, originalClass);
      }
      return Middleman._instance;
    }
  }
  Object.setPrototypeOf(Middleman.prototype, originalClass.prototype);
  Object.setPrototypeOf(Middleman, originalClass);

  return Middleman as typeof originalClass;
}

// 使用装饰器
@Singleton
class Tools {
  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  shuffle<T>(items: T[]): T[] {
    if (items.length < 1) {
      return [];
    }
    return [...items].sort(() => Math.random() - 0.5);
  }
}

// 测试部分
const t1 = new Tools();
const t2 = new Tools();

console.log(t1);
console.log(t1 === t2);
console.log(t1.random(1, 10));
console.log(t2.shuffle([1, 2, 3, 4, 5])); // 输出一个 [1, 2, 3, 4, 5] 的随机排列

// 装饰器的本质:
// var Tools = Singleton(Tools) || Tools;
```

## 类属性装饰器

::: code-group
```ts [类方法装饰器]
function trace(target: any, ctx: { kind: string }) {
  if (ctx.kind !== "method") {
    throw new TypeError("trace decorator can only be applied to methods");
  }
  function tracedMethod(...args: any[]): any {
    console.log(`${target.name} called with args ${args} at ${Date.now()}`);
    return Reflect.apply(target, target, args);
  }
  return tracedMethod;
}

class Tools {
  @trace
  random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  shuffle<T>(items: T[]): T[] {
    if (items.length < 1) {
      return [];
    }
    return [...items].sort(() => Math.random() - 0.5);
  }
}

// 测试部分
const t = new Tools();
t.random(1, 10)
```

```ts [类属性装饰器]
// _v: 一定是 undefined
function logged(_v: undefined, { kind, name }) {
  if (kind === "field") {
    // initialValue 初始化时传入的值(这个函数只会在出似化时调用一次)
    return function (initialValue: any) {
      console.log(`initialize field ${name} with value ${initialValue}`);
      return initialValue;
    };
  }
}

class Tools {
  @logged
  count: string = "123";

  @logged
  name: string = "tools module";
}

new Tools(); 
// output: initialize count with value 123
// output: initialize name with value some tools module
```

:::
