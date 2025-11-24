## JavaScript 执行环境介绍

JavaScript 本身是作为一种能够在浏览器中增强用户交互的脚本语言来使用, 随着社区的发展,
Chrome浏览器的V8引擎单独移植出来,在此基础之上, 为其上层的JavaScnpr提供了友好的API, 且开源免费,
使其能够与操作系统交互, 也就是所此时的 js 已经不仅仅是只 是用于浏览器增强用户交互, 还可以进行服务端编程,
而这个运行环境就是知名的 [NodeJS](https://nodejs.org/)

这也就是说, 同一份代码, 既可以在浏览器中运行, 也能脱离浏览器使用 node.js 环境来运行

这也同时带来了一个问题: 并不是所有的浏览器API在 Nodejs 中都支持

## API 主要分类两类

- 内置API: 不论在浏览器还是在nodejs环境中都可以使用的 API
- 特定环境的API: 只有在特定环境才能使用的API, 比如在 nodejs 中才有的 `fs`, 只在浏览器中可使用的 `document` 等

## 内置 API

### 全局对象

#### 值

- [Infinity](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity)

- [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

- [undefined](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)

#### 函数

- [eval()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval)

- [isFinite()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite)

- [isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN)

- [parseInt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

- [parseFloat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

- [encodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

- [decodeURI()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURI)

- [encodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

- [decodeURIComponent()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent)

### 基本对象

- [Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)

- [Function](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)

- [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

- [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

- [Error](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

### 数字和日期

- [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

- [Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)

- [Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

### 字符串处理

- [String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)

- [RegExp](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

### 索引集合

- [Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

- [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

### 键值集合

- [Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

- [WeakMap](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

- [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

- [WeakSet](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

### 结构化数据

- [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

- [JSON](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON)

### 抽象控制对象

- [Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

- [Iterator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

- [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## Web API

HTML5 Web API 是一组用于构建Web应用程序的API集合,它们为Web开发者提供了更多的功能以增强用户体验

这些API允许Web应用执行更复杂的任务,如离线存储,访问设备硬件(例如摄像头和麦克风), 绘制图形, 播放音频和视频等

### 在线 MDN 文档

https://developer.mozilla.org/zh-CN/docs/Web/API

### API 功能简单介绍

1. 中断请求API [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 和 [AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)
2. 注释节点构造器 [Comment](https://developer.mozilla.org/zh-CN/docs/Web/API/Comment)
3. 自定义事件构造器 [CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)
4. 文档对象构造器 [Document](https://developer.mozilla.org/zh-CN/docs/Web/API/Document)
5. 文档碎片构造器 [DocumentFragment](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment)
6. DOM 异常 [DOMException](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)
7. 可将一个 xml/html 字符串解析为 Document 的解析器 [DOMParser](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMParser)
8. 表示一组空格分隔的标记, 比如 element.classList [DOMTokenList](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMTokenList)
9. [元素基类](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) [HTML标签基类](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement) [SVG 元素基类](https://developer.mozilla.org/zh-CN/docs/Web/API/SVGElement)
10. [事件对象基类](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
    和 [事件源对象基类](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 都是用于处理事件相关内容
11. [监听DOM变化](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 和 [监听DOM变化产生的记录](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationRecord)
12. [Node接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 和 [NodeList 节点集合](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList) 都是比较底层的基类
13. 用户交互事件相关
    - [Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)
    - [Pointer Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Pointer_Events)
    - [Touch Events](https://developer.mozilla.org/zh-CN/docs/Web/API/Touch_Events)
    - [CompositionEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CompositionEvent)
    - [FocusEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/FocusEvent)
    - [InputEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/InputEvent)
    - [MouseEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)
    - [MouseScrollEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseScrollEvent)
    - [WheelEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/WheelEvent)

14. 输出调试内容到开发者工具栏 [Console API](https://developer.mozilla.org/zh-CN/docs/Web/API/console)
15. 老异步请求接口: [XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 新异步请求接口: [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
16. [操作系统剪切板API](https://developer.mozilla.org/zh-CN/docs/Web/API/Clipboard_API)
17. [文件上传相关API](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API)
18. [浏览器全屏API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fullscreen_API)
19. [浏览器拖放API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)
20. [不同文档通信交互API, 如当前 document 和 iframe 中的 document](https://developer.mozilla.org/zh-CN/docs/Web/API/Channel_Messaging_API)
21. [创建唯一 URL 和 url 字符串处理](https://developer.mozilla.org/zh-CN/docs/Web/API/URL_API)
22. [浏览器本地存储](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)
23. [自定义元素相关API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)
24. [测试web应用性能的API](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance_API)
25. [后台线程运行脚本API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)
26. [用于在客户端存储大量的结构化数据API](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)
27. [监听元素大小变化API](https://developer.mozilla.org/zh-CN/docs/Web/API/Resize_Observer_API)
28. [操作鼠标选中内容API](https://developer.mozilla.org/zh-CN/docs/Web/API/Selection)
29. [交叉观察器API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API) 可用于检测元素是否可见(在视口中)
30. [浏览器中渲染 3D 图形API](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API)
31. [操作CSS样式表相关API](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration)

## NodeJS API

Node.js 是一个开源, 跨平台的 JavaScript 运行环境,
它允许开发者使用JavaScript编写服务器端的应用程序,
Node.js 是基于 Chrome V8 引擎构建的,
这意味着它能够快速执行JavaScript代码

### 在线中文文档

- [node.js api v18](https://nodejs.cn/api-v18/)
- [node.js v20](https://nodejs.cn/api/v20/cli.html)
- [node.js v22](https://nodejs.cn/api/cli.html)

### NodeJS 常用模块

1. [命令行参数](https://nodejs.cn/api/cli.html)
2. [输出调试信息到控制台](https://nodejs.cn/api/console.html)
3. [文件系统](https://nodejs.cn/api/fs.html)
4. [路径操作](https://nodejs.cn/api/path.html)
5. [HTTP服务器](https://nodejs.cn/api/http.html)
6. [网络相关API](https://nodejs.cn/api/net.html)
7. [URL字符串操作API](https://nodejs.cn/api/url.html)
8. [GET请求查询参数字符串API](https://nodejs.cn/api/querystring.html)
9. [系统功能API](https://nodejs.cn/api/os.html)
10. [定时器](https://nodejs.cn/api/timers.html)
11. [二进制流API](https://nodejs.cn/api/stream.html)
12. [网络流API](https://nodejs.cn/api/webstreams.html)
13. [错误处理API](https://nodejs.cn/api/errors.html)
14. [全局对象API](https://nodejs.cn/api/globals.html)
15. [事件触发(发布订阅模式)API](https://nodejs.cn/api/events.html)
16. [单步调试](https://nodejs.cn/api/debugger.html)
17. [子进程API](https://nodejs.cn/api/child_process.html)
18. [当前进程信息API](https://nodejs.cn/api/process.html)
