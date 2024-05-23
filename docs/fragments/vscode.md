## 下载地址:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Code Insider](https://code.visualstudio.com/insiders/)

## 字体推荐

这些字体很适合编程, 很好的区分了 `0` 和 `O`, `i` 和 `l` 等不容易区分的字符

- [Hack](https://github.com/source-foundry/Hack)
- [victor-mono](https://rubjo.github.io/victor-mono/)
- [JetBrainsMono](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/JetBrainsMono/Ligatures)
- [Hack Nerd Font Mono](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Hack)
- [Maple Nerd Font](https://gitee.com/subframe7536/Maple/releases/tag/v5.5)
- [Operator Mono SSM Nerd Font Lig](https://github.com/liaohui5/Operator-Mono-SSm-Nerd-Lig)
- [Monaco Nerd Font Complete Mono](https://github.com/Karmenzind/monaco-nerd-fonts)
- [More Nerd Fonts](https://github.com/ryanoasis/nerd-fonts#patched-fonts)

## VSCodeVim 插件使用

### 为什么在 IDE 中使用 vim

鱼和熊掌: `vim: 快捷键强大+文本操作效率高` + `ide: 好看+开箱即用, 不用各种复杂的配置`

### 安装 vim 插件

- [vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim) 或 [cvim](https://marketplace.visualstudio.com/items?itemName=cuixiaorui.cvim)
- [Vim Search and Replace](https://github.com/nilehmann/vscode-vim-search-and-replace)

### vim 搜索替换

可以使用 `vim` 插件自带的, 但是感觉 `vim` 美中不足的就是 `vscode` 的状态栏是在太小了,
可以使用 `Vim Search and Replace ` 这个插件来代替 `vim` vscode 的状态栏太小的问题

### easymotion 快速移动

- `s+[搜索关键字]`: 搜索移动
- `<leader>j`: 向下移动行
- `<leader>k`: 向上移动行
- `leader键` 默认是 `\`, 也就是说如果想向上移动就 `\\k`, 但是我习惯修改为 `<Space>`

### camelCaseMotion 大小写单词移动

- `<leader>w`: 向后移动一个单词(下一个单词的第一个字符) `helloWorld` 在 `h` 处按下就移动到 `W` 位置
- `<leader>e`: 向后移动一个单词(当前单词的最末尾字符) `helloWorld` 在 `h` 出按下就移动到 `o` 位置
- `<leader>b`: 向前移动一个单词(移动到当前单词的第一个字符) `helloWorld` 在 `d` 处按下就移动到 `W` 位置

### vim-surround 快速修改环绕字符

| 命令        | 说明                              |
| :---------- | :-------------------------------- |
| ds \<char\> | 删除指定环绕字符                  |
| cs \<char\> | 修改指定环绕字符                  |
| S \<chars\> | 添加指定的环绕字符(visual 模式下) |

所谓 `环绕字符` 就是 `""` `()` `[]` `{}` 这样的成对出现包裹中间内容的字符

假如说目标文本是这样的: `"<h2>hell</h2>"`, 将光标移动到 `hello` 任意字符上(normal 模式下)

- `ds "`: 删除两边的 "
- `cs " '`: 将俩边的 `"` 修改为 `'`
- visual 模式下选中 `hello` 这个字符再执行: `S <h2>` 就可以添加 \<h2\>hello\<\/h2\>

### 类似 VIM 的 which-key 插件使用

- 快捷键菜单 [which-key](https://marketplace.visualstudio.com/items?itemName=VSpaceCode.whichkey)
- 快捷键菜单配置项目, 如 lunarVIM 那样的预配置项目 [vspacecode](https://marketplace.visualstudio.com/items?itemName=VSpaceCode.vspacecode)
- [vspacecode](https://vspacecode.github.io/docs/) 说明文档

## 代码风格控制

### EditorConfig

> 注意: 不同编辑器需要下载对应的插件

- [官方文档](https://editorconfig.org/)
- [github 选项参考](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)
- [vscode 语法支持插件](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [vscode 一键生成配置文件插件](https://marketplace.visualstudio.com/items?itemName=nepaul.editorconfiggenerator)

```ini
# 控制 .editorconfig 是否生效的字段
root = true

# 缩进风格：空格
indent_style = space

# 缩进大小2
indent_size = 2

# 换行符lf
end_of_line = lf

# 字符集utf-8
charset = utf-8

# 是否删除行尾的空格
trim_trailing_whitespace = true

# 是否在文件的最后插入一个空行
insert_final_newline = true

# 一行最大字符数 off 关闭
max_line_length = off

# 单独控制 不同类型文件的 格式化规则
[*.php]
indent_size = 4

[*.md]
insert_final_newline = false
```

### prettier

[Prettier](https://prettier.io) 是一个 JavaScript 代码格式化工具，可以让代码更符合一致的风格和格式,
[vscode插件](https://github.com/prettier/prettier-vscode) 支持

```js
// 配置文件名: prettier.config.mjs
// 配置项参考: https://prettier.io/docs/en/options
/* prettier-ignore */
export default {
  printWidth: 120,         // 一行多少个字符
  tabWidth: 2,             // 一个 tab 多少个空格
  useTabs: false,          // 是否使用空格缩进
  semi: true,              // 是否在语句最后添加分号
  singleQuote: true,       // 使用单引号
  trailingCommas: 'all',   // none | all | es5 是否在行尾添加逗号
  bracketSpacing: true,    // 在 () {} 前后添加空格
  alwaysParens: true,      // 给箭头函数参数添加()
};
```

## 调试 vue/react 项目

推荐阅读 [调试配置官方文档](https://go.microsoft.com/fwlink/?linkid=830387) [调试配置中文文档](https://www.bookstack.cn/read/CN-VScode-Docs/md-%E7%BC%96%E8%BE%91%E5%99%A8-%E8%B0%83%E8%AF%95.md) [各种项目调试配置](https://github.com/microsoft/vscode-recipes/tree/master)

### 调试 vue.js 项目

其实大多数时候更多的调试用的是 `vue-devtools` 和 `console.log`,
但是用编辑器调试并不是什么难事, 而且可以看到代码的运行流程, 这个很重要,
可以用来调试别人写好的开源项目的源码, 所以就学习记录以下
[官网的具体步骤](https://cn.vuejs.org/v2/cookbook/debugging-in-vscode.html)

### 1.修改打包程序配置文件, 开启 source-map

```js
// vue-cli: vue.config.js
module.exports = {
  configureWebpack: {
    devtool: 'source-map',
  },
};

// vite: vite.config.js
export default defineConfig({
  build: {
    sourcemap: true,
  },
});
```

### 2.生成 debug 配置文件

1. 点击 `Debug` -> `Run and Debug` -> `Web App(Chrome)`
2. 点击之后会生成 `.vscode/launch.json`, 且内容如下
3. 如果不想点击, 手动创建也是没有问题的

```jsonc
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:8080", // 这个位置修改项目的运行url
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

### 3.启动测试

1. 启动项目

```bash
npm run dev
```

2. 先在项目中使用加断点, 或者手动使用 `debugger` 语句

![add-breakpoint](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172208993.png)

3. 启动调试

配置好之后, 直接按快捷键 `F5` 或者手动点击启动

![start-debugger](https://raw.githubusercontent.com/liaohui5/images/main/images/202109172211038.png)

4. 调试 react 的步骤和上面是一样的

## 调试 node.js 项目

不管是 `express` 还是 `koa` `egg.js` 调试步骤都是一样的, 主要是 `launch.json` 中的配置

### 1. 创建项目环境

```bash
# 1. 安装 express 项目
npx express-generator express-debug-demo # 用脚手架创建项目
cd express-debug-demo
npm i

# 2. 安装 nodemon 方便调试, 不用脚手架自带的那个, 不好用
npm i nodemon -D

```

```json
# 3. 修改 `package.json`, 添加调试的 scripts
"scripts": {
  "dev": "nodemon ./bin/www",
  "start": "node ./bin/www"
},
```

### 2. 创建调试配置文件

在项目目录下新建 `.vscode/launch.json`

```json
{
  // https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      // 这个 program 配置选项很重要,如果你不是用脚手架创建的
      // 而是手动安装express然后导入的方式, 就要写你自己的
      // 入口文件路径比如 ${workspaceFolder}/app.js
      "program": "${workspaceFolder}/bin/www",
      "restart": true,
      "console": "integratedTerminal",
      "skipFiles": ["${workspaceRoot}/node_modules/**/*.js", "<node_internals>/**/*.js"]
    }
  ]
}
```

### 3.调试/查看效果

1. `F5` 或者手动开启 debug
2. 加断点
3. 发送请求, 让加断点位置的代码执行

![debug-preview](https://raw.githubusercontent.com/liaohui5/images/main/images/202109180131602.png)

### 4. 调试 egg.js 的调试配置

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "debug-egg-server",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceRoot}",
      "runtimeExecutable": "npm",
      "windows": { "runtimeExecutable": "npm.cmd" },
      "runtimeArgs": ["run", "debug"],
      "console": "integratedTerminal",
      "protocol": "auto",
      "restart": true,
      "port": 9229,
      "autoAttachChildProcesses": true
    }
  ]
}
```

## 开发 vscode 插件

推荐阅读[快速开始](https://liiked.github.io/VS-Code-Extension-Doc-ZH/#/get-started/your-first-extension)
