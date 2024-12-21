import { autoGenSidebars } from "../utils";

export default {
  "/vue/base/": autoGenSidebars("/vue/base/"),
  "/vue/mini-vue/": [
    {
      text: "准备",
      items: [
        {
          text: "项目介绍",
          link: "/vue/mini-vue/index",
        },
        {
          text: "创建项目",
          link: "/vue/mini-vue/create-project-env",
        },
      ],
    },

    // reactivity
    {
      text: "reactivity",
      items: [
        {
          text: "模块介绍",
          link: "/vue/mini-vue/reactivity/index",
        },
        {
          text: "reactive 方法实现",
          link: "/vue/mini-vue/reactivity/reactive",
        },
      ],
    },

    // compiler-core
    {
      text: "compiler-core",
      items: [
        {
          text: "模块介绍",
          link: "/vue/mini-vue/compiler-core/index",
        },
      ],
    },

    // runtime-core
    {
      text: "runtime-core",
      items: [
        {
          text: "模块介绍",
          link: "/vue/mini-vue/runtime-core/index",
        },
      ],
    },

    // runtime-dom
    {
      text: "runtime-dom",
      items: [
        {
          text: "模块介绍",
          link: "/vue/mini-vue/runtime-dom/index",
        },
      ],
    },
  ],
};
