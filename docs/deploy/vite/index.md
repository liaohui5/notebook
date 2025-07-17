## 介绍

由于 node.js 的发展, 让 js 成为不仅是一个只在浏览器中运行的编程语言,
也让js开发方式有了根本性的改变, ES6语法, 浏览器兼容这些以往比较难处理的问题
都可以通过打包的方式变得容易处理

## 打包工具分类

![compiler](https://raw.githubusercontent.com/liaohui5/images/main/images/202507171707881.png)

- TS编译层: 主要用于将 ts/js 高级语法转译为 js
- JS处理层: 主要用来处理 js 文件, 无法处理其他文件(如:css/img/font)
- 项目打包层: 用来打包整个项目 vite/webpack/rspack

这些分层并不是那么绝对的, 比如 `esbuild` 也可以用来打包,
但它只是提供编程接口和命令行, 所以如果用来打包不那么方便

只是根据这些工具的依赖关系来做的分层

## 编译层工具

或者应该叫 `转译器` 更贴切一些, 他们主要提供命令行或者编程接口

- [babel](https://babeljs.io/) js实现, 主要用来给 js 语法降级, 比如 es6 -> es5
- [esbuild](https://esbuild.github.io/) go 实现
- [tsc](https://www.typescriptlang.org/) JS 超集或者叫中间语言, 开是由 node.js 实现后改GO
- [oxc](https://oxc.rs/) Rust 实现
- [swc](https://swc.rs/) Rust 实现

## 处理层打包工具

- [rollup](https://rollupjs.org/): 老前辈后续很多工具的灵感来源
- [tsup](https://tsup.egoist.dev/): 今日之星,可以很方便的打包 typescript 库
- [tsdown](https://rolldown.rs/): 明日之星,速度很快,而且从 tsup 迁移很方便
- [rolldown](https://rolldown.rs): 明日执行,将作为 vite 的核心替换 rollup

## 项目打包层

- [webpack](https://webpack.js.org/): 老前辈,但是速度堪忧,且配置复杂,老项目可能用的多
- [rspack](https://rspack.rs/zh/): 号称Rust版本的webpack,但是用的人并不是那么多, npm下载量和github star 都不及 vite
- [vite](https://vite.dev): 速度快,配置简单

## vite 介绍

vite 是下一代的前端开发工具

一款开箱即用, 速度极快的的前端脚手架

插件兼容 [rollup](https://rollupjs.org/) 插件生态, 在开发时使用 [esbuild](https://esbuild.github.io/) 来编译, 速度极快

随着事件的推移, [rolldown](https://rolldown.rs/) 也发布了 `beta` 版本, rolldown 可以看作是 rust 版本的 esbuild, 但是接口会尽量适配 rollup

### vite 相关文档

- [Vite 配置](https://cn.vitejs.dev/config/)
- [Vite 插件](https://cn.vitejs.dev/plugins/)
- [vite 模板](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [vite 生态](https://github.com/vitejs/awesome-vite)
- [rolldown](https://rolldown.rs)

### vite 与 webpack

- 使用 esbuild 作为打包机, 而不是使用 babel, 开发环境编译速度更快
- 配置兼容 rollup 插件生态, 相对来说, 比 webpack 更适合用来打包 js 库

### vite 与 rollup

1. vite 是兼容 rollup 的, 或者说是增强版本的 rollup
2. vite 提供了更简洁的配置, 更适合用来打包有 html/css/ 且有需要编译的 js 框架独有文件(如: `.vue` `.jsx` 等)的项目
3. rollup 更适合用来打包仅有 js/ts 的项目, 要处理其他静态资源需要安装很多的插件, 配置不如 vite 简单

### vite 与 esbuild 的关系

vite 在开发环境使用了 esbuild 来将 js/ts 源码编译为 ast

### vite 与 rollup 与 rolldown

1. vite 是兼容 rollup 的, 但由于 rollup 使用 babel 来编译 js/ts 源码, 性能瓶颈是比较明显的, 这也是为什么 vite 在开发环境为什么要使用 esbuild 编译器而不是 babel 的原因, 开发环境使用 esbuild 而打包时使用 babel, 就会导致一些开发环境和编译结果的差异

2. 虽然 Go 写的 esbuild 已经非常快了, 但还是不如 rust 写的 `swc` `oxc`, 为了更极致的性能就有了 `rolldown` 这个项目, 既有 rust 工具链的速度, 又同时兼容 rollup 插件生态
