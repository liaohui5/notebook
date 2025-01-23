## 安装 vite

```sh
# 推荐直接全局安装
npm i -g vite

# 直接用官方模板插件项目: https://vitejs.dev/guide/#trying-vite-online
# 或者也可以实用社区模板: https://github.com/vitejs/awesome-vite#templates
npm create vite@latest my-vue-app --template vue

# vue 就是模板的名字, 如果想插件 react 项目
npm create vite@latest my-react-app --template react
```

## 手动配置环境

### 安装依赖

```sh
# vue2 项目依赖
npm i @vitejs/plugin-vue2 -D
npm i vue@2 vue-router@3 vuex@3

# vue3 项目依赖, vuex 可以替换为 pinia 使用哪个包都可以
npm i @vitejs/plugin-vue -D
npm i vue@3 vue-router@4 vuex@4

# react 项目依赖
npm i @vitejs/plugin-react -D
npm i react@18 react-dom@18 react-router@6 react-router-middleware-plus
# react-router-middleware-plus: 路由中间件
```

### vue2 项目配置

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
```

### vue3 项目配置

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
});
```

### raect 项目配置

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

## 一些有用的插件配置

### 注入替换字符

这个插件可以将源码中的一些 "特殊字符串" 替换为想要的值(只在打包的时候执行), 这个非常有用, 有时候需要在调试控制台中输出一些打包信息, 或者在某些 API 中返回 `package.json` 文件中的内容

::: code-group

```js [配置 vite.config.js]
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import { replaceCodePlugin } from "vite-plugin-replace";
import pkgJson from "./package.json";
import dayjs from "dayjs"; // 注意: 请先安装 dayjs

// 将源码中的 from 替换为 to
const replacements = [
  {
    from: "__BUILD_TIME__",
    to: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    from: "__BUILD_VERSION__",
    to: pkgJson.version,
  },
];

export default defineConfig({
  plugins: [vue(), replaceCodePlugin({ replacements })],
});
```

```js [在源码中使用]
// src/utils.js
export const version = "__BUILD_VERSION__";

// src/App.vue
import { version } from "./utils";
console.log(version);
```

```sh [安装依赖]
npm i vite-plugin-replace -D
```

:::

### 自动导入插件配置

- [自动导入一些API](https://github.com/unplugin/unplugin-auto-import)
- [自动导入UI组件库](https://github.com/unplugin/unplugin-vue-components#importing-from-ui-libraries)

不要自动导入太多东西, 只将一些特别常用的库设置为自动导入即可(如: vue composition api) `ref reactive cmoputed`
因为这种的一看就知道这个API是做什么用的, 如果滥用这个插件, 就会导致看代码的时候不知道方法是从哪里来的, 还需要去看配置文件

::: code-group

```js [自动导入 API 配置]
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import { resolve as resolvePath } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        // 哪些文件需要自动导入?
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/,
      ],
      imports: [
        // 1. 使用插件默认的自动导入预设, 支持哪些预设? 请看这里:
        // https://github.com/unplugin/unplugin-auto-import/tree/main/src/presets
        'vue',

        // 2.自定义自动导入
        {
          axios: [
            ['default', 'axios'], // 自动导入 axios
          ],

          // 导入格式如下:
          // "[package-name]": [
          //   "[import-names]",
          //   ["[from]", "[alias]"],
          // ],


          // 2.1 自动导入类型
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true,
          },
          dts: true,

          // 2.3 禁止 eslint 检测报错
          eslintrc: {
            enabled: false,
            // filepath: './.eslintrc-auto-import.json',
            globalsPropValue: true,
          },
        },
      ],
    }),
  ],
});
```

```ts [自动导入UI组件库配置]
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { resolve as resolvePath } from "path";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImportComponents from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("./src"),
    },
  },
  plugins: [
    vue(),
    AutoImportComponents({
      // 自动按需导入 element-plus
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      resolvers: [ElementPlusResolver()],
    }),
  ],
});
```

:::

### 多页应用配置

> 为什么要使用多页应用的开发方式?

虽然大多数情况下, 单页应用已经足够解决问题了, 但是, 单页应用有个很明显的缺陷, 那就是 SEO 不够友好,
因为所有东西都是js动态生成的, 而搜索引擎的爬虫是不会去执行js的, 但是有的时候, `需要写一些静态的
"企业官网" 这种多个页面的某一部分高度相似, 而且需要控制不同页面的 title meta 标签, 并且不能是用js动态生成的`
那么就需要用一些工具手动来实现 "组件化"

> 既然要使用多页, 为什么不直接手写?

1. 直接手写源码不会打包压缩等
2. 直接手写不好实现 "组件化", 虽然 jquery 有 `$.load` 这样的方法可以实现复用, 但是那种是需要发送请求的

> "组件化"

注意: 这里的组件化, 并不是和 vue 或 react 中的组件一样, 直接使用虚拟DOM去实现的,
只是利用模板引擎的导入功能然后编译实现复用(相当于复制多份)

> PUG 模板引擎学习

Pug 是一个用 JavaScript 实现的高性能的模板引擎，支持 Node.js 和浏览器运行环境，其灵感来自 [Haml](https://haml.info/) 项目

- [github](https://github.com/pugjs/pug)
- [官方文档](https://pugjs.org/api/getting-started.html)
- [中文文档](https://www.pugjs.cn/)

> 使用 vituum 插件

使用[vituum](https://github.com/vituum/vituum)插件就可以很方便的集成 `pug` 实现多页并且 "组件化"

> 配置示例

- https://github.com/lh5sa/vite-mpa
