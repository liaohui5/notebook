import tailwindcss from "@tailwindcss/vite";
import markdownItCheckBox from "markdown-it-todo-lists";
import { defineConfig } from "vitepress";
import { genSidebarByNavs } from "./sidebar";
import nav from "./navbar";

const sidebar = genSidebarByNavs(nav);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "notebook",
  titleTemplate: "个人学习笔记",
  description: "notebook for myself",
  head: [
    ["link", { rel: "icon", type: "image/x-icon", href: "https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/favicon.ico?no-wait=on" }],
    ["link", { rel: "icon", type: "image/png", href: "https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/logo.png?no-wait=on" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/logo.svg?no-wait=on" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "zh-CN" }],
    ["meta", { name: "og:site_name", content: "notebook" }],
  ],
  themeConfig: {
    nav,
    logo: "https://notebook-imgbed.s3.bitiful.net/notebook-imgbed/logo.svg?no-wait=on",
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

    // @ts-ignore
    plugins: [tailwindcss()],

    // server
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
