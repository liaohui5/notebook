## Vue 是如何解析模板的?

1. 将 html 字符串解析为抽象语法树(AST)
2. 根据 AST 生成 render 函数需要的字符串, 然后生成 render 函数
3. render 函数 将 AST 处理为虚拟节点对象(vnode) -> 在生成的时候, 处理指令, 差值表达式
4. 将 vnode 渲染成真实的 DOM 然后挂载文档中

## 如何将 html 字符串解析为抽象语法树

1. 利用 stack 结构保持树形关系
2. 不断的去匹配标签开始,属性,标签结束,闭合标签,然后截取
3. 不断的去匹配文本然后截取
4. 截取到最后, 处理为对应结构的抽象语法树

### 环境说明

使用 vite 启动一个服务, 然后访问

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="referrer" content="no-referrer" />
    <title>htmlPaser</title>
  </head>
  <body>
    <div id="container"></div>

    <!-- template parser -->
    <script type="module" src="./index.js"></script>
  </body>
</html>
```

### 待处理的模板字符串

```js
let html = /* html */ `<div id="app" style="color: red; font-size: 20px">
  你好 {{name}}, 我的年龄是 {{age}}, 你今年多少岁?
  <p id="mid" style='color: #0f0; font-size: 20px;'>
    <span class=text>这是span的内容</span>
  </p>
  <selection id="inner" style='color: #0f0;'>
    <img src="https://game.gtimg.cn/images/lol/act/img/skin/big1000.jpg" style="max-width: 100px;"/>
  </selection>
</div>`;
```

### 处理程序

```js
const ast = html2ast(html);
console.log(ast);

// 将 html 分析为一个 dom 树
function html2ast(html) {
  // 属性名=属性值: name="value" name='value' name=value
  const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
  const startTagOpen = new RegExp(`^<${qnameCapture}`);
  const startTagClose = /^\s*(\/?)>/;
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);

  let text,
    root,
    stack = [],
    currentParent;

  while (html) {
    const textEnd = html.indexOf("<");
    if (textEnd === 0) {
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tag, startTagMatch.attrs);
        continue;
      }

      // 如果是结束标签 </div> /> 这种的
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        cut(endTagMatch[0].length);
        end(endTagMatch);
        continue;
      }
    }

    // 如果 < 大于0说明有文本内容, 处理文本内容
    if (textEnd > 0) {
      text = html.substring(0, textEnd);
    }

    // 如果有 text 就处理文本内容
    if (text) {
      cut(textEnd);
      chars(text);
    }
  }
  return root;

  // 裁剪html
  function cut(startIndex) {
    html = html.substring(startIndex);
  }

  // 处理开始标签
  function parseStartTag() {
    // console.info("parseStartTag: \n", html);
    const startTag = html.match(startTagOpen);
    if (!startTag) {
      return;
    }
    const [start, tag] = startTag;
    const matched = {
      tag,
      attrs: [], // attrs: [ {name: 'id', value: 'app'} ]
    };
    cut(start.length);

    // 是否匹配到了 > 或者 />, 就结束循环, 如果没有就解析属性
    let end, attr;
    while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      // attr[1]: 匹配到的属性名
      // 3: class="box", 4: class='box', 5: class=box
      matched.attrs.push({
        name: attr[1],
        value: attr[3] || attr[4] || attr[5],
      });
      cut(attr[0].length);
    }

    if (end) {
      cut(end[0].length);
      return matched;
    }
  }

  // 判断标签是否是第一个, 如果是第一个一定是根元素
  // 将当前元素添加到 stack 中, [div, span]
  function start(tag, attrs) {
    const element = createASTElement(tag, attrs);
    if (!root) {
      root = element;
    }
    currentParent = element;
    stack.push(element);
  }

  // 如果 stack 现在是: [div, span], pop 操作后, 变成
  // [div], 那么 stack[stack.length - 1] 获取到的就是 div
  // 如果 stack 是: [div], pop 操作后, 变成: [],
  // 那么 stack[stack.length - 1] 获取到的是undefined,
  // 那么说明是根元素, 如果不是根元素, 肯定有 currentParent
  // 那么就直接把 element 的 parent 元素引用, 赋值给 element.parent
  // 循环引用
  function end() {
    const element = stack.pop();
    const parent = stack[stack.length - 1];
    if (parent) {
      element.parent = parent;
      parent.children.push(element);
    }
  }

  // 处理文本内容
  function chars(text) {
    text = text.trim();
    if (text) {
      currentParent.children.push({
        type: Node.TEXT_NODE,
        text,
      });
    }
  }

  // 创建一个 AST 元素
  function createASTElement(tag, attrs) {
    return {
      tag,
      attrs,
      type: Node.ELEMENT_NODE,
      children: [],
      parent: null,
    };
  }
}
```

### 处理后的 AST 对象

!> 处理后的结果: 由于 parent 会导致循环引用, 无法 JSON.stringify 查看效果,所以去除了 parent 属性

```json
{
  "tag": "div",
  "attrs": [
    {
      "name": "id",
      "value": "app"
    },
    {
      "name": "style",
      "value": "color: red; font-size: 20px"
    }
  ],
  "type": 1,
  "children": [
    {
      "type": 3,
      "text": "你好 {{name}}, 我的年龄是 {{age}}, 你今年多少岁?"
    },
    {
      "tag": "p",
      "attrs": [
        {
          "name": "id",
          "value": "mid"
        },
        {
          "name": "style",
          "value": "color: #0f0; font-size: 20px;"
        }
      ],
      "type": 1,
      "children": [
        {
          "tag": "span",
          "attrs": [
            {
              "name": "class",
              "value": "text"
            }
          ],
          "type": 1,
          "children": [
            {
              "type": 3,
              "text": "这是span的内容"
            }
          ],
          "parent": null
        }
      ],
      "parent": null
    },
    {
      "tag": "selection",
      "attrs": [
        {
          "name": "id",
          "value": "inner"
        },
        {
          "name": "style",
          "value": "color: #0f0;"
        }
      ],
      "type": 1,
      "children": [
        {
          "tag": "img",
          "attrs": [
            {
              "name": "src",
              "value": "https://game.gtimg.cn/images/lol/act/img/skin/big1000.jpg"
            },
            {
              "name": "style",
              "value": "max-width: 100px;"
            }
          ],
          "type": 1,
          "children": [],
          "parent": null
        }
      ],
      "parent": null
    }
  ],
  "parent": null
}
```

## 根据 AST 生成 render 函数需要的 code

### 生成渲染函数 && 生成渲染函数需要的字符串

```js
// 生成 render 函数
function getRender(code) {
  return new Function(`with(this) { return ${code}}`);
}

// 根据 ast 语法树变成一个 render 函数需要的字符串
function generate(element) {
  const attrs = getAttrs(element.attrs);
  let children = element.children;
  if (children.length > 0) {
    // 有子元素才处理子元素
    children = children.map((node) => getChildren(node)).join(",");
  }
  return `_c("${element.tag}", ${attrs}, ${children})`;

  // 处理元素的属性
  function getAttrs(attrs) {
    const attrMap = {};
    attrs.forEach((attr) => {
      if (attr.name === "style") {
        attrMap["style"] = handleStyle(attr.value);
      } else {
        attrMap[attr.name] = attr.value;
      }
    });
    return JSON.stringify(attrMap);

    // 处理 style
    function handleStyle(styles) {
      // style="color : #f00; font-size: 20px ; "
      const styleMap = {};
      styles.split(";").forEach((item) => {
        const [key, value] = item.split(":");
        if (key && value) {
          styleMap[key] = value.trim();
        }
      });
      return styleMap;
    }
  }

  // 处理元素的子元素
  function getChildren(node) {
    if (node.type === Node.ELEMENT_NODE) {
      return generate(node);
    } else if (node.type === Node.TEXT_NODE) {
      return handleTextNode(node.text);
    }

    function handleTextNode(text) {
      const mustcheTag = /\{\{(.+?)\}\}/g;
      if (!text.match(mustcheTag)) {
        return `_v("${text}")`;
      }
      let tokens = [],
        startIndex = 0,
        match;

      while ((match = mustcheTag.exec(text))) {
        // 你好 {{name}}, 我的年龄是 {{age}}, 你今年多少岁?
        tokens.push(JSON.stringify(text.slice(startIndex, match.index)));
        tokens.push(`_s(${match[1]})`);
        startIndex = mustcheTag.lastIndex;
      }
      // 如果是以文字结尾, 最后一段是无法匹配到的: ", 你今年多少岁?"
      // 这一段就会丢失, 所以要手动把最后一段裁剪出来
      tokens.push(JSON.stringify(text.slice(startIndex)));
      tokens = tokens.join("+");
      return `_v(${tokens})`;
    }
  }
}
```

### 处理后的字符串

```js
(function anonymous() {
  with (this) {
    return _c(
      "div",
      { id: "app", style: { color: "red", " font-size": "20px" } },
      _v("你好 " + _s(name) + ", 我的年龄是 " + _s(age) + ", 你今年多少岁?"),
      _c(
        "p",
        { id: "mid", style: { color: "#0f0", " font-size": "20px" } },
        _c("span", { class: "text" }, _v("这是span的内容")),
      ),
      _c(
        "selection",
        { id: "inner", style: { color: "#0f0" } },
        _c("img", {
          src: "https://game.gtimg.cn/images/lol/act/img/skin/big1000.jpg",
          style: { "max-width": "100px" },
        }),
      ),
    );
  }
});
```

## 根据 render 函数生成 vnode

### 实现实例原型上的 \_c && \_v && \_s, 让 render 函数能够顺利调用

1. \_c: 创建元素节点
2. \_v: 处理文本节点
3. \_s: 处理类似 `{{name}}` 的 mustche 语法

```js
// 模拟 Vue 实例对象 vm
const vm = {
  name: "tom",
  age: 22,
  el: document.querySelector("#container"),
};
Object.setPrototypeOf(vm, {
  // 给 vm 原型对象添加 _c,_s,_v 让 render 函数可以调用这些方法
  _c() {
    return createElement(...arguments);
  },
  _s(value) {
    if (!value) return;
    return typeof value === "object" ? JSON.stringify(value) : value;
  },
  _v(text) {
    return createTextVNode(text);
  },
});

const ast = html2ast(html);
const renderCode = generate(ast);
const render = getRender(renderCode);
const vnodes = render.call(vm);
console.log("🍋 vnodes: ", vnodes);
```

### 创建虚拟节点相关函数

```js
// 创建虚拟dom节点 vnode
function vnode(tag, props, children, text) {
  return { tag, props, children, text };
}

// 创建元素类型虚拟节点
function createElement(tag, attrs = {}, ...children) {
  return vnode(tag, attrs, children);
}

// 创建文本类型虚拟节点
function createTextVNode(text) {
  return vnode(undefined, undefined, undefined, text);
}
```

### 处理后的 vnode

```json
{
  "tag": "div",
  "props": {
    "id": "app",
    "style": {
      "color": "red",
      " font-size": "20px"
    }
  },
  "children": [
    {
      "text": "你好 tom, 我的年龄是 22, 你今年多少岁?"
    },
    {
      "tag": "p",
      "props": {
        "id": "mid",
        "style": {
          "color": "#0f0",
          " font-size": "20px"
        }
      },
      "children": [
        {
          "tag": "span",
          "props": {
            "class": "text"
          },
          "children": [
            {
              "text": "这是span的内容"
            }
          ]
        }
      ]
    },
    {
      "tag": "selection",
      "props": {
        "id": "inner",
        "style": {
          "color": "#0f0"
        }
      },
      "children": [
        {
          "tag": "img",
          "props": {
            "src": "https://game.gtimg.cn/images/lol/act/img/skin/big1000.jpg",
            "style": {
              "max-width": "100px"
            }
          },
          "children": []
        }
      ]
    }
  ]
}
```

## 根据 vnode 生成真实 dom,渲染到页面上

> 这个就不是很重要了, 重要的是如何高效的生成 vnode(diff 算法), 因为 vnode 都生成了, 根据结构生成真实的 dom 然后渲染到页面上, 无非就是操作 dom

```js
// 更具 vnode, 生成真实的DOM节点, 放到 el 中去
function patch(vnode) {
  const elements = createElement(vnode);
  this.el.append(elements); // 注意将 this 修改为 vm 对象

  // 生成真实的DOM节点
  function createElement(vnode) {
    // 创建对应结构的 elementNode 和 textNode
    const { text, children, tag, props } = vnode;
    if (typeof tag === "string") {
      const el = (vnode.el = document.createElement(tag));
      updateProps(el, props);
      children.map((node) => el.append(createElement(node)));
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }

  // 创建真实的dom时处理dom属性
  function updateProps(el, props = {}) {
    for (const key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        const value = props[key];
        if (key === "style") {
          for (const sk in value) {
            el.style[sk.trim()] = value[sk];
          }
        } else if (key === "class") {
          value && (el.className = value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }
  }
}
```

> 完整的流程

```js
// 0. 模拟 Vue 实例对象 vm
const vm = {
  name: "tom",
  age: 22,
  el: document.querySelector("#container"),
};
Object.setPrototypeOf(vm, {
  // 给原型上添加 _c, _s, _v 方法
  _c() {
    return createElement(...arguments);
  },
  _s(value) {
    if (!value) return;
    return typeof value === "object" ? JSON.stringify(value) : value;
  },
  _v(text) {
    return createTextVNode(text);
  },
});

// 1. 将 html 字符串处理为 ast
const ast = html2ast(html);

// 2. 根据 ast 生成 renderCode -> 生成 render 函数
const renderCode = generate(ast);
const render = getRender(renderCode);

// 3. render 函数生成 vnodes
const vnodes = render.call(vm);

// 4. 生成真实的 DOM 对象然后append到 vm.el 中
patch.call(vm, vnodes);
```
