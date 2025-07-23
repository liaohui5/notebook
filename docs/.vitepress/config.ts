import markdownItCheckBox from "markdown-it-todo-lists";
import { defineConfig } from "vitepress";
import nav from "./nav";
import sidebar from "./sidebar";

// head 标签中的内容
const head: Array<any> = [
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
    sidebar,
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
  },
});
