## 1.创建对应的文件和目录

```sh
mkdir mini-vue && cd -
mkdir -p src/packages/reactivity
mkdir -p src/packages/shared
```

## 2. 初始化 package.json 等配置文件

::: code-group

```json [src/package.json]
{
  "name": "mini-vue",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "vitest"
  },
  "engines": {
    "node": ">=18",
    "pnpm": ">=8"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "happy-dom": "^12.10.3",
    "typescript": "^5.3.2",
    "vite": "^5.0.2",
    "vitest": "^0.34.6"
  }
}

```

```yaml [pnpm-workspace.yaml]
packages:
  - 'src/packages/*'   # 这个项目中所有的单独的包
  - '!**/__tests__/**' # 排除所有目录重点的 __tests__ 目录下的所有文件, 一般是单元测试
```

```json [src/tsconfig.json]
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* path: 让编辑器识别 vite 配置中的 @ 路径别名 */
    "baseUrl": "./",
    "paths": {
      "@mini-vue/reactivity": ["src/packages/reactivity/src/*"],
      "@mini-vue/shared": ["src/packages/shared/src/*"]
    },

    /* types: vitest/globals 不用全局导入, 就可以在测试文件中, 直接使用 expect toBe 等 API */
    "types": ["vite/client", "vitest/globals"]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

```js [prettier.config.mjs(可选)]
// 格式化代码工具 prettier 的配置文件
// docs: https://prettier.io/docs/en/options
export default {
  printWidth: 80,        // 一行多少个字符
  tabWidth: 2,           // 一个 tab 多少个空格
  useTabs: false,        // 是否使用空格缩进
  semi: true,            // 是否在语句最后添加分号
  singleQuote: true,     // 使用单引号
  trailingCommas: 'all', // 是否在行尾添加逗号
  bracketSpacing: true,  // 在 () {} 前后添加空格
  alwaysParens: true,    // 给箭头函数参数添加()
};
```

:::

## 3.安装项目的依赖包

```sh
pnpm install -w
```

## 4.初始化 reactivity 和 shared 包

```sh
cd src/packages/reactivity
mkdir src & mkdir __tests__
touch src/index.ts
pnpm  init -y

cd ../shared
mkdir src & mkdir __tests__
touch src/index.ts
pnpm init -y
```

## 5.编辑 isObject 方法

1. 实现并导出
2. 编写单元测试, 然后运行, 看单元测试是否能运行

::: code-group

```js [src/packages/shared/src/index.ts]
// fileName: src/packages/shared/src/index.ts
export const isObject = (value: unknown) => value!== null && typeof value === 'object';
```

```js [src/packages/shared/__tests__/index.spec.ts]
// fileName: src/packages/shared/src/index.ts
describe('isObject', () => {
  it('should return true when value is object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(new RegExp())).toBe(true);
    expect(isObject(new String())).toBe(true);
    expect(isObject(new Number())).toBe(true);
    expect(isObject(Math)).toBe(true);
  });

  it('should return false when value is null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false when value is boolean', () => {
    expect(isObject(false)).toBe(false);
    expect(isObject(true)).toBe(false);
  });

  it('should return false when value is number', () => {
    expect(isObject(1)).toBe(false);
  })
})
```

:::


## 6. 运行测试

做这一步, 主要是为了保证单元测试的环境没有问题

```sh
pnpm run test
```

## 7. 在 reactivity 中使用 isObject

1. 安装 @mini-vue/shared 依赖

```sh
cd src/packages/reactivity
pnpm i @mini-vue/shared
```

![](https://raw.githubusercontent.com/liaohui5/images/main/images/202311280109821.png)

2. 导入 isObject 方法

如果代码没有任何的报错和警告, 那么项目就可以直接开始开发了

```js
// fileName: src/packages/reactivity/src/index.ts
import { isObject } from '@mini-vue/shared';
console.log("isObject 调用成功", isObject(1))
```

