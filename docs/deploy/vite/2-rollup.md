## 介绍

Rollup 是一个现代的 JavaScript 模块打包工具, 特别适合用于构建库(library)
它专注于生成更小、更高效的代码, 并且支持 ES6 模块(ESM), 且支持多个模块化打包规范(cjs/esm/amd/umd/iife), 特别适合用来打包 JS 工具库代码(因为可能要兼容多种运行环境)

## 安装

```sh
pnpm i -g rollup
```

## 快速开始

::: code-group

```sh [创建项目]
mkdir rollup-demo
cd rollup-demo
pnpm init -y

# 安装 rollup 打包
pnpm i rollup -D

# 创建 rollup 配置文件
touch rollup.config.js

# 创建源码目录和文件
mkdir src
touch src/index.js
```

```json [package.json]
{
  "type": "module",
  "scripts": {
    "dev": "rollup -w -c rollup.config.js",
    "build": "rollup -c rollup.config.js"
  }
}
```

```js [rollup.config.js]
// 虽然一些简单的打包命令可以使用命令行直接运行, 如:
// npx rollup ./src/index.js --format esm --file ./dist/index.js
// 但是, 一般需要打包的项目大多比较复杂, 所以还是使用配置文件比较合适

// 注意了: 如果要使用 esm, 要么在 package.json 中指定 "type": "module"
// 要么就使用 .mjs 作为配置文件的后缀
export defualt {
	// 输入(要打包的文件入口)
	input: "./src/index.js",

	// 输出(打包好的结果, 可以是多个(使用数组语法))
	output: {
		file: "./dist/index.js",
		format: "esm", // 指定输出的模块规范: cjs/esm/amd/umd/iife
	}

  // 打包多个结果
  // output: [
  //   {
  //     file: "./dist/index.esm.js",
  //     format: "esm",
  //   },
  //   {
  //     file: "./dist/index.cjs.js",
  //     format: "cjs",
  //   },
  //   {
  //     file: "./dist/index.iife.js",
  //     format: "iife",
  //   },
  // ]
}
```

```js [src/index.js]
// 修改源码
console.log(import.meta.url);

// 打包 pnpm run dev
// 运行 node ./dist/index.js
```

:::

## 使用插件

1. 找到你需要功能对应的插件, [可以到这里去找](https://github.com/rollup/awesome)

2. 安装 & 在配置文件中配置插件(文档会有详细的配置说明)

3. 举个例子: 我需要在导入时将 json 文件解析为一个对象的插件 [json](https://github.com/rollup/plugins/tree/master/packages/json)

::: code-group

```js [配置插件]
import json from "@rollup/plugin-json";

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    format: "esm",
  },

  // plugins 字段用来配置插件, 具体插件的参数可以参考插件的文档
  // https://github.com/rollup/plugins/tree/master/packages/json
  plugins: [
    json({
      namedExports: true, // 具名导出, 默认为 true
      preferConst: true, // prefer const, 默认为 false
      // preferConst 选项的意思是, 如果为 true, 那么代码中会生成 const, 否则生成 var
      // 可以通过修改这个选项, 然后再次打包, 查看打包后的结果代码
    }),
  ],
};
```

```js [在源码中导入 json 文件测试]
// file: src/index.js
import { name, version } from "../package.json";

console.log("package.json name and version fields:", name, version);

// 再次打包: pnpm run build
// 直接运行: node ./dist/index.js
// 输出结果: package.json name and version fields: rollup-demo 1.0.0
// 说明插件配置生效了, 成功在导入时将 package.json 转成 ESModule
```

```js [查看编译后的js代码]
// file: dist/index.js
const name = "rollup-demo";
const version = "1.0.0";

console.log("package.json name and version fields:", name, version);
```

```sh [安装依赖]
pi @rollup/plugin-json -D
```

:::

## 将依赖模块打包到编译结果中

默认情况下, rollup 不会将 node_modules 中的依赖打包到结果中

::: code-group

```js [修改源码 src/index.js]
// 修改源码, 再次打包
import { name, version } from "../package.json";
import _ from "lodash";

console.log("package.json name and version fields:", name, version);

console.log("lodash concat", _.concat([1, 3, 5], 7, 8, 9, [2, 4, 6]));
```

```js [编译结果 dist/index.js]
// 查看编译后的结果
import _ from "lodash";

const name = "rollup-demo";
const version = "1.0.0";

console.log("package.json name and version fields:", name, version);
console.log("lodash concat", _.concat([1, 3, 5], 7, 8, 9, [2, 4, 6]));
```

```sh [安装依赖]
pnpm install lodash
```

:::

使用 [node-reolsve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
和 [commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs) 插件,
将 node_modules 中的依赖打包到结果中

::: code-group

```js [修改配置 rollup.config.js]
import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    format: "esm",
  },

  plugins: [
    json({ namedExports: true, preferConst: true }),
    commonjs(), // 将(依赖) commonjs 规范转为 esm 规范(如果使用 lodash-es 就不需要这个插件)
    nodeResolve(), // 将 node_modules 中的依赖打包进 dist/index.js
  ],
});

// 修改配置后, 再次编译, 查看编译结果
// 对比之前的编译结果, 对比之前的结果发现,
// lodash 直接被打包进了编译结果, 而不是一个 import 语句
```

```sh [安装依赖]
pnpm i @rollup/plugin-commonjs @rollup/plugin-node-resolve -D
```

:::

## 实现打包结果代码拆分

依赖模块和逻辑,分开为多个 js

::: code-group

```js [修改源码 src/index.js]
import { name, version } from "../package.json";
import { concat } from "lodash";
import dayjs from "dayjs";

// 在这个代码中, lodash 和 dayjs 是单独的模块, 如果全部放到一个文件中会
// 导致文件特别大, 在打包结果中应该单独一个文件, 才比较合理
// index.js lodash-xxxhashstr.js dayjs-xxxhashstr.js
console.log("package.json name and version fields:", name, version);
console.log("lodash concat:", concat([1, 3, 5], 7, 8, 9, [2, 4, 6]));
console.log("today is:", dayjs().format("YYYY-MM-DD"));
```

```js [修改配置 rollup.config.js]
import path from "node:path";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.js",
  output: {
    // 使用 file 表示将所有打包结果都放到 ./dist/index.js 中
    // file: "./dist/index.js",

    // 使用 dir 表示放到这个目录下, 但是有多少个文件不指定,
    // 也就是说打包结果可以有多个文件
    dir: "./dist",
    format: "esm",

    // 自定义打包分块
    manualChunks(id) {
      console.log("[manualChunks]id:", id);

      // 如果路径中包含 node_modules 那么就返回这个模块的文件名
      if (id.includes("node_modules")) {
        // 打包结果会根据这个返回的文件名+内容hash生成对应的文件名
        return path.parse(id).name;
      }
    },
  },

  plugins: [
    json({
      namedExports: true,
      preferConst: true,
    }),
    commonjs(),
    nodeResolve(),
  ],
});
```

```txt [打包结果目录结构]
.
├── biome.json
├── dist
│   ├── dayjs.min-CW_ZQSLs.js
│   ├── index.js
│   └── lodash-BCsobEEq.js
├── node_modules
├── package.json
├── pnpm-lock.yaml
├── rollup.config.js
└── src
    └── index.js
```

:::

## 编译结果兼容低版本浏览器

在有的时候, 因为可能要兼容多种运行环境, 希望在一些低版本浏览器也可以
(比如 chrome66) 正常运行, 那么此时就需要使用 `babel` 转译

::: code-group

```js [配置 rollup.config.js]
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.js",
  output: {
    // 这个和打包分多个文件没有关系就先把其他代码注释掉了
    file: "./dist/index.js",
    format: "esm",

    // 打包结果使用插件转译
    plugins: [getBabelOutputPlugin({ presets: ["@babel/preset-env"] })],
  },

  plugins: [
    json({
      namedExports: true,
      preferConst: true,
    }),
    commonjs(),
    nodeResolve(),
    babel({
      // 插件选项请查看这个 👇链接
      // https://github.com/rollup/plugins/blob/master/packages/babel/README.md#babelhelpers
      babelHelpers: "bundled", // 确保所有的 helpers 都被内联
      exclude: "node_modules/**", // 不需要转译 node_modules 中的内容
    }),
  ],
});
```

```js [配置 babel.config.js]
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        // 根据实际用到的特性自动插入 polyfill
        useBuiltIns: "usage",

        // 使用 core-js@4 提供 polyfills
        corejs: 3,
        targets: {
          // 目标浏览器列表: chrome66, 这个浏览器版本还不支持 class 语法
          chrome: "66",
        },
      },
    ],
  ],
};
```

```js [修改源码 src/index.js]
// 这些与编译结果语法兼容低版本浏览器无关,先注释掉
// import { name, version } from "../package.json";
// import { concat } from "lodash";
// import dayjs from "dayjs";
// console.log("lodash concat:", concat([1, 3, 5], 7, 8, 9, [2, 4, 6]));
// console.log("today is:", dayjs().format("YYYY-MM-DD"));
// console.log("package.json name and version fields:", name, version);

// 增加一些高版本浏览器才支持的ES6语法
class Foo {
  items = [1, 3, 5, 7, 9];

  each() {
    for (const item of this.items) {
      console.log("item value is:", item);
    }
  }
}

const foo = new Foo();
foo.each();
```

```js [dist/index.js]
// 重新打包再吃打包, 发现 class 语法被转译为 function 语法了
// 这就说明编译结果转译高版本语法没有问题
var Foo = /*#__PURE__*/ (function () {
  function Foo() {
    _classCallCheck(this, Foo);
    _defineProperty(this, "items", [1, 3, 5, 7, 9]);
  }
  return _createClass(Foo, [
    {
      key: "each",
      value: function each() {
        var _iterator = _createForOfIteratorHelper(this.items),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var item = _step.value;
            console.log("item value is:", item);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },
    },
  ]);
})();
var foo = new Foo();
foo.each();

// !!! 这个代码并不全, 因为有很多依赖函数如 _classCalcheck 都比较长
// 所有没有粘贴过来, 只是看核心代码已经可以知道 class 语法被 babel 转译了
```

```sh [安装依赖]
pnpm install -D @rollup/plugin-babel @babel/core @babel/preset-env
```

:::

## 压缩编译结果

需要使用 [@rollup/plugin-terser](https://github.com/rollup/plugins/tree/master/packages/terser#readme) 插件

::: code-group

```js [rollup.config.js]{16}
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.js",
  output: {
    file: "./dist/index.js",
    format: "esm",

    plugins: [
      getBabelOutputPlugin({ presets: ["@babel/preset-env"] }),
      terser(), // 注意这个插件是用来处理输出结果的, 所以应该放在这里
      // 修改配置文件后, 再次打包, 发现输出结果已经变为1行了
    ],
  },

  plugins: [json(), commonjs(), nodeResolve(), babel()],
});
```

```sh [安装依赖]
pnpm install @rollup/plugin-terser -D
```

:::

## 编译 TypeScript

::: code-group

```js [修改源码 src/index.ts]
class Foo {
  items: number[] = [1, 3, 5, 7, 9];

  each() {
    for (const item of this.items) {
      console.log("item value is:", item);
    }
  }
}

const foo = new Foo();
foo.each();
```

```js [修改配置 rollup.config.js]{6,28}
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
    plugins: [
      getBabelOutputPlugin({ presets: ["@babel/preset-env"] }),
      terser(),
    ],
  },

  plugins: [
    json({
      namedExports: true,
      preferConst: true,
    }),
    commonjs(),
    nodeResolve(),
    babel(),
    typescript(),
  ],
});
```

```jsonc [TSC配置 tsconfig.json]
{
  "include": ["./src/**/*.ts"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
    },
    "declaration": true, // 是否生成 .d.ts 类型声明文件
    "outDir": "./dist/",
    "skipLibCheck": true,
  },
}
```

```sh [安装依赖]
pnpm install rollup-plugin-typescript2 typescript -D
```

:::

## rollup 配置文件使用 typescript

::: code-group

```ts [修改配置]
// 将 rollup.config.js 修改为 rollup.config.ts
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
    plugins: [
      getBabelOutputPlugin({ presets: ["@babel/preset-env"] }),
      terser(),
    ],
  },

  plugins: [json(), commonjs(), nodeResolve(), babel(), typescript()],
});
```

```jsonc [修改 package.json 打包命令]{8,9}
{
  "name": "rollup-demo",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "type": "module",
  "scripts": {
    "dev": "rollup -w -c rollup.config.ts --configPlugin @rollup/plugin-typescript",
    "build": "rollup -c rollup.config.ts --configPlugin @rollup/plugin-typescript",
  },
  // ...
}
```

```sh [安装依赖]
pnpm i @rollup/plugin-typescript -D
```

:::

## 其他常用插件

- [alias](https://github.com/rollup/plugins/tree/master/packages/alias) 配置别名类似 `vite.config.js` 中的 `resolve.alias` 选项

- [replace](https://github.com/rollup/plugins/tree/master/packages/replace) 注入替换字符串, 在输出打包版本时非常有用

- [strip](https://github.com/rollup/plugins/tree/master/packages/strip) 移除 `debugger` `console.log` 等调试语句

- [swc](https://github.com/rollup/plugins/tree/master/packages/swc) 使用 swc 编译源码而不是 babel
