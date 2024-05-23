## 模块作用

主要负责数据的响应式依赖收集和触发

## 主要实现 API


## vue 是如何实现响应式的?

1. 在获取值的时候收集依赖(所谓的依赖其实就是一个函数)
2. 在设置值的时候触发依赖执行

## 为何要在 proxyHandler 对象的 set 中使用 Reflect API?

```js

Reflect.set(target, key, value, receiver);

// why?
target[key] = value;
```




