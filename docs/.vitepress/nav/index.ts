import deploy from "./deploy";
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
    text: "Others",
    link: "/others/",
  },
  {
    text: "Database",
    link: "/database/",
  },
  {
    text: "CSS",
    link: "/css/",
  },
  javascript,
  vue,
  react,
  deploy,
  {
    text: "Rust",
    link: "https://studyrust.netlib.re",
  },
  {
    text: "dotfiles",
    link: "https://github.com/liaohui5/dotfiles",
  },
];
