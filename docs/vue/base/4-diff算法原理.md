## 环境准备

1. 下载 && 安装 && 启动

```sh
git clone https://github.com/liaohui5/vue-diff-demo
cd vue-diff-demo
npm install
npm run dev

# 打开浏览器访问: http://localhost:9527
```

2. 目录结构

```sh
.
├── LICENSE
├── index.html
├── js
│   ├── diff.js           # diff 比对算法主要功能实现
│   ├── index.js          # 导入并使用 diff/patch/vnode 查看效果
│   ├── patch.js          # 给真实dom打补丁(算法比对后的结果)
│   └── vnode.js          # 类似 vue render 的 h 函数, 创建虚拟节点, 将虚拟节点转真实节点等功能
├── package-lock.json
└── package.json
```

## virtual DOM & real DOM

```
vDOM         : virtual DOM          - 虚拟DOM(描述真实DOM的一个对象)
vNode        : virtual Node         - 虚拟节点(描述真实节点的一个对象)
vNodeUid     : virtual Node index   - 虚拟节点遍历时标记 VNode 的标记
rDOM         : real DOM             - 真实的 HTMLElement 元素
rNode        : real Node            - 真实的 HTMLElement 节点
rNodeUid     : real Node index      - 遍历真实的 HTMLElement节点 的标记
patchPackMap : virtual Node patch   - 虚拟节点补丁Map
```

## 源码实现

[https://github.com/liaohui5/vue-diff-demo](https://github.com/liaohui5/vue-diff-demo)

> 测试步骤

1. createVNode(h) 函数类似 Vue 的 h 函数, 传入3个参数(标签名, 属性集合, 子节点)
2. createVNode(h) 函数执行后返回一个 VirtualDOM
3. createRNode 函数可以把 VirtualDOM 转化为真实的 DOM 元素
4. mount 函数可以把 创建出来的 DOM 元素挂载页面指定的元素中

> 模拟内容更新后: 比较新老VirtualDOM差异, 然后给rNode打上补丁

1. diff: 比较新老VirtualDOM差异获得 patches
2. patch: 根据获得的 patches 去更新 realDOM, 更新UI

![diff-preview](https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/2026_06_18_04d7bdb9e8d17f5c24c5cc7c78bfe15b.png)

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="no-referrer" />
    <title>Vue Diff 算法简单实现</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- javascript -->
    <script type="module" src="./js/index.js"></script>
  </body>
</html>
```

```js
// js/index.js
import { h, render, mount } from "./vnode";
import { diff } from "./diff";
import { patch } from "./patch";

// 修改前的 virtualDOM
const oldVDom = h(
  "ul",
  {
    class: "list",
    style: "width: 300px; height: 300px; border: 1px solid #f00; color: #555;",
  },
  [
    h("li", { "data-index": 0, class: "item " }, [h("p", { class: "text" }, ["第一个列表项"])]),
    h("li", { "data-index": 1, class: "item" }, [
      h("p", { class: "text" }, [h("span", { class: "title" }, ["第二个列表项"])]),
    ]),
    h("li", { "data-index": 2, class: "item" }, ["第三个列表项"]),
  ],
);

// 模拟修改内容后的 virtualDOM
const newVDom = h(
  "ul",
  {
    class: "list-wrapper",
    style: "width: 300px; height: 300px; border: 1px solid #555; color:#f00;",
  },
  [
    h("li", { "data-index": 0, class: "item active" }, [h("p", { class: "text" }, ["第一个列表项"])]),
    h("li", { "data-index": 1, class: "item" }, [h("p", { class: "text" }, ["这是第二个li, 内容被替换了"])]),
    h("li", { "data-index": 2, class: "item" }, ["这是第3个被修改后的列表项内容"]),
  ],
);

// 根据老节点渲染出真实的DOM
const realDOM = render(oldVDom);

// 将真实dom挂载到页面元素中
mount(realDOM, document.getElementById("app"));

// newVDom模拟数据更新的过程 -> 对比新老VDom -> 获得补丁包
const patchMap = diff(oldVDom, newVDom);
console.log("🥧[patchMap]:", patchMap);

// 给真实节点打补丁
patch(realDOM, patchMap);
```

```js
// js/vnode.js
"use strict";

/**
 * 虚拟节点
 */
export class VNode {
  constructor(type, props, children = []) {
    this.type = type;
    this.props = props;
    this.children = children;
  }
}

/**
 * 处理html标签元素的属性 id="xxx" style="xxx" class="xxx"
 * @param {HTMLElement} element 真实DOM元素
 * @param {Object} attr 标签上的属性
 * @param {String} val 标签属性的值
 */
export function setAttrs(element, attr, val) {
  switch (attr) {
    case "value":
      if (["INPUT", "TEXTAREA"].includes(element.tagName)) {
        element.value = val;
      } else {
        element.setAttribute(attr, val);
      }
      break;
    case "style":
      element.style.cssText = val;
      break;
    default:
      element.setAttribute(attr, val);
      break;
  }
}

/**
 * 把虚拟dom变成真实的dom元素
 * @param {VNode} vDom      虚拟DOM
 * @return {HTMLElement} el 真实的DOM元素
 */
export const render = createRNode;
export function createRNode(vDom) {
  const { type, props, children } = vDom;
  const el = document.createElement(type);

  // 处理属性
  Object.keys(props).forEach((key) => {
    setAttrs(el, key, props[key]);
  });

  // 处理子节点(元素节点/文本节点)
  if (!Array.isArray(children)) {
    return el;
  }
  for (const child of children) {
    let childElement;
    if (child instanceof VNode) {
      childElement = createRNode(child);
    } else {
      childElement = document.createTextNode(child);
    }
    el.append(childElement);
  }

  return el;
}

/**
 * 创建虚拟节点
 * @param {String} type     标签名
 * @param {Object} props    属性集合
 * @param {Array}  children 子节点
 */
export const h = createVNode;
export function createVNode(type, props, children) {
  return new VNode(type, props, children);
}

/**
 * 将真实节点挂载到页面中
 */
export function mount(el, container) {
  container.append(el);
}
```

```js
// js/diff.js
"use strict";
/*
const patchPackMap = {
  0: [
    {
      type: PatchPack.ATTR, // 代表一个更新属性的补丁包
      value: { style: 'xxx', class: 'xxx', id: 'xxx' }
    }
  ],
  1: [
    {
      type: PatchPack.TEXT, // 代表一个标签内部文本的补丁包
      value: '这是更新后要显示的文本'
    }
  ],
  2: [
    {
      type: PatchPack.REPLACE, // 代表一个替换节点的补丁包
      value: rNode
    }
  ],
  2: [
    {
      type: PatchPack.REMOVE, // 代表一个移除节点的补丁包
      value: index
    }
  ],
};
*/

import { PatchPack } from "./patch";
const { ATTR, TEXT, REPLACE, REMOVE } = PatchPack;

// 新老节点对比后的差异补丁包
const patchPackMap = new Map();
let vNodeUid = 0;

// 对比新老虚拟节点
export function diff(oldVNode, newVNode) {
  let index = 0;
  vNodeWalk(oldVNode, newVNode, index);
  return patchPackMap;
}

// 深度遍历对比
function vNodeWalk(oldVNode, newVNode, index) {
  const patchSet = new Set();
  if (!newVNode) {
    // 1. 如果新节点不存在, 就添加一个移除节点的补丁包
    patchSet.add(new PatchPack(REMOVE, index));
  } else if (typeof newVNode === "string" && typeof oldVNode === "string") {
    // 2. 如果新节点和老节点都是文本,
    // 并且文本内容不相等, 就直接修改老的节点的文本内容
    if (newVNode !== oldVNode) {
      patchSet.add(new PatchPack(TEXT, newVNode));
    }
  } else if (oldVNode.type === newVNode.type) {
    // 3. 如果新老节点标签名相等, 对比新老节点所有的属性差异
    // 获取新老节点所有的属性补丁包
    const attrPatches = attrsWalk(oldVNode.props, newVNode.props);
    if (Object.keys(attrPatches).length > 0) {
      patchSet.add(new PatchPack(ATTR, attrPatches));
    }

    // 对比元素节点的所有子节点
    childrenWalk(oldVNode.children, newVNode.children);
  } else {
    // 4. 如果上面的3种情况,那么节点一定发生了变化,
    // 那么就需要替换原来的节点, 添加一个替换补丁包
    patchSet.add(new PatchPack(REPLACE, newVNode));
  }

  patchSet.size > 0 && patchPackMap.set(index, patchSet);
}

// 对比新老节点的所有属性, 获取属性补丁包
function attrsWalk(oldProps, newProps) {
  const attrPatch = {};

  // 节点属性修改的处理: 新老节点的属性不一致
  Object.keys(oldProps).forEach((key) => {
    if (oldProps[key] !== newProps[key]) {
      attrPatch[key] = newProps[key];
    }
  });

  // 节点属性添加的处理: 新老节点属性个数不一致
  Object.keys(newProps).forEach((key) => {
    if (!oldProps.hasOwnProperty(key)) {
      attrPatch[key] = newProps[key];
    }
  });

  return attrPatch;
}

// 对比元素节点的所有子节点
// TODO: 如果新节点比老节点length要长,
// 那么如果有新增加的节点就遍历不到
function childrenWalk(oldChildren, newChildren) {
  oldChildren.forEach((child, i) => {
    vNodeWalk(child, newChildren[i], ++vNodeUid);
  });
}
```

```js
// js/patch.js
"use strict";

import { VNode, setAttrs } from "./vnode";

/**
 * 补丁包
 */
export class PatchPack {
  static ATTR = "ATTR";
  static TEXT = "TEXT";
  static REPLACE = "REPLACE";
  static REMOVE = "REMOVE";

  constructor(type, value) {
    if (!PatchPack[type]) {
      throw new TypeError("[PatchPack] unknown PatchPack type");
    }
    this.type = type;
    this.value = value;
  }
}

let finalPatchMap = null;
let rNodeUid = 0;
/**
 * 给真实节点打补丁包
 * @param {HTMLElement} rDom 真实的DOM元素
 * @param {Map} patchMap 补丁包
 */
export function patch(rDom, patchMap) {
  finalPatchMap = patchMap;
  rNodeWalk(rDom);
}

/**
 * 递归遍历所有的真实节点(深度优先), 更新补丁包记录的内容
 * @param {HTMLElement} rNode 真实的DOM元素
 */
function rNodeWalk(rNode) {
  const rNodePatch = finalPatchMap.get(rNodeUid++); // Set
  const childNodes = Array.from(rNode.childNodes);

  // 如果有子节点: 递归的给子节点打补丁
  if (childNodes.length > 0) {
    childNodes.forEach((child) => {
      rNodeWalk(child);
    });
  }

  // 如果当前节点有补丁包 patch 需要更新
  rNodePatch && patchAction(rNode, rNodePatch);
}

/**
 * 更新补丁包记录的内容到真实的dom,让UI更新
 * @param {HTMLElement} rNode 真实的DOM元素
 * @param {PatchPack} patches 补丁包
 */
function patchAction(rNode, patches) {
  for (const { type, value } of patches) {
    switch (type) {
      case PatchPack.ATTR:
        Object.keys(value).forEach((key) => {
          setAttrs(rNode, key, value[key]);
        });
        break;
      case PatchPack.TEXT:
        rNode.textContent = value;
        break;
      case PatchPack.REPLACE:
        // 新的节点是文本节点还是元素节点
        const newRNode = rNode instanceof VNode ? document.createElement(value.type) : document.createTextNode(value);
        rNode.parentNode.replaceChild(newRNode, rNode);
        break;
      case PatchPack.REMOVE:
        rNode.remove();
        break;
      default:
        console.error("[patch] unknown PatchPack type");
        break;
    }
  }
}
```
