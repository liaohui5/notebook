import { autoGenSidebars } from '../utils/gen-sidebar';

export default {
  '/deploy/cicd': [
    {
      text: '介绍',
      link: '/deploy/cicd/index',
    },
    ...autoGenSidebars('/deploy/cicd'),
  ],

  '/deploy/server/': [
    {
      text: '介绍',
      link: '/deploy/server/index',
    },
    ...autoGenSidebars('/deploy/server'),
  ],

  '/deploy/docker/': [
    {
      text: '介绍',
      link: '/deploy/docker/index',
    },
    ...autoGenSidebars('/deploy/docker'),
  ],

  '/deploy/webpack/': [
    {
      text: '介绍',
      link: '/deploy/webpack/index',
    },
    ...autoGenSidebars('/deploy/webpack'),
  ],

  '/deploy/vite/': [
    {
      text: '介绍',
      link: '/deploy/vite/index',
    },
    ...autoGenSidebars('/deploy/vite'),
  ],
};
