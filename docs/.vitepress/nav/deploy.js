export default {
  // Deploy //
  text: 'Deploy',
  items: [
    {
      text: '前端构建工具',
      items: [
        {
          text: 'webpack',
          link: '/deploy/webpack/',
        },
        {
          text: 'vite',
          link: '/deploy/vite/',
        }
      ],
    },
    {
      text: '服务器部署',
      link: '/deploy/server/',
    },
    {
      text: 'docker 容器化',
      link: '/deploy/docker/',
    },
    {
      text: 'CI & CD',
      link: '/deploy/cicd/',
    },
  ],
};
