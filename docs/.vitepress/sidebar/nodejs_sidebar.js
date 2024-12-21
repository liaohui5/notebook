import { autoGenUrlWithPrefix } from "../utils";
const nodeDocsPrefix = "https://nodejs.cn/api/";

const modules = [
  "cli",
  "console",
  "fs",
  "path",
  "http",
  "net",
  "url",
  "querystring",
  "os",
  "timers",
  "stream",
  "webstreams",
  "errors",
  "globals",
  "events",
  "process",
  "child_process",
];
export default [
  {
    text: "介绍",
    link: "/js/nodejs/index",
  },
  ...autoGenUrlWithPrefix(nodeDocsPrefix, modules, (link) => `${link}.html`),
];
