import fs from "node:fs";
const sidebars = [
  "/css/",
  "/database/",
  "/js/base",
  "/js/oop/",
  "/js/dom/",
  "/js/magic/",
  "/js/builtin/",
  "/js/api/",
  "/js/ts/base/",
  "/js/tests/",
  "/js/design-patterns/",
  "/js/algorithms",
  "/vue/base/",
  "/vue/mini-vue/",
  "/react/base/",
  "/react/hooks/",
  "/clang/",
  "/rust/base/",
  "/rust/libs/",
  "/rust/async/",
  "/deploy/cicd",
  "/deploy/server/",
  "/deploy/docker/",
  "/deploy/webpack/",
  "/deploy/vite/",
  "/deploy/monorepo/",
  "/deploy/python/",
];
const sidebar = sidebarGenerator(sidebars);
export default sidebar;

// 根据文件名生成序号(用于排序)
function getOrderBy(fileName) {
  const order = Number.parseInt(fileName.slice(0, 2));
  if (Number.isNaN(order)) {
    return 0;
  }
  return order;
}

// 根据文件自动生成侧边栏(这个不是vite插件不会实时监听文件变化然后重启)
function autoGenSidebars(filePath) {
  const excludes = [".DS_Store"];
  const targetPath = `docs/${filePath}`.replace(/\/\//g, "/");
  const files = fs.readdirSync(targetPath);

  const result = [];
  for (let i = 0; i < files.length; i++) {
    const item = files[i];
    if (excludes.includes(item)) {
      continue;
    }
    if (item === "index.md") {
      result.push({
        text: "介绍",
        link: `${filePath}/index`,
        sort: 0,
      });
      continue;
    }

    const fileStat = fs.statSync(`${targetPath}/${item}`);
    if (!fileStat.isFile()) {
      continue;
    }

    const text = item.slice(0, -3); // without ".md"
    result.push({
      text,
      link: `${filePath}/${text}`,
      sort: getOrderBy(text),
    });
  }
  return result.sort((a, b) => a.sort - b.sort);
}

function sidebarGenerator(sidebarPaths = []) {
  const sidebars = {};
  for (const path of sidebarPaths) {
    sidebars[path] = autoGenSidebars(path);
  }
  return sidebars;
}
