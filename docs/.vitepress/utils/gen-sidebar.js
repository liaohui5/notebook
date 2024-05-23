import fs from 'fs';

// 根据文件生成侧边栏
export function autoGenSidebars(filePath, ...excludes) {
  excludes.push('.DS_Store');
  excludes.push('index.md');
  const targetPath = `docs/${filePath}`.replace(new RegExp('//', 'g'), '/');
  const fileNames = fs.readdirSync(targetPath).filter((fileName) => !excludes.includes(fileName));
  const result = [];
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

  function removeFileNameExt(fileName) {
    const lastIndexOfDot = fileName.lastIndexOf('.');
    return fileName.substring(0, lastIndexOfDot);
  }

  function genOrderNumber(fileName) {
    const arr = fileName.split('.');
    if (arr.length === 1) {
      return 0;
    }
    // @ts-ignore: force convert to number
    return arr[0] >> 0;
  }
}
