// https://vitepress.dev/reference/default-theme-config
export default [
  {
    text: "AboutMe",
    link: "https://github.com/liaohui5",
  },
  {
    text: "Others",
    link: "/others/",
  },
  {
    text: "Database",
    link: "/database/",
  },
  {
    text: "CSS",
    link: "/css/",
  },
  {
    // javascript //
    text: "JavaScript",
    items: [
      {
        text: "JavaScript 基础",
        items: [
          {
            text: "执行机制",
            link: "/js/base/",
          },
          {
            text: "运行环境与API",
            link: "/js/builtin/",
          },
          {
            text: "面向对象",
            link: "/js/oop/",
          },
          {
            text: "DOM & BOM",
            link: "/js/dom/",
          },
          {
            text: "实用技巧",
            link: "/js/magic/",
          },
        ],
      },
      {
        text: "JavaScript 扩展",
        items: [
          {
            text: "TypeScript 类型约束",
            link: "/js/ts/",
          },
          {
            text: "JavaScript 单元测试",
            link: "/js/tests/",
          },
          {
            text: "JavaScript 设计模式",
            link: "/js/design-patterns/",
          },
          {
            text: "JavaScript 数据结构与算法",
            link: "/js/algorithms/",
          },
        ],
      },
    ],
  },
  {
    // vue.js //
    text: "Vue",
    items: [
      {
        text: "Vue 基本使用",
        link: "/vue/base/",
      },
      {
        text: "Vue 库核心原理",
        link: "/vue/core/",
      },
    ],
  },
  {
    // react.js //
    text: "React",
    items: [
      {
        text: "React 基础使用",
        link: "/react/base/",
      },
      {
        text: "React Hooks",
        link: "/react/hooks/",
      },
    ],
  },
  {
    // Deploy //
    text: "Deploy",
    items: [
      {
        text: "代码构建工具",
        items: [
          {
            text: "webpack",
            link: "/deploy/webpack/",
          },
          {
            text: "vite & rollup",
            link: "/deploy/vite/",
          },
        ],
      },
      {
        text: "服务器应用部署",
        items: [
          {
            text: "linux 服务器部署",
            link: "/deploy/server/",
          },
          {
            text: "docker 容器化",
            link: "/deploy/docker/",
          },
          {
            text: "CICD 持续集成",
            link: "/deploy/cicd/",
          },
        ],
      },
    ],
  },
  {
    text: "Python",
    link: "https://python.liaohui5.cn",
  },
  {
    text: "Java",
    link: "https://java.liaohui5.cn",
  },
  {
    text: "Go",
    link: "https://golang.liaohui5.cn",
  },
  {
    text: "Rust",
    link: "https://studyrust.netlib.re",
  },
  {
    text: "dotfiles",
    link: "https://github.com/liaohui5/dotfiles",
  },
];
