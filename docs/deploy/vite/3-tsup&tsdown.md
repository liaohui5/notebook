## 为什么不使用 rollup?

最开始的时候 rollup 就是用来打包 js libary 的,
随着社区的发展才逐渐支持 typescript 打包, 虽然支持但是打包配置比较复杂,
打包速度也并不理想(如果不使用 swc 的话), 而且不支持打包 `.d.ts` 文件

## tsup 介绍

[tsup](https://tsup.egoist.dev/) 对标 [rollup](https://rollupjs.org/) 是一个基于 [esbuild](https://esbuild.github.io/) 实现的 TypeScript 的打包工具

## 快速开始

### 初始化项目

```sh
mkdir -p ./tsup-demo/src && cd tsup-demo
pnpm init
pinpm i typescript tsup -D
tsc --init
```

### 目录结构

现在假设已经写好了一个 typescript 项目, 并且开始打包

```txt
.
├── dist
│   ├── index.d.mts
│   ├── index.d.ts
│   ├── index.js
│   ├── index.js.map
│   ├── index.mjs
│   └── index.mjs.map
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── src
│   ├── config
│   │   ├── default.ts
│   │   ├── development.ts
│   │   ├── production.ts
│   │   └── test.ts
│   ├── config.schema.ts
│   ├── config.ts
│   └── index.ts
├── tsconfig.json
└── tsup.config.ts

4 directories, 18 files
```

### 配置文件

::: code-group

```ts [tsup 配置文件]
import { defineConfig } from "tsup";

// 全部选项: https://www.jsdocs.io/package/tsup
// prettier-ignore
export default defineConfig({
  entry: ["src/index.ts"], // 打包的入口文件, 和 rollup 类似
  splitting: false,        // 是否开启代码分割
  sourcemap: true,         // 是否生成 sourcemap 文件
  clean: true,             // 打包之前清理上一次打包的结果
  dts: true,               // 打包时生成类型声明文件 .d.ts
  format: ["cjs", "esm"],  // 编译后的 js 使用的模块规范(多个就输出多份结果)
  minify: false,           // 是否压缩打包后的代码
  treeshake: true,         // 打包时清理没有用到的代码
});
```

```json [package.json]
{
  "name": "tsup-demo",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup"
  },
  "packageManager": "pnpm@10.13.1",
  "devDependencies": {
    "tsup": "^8.5.0",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@types/lodash-es": "^4.17.12",
    "lodash-es": "^4.17.21",
    "zod": "^4.0.5"
  }
}
```

```jsonc [tsconfig.json]
{
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "target": "es2016",
    "module": "es6",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noImplicitAny": true,
    "noEmit": true,
    "noUnusedLocals": true,
    "types": [],
    "baseUrl": ".",
    "paths": {
      "@/": ["./src/*"],
    },
  },
  "exclude": ["**/dist/**", "**/.nuxt/**", "**/nuxt.d.ts", "**/examples/**", "**/docs/**", "**/playground/**"],
}
```

:::

### 源码实现

::: code-group

```ts [src/index.ts]
import { ConfigManager } from "./config";

export type { ConfigType, PartialConfigType } from "./config.schema";
export type { NodeEnv } from "./config";
export const config = new ConfigManager();
```

```ts [src/config.ts]
import { configSchema, ConfigType, PartialConfigType } from "./config.schema";
import { merge, has, get } from "lodash-es";

// config files
import defaultConfig from "./config/default";
import testConfig from "./config/test";
import productionConfig from "./config/production";
import developmentConfig from "./config/development";

export type NodeEnv = "development" | "test" | "production";

export class ConfigManager {
  private config: ConfigType;

  constructor() {
    const baseConfig: ConfigType = defaultConfig;
    this.config = baseConfig;
  }

  init(nodeEnv: NodeEnv = "development") {
    const configMaps: Record<NodeEnv, PartialConfigType> = {
      development: developmentConfig,
      test: testConfig,
      production: productionConfig,
    };
    const currentConfig: PartialConfigType = configMaps[nodeEnv];
    this.config = merge(this.config, currentConfig); // merge defaultConfig and currentConfig
    this.config = configSchema.parse(this.config);
    console.log(`[config]initialized`);
    console.log(this.config);
  }

  get(keyPath: string) {
    if (keyPath === "*") {
      return this.config;
    }
    return get(this.config, keyPath);
  }

  has(keyPath: string): boolean {
    return has(this.config, keyPath);
  }
}
```

```ts [src/config.schema.ts]
import { z } from "zod"; // zod v4

export const configSchema = z.object({
  isDev: z.boolean(),
  timezone: z.string().default("Asia/Beijing").optional(),
  database: z.looseObject({
    dialect: z.string(),
    host: z.string(),
    port: z.number(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
    // autoLoadModels: z.boolean().default(true).optional(),
  }),
});
export type ConfigType = z.infer<typeof configSchema>;
export type PartialConfigType = Partial<ConfigType>;
```

```ts [src/config/default.ts]
import type { ConfigType } from "../config.schema";

const config: ConfigType = {
  isDev: true, // 是否开启调试模式
  timezone: "Asia/Shanghai",
  database: {
    dialect: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "postgres",
    password: "postgres123456",
    database: "", // can be override it by other configure
    autoLoadModels: true,
  },
};

export default config;
```

```ts [src/config/production.ts]
import { PartialConfigType } from "../config.schema";
export default {
  isDev: false,
  database: {
    database: "production",
  },
} as PartialConfigType;
```

```ts [src/config/delvelopment.ts]
import { PartialConfigType } from "../config.schema";
export default {
  isDev: true,
  database: {
    database: "dev",
  },
} as PartialConfigType;
```

```ts [src/config/test.ts]
import { PartialConfigType } from "../config.schema";
export default {
  isDev: true,
  database: {
    database: "test",
  },
} as PartialConfigType;
```

:::

虽然 tsup 使用起来已经足够简单了, 但是开源社区的工具总是层出不穷,
一言不合就搞个新的, 最近又有个 [tsdown](https://tsdown.dev/) 出来了, 而且与 rolldown 结合的非常好,
且有中文文档, 上手非常简单, 等rolldown发布 1.0 release 版本, 应该就可以直接无缝切换到 tsdown 了

## tsdown 介绍

[tsdown](https://tsdown.dev/) 是对标 [tsup](https://tsup.egoist.dev/) 基于 [rolldown](https://rolldown.rs/) 开发的 TypeScript 的打包工具

### 前置准备

假设已经学习过 tsup, 现在要从 tsup 直接迁移到 tsdown

```sh
# 复制 tsup-demo 项目的代码, 不用重新写了, 主要是学习打包
cp -r ./tsup-demo ./tsdown-demo

# 卸载 tsup
pnpm remove tsup

# 安装 tsdown
pnpm install tsdown -D
```

### 从 tsup 迁移

```sh
npx tsdown migrate

# 这个操作会自动读取 tsup.config.ts 配置文件
# 并且据此生成 tsdown.config.ts 配置文件
# 然后删除原来的 tsup.config.ts 的配置文件
```

### 修改 package.json

```json{2,7,11}
{
  "name": "tsdown-demo",
  "version": "0.0.1",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsdown"
  },
  "packageManager": "pnpm@10.13.1",
  "devDependencies": {
    "tsdown": "^0.12.9",
    "typescript": "^5.8.3"
  },
  "dependencies": {
    "@types/lodash-es": "^4.17.12",
    "lodash-es": "^4.17.21",
    "zod": "^4.0.5"
  }
}
```

### 再次执行打包

发现没有任何问题, 使用 js 导入打包后的文件等都没有什么问题, 可能是我的代码比较简单

```sh
pnpm run build
```

### 注意

虽然 tsup/tsdown 都可以正常打包, 但是现阶段(2025-07-15)
rolldown 毕竟还是 beta 版本, 所以我的建议是,
生产环境还是用 tsup, 个人项目/学习 可以使用 tsdown 尝鲜
后续等 tsdown 进入 release 状态, 就可以无缝直接切换过去
