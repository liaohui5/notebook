## 字符串

## String 对象和 字符串的值的区别?

就比如 `包装箱` 和 `箱子里装的东西`, 在 Java 中有类似装箱和拆箱的概念

- 包装类实例对象(包装箱 + 箱子里装的东西一箱苹果): `new String("apple")`
- 原始值(箱子里装的东西一箱苹果): `"apple"`

```js
const str1 = "hello"; // 原始值(string 类型, 存储在栈中)
const str2 = new String("hello"); // String 对象(object 类型, 纯在堆区)

console.log(typeof str1); // "string"
console.log(typeof str2); // "object"
```

## 字符串常用方法

### 操作方法

| 函数名                        | 作用                                                           | 返回值  |
| ----------------------------- | -------------------------------------------------------------- | ------- |
| concat                        | 拼接一个或多个字符串                                           | String  |
| slice/substring               | 截取字符串从 `start` 位置开始, `end`位置结束, 但是不包括 `end` | String  |
| trim/trimLeft/trimRight       | 去除字符串俩边的空格                                           | String  |
| repeat                        | 重复一个字符串指定次数                                         | String  |
| padStart/padEnd               | 用一个字符串填充一个字符串                                     | String  |
| toUpperCase/toLowerCase       | 装换大小写                                                     | String  |
| charAt/charCodeAt/codePointAt | 返回字符串对应的 unicode 码                                    | Number  |
| indexOf                       | 获取字符在字符串中的位置,如果没有返回 -1                       | Number  |
| startsWith                    | 判断一个字符串是否是以一个字符串开头的                         | Boolean |
| includes                      | 判断一个字符串是否包含另外一个字符串                           | Boolean |
| fromCharCode/fromCodePoint    | 根据 unicode 码返回对应的字符                                  | String  |

### 转换方法

> 将字符串切割成数组

| 函数名 | 作用                         | 返回值 |
| ------ | ---------------------------- | ------ |
| split  | 将字符串按照分隔符分割为数组 | Array  |

### 模板匹配方法

| 函数名  | 作用                                                        | 返回值 |
| ------- | ----------------------------------------------------------- | ------ |
| match   | 按照字符串/正则表达式去匹配                                 | Array  |
| search  | 按照字符串/正则表达式搜索,找到返回索引位置, 没找到返回 `-1` | Number |
| replace | 按照字符串/正则表达式替换                                   | String |

## 手动实现

### concat

```javascript
String.prototype.$concat = function () {
  var o = Object(this);
  var str = o.valueOf();
  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  if (!arguments.length) {
    return str;
  }

  var args = Array.prototype.slice.call(arguments);
  for (var i = 0, l = args.length; i < l; i++) {
    str += String(args[i]);
  }
  return str;
};
```

### slice/substring

```javascript
// sbustring
String.prototype.$substring = function () {
  var o = Object(this);
  var str = o.valueOf();
  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  // 参数不支持负数(不是不支持负数,是负数不能像slice那样从后往前截取)
  // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring#description
  var len = str.length >>> 0;
  var startIndex = arguments[0] >> 0;
  startIndex = startIndex < 0 ? 0 : Math.min(len, startIndex);
  var endIndex = arguments.length > 1 ? arguments[1] >> 0 : Infinity;
  endIndex = endIndex < 0 ? 0 : Math.min(endIndex, len);

  var res = "";

  if (startIndex === endIndex) {
    return res;
  }

  if (startIndex > endIndex) {
    // 交换两变量的值
    var temp = startIndex;
    startIndex = endIndex;
    endIndex = temp;
  }

  var i = startIndex;
  while (i < endIndex) {
    res += str[i];
    i++;
  }

  return res;
};

// slice
String.prototype.$slice = function () {
  var o = Object(this);
  var str = o.valueOf();
  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  var len = str.length >>> 0;
  // startIndex 和 end 必须是正整数
  var startIndex = arguments[0] >> 0;
  startIndex =
    startIndex < 0 ? Math.max(len + startIndex, 0) : Math.min(len, startIndex);
  var endIndex = arguments.length > 1 ? arguments[1] >> 0 : Infinity;
  endIndex = endIndex < 0 ? Math.max(len + endIndex) : Math.min(endIndex, len);

  var res = "";
  var i = startIndex;
  while (i < endIndex) {
    res += str[i];
    i++;
  }

  return res;
};
```

### trim/trimLeft/trimRight

```javascript
//trim: /^\s*(.*?)\s*$/gm
String.prototype.$trim = function () {
  var o = Object(this);
  var str = o.valueOf();

  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  return str.replace(/^\s*(.*?)\s*$/gm, (...args) => args[1]);
};

// trimLeft: /^\s*(.*)$/gm
String.prototype.$trimLeft = function () {
  var o = Object(this);
  var str = o.valueOf();

  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  return str.replace(/^\s*(.*)$/gm, (...args) => args[1]);
};

// trimRight: /^(.*?)\s*$/gm
String.prototype.$trimRight = function () {
  var o = Object(this);
  var str = o.valueOf();

  if (typeof str !== "string") {
    throw new TypeError("'this' must be a string");
  }

  return str.replace(/^(.*?)\s*$/gm, (...args) => args[1]);
};
```

### repeat/padStart/padEnd

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat#polyfill)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart#polyfill)

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd#polyfill)

```javascript
String.prototype.$repeat = function (count) {
  var str = Object(this).toString();
  var count = count >> 0;
  if (count < 0) {
    throw new RangeError("count value is invlid");
  }
  var res = "";
  for (var i = 0; i < count; i++) {
    res += str;
  }
  return res;
};
```

### indexOf/lastIndexOf/includes

```javascript
// indexOf
String.prototype.$indexOf = function (needle) {
  var str = Object(this).toString();
  var len = str.length;
  var needle = String(needle);
  var needleLen = needle.length;
  var startIndex = arguments.length > 1 ? arguments[1] >> 0 : 0;
  if (startIndex < 0) {
    startIndex = 0;
  }

  for (var i = startIndex; i < len; i++) {
    // 每次都 slice 去对比
    if (needle === str.substring(i, i + needleLen)) {
      return i;
    }
  }
  return -1;
};

// lastIndexOf
String.prototype.$lastIndexOf = function (needle) {
  var str = Object(this).toString();
  var len = str.length;
  var needle = String(needle);
  var needleLen = needle.length;
  var startIndex = arguments.length > 1 ? arguments[1] >> 0 : 0;
  if (startIndex < 0) {
    startIndex = 0;
  }

  var lastIndex = -1;
  for (var i = startIndex; i < len; i++) {
    // 每次都 slice 去对比, 匹配到就更新 lastIndex
    if (needle === str.substring(i, i + needleLen)) {
      lastIndex = i;
    }
  }
  return lastIndex;
};

// includes
String.prototype.$lastIndexOf = function (needle) {
  var str = Object(this).toString();
  var len = str.length;
  var needle = String(needle);
  var needleLen = needle.length;
  var startIndex = arguments.length > 1 ? arguments[1] >> 0 : 0;
  if (startIndex < 0) {
    startIndex = 0;
  }

  for (var i = startIndex; i < len; i++) {
    // 每次都 slice 去对比
    if (needle === str.substring(i, i + needleLen)) {
      return true;
    }
  }
  return false;
};
```

### startsWith

[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#polyfill)

```javascript
String.prototype.$startsWith = function (needle) {
  var str = Object(this).toString();
  var needle = String(needle);
  return str.substring(0, needle.length) === needle;
};
```

### split

> 手动实现 split 方法, 这是一个经典面试题

```javascript
/**
 * String.prototype.split
 * @param {String} spl
 * @returns {Array}
 */
String.prototype.$split = function (spl) {
  var str = Object(this).toString(); // raw value
  var len = str.length;
  // 字符串的长度为0
  if (len === 0) {
    return [""];
  }

  // 如果没有传入分隔符 spl
  var tag = spl || "";
  if (tag.length === 0) {
    return [str];
  }

  var res = [];
  var tagIndex;
  while (str.length) {
    tagIndex = str.indexOf(tag);
    if (tagIndex === -1 && tag) {
      res.push(str);
      str = "";
    } else {
      res.push(str.substring(0, tagIndex));
      str = str.substring(tagIndex + 1);
    }
  }
  return res;
};
```
