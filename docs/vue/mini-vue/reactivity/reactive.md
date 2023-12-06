## 实现基础 API

- reactive/shallowReactive/isReactive
- readonly/shallowReadonly/isReadonly

::: code-group

```ts [reactive]
import { isObject } from '@mini-vue/shared';

// 响应式标志
export const enum ReactiveFlags {
  IS_READONLY = '__v_isReadonly',
  IS_REACTIVE = '__v_isReactive',
  IS_SHALLOE = '__v_isShallow',
}

// 带有响应式标志的类型接口
export interface Target {
  [ReactiveFlags.IS_READONLY]?: boolean;
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_SHALLOE]?: boolean;
}

// target 对象支持的 key 的类型
export type TargetKey = string | symbol;

// 创建一个响应式对象
export function reactive<T extends object, K extends keyof T>(raw: T): T {
  if (!isObject(raw)) {
    return raw;
  }

  return new Proxy(raw, {
    get: (target: Target, key: TargetKey, receiver: object): any => {
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
      }

      const value = Reflect.get(target, key, receiver);
      // 如果要实现 shallowReactive 也非常简单
      // 注释下面递归调用的代码就可以, 同理实现 shallowReadonly
      if (isObject(value)) {
        return reactive(value);
      }

      return value;
    },
    set: (target: T, key: TargetKey, value: T[K], receiver: object): boolean => {
      return Reflect.set(target, key, value, receiver);
    },
  });
}

// 创建一个只读的对象, 修改就报警告
export function readonly<T extends object>(raw: T): T {
  return new Proxy(raw, {
    get: (target: Target, key: TargetKey, receiver: object) => {
      if (key === ReactiveFlags.IS_READONLY) {
        return true;
      }
      const value = Reflect.get(target, key, receiver);
      if (isObject(value)) {
        return readonly(value);
      }
      return value;
    },
    set: () => {
      throw new TypeError('can not modify readonly property');
    },
  });
}

// 判断一个值是否是 reactive 函数的返回值
export function isReactive(value: any): boolean {
  return isObject(value) && Boolean(value[ReactiveFlags.IS_REACTIVE]);
}

// 判断一个值是否是 readonly 函数的返回值
export function isReadonly(value: any): boolean {
  return isObject(value) && Boolean(value[ReactiveFlags.IS_READONLY]);
}

// 判断一个值是否是 reactive/readonly 函数的返回值
export function isProxy(value: any): boolean {
  return isReactive(value) || isReadonly(value);
}
```

```ts [reactive.spec.ts]

```

```ts [shared/isObject]
/**
 * value is object or not
 * @param {unknown} value
 * @returns {boolean}
 */
export function isObject(value: unknown): boolean {
  return value !== null && typeof value === 'object';
}
```

:::

## 思考 & 重构

不难发现, `readonly` 和 `reactive` 的主体逻辑差不多, 而且重复代码偏多, 所以应该封装抽离

<span style="color:#f00">
注: 重构代码后, 要再次执行所有的测试用例, 保证重构候的代码还是能够执行, 返回我们想要的结果
<br/>
重构代码的心法口诀: 新的创建, 老的不变, 新的成功, 老的再见
</span>

::: code-group

```ts [reactive.ts]
import { isObject } from '@mini-vue/shared';
import { reactiveHandler, readonlyHandler } from './baseHandlers';

export const enum ReactiveFlags {
  IS_READONLY = '__v_isReadonly',
  IS_REACTIVE = '__v_isReactive',
  IS_SHALLOE = '__v_isShallow',
}

export interface Target {
  [ReactiveFlags.IS_READONLY]?: boolean;
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_SHALLOE]?: boolean;
}
export type TargetKey = string | symbol;

export const reactiveMap = new WeakMap<Target, any>();
export const readonlyMap = new WeakMap<Target, any>();

// 创建一个响应式对象
export function createReactiveObject(target: Target, baseHandlers: ProxyHandler<any>, proxyMap: WeakMap<Target, any>) {
  if (!isObject(target)) {
    console.warn("'target' must be an object");
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}

// 创建一个响应式对象
export function reactive<T extends object>(raw: T): T {
  return createReactiveObject(raw, reactiveHandler, reactiveMap);
}

// 创建一个只读的对象, 修改就报警告
export function readonly<T extends object>(raw: T): T {
  return createReactiveObject(raw, readonlyHandler, readonlyMap);
}

// 判断一个值是否是 reactive 函数的返回值
export function isReactive(value: any): boolean {
  return isObject(value) && Boolean(value[ReactiveFlags.IS_REACTIVE]);
}

// 判断一个值是否是 readonly 函数的返回值
export function isReadonly(value: any): boolean {
  return isObject(value) && Boolean(value[ReactiveFlags.IS_READONLY]);
}

// 判断一个值是否是 reactive/readonly 函数的返回值
export function isProxy(value: any): boolean {
  return isReactive(value) || isReadonly(value);
}
```

```ts [baseHandlers.ts]
import { isObject } from '@mini-vue/shared';
import { type Target, type TargetKey, ReactiveFlags, readonly, reactive } from './reactive';

export const reactiveHandler = {
  get: (target: Target, key: TargetKey, receiver: object): any => {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return true;
    }

    const value = Reflect.get(target, key, receiver);
    if (isObject(value)) {
      return reactive(value);
    }

    return value;
  },
  set: (target: Target, key: TargetKey, value: any, receiver: object): boolean => {
    return Reflect.set(target, key, value, receiver);
  },
};

export const readonlyHandler = {
  get: (target: Target, key: TargetKey, receiver: object) => {
    if (key === ReactiveFlags.IS_READONLY) {
      return true;
    }
    const value = Reflect.get(target, key, receiver);
    if (isObject(value)) {
      return readonly(value);
    }
    return value;
  },
  set: (): boolean => {
    throw new TypeError('can not modify readonly property');
  },
};
```

```ts [再次重构 baseHandlers.ts]
// 不难发现, baseHandlers.ts 导出的文件,  都是类型结构相同的对象, 
// 那么我们可以再一次高阶函数来封装创建这些对象的方法
// 注意: 重构要一步一步来, 上一次重构通过单元测试后, 再重构 baseHandlers

```

:::
