import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';

// head 标签中的内容
const head = [
  ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
  ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ['meta', { name: 'og:type', content: 'website' }],
  ['meta', { name: 'og:locale', content: 'zh-CN' }],
  ['meta', { name: 'og:site_name', content: 'study-notes' }],
];

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head,
  base: '/',
  title: 'study-notes',
  titleTemplate: '个人学习笔记',
  description: 'study notes for my self',
  themeConfig: {
    nav,
    sidebar,
    logo: '/logo.svg',

    search: {
      provider: 'local',
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/liaohui5',
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present liaohui5',
    },
  },

  markdown: {
    lineNumbers: true,
  },
});
