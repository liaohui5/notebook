import { autoGenUrlWithPrefix } from '../utils/gen-urls';

const MDNPrefix = 'https://developer.mozilla.org/zh-CN/docs/Web/API/';

export default [
  {
    text: '介绍',
    link: '/js/webapi/index',
  },
  {
    text: 'DOM',
    items: autoGenUrlWithPrefix(MDNPrefix, [
      'AbortController',
      'AbortSignal',
      'Comment',
      'CustomEvent',
      'Document',
      'DocumentFragment',
      'DOMException',
      'DOMParser',
      'DOMTokenList',
      'Element',
      'Event',
      'EventTarget',
      'MutationObserver',
      'MutationRecord',
      'Node',
      'NodeList',
      'HTMLCollection',
    ]),
  },
  {
    text: 'Events',
    items: [
      ...autoGenUrlWithPrefix(MDNPrefix, [
        // click event
        'Event',
        'Pointer Events',
        'Touch Events',
      ]),
      {
        text: 'UI Events',
        items: autoGenUrlWithPrefix(MDNPrefix, [
          'CompositionEvent',
          'FocusEvent',
          'InputEvent',
          'MouseEvent',
          'MouseScrollEvent',
          'WheelEvent',
        ]),
      },
    ],
  },
  ...autoGenUrlWithPrefix(MDNPrefix, [
    'Console API',
    'XMLHttpRequest',
    'Fetch API',
    'Clipboard API',
    'File API',
    'Fullscreen API',
    'HTML Drag and Drop API',
    'Channel Messaging API',
    'URL API',
    'Web Storage API',
    'Web components',
    'Performance API',
    'Web Workers API',
    'IndexedDB API',
    'Selection',
    'Resize Observer API',
    'Intersection Observer API',
    'WebGL API',
    'CSSStyleDeclaration',
  ]),
];
