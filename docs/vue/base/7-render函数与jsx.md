## render function

- [Vue2.x 文档](https://cn.vuejs.org/v2/guide/render-function.html)
- [Vue3.x 文档](https://v3.cn.vuejs.org/guide/render-function.html)

### Vue 编译流程

1. 将 `template模板/template选项/render函数` 转化为 AST
2. vue 将 AST 转化为 VNode
3. 对比 VNode 看是否需要更新, 如果需要更新就去更新

> render 函数和 template 的不同

template 是直接使用模板, 在模板中可以通过 this 来访问组件实例的数据, 然后 Vue 的会将这个模板编译为 AST 语法树
这个 AST 语法树是 `用来描述 dom 结构的`, 而 render 函数不同, 他是直接 `让你自己写 AST`, 然后通过一些函数,
将 AST 树转化成 VNode

### 用 render 函数替代 template 模板

- [Vue2.x 文档](https://cn.vuejs.org/v2/guide/render-function.html)
- [Vue3.x 文档](https://v3.cn.vuejs.org/guide/render-function.html)

```html
<div class="login-form-card">
  <div class="card-title">
    <slot name="title">标题</slot>
  </div>
  <form :action="actionUrl" class="card-content">
    <div class="form-item">
      <input
        type="text"
        v-model="loginForm.email"
        name="email"
        placeholder="请输入邮箱"
      />
    </div>
    <div class="form-item">
      <input
        type="password"
        v-model="loginForm.password"
        name="password"
        placeholder="请输入密码"
      />
    </div>
    <div class="form-item">
      <button class="submit-btn" type="button" @click="onSubmit">
        {{btnText}}
      </button>
    </div>
  </form>
</div>
```

### Vue2 实现

> Vue2 render 函数语法

```js
// Vue2: h函数是 render 函数的形参, 可以自己任意命名
render (h) {
  // h函数语法:
  // h(标签名, 数据对象, 子节点)
  // 1. 如果子节点是 元素节点: 就必须用数组 [子节点] 语法, 如果子节点是文本节点, 可以直接写
  // 2. 数据对象: https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1
}
```

> 实现

```js
export default {
  name: "login-form-card",
  data: () => ({
    actionUrl: "http://localhost:8888/api/login",
    btnText: "登录",
    loginForm: {
      email: "",
      password: "",
    },
  }),
  emits: ["submit"],
  methods: {
    onSubmit() {
      console.info(this.loginForm);
      this.$emit("submit", this.loginForm);
    },
  },
  render(h) {
    return h("div", { class: "login-form-card" }, [
      h(
        "div",
        { class: "card-title" },
        this.$slots.title // 插槽
      ),
      h(
        "form",
        {
          attrs: { action: this.actionUrl },
          class: "card-content",
        },
        [
          h("div", { class: "form-item" }, [
            h("input", {
              attrs: {
                type: "text",
                name: "email",
                placeholder: "请输入邮箱",
                // v-model: 本质就是 value + oninput
                value: this.loginForm.email,
              },
              on: {
                input: (e) => (this.loginForm.email = e.target.value),
              },
            }),
          ]),
          h("div", { class: "form-item" }, [
            h("input", {
              attrs: {
                type: "password",
                name: "password",
                placeholder: "请输入密码",
                value: this.loginForm.password,
              },
              on: {
                input: (e) => (this.loginForm.password = e.target.value),
              },
            }),
          ]),
          h("div", { class: "form-item" }, [
            h(
              "button",
              {
                class: "submit-btn",
                attrs: { type: "button" },
                on: {
                  click: this.onSubmit,
                },
              },
              this.btnText
            ),
          ]),
        ]
      ),
    ]);
  },
};
```

### Vue3 实现

> Vue3 render 语法

```js

// Vue3: h函数是从vue中导出的
import { h } from "vue";
render() {
  // h函数语法:
  // 1. 所有元素节点都必须用 h 函数来创建
  // 2. 标签名必须是一个字符串, 如果没有属性集合可以用 null 代替
  // 3. 如果有多个子节点, 必须用数组, 如果只有一个可以直接写, 没有就不用写
  // h(标签名, 属性集合, 子节点)
}
```

```js
import { h } from "vue";
export default {
  name: "LoginFormCard",
  data: () => ({
    actionUrl: "http://localhost:8888/api/login",
    btnText: "登录",
    loginForm: {
      email: "",
      password: "",
    },
  }),
  emits: ["submit"], // emit 必须申明
  methods: {
    onSubmit() {
      console.log(this.loginForm);
      this.$emit("submit", this.loginForm);
    },
  },
  render() {
    return h("div", { class: "form-card" }, [
      h("div", { class: "card-title" }, this.$slots.title()), // 插槽
      h("form", { action: this.actionUrl, class: "card-content" }, [
        h(
          "div",
          { class: "form-item" },
          h("input", {
            type: "text",
            name: "email",
            placeholder: "请输入邮箱",
            value: this.loginForm.email,
            onInput: ($event) => (this.loginForm.email = $event.target.value),
          })
        ),
        h(
          "div",
          { class: "form-item" },
          h("input", {
            type: "password",
            name: "password",
            placeholder: "请输入密码",
            // 处理: v-model
            value: this.loginForm.password,
            onInput: (e) => (this.loginForm.password = e.target.value),
          })
        ),
        h(
          "div",
          { class: "form-item" },
          h(
            "button",
            {
              type: "button",
              class: "submit-btn",
              // 处理事件
              onClick: () => this.onSubmit(),
            },
            this.btnText
          )
        ),
      ]),
    ]);
  },
};
```

## JSX

### 什么是 JSX

1. JSX 既不是 HTML 也不是字符串
2. JSX 是一种特殊的标签语法, 且无法直接被浏览器识别, 需要用编译器编译成 js
3. 描述 UI 呈现与交互的直观的形式的语法

### 为什么使用 JSX

因为 render 函数的参数结构很复杂, 非常容易写错, 并不直观, 所以也可以使用 jsx 语法

> 那为什么不直接使用 template 语法?

没说一定要用 render 或者 jsx, 只是提供了一种选项, 让你在一些特殊的场景可以更好的使用 vue

### JSX 语法

建议直接 [看 React 的笔记](/react/base/1-jsx语法),
因为 JSX 语法但是差不多的, 细微的区别直接看文档就好了

### 在 Vue 中使用 JSX 语法

- [Vue2 使用 babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx)

- [Vue3 使用 babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx)
