## 日期对象

[mdn 参考文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

用于获取或操作时间日期相关的属性和方法

## 常用 API

| API                             | 名称                 |
| :------------------------------ | :------------------- |
| getFullYear / setFullYear       | 获取年份/设置年份    |
| getMonth / setMonth             | 获取月份/设置月份    |
| getDate / setDate               | 获取天/设置天        |
| getDay                          | 获取一周中的一天     |
| getHours / setHours             | 获取/设置小时        |
| getMinutes / setMinutes         | 获取/设置分钟        |
| getSeconds / setSeconds         | 获取/设置秒          |
| getMilliseconds/setMilliseconds | 获取/设置毫秒        |
| Date.toJSON                     | 序列化时间戳为字符串 |
| toString/toLocalString          | 序列化时间戳为字符串 |
| Date.now 静态方法               |                      |
| Date.parse 静态方法             | 获取当前时间戳       |

1. 获取/设置年: getFullYear / setFullYear
2. 获取/设置月(0-11): getMonth / setMonth
3. 获取/设置天(1-31): getDate / setDate
4. 获取一周中的一天: getDay
5. 获取/设置小时: getHours / setHours
6. 获取/设置分钟: getMinutes / setMinutes
7. 获取/设置秒: getSeconds / setSeconds
8. 获取当前时间戳: Date.now / getTime
9. 获取一个数据库的时间日期格式: toJSON

## 一些常用的时间处理库

- [dayjs](https://day.js.org/zh-CN/)
- [moment](https://github.com/moment/moment)

## Date API 应用实例

```javascript
/**
 * 获取当前时间
 * @param {number} time
 * @returns
 */
function getFormatDate(time) {
  var d = time ? new Date(time) : new Date(),
    y = d.getFullYear(),
    m = d.getMonth() + 1,
    d = d.getDate(),
    h = d.getHours(),
    i = d.getMinutes(),
    s = d.getSeconds();
  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;
  h = h < 10 ? "0" + h : h;
  i = i < 10 ? "0" + i : i;
  s = s < 10 ? "0" + s : s;
  return y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
}

/**
 * 倒计时
 * @param {Number} endTime 结束时间
 * @param {Function} endCallback 结束之后的回调
 * @returns
 */
function countDown(endTime, endCallback) {
  var nowTime = Date.now(),
    leftTime = (endTime - nowTime) / 1000, // seconds
    d,
    h,
    i,
    s;
  if (leftTime >= 0) {
    d = Math.floor(leftTime / 60 / 60 / 24);
    h = Math.floor((leftTime / 60 / 60) % 24);
    i = Math.floor((leftTime / 60 / 60) % 60);
    s = Math.floor(leftTime % 60);
    h = h < 10 ? "0" + h : h;
    i = i < 10 ? "0" + i : i;
    s = s < 10 ? "0" + s : s;
  } else {
    typeof endCallback === "function" && endCallback();
  }
  return d + "天" + h + "小时" + i + "分钟" + s + "秒";
}

var endTime = Date.now() + 5 * (1000 * 60 * 60 * 24);
var timer = setInterval(function () {
  var str = countDown(endTime);
  console.info(str);
}, 1000);

/**
 * 根据模板字符串格式化日期对象
 * @param {Date} date
 * @param {string} template
 * @returns {string}
 */
export function formatDate(date, template) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dates = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDay() + 1;

  const fillZero = (value) => {
    return value < 10 ? `0${value}` : String(value);
  };

  const templateMap = {
    "{y}": year.toString().slice(-2),
    "{Y}": year,
    "{m}": month,
    "{M}": fillZero(month),
    "{d}": dates,
    "{D}": fillZero(dates),
    "{h}": hours,
    "{H}": fillZero(hours),
    "{i}": minutes,
    "{I}": fillZero(minutes),
    "{s}": seconds,
    "{S}": fillZero(seconds),
    "{w}": day,
  };

  let formated = template;
  const keys = Object.keys(templateMap);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = String(templateMap[key]);
    formated = formated.replace(key, value);
  }
  return formated;
}
```

## 定时器

可用来做动画, 但是不建议使用, 比较卡顿, 可用其他方式来做

```javascript
var i = 0;
var timer = setInterval(functimn () {
  console.log("每隔1s执行一次");
  i++;
  if (i >= 10) {
    // 清除定时器
    clearInterval(timer);
  }
}, 1000);
```

## 超时器

可以用来做防抖节流限制函数的调用次数, 保证性能

```javascript
var timer = setTimeout(function () {
  console.log("1秒之后会执行..");
  timer && clearTimeout(timer); // 清除超时器
}, 1000);
```
