---
outline: deep
---

## 项目介绍

这个 `mini-vue` 是根据开源项目 [mini-vue](https://github.com/cuixiaorui/mini-vue) 及其作者提供的视频教程, 自己实现了一遍做的笔记

## 为什么要学习源码

学习源码的目的就是为了自己能够写出更优秀的代码, 就跟阅读一样, 日积月累, 否则就会 `书到用时方恨少`
比如: 当形容一件事情会慢慢变好的的情况, `苦尽甘来` 这种简单的成语, 谁都会
但是你能够想到 `阳和启蛰` , 别人就不一定会了, 所谓的竞争力, 这不就有了吗?
切记不可为了应付面试去学习源码, 这样会让你陷入 `差不多就行了` 这样一种心理暗示,
平时学习的时候一直 `差不多就行了`, 那么日积月累就会 `差很多`

## 关于单元测试

1. 首先, 单元测试的测试例子就是最好的文档,
2. 再者, 单元测试可以快速验证代码逻辑是否正确
3. 还有, 要看懂这个笔记, 必须要有单元测试的基础

测试框架使用 [vitest](https://vitest.dev/), 为什么不适用 `jest`? 因为这个框架的常用API兼容 `jest`, 而且开箱即用, 不用任何配置

## 关于 TypeScript

TypeScript 是一种编程语言(简称 ts), 它扩展了 JavaScript,
增加了静态类型检查, 以帮助开发人员在开发过程中更快地发现错误.
TypeScript 还支持许多其他高级特性,如接口,模块,泛型等, 使它成为一种强大的编程语言

而且, Vue3 就是使用 TypeScript 开发的, 所以会必须要求有 TypeScript 的基础

```ts
// 与 js 最大的不同就是会检测数据的类型
function sum(nums: Array<number>): number {
  let result: number = 0;
  for (let i = 0, l = nums.length; i < l; i++) {
    result += nums[i];
  }
  return result;
}

// 无法通过编译器检查, 在写代码的时候就可以直接知道错误
sum(['1', '2']);

// 必须是这样的才可以
sum([1, 2]);

// 更多特性, 请查看 ts 的笔记
```

## ES6 基础

因为 vue3 是 es6 的语法, 所以必须要有 es6 语法的基础

- [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
- [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) [WeakSet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

## vue 源码全局概览

- [vuejs github source code](https://github.com/vuejs/core)

### 源码目录结构

```txt
├── .circleci // CI 配置目录
├── .ls-lint.yml // 文件命名规范
├── .prettierrc // 代码格式化 prettier 的配置文件
├── CHANGELOG.md  // 更新日志
├── LICENSE
├── README.md
├── api-extractor.json // TypeScript 的API提取和分析工具
├── jest.config.js  //  测试框架 jest 的配置文件
├── node_modules
├── package-lock.json
├── package.json
├── packages // Vue源代码目录
├── rollup.config.js  // 模块打包器 rollup 的配置文件
├── scripts
├── test-dts // TypeScript 声明文件
├── tsconfig.json // TypeScript 配置文件
└── yarn.lock
```

主要关注 `packages` 目录, 其他的目录不是很重要, 大多为一些开发工具的配置文件

```txt
├── compiler-core     // 编译核心(将字符串编译为抽象语法树)
├── compiler-dom      // DOM的实现(将ast渲染为实际的 dom)
├── compiler-sfc      // Vue单文件组件(.vue)的实现
├── compiler-ssr
├── global.d.ts
├── reactivity        // 响应是 API(如: reactive/readonly/ref/computed)
├── runtime-core
├── runtime-dom
├── runtime-test
├── server-renderer   // 服务端渲染实现
├── shared            // package 之间共享的工具库
├── size-check
├── template-explorer // 官网上将模板转换为代码的工具: https://template-explorer.vuejs.org/
└── vue               // 打包候的文件
```

### 源码模块依赖关系

```txt
                  +---------------------+    +----------------------+
                  |                     |    |                      |
    +------------>|  @vue/compiler-dom  +--->|  @vue/compiler-core  |
    |             |                     |    |                      |
+----+----+       +---------------------+    +----------------------+
|         |
|   vue   |
|         |
+----+----+       +---------------------+    +----------------------+    +-------------------+
    |             |                     |    |                      |    |                   |
    +------------>|  @vue/runtime-dom   +--->|  @vue/runtime-core   +--->|  @vue/reactivity  |
                  |                     |    |                      |    |                   |
                  +---------------------+    +----------------------+    +-------------------+
```

### 目标

当我们需要深入学习 vue3 时,
我们就需要看源码来学习,
但是像这种工业级别的库,
源码中有很多逻辑是用于处理边缘情况或者是兼容处理逻辑,
是不利于我们学习的, 所以 实现一个迷你版本的 vue.js,
主要实现 3 大模块就可以了, 按照这个套路就可以理清楚 vuejs 所有的主线逻辑了

- reactivity

  - reactive 的实现
  - ref 的实现
  - readonly 的实现
  - computed 的实现
  - track 依赖收集
  - trigger 触发依赖
  - 支持 isReactive
  - 支持嵌套 reactive
  - 支持 toRaw
  - 支持 effect.scheduler
  - 支持 effect.stop
  - 支持 isReadonly
  - 支持 isProxy
  - 支持 shallowReadonly
  - 支持 proxyRefs

- compiler-core

  - 解析插值
  - 解析 element
  - 解析 text

- runtime-core + runtime-dom
  - 支持 custom renderer

## pnpm monorepo

> 什么是 monorepo ?

Monorepo 是一个大型仓库,其中包含多个相互关联的子项目.与传统多仓库方法相比,它允许更高效地管理和协作开发多个项目.
Monorepos 提供了一个统一的地方来存储所有相关的代码和资源,使得团队更容易共享代码和资源,减少重复工作,并保持一致性和可维护性.此外,它们还提供了一种简单的方法来构建跨多个项目的大型软件系统.
在实践中,Monorepos 主要有以下特点:

单一的仓库和版本控制系统:在一个 Monorepo 中,所有相关的项目都存储在同一仓库中,并使用相同的版本控制系统进行管理.这使得团队可以更轻松地共享代码和资源,并减少重复工作.
统一的依赖关系:在 Monorepos 中,所有的项目都使用相同的依赖关系,这使得团队可以更容易地共享依赖项和模块,并避免了复杂的依赖冲突问题.
一次性构建:Monorepos 允许团队进行一次性构建,而无需分别构建每个项目.这意味着团队可以更快地迭代和发布新的功能和更新.
测试和部署的便捷性:由于 Monorepos 存储了所有相关的代码和资源,因此团队可以更容易地执行跨多个项目的一致性测试和部署.
总之,Monorepos 是一种有效的软件开发和协作模式,它有助于提高效率,降低复杂性,并实现更好的可维护性和一致性.

> 为什么使用这种方式来管理源码?

因为 `vue/core` 就是这么做的, 尽可能和 vue 源码的结构保持一致

