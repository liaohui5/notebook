import deploy from "./deploy";
import fragment from "./fragment";
import javascript from "./javascript";
import react from "./react";
import vue from "./vue";

// https://vitepress.dev/reference/default-theme-config
export default [
  {
    text: "AboutMe",
    link: "https://github.com/liaohui5",
  },
  {
    text: "CSS",
    link: "/css/",
  },
  {
    text: "Database",
    link: "/database/",
  },
  javascript,
  vue,
  react,
  deploy,
  fragment,
  {
    text: "Rust",
    link: "https://studyrust.netlib.re",
  },
];
