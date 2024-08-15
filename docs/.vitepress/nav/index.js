import javascript from './javascript';
import vue from './vue';
import react from './react';
import deploy from './deploy';
import fragment from './fragment';

// https://vitepress.dev/reference/default-theme-config
export default [
  {
    text: 'AboutMe',
    link: '/aboutMe',
  },
  {
    // css //
    text: 'CSS',
    link: '/css/',
  },
  {
    text: 'Database',
    link: '/database/',
  },
  javascript,
  vue,
  react,
  deploy,
  fragment,
];
