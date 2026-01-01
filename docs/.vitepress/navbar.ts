// https://vitepress.dev/reference/default-theme-config
export default [
  // {
  //   text: "AboutMe",
  //   link: "https://github.com/liaohui5",
  //   isAutoGenSidebar: true,
  // },
  {
    text: "Others",
    link: "/others/",
    isAutoGenSidebar: true,
  },
  {
    text: "CSS",
    link: "/css/",
    isAutoGenSidebar: true,
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
            isAutoGenSidebar: true,
          },
          {
            text: "运行环境与API",
            link: "/js/builtin/",
            isAutoGenSidebar: true,
          },
          {
            text: "面向对象",
            link: "/js/oop/",
            isAutoGenSidebar: true,
          },
          {
            text: "DOM & BOM",
            link: "/js/dom/",
            isAutoGenSidebar: true,
          },
          {
            text: "实用技巧",
            link: "/js/magic/",
            isAutoGenSidebar: true,
          },
        ],
      },
      {
        text: "JavaScript 扩展",
        items: [
          {
            text: "TypeScript 类型约束",
            link: "/js/ts/",
            isAutoGenSidebar: true,
          },
          {
            text: "JavaScript 单元测试",
            link: "/js/tests/",
            isAutoGenSidebar: true,
          },
          {
            text: "JavaScript 设计模式",
            link: "/js/design-patterns/",
            isAutoGenSidebar: true,
          },
          {
            text: "JavaScript 数据结构与算法",
            link: "/js/algorithms/",
            isAutoGenSidebar: true,
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
        isAutoGenSidebar: true,
      },
      {
        text: "Vue 库核心原理",
        link: "/vue/core/",
        isAutoGenSidebar: true,
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
        isAutoGenSidebar: true,
      },
      {
        text: "React Hooks",
        link: "/react/hooks/",
        isAutoGenSidebar: true,
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
            isAutoGenSidebar: true,
          },
          {
            text: "vite & rollup",
            link: "/deploy/vite/",
            isAutoGenSidebar: true,
          },
        ],
      },
      {
        text: "服务器应用部署",
        items: [
          {
            text: "linux 服务器部署",
            link: "/deploy/server/",
            isAutoGenSidebar: true,
          },
          {
            text: "docker 容器化",
            link: "/deploy/docker/",
            isAutoGenSidebar: true,
          },
          {
            text: "CICD 持续集成",
            link: "/deploy/cicd/",
            isAutoGenSidebar: true,
          },
        ],
      },
    ],
  },
  {
    text: "DB",
    link: "/database/",
    isAutoGenSidebar: true,
  },
  {
    text: "PHP",
    link: "https://php.liaohui5.cn",
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
    link: "https://rust.liaohui5.cn",
  },
  {
    text: "dotfiles",
    link: "https://github.com/liaohui5/dotfiles",
  },
];
