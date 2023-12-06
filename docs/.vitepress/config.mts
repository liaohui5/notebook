import { defineConfig } from 'vitepress';
import nav from './nav';
import sidebar from './sidebar';
import head from './utils/head';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'study-notes',
  description: 'study notes for my self',
  head,
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
});
