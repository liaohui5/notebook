## 介绍

> vite 是下一代的前端开发工具

一款开箱即用, 速度极快的的前端脚手架

插件兼容 [rollup](https://rollupjs.org/) 插件生态, 在开发时使用 [esbuild](https://esbuild.github.io/) 来编译, 速度极快

随着事件的推移, [rolldown](https://rolldown.rs/) 也发布了 `beta` 版本, rolldown 可以看作是 rust 版本的 esbuild, 但是接口会尽量适配 rollup

### 什么是编译器 compiler

- 将 js/ts 源代码, 转换成 AST(Abstract Syntax Tree, 翻译为中文就是: `抽象语法树`), 如 [babel](https://babeljs.io/), [esbuild](https://esbuild.github.io/), [Oxc](https://oxc.rs/), [swc](https://swc.rs/) 等

### 什么是打包器 bundler

- 工程化打包整个项目的源码, 比如 js 语法向下兼容, 压缩/混淆源代码, 处理 css/image/font 等静态资源

### rollup 和 vite 的关系

1. vite 是兼容 rollup 的, 或者说是增强版本的 rollup
2. vite 提供了更简洁的配置, 更适合用来打包有 html/css/ 且有需要编译的 js 框架独有文件(如: `.vue` `.jsx` 等)的项目
3. rollup 更适合用来打包仅有 js/ts 的项目, 要处理其他静态资源需要安装很多的插件, 配置不如 vite 简单

### vite 与 esbuild 的关系

vite 在开发环境使用了 esbuild 来将 js/ts 源码编译为 ast

### vite 与 rollup 与 rolldown 的关系

1. vite 是兼容 rollup 的, 但由于 rollup 使用 babel 来编译 js/ts 源码, 性能瓶颈是比较明显的, 这也是为什么 vite 在开发环境为什么要使用 esbuild 编译器而不是 babel 的原因, 开发环境使用 esbuild 而打包时使用 babel, 就会导致一些开发环境和编译结果的差异

2. 虽然 Go 写的 esbuild 已经非常快了, 但还是不如 rust 写的 `swc` `oxc`, 为了更极致的性能就有了 `rolldown` 这个项目, 既有 rust 工具链的速度, 又同时兼容 rollup 插件生态

### vite 与 postcss 的关系

在 vite 中默认就已经集成了 [postcss](https://postcss.org/), 只需要配置好 postcss 的配置文件, 然后就可以使用 postcss 的插件

## vite 与 webpack 的不同

- 使用 esbuild 作为打包机, 而不是使用 babel, 开发环境编译速度更快
- 配置兼容 rollup 插件生态, 相对来说, 比 webpack 更适合用来打包 js 库

## rollup 相关文档

- [rollup 文档](https://rollupjs.org/)
- [rollup 插件](https://github.com/rollup/plugins)
- [rollup 生态](https://github.com/rollup/awesome)

## vite 相关文档

- [Vite 配置](https://cn.vitejs.dev/config/)
- [Vite 插件](https://cn.vitejs.dev/plugins/)
- [vite 模板](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
- [vite 生态](https://github.com/vitejs/awesome-vite)
- [rolldown](https://rolldown.rs)

## 打包器

- [esbuild](https://esbuild.github.io/)
- [babel](https://babeljs.io/)
