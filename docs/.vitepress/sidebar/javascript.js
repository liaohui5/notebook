import { autoGenSidebars } from '../utils/gen-sidebar';
import webapi_sidebar from './webapi_sidebar';
import nodejs_sidebar from './nodejs_sidebar';

export default {
  '/js/base': [
    { text: '介绍', link: '/js/base/index' },
    { text: 'JS 基础语法', link: '/js/base/syntax' },
    { text: '预编译机制', link: '/js/base/precompile' },
    { text: '作用域和闭包', link: '/js/base/scope-and-closure' },
    { text: '内存模型和垃圾回收', link: '/js/base/gc' },
    { text: '异常处理机制', link: '/js/base/execption' },
    { text: '数值精度机制', link: '/js/base/number' },
    { text: '判断相等机制', link: '/js/base/equal' },
    { text: '自动转换机制', link: '/js/base/auto_convert' },
    { text: '事件环机制', link: '/js/base/eventloop' },
    {
      text: 'ES6 新增内容',
      items: [
        { text: '新关键字和运算符', link: '/js/base/es6_keywords' },
        { text: '新增数据结构', link: '/js/base/es6_data_structs' },
        { text: '面向对象完善', link: '/js/base/oop_optimize' },
        { text: 'ESM 模块化', link: '/js/base/es_module' },
        { text: '迭代器 & 生成器', link: '/js/base/generator_iterator' },
        { text: 'Promise', link: '/js/base/promise' },
        { text: '装饰器', link: '/js/base/decorator' },
      ],
    },
  ],

  '/js/oop/': [
    { text: '面向对象介绍', link: '/js/oop/index' },
    { text: '对象和构造函数(类)', link: '/js/oop/object-and-class' },
    { text: '原型和原型链', link: '/js/oop/prototype' },
    { text: '实现继承', link: '/js/oop/extends' },
    { text: 'this 指向', link: '/js/oop/this' },
  ],

  '/js/dom/': autoGenSidebars('/js/dom'),

  '/js/magic/': autoGenSidebars('/js/magic'),

  '/js/builtin/': [
    {
      text: '介绍',
      link: '/js/builtin/index',
    },
    {
      text: '值属性',
      link: '/js/builtin/value_property',
    },
    {
      text: '函数属性',
      link: '/js/builtin/function_property',
    },
    {
      text: '基本对象',
      items: [
        {
          text: 'Object 对象',
          items: [
            { text: '基本介绍', link: '/js/builtin/object' },
            { text: '获取属性与遍历对象', link: '/js/builtin/object/object-get' },
            { text: '静态方法学习', link: '/js/builtin/object/static-method' },
            { text: '实例方法学习', link: '/js/builtin/object/instance-method' },
            { text: '对象克隆', link: '/js/builtin/object/clone' },
            { text: '树形数据处理', link: '/js/builtin/object/tree' },
          ],
        },
        {
          text: 'Function 函数',
          link: '/js/builtin/function',
        },
        {
          text: 'Boolean 布尔值',
          link: '/js/builtin/boolean',
        },
        {
          text: 'Symbol',
          link: '/js/builtin/symbol',
        },
      ],
    },
    {
      text: '错误对象',
      link: '/js/builtin/error',
    },
    {
      text: '数值和日期对象',
      items: [
        {
          text: 'Number 数值',
          link: '/js/builtin/number',
        },
        {
          text: 'Math 数学',
          link: '/js/builtin/math',
        },
        {
          text: 'Date 日期',
          link: '/js/builtin/date',
        },
      ],
    },
    {
      text: '字符串',
      items: [
        {
          text: 'String 字符串',
          link: '/js/builtin/string',
        },
        {
          text: 'RegExp 正则表达式',
          link: '/js/builtin/regexp',
        },
      ],
    },

    {
      text: '可索引的集合对象',
      items: [
        {
          text: 'Array 数组',
          items: [
            { text: '基本介绍', link: '/js/builtin/array' },
            { text: '基础学习', link: '/js/builtin/array/base' },
            { text: '数组方法', link: '/js/builtin/array/methods' },
            { text: '数组去重', link: '/js/builtin/array/unique' },
          ]
        },
      ],
    },

    {
      text: '使用键的集合对象',
      items: [
        {
          text: 'Map',
          link: '',
        },
        {
          text: 'Set',
          link: '',
        },
        {
          text: 'WeakMap',
          link: '',
        },
        {
          text: 'WeakSet',
          link: '',
        },
      ],
    },

    {
      text: '结构化数据',
      items: [
        {
          text: 'JSON',
          link: '',
        },
      ],
    },
  ],

  '/js/webapi/': webapi_sidebar,
  '/js/nodejs/': nodejs_sidebar,

  '/js/ts/base/': [
    { text: '介绍&安装', link: '/js/ts/base/index' },
    { text: '数据类型', link: '/js/ts/base/2.types' },
    { text: '配置文件', link: '/js/ts/base/3.config' },
    { text: '使用断言', link: '/js/ts/base/4.assets' },
    { text: '类&接口', link: '/js/ts/base/5.class-and-interface' },
    { text: '泛型', link: '/js/ts/base/6.generics' },
    { text: '装饰器', link: '/js/ts/base/7.decorators' },
    { text: '模块', link: '/js/ts/base/8.modules' },
    { text: '类型工具', link: '/js/ts/base/9.utility-types' },
    { text: '声明文件', link: '/js/ts/base/10.declaration-file' },
  ],

  '/js/tests/': [
    { text: '为什么写测试?', link: '/js/tests/index' },
    { text: '测试框架学习', link: '/js/tests/framework' },
    { text: '模拟程序需要', link: '/js/tests/mock-env' },
    { text: '验证程序输出', link: '/js/tests/expect-api' },
    { text: 'vue-router 测试技巧', link: '/js/tests/vue-router' },
    { text: 'pinia 测试技巧', link: '/js/tests/pinia' },
    { text: 'vue 组件测试技巧', link: '/js/tests/vue-components' },
    { text: 'axios 测试技巧', link: '/js/tests/axios' },
  ],

  '/js/design-patterns/': [
    { text: '介绍', link: '/js/design-patterns/index' },
    { text: '创建型', link: '/js/design-patterns/creational' },
    { text: '结构型', link: '/js/design-patterns/structural' },
    { text: '行为型', link: '/js/design-patterns/behavioral' },
  ],

  '/js/algorithms': [
    {
      text: '基本介绍',
      link: '/js/algorithms/index',
    },
    {
      text: '数据结构',
      items: [
        { text: '数组', link: '/js/algorithms/array' },
        { text: '栈', link: '/js/algorithms/stack' },
        { text: '队列', link: '/js/algorithms/queue' },
        { text: '链表', link: '/js/algorithms/linkedlist' },
        { text: '散列表', link: '/js/algorithms/hash-table' },
        { text: '树', link: '/js/algorithms/tree' },
        { text: '堆', link: '/js/algorithms/heap' },
        { text: '图', link: '/js/algorithms/graph' },
      ],
    },
    {
      text: '算法',
      items: [
        {
          text: '搜索算法',
          link: '',
        },
        {
          text: '排序算法',
          link: '',
        },
        {
          text: '分治算法',
          link: '',
        },
        {
          text: '回溯算法',
          link: '',
        },
        {
          text: '动态规划',
          link: '',
        },
        {
          text: '贪心算法',
          link: '',
        },
      ],
    },
  ],
};
