## 一些有用的函数

- [Math.abs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs) 获取一个值的绝对值
- [Math.pow](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/pow) 获取一个值的 n 次幂
- [Math.floor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) 向下取整
- [Math.ceil](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) 向上取整
- [Math.min](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 获取一组数的最小值
- [Math.max](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 获取一组数的最大值
- [Math.random](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) 一个大于等于 0 且小于 1 的伪随机浮点数
- [Math.PI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/PI) 一个常量, 表示圆周率（π）

```js
// 计算一个值的 MB 单位
function getSize(bytesize) {
  return bytesize / Math.pow(1024, 2);
}

// 随机数 + 向下取整, 获取一个指定范围内的随机值
function range(min, max) {
  return Math.floor(min + (max - min) * Math.random());
}

// 确保 Math.max 确保一个数值必须是正整数或0
// 比如数值下标, 不能是负数
function ensurePositive(value) {
  return Math.max(0, value);
}

// 获取随机16进制颜色字符串, 如: #f8f8f8
function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}
function getRandomColor2() {
  var getRandomIndex = (max) => Math.floor(Math.random() * max);
  var colorItems = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e"];
  var len = colorItems.length;
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += colorItems[getRandomIndex(len)];
  }
  return color;
}
```
