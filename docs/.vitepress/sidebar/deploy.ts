import { autoGenSidebars } from "../utils/gen-sidebar";

export default {
  "/deploy/server/": autoGenSidebars('/deploy/server', '/deploy/server/', 'index.md'),

  "/deploy/docker/": [
    {
      text: "1.安装环境",
      link: "/deploy/docker/index",
    },
    {
      text: "2.安装 Docker",
      link: "/deploy/docker/2_install_docker",
    },

    {
      text: "3.docker 基本命令",
      link: "/deploy/docker/3_docker_base_cmd",
    },

    {
      text: "4.docker 运行 nginx",
      link: "/deploy/docker/4_docker_run_nginx",
    },

    {
      text: "5.制作自己的镜像",
      link: "/deploy/docker/5_make_custom_image",
    },

    {
      text: "6.docker 数据容器卷",
      link: "/deploy/docker/6_docker_volumn",
    },

    {
      text: "7.dockerfile",
      link: "/deploy/docker/7_dockerfile",
    },

    {
      text: "8.docker 网络",
      link: "/deploy/docker/8_docker_network",
    },

    {
      text: "9.docker 练习",
      link: "/deploy/docker/9_docker_practice",
    },

    {
      text: "10.docker-compose",
      link: "/deploy/docker/10_docker_compose",
    },

    {
      text: "11.system-service",
      link: "/deploy/docker/11_system_service",
    },

    {
      text: "部署 RustDeskServer 服务器",
      link: "/deploy/docker/rust-desk-server",
    },
  ],

  "/deploy/webpack/": [
    {
      text: "webpack 介绍",
      link: "/deploy/webpack/index",
    },
    {
      text: "webpack 基础配置",
      collapsed: true,
      items: [
        { text: "1.基本打包和运行", link: "/deploy/webpack/base/base-run" },
        { text: "2.devtool源码映射配置", link: "/deploy/webpack/base/devtool" },
        {
          text: "3.处理图片字体等静态文件",
          link: "/deploy/webpack/base/file-loader",
        },
        { text: "4.处理css样式", link: "/deploy/webpack/base/styles" },
        { text: "5.css预处理器", link: "/deploy/webpack/base/pre-css" },
        {
          text: "6.postcss处理css浏览器前缀",
          link: "/deploy/webpack/base/postcss",
        },
        {
          text: "7.将打包结果输出到html模板",
          link: "/deploy/webpack/base/html-webpack-plugin",
        },
        {
          text: "8.清空上一次打包结果",
          link: "/deploy/webpack/base/clean-webpack-plugin",
        },
        {
          text: "9.复制静态资源",
          link: "/deploy/webpack/base/copy-webpack-plugin",
        },
        {
          text: "10.抽离css为单独的文件",
          link: "/deploy/webpack/base/mini-css-extract-plugin",
        },
        {
          text: "11.压缩打包后的文件",
          link: "/deploy/webpack/base/terser-webpack-plugin",
        },
        {
          text: "12.webpack-dev-server服务器",
          link: "/deploy/webpack/base/webpack-dev-server",
        },
        {
          text: "13.babel转换JS ES678语法",
          link: "/deploy/webpack/base/webpack-babel",
        },
        {
          text: "14.图片压缩与合并",
          link: "/deploy/webpack/base/img-loader",
        },
        {
          text: "15.eslint检查代码规范",
          link: "/deploy/webpack/base/webpack-eslint",
        },
        {
          text: "16.合并webpack配置",
          link: "/deploy/webpack/base/webpack-merge",
        },
        {
          text: "17.快速搭建Vue的项目配置",
          link: "/deploy/webpack/base/webpack-vue-config",
        },
      ],
    },
    {
      text: "webpack 优化打包结果",
      collapsed: true,
      items: [
        {
          text: "1.移除没用到的js代码",
          link: "/deploy/webpack/optimize/1.tree-shaking",
        },
        {
          text: "2.移除没用到的css代码",
          link: "/deploy/webpack/optimize/2.css-tree-shaking",
        },
        {
          text: "3.忽略没有依赖的模块",
          link: "/deploy/webpack/optimize/3.ignore-plugin",
        },
        {
          text: "4.代码分割详解",
          link: "/deploy/webpack/optimize/4.split-chunks",
        },
        {
          text: "5.异步加载",
          link: "/deploy/webpack/optimize/5.async-fetch",
        },
        {
          text: "6.resolve 选项",
          link: "/deploy/webpack/optimize/6.resolve",
        },
        {
          text: "7.externals 选项",
          link: "/deploy/webpack/optimize/7.externals",
        },
        {
          text: "8.modules noparse 选项",
          link: "/deploy/webpack/optimize/8.noparse",
        },
        {
          text: "9.happypack 多线程打包",
          link: "/deploy/webpack/optimize/9.happypack",
        },
        {
          text: "10.bundle-analyzer",
          link: "/deploy/webpack/optimize/10.bundle-analyzer",
        },
      ],
    },
  ],
};
