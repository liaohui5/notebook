export default {
  '/vue/base/': [
    { text: '1.邂逅 Vue.js', link: '/vue/base/index' },
    { text: '2.Vue.js 基本使用', link: '/vue/base/2.base-use' },
    { text: '3.Vue.js 单元测试', link: '/vue/base/3.unit-test' },
    { text: '4.深入响应式原理', link: '/vue/base/4.deep-reactive' },
    { text: '5.深入模板处理', link: '/vue/base/5.deep-template' },
    { text: '6.深入 diff 算法', link: '/vue/base/6.deep-diff' },
    { text: '7.自定义指令', link: '/vue/base/7.custom-directives' },
    { text: '8.插件化开发', link: '/vue/base/8.vue-plugin-dev' },
    { text: '9.render & jsx', link: '/vue/base/9.render-jsx' },
    { text: '10.配置', link: '/vue/base/10.config' },
    { text: '11.派发器思想', link: '/vue/base/11.design-dispatcher' },
    { text: '12.composition-api', link: '/vue/base/12.composition-api' },
    { text: '13.vue3 进阶 API', link: '/vue/base/13.vue3-advance-api' },
  ],
  '/vue/mini-vue/': [
    {
      text: '准备',
      items: [
        {
          text: '项目介绍',
          link: '/vue/mini-vue/index',
        },
        {
          text: '创建项目',
          link: '/vue/mini-vue/create-project-env',
        },
      ],
    },

    // reactivity
    {
      text: 'reactivity',
      items: [
        {
          text: '模块介绍',
          link: '/vue/mini-vue/reactivity/index',
        },
        {
          text: 'reactive 方法实现',
          link: '/vue/mini-vue/reactivity/reactive',
        },
      ],
    },

    // compiler-core
    {
      text: 'compiler-core',
      items: [
        {
          text: '模块介绍',
          link: '/vue/mini-vue/compiler-core/index',
        },
      ],
    },

    // runtime-core
    {
      text: 'runtime-core',
      items: [
        {
          text: '模块介绍',
          link: '/vue/mini-vue/runtime-core/index',
        },
      ],
    },

    // runtime-dom
    {
      text: 'runtime-dom',
      items: [
        {
          text: '模块介绍',
          link: '/vue/mini-vue/runtime-dom/index',
        },
      ],
    },
  ],
};
