---
outline: deep
---

## 介绍

TailwindCSS 是一种实用优先（utility-first）的 CSS 框架, 它的核心设计理念是通过提供一系列预先定义好的、可以直接应用于 HTML 元素上的原子类（atomic classes）, 帮助开发者快速构建自适应、一致且高度自定义的用户界面。这种框架不强调组件级别的抽象, 而是专注于单个样式属性, 允许开发人员通过简单地组合这些预设的类名来精细控制元素样式。
TailwindCSS 提供了诸如间距、尺寸、颜色、排版、动画等多种 CSS 样式类别, 并且高度可配置, 允许开发者根据项目需求调整或者扩展默认的样式集。通过配置文件, 开发者可以定制一套符合设计系统的样式集合, 并利用工具自动编译生成最精简的生产环境 CSS 文件。
由于其原子化的设计, TailwindCSS 特别适用于那些需要快速原型制作或重视设计系统一致性, 并希望避免编写大量重复或一次性使用的自定义 CSS 样式的项目。随着 JIT（Just In Time）模式的引入, TailwindCSS 还能动态生成仅包含实际使用的类的 CSS, 从而极大地减少最终生成的 CSS 体积。

## 相关文档

- [官方文档](https://tailwindcss.com/docs/installation)
- [中文文档](https://www.tailwindcss.cn/docs/installation)
- [在线练习](https://play.tailwindcss.com/)

## 快速开始

结合vite和vue [查看官网操作](https://www.tailwindcss.cn/docs/guides/vite#vue)

### 安装

```sh
# 创建项目
pnpm create vite tailwindcss-demo --template vue

# 安装依赖
cd tailwindcss-demo && pnpm install

# 安装 tailwindcss 和 postcss 及其 autoprefixer 插件
pnpm install tailwindcss postcss autoprefixer -D

# 初始化 tailwindcss 和 postcss 配置文件
# 执行后会生成: tailwind.config.js 和 postcss.config.js
pnpm tailwind init -p
```

### 修改配置文件

::: code-group

```js [tailwind.config.js]
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css [src/style.css]
@tailwind base;
@tailwind components;
@tailwind utilities;
```

:::

### 修改 App.vue

```html
<template>
  <h1 class="text-3xl text-red-500 font-bold underline">Hello world!</h1>
</template>
<script setup></script>

<style scoped></style>
```

### 查看效果

```sh
pnpm dev
```

打开浏览器查看 `http://localhost:5173`
