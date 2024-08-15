## 介绍

DOM 是 `Document Object Model` 的缩写, 翻译为中文就是 `文档对象模型`, 简单来讲就是 针对 js 如何操作 html 文档接口的一系列接口合集

BOM 是 `Browser Object Model` 的缩写, 翻译为中文就是 `浏览器对象模型`, 简单来说就是针对浏览器相关的交互的方法和接口的合集

> 关于 BOM 的规范问题:

BOM 没有规范各家的浏览器对其功能的定义不同, 导致兼容性并不好

> 为什么单独放到这里而不是放到 WebAPI 中?

这些本来应该放到 WebAPI 中的, 但是 DOM 和 BOM 相比其他的 web api 更常用, 所以单独放到这方便查阅

## DOM 主要 API

- [https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal)
- [https://developer.mozilla.org/en-US/docs/Web/API/DOMException](https://developer.mozilla.org/en-US/docs/Web/API/DOMException)
- [https://developer.mozilla.org/en-US/docs/Web/API/DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)
- [https://developer.mozilla.org/en-US/docs/Web/API/Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)
- [https://developer.mozilla.org/en-US/docs/Web/API/EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
- [https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment)
- [https://developer.mozilla.org/en-US/docs/Web/API/Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)
- [https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord)
- [https://developer.mozilla.org/en-US/docs/Web/API/Attr](https://developer.mozilla.org/en-US/docs/Web/API/Attr)
- [https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap)
- [https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList)
- [https://developer.mozilla.org/en-US/docs/Web/API/Text](https://developer.mozilla.org/en-US/docs/Web/API/Text)
- [https://developer.mozilla.org/en-US/docs/Web/API/Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
- [https://developer.mozilla.org/en-US/docs/Web/API/Comment](https://developer.mozilla.org/en-US/docs/Web/API/Comment)
- [https://developer.mozilla.org/en-US/docs/Web/API/Node](https://developer.mozilla.org/en-US/docs/Web/API/Node)
- [https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator](https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator)
- [https://developer.mozilla.org/en-US/docs/Web/API/NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)
- [https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)

## BOM 的常用的对象

1. [window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window)

2. [navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 浏览器信息(可用于判断浏览器是否是: PC/手机/iOS/Android)

3. [history ](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 浏览器浏览记录

4. [location ](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 地址栏 URL 信息

5. [screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen) 屏幕相关信息
