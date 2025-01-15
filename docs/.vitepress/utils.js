import fs from "node:fs";

// 根据文件名生成序号(用于排序)
function getOrderBy(fileName) {
  const arr = fileName.split(".");
  if (arr.length === 1) {
    return 0;
  }
  return arr[0] >> 0;
}

// 根据文件自动生成侧边栏(这个不是vite插件不会实时监听文件变化然后重启)
export function autoGenSidebars(filePath) {
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
        link: `/${filePath}/index`,
        sort: 0,
      });
      continue;
    }

    const [text, _] = item.split(".");
    result.push({
      text,
      link: `${filePath}/${text}`,
      sort: getOrderBy(text),
    });
  }
  return result.sort((a, b) => a.sort - b.sort);
}
