import markdownItCheckBox from "markdown-it-todo-lists";
import { defineConfig } from "vitepress";
import nav from "./nav";
import AutoSidebar from "./autoSidebar";

// head 标签中的内容
const head = [
  ["link", { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
  ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  ["meta", { name: "og:type", content: "website" }],
  ["meta", { name: "og:locale", content: "zh-CN" }],
  ["meta", { name: "og:site_name", content: "notebook" }],
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head,
  base: "/",
  title: "notebook",
  titleTemplate: "个人学习笔记",
  description: "notebook for myself",
  themeConfig: {
    nav,
    logo: "/logo.svg",

    outline: "deep",

    search: {
      provider: "local",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/liaohui5",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present liaohui5",
    },
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(markdownItCheckBox);
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["@nolebase/vitepress-plugin-enhanced-readabilities/client"],
    },
    ssr: {
      noExternal: ["@nolebase/vitepress-plugin-enhanced-readabilities"],
    },

    plugins: [
      AutoSidebar({
        sidebarPaths: [
          "/css/",
          "/database/",
          "/js/base",
          "/js/oop/",
          "/js/dom/",
          "/js/magic/",
          "/js/builtin/",
          "/js/webapi/",
          "/js/nodejs/",
          "/js/ts/base/",
          "/js/tests/",
          "/js/design-patterns/",
          "/js/algorithms",
          "/vue/base/",
          "/vue/mini-vue/",
          "/react/base/",
          "/react/hooks/",
          "/clang/",
          "/rust/base/",
          "/rust/libs/",
          "/rust/async/",
          "/deploy/cicd",
          "/deploy/server/",
          "/deploy/docker/",
          "/deploy/webpack/",
          "/deploy/vite/",
          "/deploy/python/",
        ],
      }),
    ],
  },
});
