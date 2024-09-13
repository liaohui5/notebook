

## 对象属性的几种类型

1. 自身的普通属性
2. Symbol 作为 key 的属性
3. 通过 Object.defineProperty 及 [修饰符对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#description) 定义的属性(主要不可枚举的, 因为对于读取来说可枚举的属性和普通的属性没区别)
4. 对象的原型对象的属性

```js
const obj = {
  id: 1,
  name: 'tom',
  email: 'tom@qq.com',
  [Symbol('private_property')]: 'xxx',
};

Object.setPrototypeOf(obj, {
  proto_property: 'prototype property value',
});

Object.defineProperty(obj, 'cannotIteratable', {
  value: 'cannotIteratable',
  enumerable: false, // 是否可以枚举(迭代)
  readable: true, // 是否可读
  writable: true, // 是否可写
});
```

## 获取对象属性的方式

```js
// 1. .操作符
console.log(obj.name);

// 2. []动态获取属性
const k = 'name';
console.log(obj[k]);

// 3. Reflect.get
console.log(Reflect.get(obj, 'name'));

// 4. in: 能检测对象是否有某个属性
console.log('name' in obj);
```

## 遍历对象的几种方式及原理

### for...in

```js
function forIn(obj, handler, onlyOwnProperty = true) {
  if (obj === null || typeof obj !== 'object') {
    throw new TypeError('obj is not an object');
  }
  if (typeof handler !== 'function') {
    throw new TypeError('handler must be a function');
  }
  for (const key in obj) {
    const value = obj[key];
    if (onlyOwnProperty) {
      obj.hasOwnProperty(key) && handler(key, value, obj);
    } else {
      handler(key, value, obj);
    }
  }
}

const output = (key, val) => console.log({ key, val });

// for in 无法获取出 Symbol 属性 和不可迭代的属性
// { key: 'id': val: 1 }
// { key: 'name', val: 'tom' }
// { key: 'email', val: 'tom@qq.com' }
forIn(obj, output);

// 但是可以获取原型对象上的属性(当然一般是不需要这样操作的)
// { key: 'id': val: 1 }
// { key: 'name', val: 'tom' }
// { key: 'email', val: 'tom@qq.com' }
// { key: 'proto_property', val: 'prototype property value' }
forIn(obj, output, false);
```

### keys/values/entries

- Object.keys: 获取对象自身的可枚举的字符串键属性名组成的数组
- Object.values: 获取对象自身的可枚举的字符串键属性值组成的数组
- Object.entries: 获取对象自有的可枚举字符串键属性的键值对

```js
const keys = Object.keys(obj);
console.log('keys:', keys); 
// ['id', 'name', 'email']

const values = Object.values(obj);
console.log('values:', values);
// [1, 'tom', 'tom@qq.com']

const entries = Object.entries(obj); 
console.log('entries:', entries);
// [['id', 1], ['name', 'tom'], ['email', 'tom@qq.com']]

// 迭代器方法 无法获取出 Symbol 属性 和不可迭代的属性也无法获取原型对象上的属性
```

### Object.prototype.getOwnPropertyNames

获取对象中所有自有属性(包括不可枚举属性, 但不包括使用 symbol 值作为名称的属性)组成的数组

```js
const propNames = Object.getOwnPropertyNames(obj);
console.log(propNames); // ['id', 'name', 'email', 'cannotIteratable']

// 可以获取 自身的属性和不可迭代的属性, 但是无法获取 Symbol 属性和原型对象属性
```

### Reflect.ownKeys

获取对象自身的属性键组成的数组(有点像 Object.entries)

```js
const ownKeys = Reflect.ownKeys(obj);
console.log(ownKeys);
// ['id', 'name', 'email', 'cannotIteratable', Symbol(private_property)]

// 可以获取: 自身属性, 不可迭代属性, Symbol 属性, 但是无法获取原型对象的属性
```

### 几种遍历对象的区别

- for..in: 可以获取自身属性和原型对象的属性(1, 4), 不可获取其他属性
- keys/values/eniters: 可以获取自身的普通属性(1), 不可获取其他属性
- getOwnPropertyNames: 可以获取自身属性,不可枚举属性(1,3), 不可获取其他属性
- Reflect.ownKeys: 可以获取自身属性,不可枚举属性,Symbol 作为 key 的属性(1,3,4) 但是不能获取原型对象的属性
