## 下载地址:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Code Insider](https://code.visualstudio.com/insiders/)

## 字体推荐

- [nerdfonts](https://www.nerdfonts.com/font-downloads)
- [programmingfonts](https://www.programmingfonts.org/#hack) 在线预览字体效果

## 设置

```json
{
  "window.commandCenter": false,
  "editor.fontSize": 18,
  "editor.fontLigatures": true,
  "editor.fontFamily": "'Hack Nerd Font Mono'",
  "editor.fontWeight": 300,
  "terminal.integrated.fontFamily": "'Hack Nerd Font Mono'",
  "terminal.integrated.fontSize": 16,
  "editor.codeLens": false,
  "editor.stickyScroll.enabled": false,
  "editor.accessibilitySupport": "off",
  "editor.wordWrap": "off",
  "editor.cursorWidth": 1,
  "editor.lineHeight": 1.4,
  "breadcrumbs.enabled": false,
  "editor.minimap.enabled": true,
  "editor.minimap.maxColumn": 100,
  "editor.minimap.renderCharacters": false,
  "editor.minimap.showSlider": "always",
  "editor.scrollbar.horizontal": "hidden",
  "editor.scrollbar.vertical": "hidden",
  "editor.scrollbar.horizontalScrollbarSize": 0,
  "editor.scrollbar.verticalScrollbarSize": 0,
  "editor.matchBrackets": "never",
  "editor.occurrencesHighlight": "singleFile",
  "git.confirmSync": false,
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.compactFolders": false,
  "files.autoSave": "onFocusChange",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "extensions.ignoreRecommendations": true,
  "update.mode": "start",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "Monokai",
  "workbench.settings.editor": "json",
  "workbench.settings.useSplitJSON": true,
  "material-icon-theme.hidesExplorerArrows": true,
  "workbench.startupEditor": "none",
  "extensions.experimental.affinity": {
    "asvetliakov.vscode-neovim": 1
  },
  "editor.defaultFormatter": "biomejs.biome",
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  "markdown-preview-github-styles.colorTheme": "light",
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[handlebars]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown.mdx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[shellscript]": {
    "editor.defaultFormatter": "foxundermoon.shell-format"
  },
  "redhat.telemetry.enabled": false
}
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
    devtool: "source-map",
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
      "skipFiles": [
        "${workspaceRoot}/node_modules/**/*.js",
        "<node_internals>/**/*.js"
      ]
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