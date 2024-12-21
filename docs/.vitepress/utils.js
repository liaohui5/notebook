import fs from "fs";

// 去除文件扩展名
function removeFileNameExt(fileName) {
  const lastIndexOfDot = fileName.lastIndexOf(".");
  return fileName.substring(0, lastIndexOfDot);
}

// 根据文件名生成序号(用于排序)
function genOrderNumber(fileName) {
  const arr = fileName.split(".");
  if (arr.length === 1) {
    return 0;
  }
  return arr[0] >> 0;
}

// 根据文件自动生成侧边栏(这个不是vite插件不会实时监听文件变化然后重启)
export function autoGenSidebars(filePath, autoGenIntro = true, ...excludes) {
  excludes.push(".DS_Store");
  excludes.push("index.md");
  const targetPath = `docs/${filePath}`.replace(new RegExp("//", "g"), "/");
  const fileNames = fs.readdirSync(targetPath).filter((fileName) => !excludes.includes(fileName));
  const result = [];

  if (autoGenIntro) {
    result.push({
      text: "介绍",
      link: `${filePath}/index`,
      sort: 0,
    });
  }

  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const text = removeFileNameExt(fileName);
    result.push({
      text,
      link: `${filePath}/${text}`,
      sort: genOrderNumber(text),
    });
  }

  return result.sort((a, b) => a.sort - b.sort);
}

// 移除重复的斜杠
function removeRepeatSlash(str) {
  return str.replaceAll(/\/\//g, "/");
}

// 空格转下划线
function space2underline(str) {
  return str.replaceAll(/\s/g, "_");
}

// 自动生成url
export function autoGenUrlWithPrefix(prefix, items, handler = null) {
  const urlHandlers = [
    // url item handlers
    removeRepeatSlash,
    space2underline,
  ];
  typeof handler === "function" && urlHandlers.push(handler);
  return items.map((item) => {
    let link = item;

    urlHandlers.forEach((filter) => {
      link = filter(item);
    });

    link = prefix + link;

    return {
      text: item,
      link,
    };
  });
}
